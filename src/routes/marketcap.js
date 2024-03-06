const { Router } = require("express")
const axios = require("axios");
const router = Router()

const TOKEN = 'c95511d1-8068-4d03-84f5-9c00c33b4dd9'


const LESSON_BUBBLE = {
  "id": 99999999999,
  "name": "Бесплатный урок",
  "symbol": "Урок",
  "slug": "lesson",
  "cmcRank": 100,
  "marketPairCount": 10849,
  "circulatingSupply": 19645312,
  "selfReportedCirculatingSupply": 0,
  "totalSupply": 19645312,
  "maxSupply": 21000000,
  "ath": 68789.62593892214,
  "atl": 0.04864654,
  "high24h": 68785.9492287662,
  "low24h": 64761.52804798072,
  "isActive": 1,
  "lastUpdated": "2024-03-05T13:16:00.000Z",
  "dateAdded": "2010-07-13T00:00:00.000Z",
  "quotes": [
    {
      "name": "BTC",
      "price": 1,
      "volume24h": 1131210.9592545272,
      "volume7d": 7053554.108363594,
      "volume30d": 32200890.43708828,
      "marketCap": 19645312,
      "selfReportedMarketCap": 0,
      "percentChange1h": 0,
      "percentChange24h": 0,
      "percentChange7d": 0,
      "lastUpdated": "2024-03-05T13:16:00.000Z",
      "percentChange30d": 0,
      "percentChange60d": 0,
      "percentChange90d": 0,
      "fullyDilluttedMarketCap": 1425379412600.52,
      "marketCapByTotalSupply": 19645312,
      "dominance": 52.6172,
      "turnover": 0.05758173,
      "ytdPriceChangePercentage": 53.6774,
      "percentChange1y": 202.42470504
    },
    {
      "name": "ETH",
      "price": 18.015296654491554,
      "volume24h": 20379101.009782262,
      "volume7d": 127071869.7306778,
      "volume30d": 580108593.7629256,
      "marketCap": 353916123.55004275,
      "selfReportedMarketCap": 0,
      "percentChange1h": 0.979408,
      "percentChange24h": -3.032828,
      "percentChange7d": 3.212149,
      "lastUpdated": "2024-03-05T13:16:00.000Z",
      "percentChange30d": -3.445947,
      "percentChange60d": -7.9773,
      "percentChange90d": -7.37252,
      "fullyDilluttedMarketCap": 1425379412600.52,
      "marketCapByTotalSupply": 353916123.55004275,
      "dominance": 52.6172,
      "turnover": 0.05758173,
      "ytdPriceChangePercentage": 53.6774,
      "percentChange1y": 202.42470504
    },
    {
      "name": "USD",
      "price": 67875.21012383439,
      "volume24h": 76781181553.777777,
      "volume7d": 478761467225.777777,
      "volume30d": 2185642204591.777777,
      "marketCap": 1333429679948.2852,
      "selfReportedMarketCap": 0,
      "percentChange1h": 99.777777,
      "percentChange24h": 99.777777,
      "percentChange7d": 200.777777,
      "lastUpdated": "2024-03-05T13:16:00.000Z",
      "percentChange30d": 200.777777,
      "percentChange60d": 200.777777,
      "percentChange90d": 200.777777,
      "fullyDilluttedMarketCap": 1425379412600.52,
      "marketCapByTotalSupply": 1333429679948.2852,
      "dominance": 52.6172,
      "turnover": 0.05758173,
      "ytdPriceChangePercentage": 53.6774,
      "percentChange1y": 25202.777777
    }
  ],
  "isAudited": true,
  "badges": [
    1,
    3
  ]
}

router.get('/btc-dominance', async (req, res) => {
  const { range } = req.query

  if (!range) {
    return res.status(422).json({ message: 'няма range' })
  }

  try {
    const response = await axios.get('https://api.coinmarketcap.com/data-api/v3/cryptocurrency/quotes/historical', {
      headers: {
        'X-CMC_PRO_API_KEY': TOKEN,
      },
      params: { range }
    })

    return res.status(200).json({ data: response.data.data})
  } catch(ex) {
    // error
    console.log(ex.message)
    return res.status(500).json({message: 'шота не так'})
  }

})

router.get('/fear-and-greed', async (req, res) => {
  const { start, end } = req.query
  if (!start || !end) {
    return res.status(422).json({message: 'шота не так'})
  }

  try {
    const response = await axios.get('https://api.coinmarketcap.com/data-api/v3/fear-greed/chart', {
      headers: {
        'X-CMC_PRO_API_KEY': TOKEN,
      },
      params: { start, end },
    })

    return res.status(200).json({ data: response.data.data})
  } catch(ex) {
    // error
    console.log(ex.message)
    return res.status(500).json({message: 'шота не так'})
  }

})


router.get('/get-coin',async (req,res)=>{
  const {range,id} = req.query;

  try {
    const response = await axios.get(`https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail/chart`, {
      headers: {
        'X-CMC_PRO_API_KEY': TOKEN,
      },
      params: { id, range },
    })

    return res.status(200).json({ data: response.data.data.points})
  } catch(ex) {
    // error
    console.log(ex.message)
    return res.status(500).json({message: 'шота не так'})
  }
})

router.get('/get-listing', async (req, res) => {
  const { count,withLesson } = req.query

  // if (!start || !end) {
  //   return res.status(422).json({message: 'шота не так'})
  // }

  const start = 1;
  const limit = 300;
  const sortBy = 'market_cap'
  const sortType = 'desc'
  const convert = 'USD,BTC,ETH'
  const cryptoType = 'all'
  const tagType = 'all'
  const audited = false
  const aux = 'ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,max_supply,circulating_supply,total_supply,volume_7d,volume_30d,self_reported_circulating_supply,self_reported_market_cap,logo'

  try {
    const response = await axios.get('https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing', {
      headers: {
        'X-CMC_PRO_API_KEY': TOKEN,
      },
      params: {
        start,
        limit,
        sortBy,
        sortType,
        convert,
        cryptoType,
        tagType,
        audited,
        aux,
      },
    })

    if(count){
      const start_point = count - 100;
      const end_point = count;
      const sliced_data = response.data.data.cryptoCurrencyList.slice(start_point,end_point)
      sliced_data.forEach((item,key)=>{
        item.cmcRank = key + 1;
      })
      if(withLesson){
        sliced_data.push(LESSON_BUBBLE)
      }
      return res.status(200).json({ data: {cryptoCurrencyList: sliced_data}})
    }
    else {
      const sliced_data = response.data.data.cryptoCurrencyList;
      sliced_data.forEach((item,key)=>{
        item.cmcRank = key + 1;
      })
      sliced_data.push(LESSON_BUBBLE)
      return res.status(200).json({ data: {cryptoCurrencyList: sliced_data}})
    }


  } catch(ex) {
    // error
    console.log(ex.message)
    return res.status(500).json({message: 'шота не так'})
  }

})

module.exports = router;
