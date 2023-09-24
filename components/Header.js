'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <>
      {/* Desktop menu */}
      <nav className='justify-between py-2 px-4 shadow-sm hidden md:flex'>
        <div className='flex items-center '>
          <Image src='/logo.png' alt='logo' width={60} height={60} />
          <h2 className='text-[25px] font-semibold text-red-700'>NEAR-BY DISCOVERY</h2>
        </div>
        <ul className='flex gap-8 items-center font-medium'>
          <li className='hover:text-red-800 cursor-pointer'><Link href='/'>Home</Link></li>
          <li className='hover:text-red-800 cursor-pointer'><Link href='/about-us'>About Us</Link></li>
          <li className='hover:text-red-800 cursor-pointer'><Link href='/contact-us'>Contact Us</Link></li>
        </ul>
      </nav>

      {/* Mobile menu */}
      <nav className=' flex md:hidden justify-between shadow-md items-center px-4'>
        <div className='flex items-center'>
          <Image src='/logo.png' alt='logo' width={40} height={40} />
          <h2 className='text-[15px] font-semibold text-red-700'>NEAR-BY DISCOVERY</h2>
        </div>
        <div onClick={() => { setOpenMenu((prev) => !prev) }} className='cursor-pointer'>
          {!openMenu ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          }
        </div>
      </nav>
      {openMenu && <div className='bg-white w-full p-3 shadow-md absolute z-10'>
        <ul className='flex flex-col gap-5 items-center font-medium'>
          <li className='hover:text-red-800 cursor-pointer'>Home</li>
          <li className='hover:text-red-800 cursor-pointer'>About Us</li>
          <li className='hover:text-red-800 cursor-pointer'>Contact Us</li>
        </ul>
      </div>}
    </>
  )
}

export default Header