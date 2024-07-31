const { Router } = require("express")
const axios = require("axios");
const moment = require("moment");
const router = Router()

router.get('/liquidation', async (req, res) => {
    if (memory.data && memory.time && !canUpdate()) {
        return res.status(200).json({ data: memory.data })
    }

    const playlistId = 'PLjnopwjjJO4UdRUASVtQ_bahNw8Qgb-GS'; // ID вашего плейлиста

    const params = {
        key: process.env.YOUTUBE_API_KEY,
        part: 'snippet',
        playlistId: playlistId,
        maxResults: 5,
        type: 'video'
    };

    const VIDEOS_COUNT = 5;

    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
            params: params
        });

        const videos = response.data.items.map(item => {
            return {
                etag: item.etag,
                id: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.high.url,
                publishedAt: item.snippet.publishedAt
            };
        });

        memory.data = videos;
        memory.time = moment();

        return res.status(200).json({ data: videos });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Что-то пошло не так' });
    }
});

module.exports = router;
