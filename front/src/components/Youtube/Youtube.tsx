import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { client } from '$api/index'
import Loader from '$components/Loader'
import SwiperItem from '$components/Youtube/components'
import { mock } from '$components/Youtube/mock'

import './Youtube.scss'
import 'swiper/scss'

const Youtube = () => {
  const [data, setData] = useState([])

  const getYouTubeVideos = async () => {
    try {
      const res = await client.get('/youtube')
      setData(res.data.data)

      // const q = mock.items.map(item => ({
      //     etag: item.etag,
      //     id: item.id.videoId,
      //     title: item.snippet.title,
      //     description: item.snippet.description,
      //     thumbnail: item.snippet.thumbnails.high.url,
      //     publishedAt: item.snippet.publishedAt
      //   })
      // )
      //
      // setData(q)
    } catch (ex) {
      // error
      console.log(ex)
    }
  }

  useEffect(() => {
    getYouTubeVideos()
  }, [])

  if (!data.length) return <Loader/>

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
                videoId={item.id}
                src={item.thumbnail}
                title={item.title}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default Youtube
