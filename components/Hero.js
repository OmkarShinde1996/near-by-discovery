import category from '@data/category'
import Image from 'next/image'
import React, { useState } from 'react'

const Hero = ({userInput}) => {
    const [searchInput, setSearchInput] = useState('')

    return (
        <div className='text-center'>
            <div>
                <Image src='/bg.png' alt='hero-image' width={800} height={200} className='w-full absolute mt-[-50px]' />
                <div className='mt-[70px] z-10'>
                    <h2 className='text-[55px] text-red-700 tracking-widest font-semibold'>DISCOVER</h2>
                    <h2 className='text-[20px] text-slate-800 font-medium'>Your Amazing City</h2>
                </div>
                <div className='mt-5 z-10 flex gap-2 items-center justify-center'>
                    <input type='text' placeholder='Search Anything' onChange={(e)=>setSearchInput(e.target.value)} className='z-10 bg-white p-3 border-[1px] rounded-full px-5 w-[50%] md:w-[36%] shadow-sm outline-red-300 text-slate-800 font-medium' />
                    <button onClick={()=>userInput(searchInput)} className='bg-red-600 rounded-full p-3 shadow-md cursor-pointer z-10 hover:scale-105 transition-all'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className='mt-5 flex flex-col items-center'>
                    <h2 className='text-slate-800 text-sm'>or browse the category</h2>
                    <div className='z-10 grid grid-cols-3 md:grid-cols-6 w-[50%] justify-center gap-5 mt-3'>
                        {category.map((item, index)=>(
                            <div key={index} onClick={()=>userInput(item.name)} className='border-[1px] w-[60px] p-4 bg-red-50 rounded-full hover:bg-red-100 hover:scale-110 transition-all cursor-pointer'>
                                <Image src={item.icon} alt={item.name} width={30} height={30}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero