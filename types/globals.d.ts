import mongoose from 'mongoose'

declare global {
  var mongoose: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
  type DataLayerElement = DataLayerPageEvent | Record<string, any>
}

// 1. ইউজার ডেটা
export type DataLayerUser = {
  user_id?: string
  user_type?: 'authenticated' | 'guest' | string
  user_email?: string
  user_segment?: 'premium' | 'standard' | 'prospect' | string
}

// 2. স্ক্রিন/ডিভাইস ডেটা
export type DataLayerScreen = {
  viewport_width?: number
  viewport_height?: number
  screen_width?: number
  screen_height?: number
  device_type?: 'Mobile' | 'Tablet' | 'Desktop'
}

export type DataLayerLocation = {
  // "unsupported" যোগ করা হয়েছে 👇
  location_status:
    | 'n/a'
    | 'success'
    | 'denied'
    | 'timeout'
    | 'unavailable'
    | 'missing_key'
    | 'error'
    | 'unsupported'
  user_latitude?: number
  user_longitude?: number
  user_city?: string
  user_country?: string
}
// ... (বাকি টাইপগুলি অপরিবর্তিত)

// 4. পেজভিউ/ইভেন্ট ডেটা (বেস অবজেক্ট)
export type DataLayerPageEvent = DataLayerUser &
  DataLayerScreen &
  DataLayerLocation & {
    event: string
    page_path: string

    document_referrer?: string
    user_language?: string
    page_title?: string
    is_page_active?: boolean

    event_category?: string
    event_label?: string
    time_on_page_ms?: number
    time_on_page_s?: number
    page_location?: string // সম্পূর্ণ URL

    [key: string]: any
  }

// গ্লোবাল ডেটা লেয়ার অবজেক্ট
declare global {
  interface Window {
    dataLayer: any[]
  }
}
