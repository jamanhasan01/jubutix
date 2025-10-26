// app/components/DataLayerInitializer.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
// নিশ্চিত করুন: 'npm install uuid @types/uuid' করা হয়েছে
import { v4 as uuidv4 } from 'uuid'; 
import { DataLayerLocation, DataLayerPageEvent, DataLayerScreen, DataLayerUser } from '@/types/globals'; 

// =====================================================================
// 1. MOCK DATA & CONFIGURATION
// =====================================================================
// OpenCage API Key: রিভার্স জিওকোডিং এর জন্য। 
const OPENCAGE_API_KEY = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY || 'YOUR_OPENCAGE_API_KEY_HERE';
const SESSION_TRACKING_INTERVAL_MS = 30000; // 30 সেকেন্ড অন্তর সেশন টাইম ট্র্যাক করবে

// MOCK অথেন্টিকেশন স্টেট: আপনার প্রকৃত অথেন্টিকেশন সিস্টেম দিয়ে এটি পরিবর্তন করুন।
const MOCK_AUTH_STATE = {
  isLoggedIn: false, // ডিফল্টভাবে লগইন নেই ধরে নিচ্ছি
  id: 'USER-12345-NEXT',
  email: 'dev.test@example.com',
  segment: 'prospect' as const,
};

// =====================================================================
// 2. UTILITY HOOKS
// =====================================================================

// কুকি/লোকাল স্টোরেজ থেকে গেস্ট ইউজার আইডি তৈরি বা পুনরুদ্ধার
function useUserId() {
    const [userId, setUserId] = useState<string | undefined>(undefined);

    useEffect(() => {
        let storedId = localStorage.getItem('guest_user_id');
        if (!storedId) {
            storedId = uuidv4();
            localStorage.setItem('guest_user_id', storedId);
        }
        setUserId(storedId);
    }, []);

    return userId;
}

// ভিউপোর্ট এবং স্ক্রিন ডাইমেনশন ট্র্যাক করার জন্য
function useWindowDimensions() {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return dimensions;
}

// জিওলোকেশন ডেটা এবং রিভার্স জিওকোডিং ফেচ করার জন্য
function useGeolocation() {
    const [locationData, setLocationData] = useState<DataLayerLocation>({ location_status: 'n/a' });

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocationData({ location_status: 'unavailable' });
            return;
        }

        const fetchLocationName = async (lat: number, lon: number) => {
            if (OPENCAGE_API_KEY === 'YOUR_OPENCAGE_API_KEY_HERE') return {};
            const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${OPENCAGE_API_KEY}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    const components = data.results[0].components;
                    const city = components.city || components.town || components.village || components.suburb;
                    return { user_city: city, user_country: components.country };
                }
            } catch (error) {
                // Error logging can be added here
            }
            return {};
        };

        const success = async (position: GeolocationPosition) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const names = await fetchLocationName(lat, lon);
            setLocationData({
                user_latitude: lat,
                user_longitude: lon,
                location_status: 'success',
                ...names,
            } as DataLayerLocation);
        };

        const error = (err: GeolocationPositionError) => {
            let status: DataLayerLocation['location_status'] = 'denied';
            if (err.code === err.POSITION_UNAVAILABLE) status = 'unavailable';
            else if (err.code === err.TIMEOUT) status = 'timeout';
            setLocationData({ location_status: status });
        };

        navigator.geolocation.getCurrentPosition(success, error, { timeout: 5000, maximumAge: 0 });
    }, []);

    return locationData;
}

// =====================================================================
// 3. MAIN COMPONENT: DataLayer Initializer
// =====================================================================
export function DataLayerInitializer() {
    const pathname = usePathname();
    const viewport = useWindowDimensions();
    const locationData = useGeolocation();
    const nonLoggedInUserId = useUserId();

    const lastPushPath = useRef<string | null>(null);
    const startTime = useRef(Date.now());
    const [isPageActive, setIsPageActive] = useState(true);

    const locationDependencies = [
        locationData.location_status,
        locationData.user_city,
        locationData.user_country,
    ];

    // ট্যাবের ফোকাস/ভিজিবিলিটি ট্র্যাকিং
    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsPageActive(document.visibilityState === 'visible');
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    // সকল ডেটা একত্রিত করে একটি বেস অবজেক্ট তৈরি
    const getBaseData = (currentPath: string) => {
        const isClient = typeof window !== 'undefined';
        
        const userData: DataLayerUser = MOCK_AUTH_STATE.isLoggedIn
            ? {
                user_id: MOCK_AUTH_STATE.id,
                user_email: MOCK_AUTH_STATE.email,
                user_segment: MOCK_AUTH_STATE.segment,
                user_type: 'authenticated',
            }
            : {
                user_id: nonLoggedInUserId, 
                user_type: 'guest',
            };

        const screenData: DataLayerScreen = {
            viewport_width: viewport.width,
            viewport_height: viewport.height,
            screen_width: isClient ? window.screen.width : undefined,
            screen_height: isClient ? window.screen.height : undefined,
            device_type: viewport.width < 768 ? 'Mobile' : viewport.width < 1024 ? 'Tablet' : 'Desktop',
        };

        return {
            // অতিরিক্ত ট্র্যাকিং প্যারামিটার
            document_referrer: isClient ? document.referrer : '', 
            user_language: isClient ? navigator.language : '', 
            page_title: isClient ? document.title : '',
            is_page_active: isPageActive,

            page_path: currentPath,
            ...userData,
            ...screenData,
            ...locationData, 
        };
    }

    // A. সেশন টাইম ট্র্যাকিং (প্রতি 30 সেকেন্ডে)
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const intervalId = setInterval(() => {
            if (window.dataLayer && isPageActive) {
                const timeSpent = Date.now() - startTime.current;
                
                window.dataLayer.push({
                    event: 'session_time_elapsed',
                    event_category: 'Engagement',
                    event_label: 'Time on Page Active',
                    time_on_page_ms: timeSpent,
                    time_on_page_s: Math.round(timeSpent / 1000),
                });
            }
        }, SESSION_TRACKING_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, [isPageActive]);

    // B. ডেটা লেয়ার ইনিশিয়ালাইজেশন এবং পেজ ভিউ ট্র্যাকিং
    useEffect(() => {
        // GTM এবং সমস্ত প্রাথমিক ডেটা লোড হয়েছে কিনা নিশ্চিত করুন
        if (
            typeof window === 'undefined' ||
            !window.dataLayer ||
            !nonLoggedInUserId || 
            locationData.location_status === 'n/a'
        ) {
            return;
        }

        const baseData = getBaseData(pathname);

        // 1. প্রাথমিক ডেটা পুশ (শুধুমাত্র একবার, যখন কম্পোনেন্ট মাউন্ট হয়)
        if (lastPushPath.current === null) {
            window.dataLayer.push(baseData);
        }
        
        // 2. পেজ ভিউ ট্র্যাকিং (নেক্সট জেএস রাউট পরিবর্তন হলেই)
        if (lastPushPath.current !== pathname) {
            const pageViewEvent: DataLayerPageEvent = {
                ...baseData,
                event: 'page_view', 
                event_category: 'Page Navigation',
                event_label: pathname,
            };
            
            window.dataLayer.push(pageViewEvent);
            
            // নতুন পেজ ভিউ ইভেন্ট ফায়ার হওয়ার পরে শুরু সময় রিসেট করুন
            startTime.current = Date.now(); 
        }

        lastPushPath.current = pathname;

    }, [
        pathname,
        viewport.width,
        viewport.height,
        nonLoggedInUserId,
        isPageActive,
        ...locationDependencies,
    ]);

    return null;
}