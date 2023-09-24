import { NextResponse } from "next/server"

const BASE_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?'
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

export const GET = async(req) => {

    const {searchParams} = new URL(req.url)
    const q = searchParams.get('q')
    const result = await fetch(BASE_URL+'query='+q+'&key='+GOOGLE_API_KEY,{
        headers: {
            'Content-Type':'application/json',
        },
    })
    
    const resp = await result.json()

    return NextResponse.json({resp})
}