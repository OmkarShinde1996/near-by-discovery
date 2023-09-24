import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ShimmerEffectForMap from './ShimmerEffectForMap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BASE_URL_PHOTO = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800"
const GOOGLE_MAP_URL = "https://www.google.com/maps/embed/v1/place?key="
const SideDrawer = ({ close, place }) => {
    const [mapLoaded, setMapLoaded] = useState(false)
    const onDirectionClick = () => {
        window.open('https://www.google.com/maps/search/?api=1&query=' + place.name + place.formatted_address)
    }

    const onCopyLocationClick = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText('https://www.google.com/maps/search/?api=1&query=' + place.name + place.formatted_address)
                .then(() => {
                    notify('Location URL copied to clipboard');
                })
                .catch((error) => {
                    console.error('Error copying to clipboard:', error);
                });
        } else {
            // Fallback for browsers that do not support clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = 'https://www.google.com/maps/search/?api=1&query=' + place.name + place.formatted_address;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            notify('Location URL copied to clipboard');
        }
    };
    

    const notify = (text) => toast.success(text, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    useEffect(() => {
        setTimeout(() => {
            setMapLoaded(true)
        }, 2000);
    }, [place])

    return (
        <div className='h-screen w-screen md:w-[400px] bg-white shadow-md p-5 z-20'>
            <button onClick={() => close()} className='mb-3 hover:bg-red-100 bg-red-50  transition-all delay-100 rounded-full p-1 text-slate-800 cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
            </button>
            <div>
                {/* Place name */}
                <h2 className='line-clamp-2 text-[20px] font-semibold mb-3 text-slate-800'>{place.name}</h2>
                {/* Place image */}
                {place?.photos ? <Image src={BASE_URL_PHOTO + "&photo_reference=" + place?.photos[0]?.photo_reference + "&key=" + process.env.NEXT_PUBLIC_GOOGLE_API_KEY} alt='placeholder'
                    width={200} height={80}
                    className='w-full h-[150px] object-cover rounded-xl' /> :
                    <Image src="/placeholder.jpg" alt='placeholder'
                        width={200} height={80}
                        className='w-full h-[150px] object-cover rounded-xl' />}
                {/* Place Address */}
                <div className='flex gap-2 mt-3 items-center'>
                    <div className='w-4 h-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                    </div>
                    <h2 className='text-[12px]
             text-gray-400 line-clamp-2'>{place.formatted_address}</h2>
                </div>
                {/* Place Rating */}
                <div className='flex gap-2 mt-3 items-center'>
                    <div className='w-4 h-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" strokeWidth={1.5}
                            stroke="currentColor" className="w-4 h-4 text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    </div>
                    <h2 className='text-[12px]
             text-gray-400 line-clamp-2 flex tracking-wider'>{place.rating} (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        {place.user_ratings_total})</h2>
                </div>

                {/* Buttons */}
                <div className='mt-5 flex justify-start gap-5'>
                    {/* Direction button */}
                    <button onClick={() => onDirectionClick()} className='flex items-center flex-row hover:scale-105 transition-all gap-2 bg-red-500 p-1 px-3 rounded-full text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                        </svg>
                        Direction
                    </button>
                    {/* Copy location button */}
                    <button onClick={() => onCopyLocationClick()} className='flex items-center flex-row hover:scale-105 transition-all gap-2 bg-red-500 p-1 px-3 rounded-full text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                        </svg>
                        Copy Location
                    </button>
                </div>
                {/* Google map */}
                <div className='mt-5'>
                    {mapLoaded ? <iframe
                        width={600}
                        height={450}
                        loading="lazy"
                        className='w-full h-[200px] rounded-lg'
                        src={GOOGLE_MAP_URL + process.env.NEXT_PUBLIC_GOOGLE_API_KEY + '&q=' + place.formatted_address}>
                    </iframe> : <ShimmerEffectForMap />}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SideDrawer