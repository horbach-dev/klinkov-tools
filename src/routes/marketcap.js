const { Router } = require("express")
const axios = require("axios");
const router = Router()

const TOKEN = 'c95511d1-8068-4d03-84f5-9c00c33b4dd9'

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
  const { count } = req.query

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

  console.log(start,limit)
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
      return res.status(200).json({ data: {cryptoCurrencyList: sliced_data}})
    }


    return res.status(200).json({ data: response.data.data })
  } catch(ex) {
    // error
    console.log(ex.message)
    return res.status(500).json({message: 'шота не так'})
  }

})

module.exports = router;
