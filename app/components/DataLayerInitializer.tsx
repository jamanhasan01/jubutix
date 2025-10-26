// app/components/DataLayerInitializer.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react' // NextAuth থেকে সেশন ডেটা ব্যবহারের জন্য
import { DataLayerLocation, DataLayerPageEvent, DataLayerScreen, DataLayerUser } from '@/types/globals'

// কনফিগারেশন
const OPENCAGE_API_KEY = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY || ''
const SESSION_TRACKING_INTERVAL_MS = 30000

// =====================================================================
// Utility Functions/Hooks
// =====================================================================

function useNonLoggedInUserId() {
  const [id, setId] = useState<string | null>(null)
  useEffect(() => {
    if (typeof window === 'undefined') return
    let storedId = localStorage.getItem('guest_user_id')
    if (!storedId) {
      // crypto.randomUUID() আধুনিক ব্রাউজারগুলিতে uuidv4-এর পরিবর্তে ব্যবহার করা যেতে পারে
      storedId = crypto.randomUUID() 
      localStorage.setItem('guest_user_id', storedId)
    }
    setId(storedId)
  }, [])
  return id
}

function useScreenDimensions() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const update = () => setDimensions({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return dimensions
}

function useGeolocationData(apiKey: string) {
  const [locationData, setLocationData] = useState<DataLayerLocation>({ location_status: 'n/a' })

  useEffect(() => {
    if (!navigator.geolocation || !apiKey) {
      setLocationData({ location_status: apiKey ? 'unsupported' : 'missing_key' })
      return
    }

    const fetchLocation = async (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`

      try {
        const response = await fetch(url)
        const data = await response.json()
        const comp = data.results[0]?.components

        setLocationData({
          location_status: 'success',
          user_city: comp?.city || comp?.town || comp?.village || 'Unknown',
          user_country: comp?.country || 'Unknown',
          user_latitude: latitude,
          user_longitude: longitude,
        })
      } catch (err) {
        setLocationData({ location_status: 'error' })
      }
    }

    const error = (err: GeolocationPositionError) => {
        let status: DataLayerLocation['location_status'] = 'denied';
        if (err.code === err.POSITION_UNAVAILABLE) status = 'unavailable';
        else if (err.code === err.TIMEOUT) status = 'timeout';
        setLocationData({ location_status: status });
    };

    navigator.geolocation.getCurrentPosition(fetchLocation, error, { timeout: 5000 })
  }, [apiKey])

  return locationData
}

// =====================================================================
// MAIN COMPONENT
// =====================================================================
export default function DataLayerInitializer() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const nonLoggedInUserId = useNonLoggedInUserId()
  const viewport = useScreenDimensions()
  const locationData = useGeolocationData(OPENCAGE_API_KEY)

  const lastPushPath = useRef<string | null>(null)
  const startTime = useRef(Date.now())
  const [isPageActive, setIsPageActive] = useState(true)

  // ✅ Track page visibility
  useEffect(() => {
    const handleVisibilityChange = () => setIsPageActive(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // ডেটা তৈরির ফাংশন
  const getBaseData = (currentPath: string): DataLayerPageEvent => {
    const isClient = typeof window !== 'undefined'
    const user = session?.user
    const isLoggedIn = Boolean(user?.id)

    const userData: DataLayerUser = {
      user_id: isLoggedIn ? (user?.id as string) : nonLoggedInUserId || undefined,
      user_type: isLoggedIn ? 'authenticated' : 'guest',
      user_email: user?.email || undefined,
      user_segment: user?.role || 'guest', // Role-কে segment হিসেবে ব্যবহার করা হচ্ছে
    }

    const screenData: DataLayerScreen = {
      viewport_width: viewport.width,
      viewport_height: viewport.height,
      screen_width: isClient ? window.screen.width : undefined,
      screen_height: isClient ? window.screen.height : undefined,
      device_type: viewport.width < 768 ? 'Mobile' : viewport.width < 1024 ? 'Tablet' : 'Desktop',
    }

    return {
      event: 'DataLayer.Configuration', // প্রাথমিক পুশের জন্য একটি কনফিগারেশন ইভেন্ট
      page_path: currentPath,
      document_referrer: isClient ? document.referrer : '',
      user_language: isClient ? navigator.language : '',
      page_title: isClient ? document.title : '',
      is_page_active: isPageActive,
      
      // GA4 কনভেনশনের জন্য কী নামগুলি ব্যবহার করা হচ্ছে
      ...userData,
      ...screenData,
      ...locationData, 
    } as DataLayerPageEvent
  }

  // ✅ 1. প্রাথমিক ডেটা সেটআপ এবং পেজভিউ ট্র্যাকিং
  useEffect(() => {
    if (!window.dataLayer || !pathname || !nonLoggedInUserId || locationData.location_status === 'n/a') {
      return
    }

    const baseData = getBaseData(pathname)

    // A. প্রাথমিক কনফিগারেশন পুশ (শুধুমাত্র প্রথমবার)
    if (lastPushPath.current === null) {
        window.dataLayer.push(baseData)
    }

    // B. পেজ ভিউ ইভেন্ট পুশ (রাউট পরিবর্তন হলেই)
    if (lastPushPath.current !== pathname) {
      const pageViewEvent: DataLayerPageEvent = {
        ...baseData,
        event: 'pageview', // GTM ট্রিগারের জন্য
        event_category: 'Page Navigation',
        event_label: pathname,
        page_location: window.location.href // সম্পূর্ণ URL
      }
      
      window.dataLayer.push(pageViewEvent)
      startTime.current = Date.now() // নতুন পেজে টাইম রিসেট
    }

    lastPushPath.current = pathname
  }, [pathname, session, locationData, viewport, nonLoggedInUserId])

  // ✅ 2. সেশন ডিউরেশন ট্র্যাকিং (প্রতি 30 সেকেন্ডে)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const intervalId = setInterval(() => {
      // শুধুমাত্র অ্যাক্টিভ ট্যাবেই ফায়ার করবে
      if (window.dataLayer && isPageActive) {
        const timeSpent = Date.now() - startTime.current;
        window.dataLayer.push({
          event: 'session_time_elapsed', // GTM ট্রিগারের জন্য
          event_category: 'Engagement',
          event_label: 'Active Time on Page',
          time_on_page_ms: timeSpent,
          time_on_page_s: Math.round(timeSpent / 1000),
          page_path: pathname,
        })
      }
    }, SESSION_TRACKING_INTERVAL_MS)

    return () => clearInterval(intervalId)
  }, [pathname, isPageActive])

  return null
}