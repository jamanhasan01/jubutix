import { NextResponse } from 'next/server'

export async function POST(req: Request) { // Fix 1: Use the Request type
  try {
    const data = await req.json() // Fix 2: Use const instead of let

    return NextResponse.json({ success: true, message: 'Data Received', data: data })
  } catch (error) {
    // It's also important to handle your errors
    console.error(error);
    return NextResponse.json({ success: false, message: 'An error occurred.' }, { status: 500 });
  }
}