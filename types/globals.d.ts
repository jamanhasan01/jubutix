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
  user_type?: 'authenticated' | 'guest' | string // 👈 যোগ করা হয়েছে
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

// 3. জিওলোকেশন ডেটা
export type DataLayerLocation = {
  location_status: 'n/a' | 'success' | 'denied' | 'timeout' | 'unavailable'
  user_latitude?: number
  user_longitude?: number
  user_city?: string
  user_country?: string
}

// 4. পেজভিউ/ইভেন্ট ডেটা (বেস অবজেক্ট)
export type DataLayerPageEvent = DataLayerUser &
  DataLayerScreen &
  DataLayerLocation & {
    event: string
    page_path: string

    // 👈 নতুন সাধারণ পেজ প্যারামিটার
    document_referrer?: string
    user_language?: string
    page_title?: string
    is_page_active?: boolean // ট্যাবে বর্তমানে ফোকাস আছে কিনা

    event_category?: string
    event_label?: string
    time_on_page_ms?: number
    time_on_page_s?: number

    [key: string]: any
  }

// গ্লোবাল ডেটা লেয়ার অবজেক্ট
declare global {
  interface Window {
    dataLayer: any[]
  }
}
