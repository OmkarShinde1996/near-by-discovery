import React from 'react'
import PlaceCard from './PlaceCard'
import SideDrawer from './SideDrawer'
import { useEffect, useState } from 'react'
import ShimmerEffectForPlaceCard from './ShimmerEffectForPlaceCard'

const PlaceList = ({placeList}) => {
    const [loader, setLoader] = useState(true)
    const [selectedPlace, setSelectedPlace] = useState([])

    useEffect(()=>{
        setLoader(true)
    },[placeList])


    useEffect(()=>{
        setInterval(()=>{
            setLoader(false)
        },2000)
    },[])

  return (
    <div className='px-[10px] md:px-[120px] mt-20 z-10'>
        <h2 className='text-[20px] font-bold text-slate-800 mb-3'>Search Results</h2>
        {!loader ? <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {placeList.map((place,index)=>(
                <div key={index} onClick={()=>setSelectedPlace(place)} className='z-10'><PlaceCard place={place}/></div>
            ))}
        </div>:null}
        {selectedPlace?.name ? <div className='fixed top-0 right-0 z-20'>
            <SideDrawer place={selectedPlace} close={()=>setSelectedPlace([])}/>
        </div>:null}
        {loader ? <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {[1,2,3,4].map((index)=>(<ShimmerEffectForPlaceCard key={index}/>))}
        </div>:null}
    </div>
  )
}

export default PlaceList