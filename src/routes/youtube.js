const { Router } = require("express")
const axios = require("axios");
const router = Router()

router.get('/youtube', async (req, res) => {
// Параметры запроса
  const params = {
    key: 'AIzaSyCjL1FGQZQ7EAH2wIcz_qfcRJQJcI7EZnQ',
    part: 'snippet',
    channelId: 'UCgdsZEp1RGXJRK4I7nULrkw', // Замените на идентификатор канала, с которого хотите получить видео
    order: 'date', // Порядок сортировки по дате
    maxResults: 5, // Максимальное количество результатов
    type: 'video'
  };

  const VIDEOS_COUNT = 5;

  try {
    //Чтобы не сыпать запросами, или не городить велосипеды с duration video сделал такое решение
    const all_videos = await axios.get('https://www.googleapis.com/youtube/v3/search', { params:{...params,maxResults: 50}})
    const shorts = (await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        ...params,
        videoDuration: 'short',
        maxResults: 20
      }
    })).data.items.map(item=>item.id.videoId);

    const videos = all_videos.data.items.filter(video=>!shorts.includes(video.id.videoId));
    const response = videos.slice(0,VIDEOS_COUNT);

    return res.status(200).json({ data: response })
  } catch (e) {

    console.log(e.message)
    return res.status(500).json({message: 'шота не так'})
  }
})

module.exports = router;
