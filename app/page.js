'use client'
import Hero from '@components/Hero'
import PlaceList from '@components/PlaceList'
import GlobalAPI from '@services/GlobalAPI'
import { useEffect, useState } from 'react'



export default function Home() {
  const [placeList, setPlaceList] = useState([])

  // useEffect(()=>{
  //   getNearbyPlace('hotels in mumbai')
  // },[])

  const getNearbyPlace = (value) => {
    GlobalAPI.getNearbyPlaces(value)
      .then(resp => {
        console.log(resp.data.resp.results);
        setPlaceList(resp.data.resp.results)
      })
  }



  return (
    <main className={Object.keys(placeList).length > 0 ? 'mb-20':''}>
      <Hero userInput={(value)=>getNearbyPlace(value)}/>
      {Object.keys(placeList).length > 0 ? <PlaceList placeList={placeList}/>:null}
    </main>
  )
}
