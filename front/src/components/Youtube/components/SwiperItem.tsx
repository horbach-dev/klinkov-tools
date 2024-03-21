import React, { useState } from 'react'
import classnames from 'classnames'
import Loader from '$components/Loader'

interface IProps {
  videoId: string,
  src: string,
  title: string,
}

const SwiperItem = ({ videoId, src, title }: IProps) => {
  const [isLoaded, setLoaded] = useState(false)

  return (
    <>
      {/*<a*/}
      {/*  className={classnames('youtube__swiper-link', isLoaded && 'youtube__swiper-link_loaded')}*/}
      {/*  href={`https://www.youtube.com/watch?v=${videoId}`}*/}
      {/*  target='_blank'*/}
      {/*  rel='noopener noreferrer'*/}
      {/*/>*/}
      <img
        loading='lazy'
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={classnames('youtube__swiper-image', isLoaded && 'youtube__swiper-image_loaded')}
        alt='video'
        src={src}
      />
      <a
        // name='Play video on youtube'
        target='_blank'
        href={`https://www.youtube.com/watch?v=${videoId}`}
        className={classnames('youtube__play', 'youtube__play_show')} rel='noreferrer'
      />
      {!isLoaded && (
        <Loader />
      )}
      <p className='youtube__swiper-title'>
        {title}
      </p>
    </>
  )
}

export default SwiperItem
