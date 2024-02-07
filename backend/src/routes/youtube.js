const { Router } = require("express")
const axios = require("axios");
const cheerio = require('cheerio');
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

  try {
    console.log('234234')
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', { params })

    console.log('response', response)

    return res.status(200).json({ data: response.data })
  } catch (e) {

    console.log(e.message)
    return res.status(500).json({message: 'шота не так'})
  }
})

module.exports = router;
