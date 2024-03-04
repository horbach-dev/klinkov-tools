import 'swiper/css'

import React, { useEffect, useState } from 'react'
import { Navigation,Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Loader from '$components/Loader'
import SwiperItem from '$components/Youtube/components'

import './Youtube.scss'
import axios from 'axios'

const Youtube = () => {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)

  const getYouTubeVideos = async () => {
    try {
    setLoading(true)

      const res = await axios.get('http://localhost:8083/youtube')
       setData(res.data.data)
      //setData(mockData.items)
    } catch(ex) {
      // error
      console.log(ex)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getYouTubeVideos()
  }, [])

  if (!data.length) return <Loader />

  return (
    <div className='youtube'>
      <Swiper
        className='youtube__swiper'
        slidesPerView={1}
        navigation={true}
        loop
        pagination={{ type: 'fraction' }}
        modules={[Pagination, Navigation]}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data.map(item => {
          return (
            <SwiperSlide key={item.etag}>
              <SwiperItem
                videoId={item.id.videoId}
                src={item.snippet.thumbnails.high.url}
                title={item.snippet.title}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default Youtube
