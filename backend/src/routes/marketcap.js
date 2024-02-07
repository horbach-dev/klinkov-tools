const { Router } = require("express")
const axios = require("axios");
const router = Router()

router.get('/btc-dominance', async (req, res) => {
  const { range } = req.query

  if (!range) {
    return res.status(422).json({ message: 'няма range' })
  }

  try {
    const response = await axios.get('https://api.coinmarketcap.com/data-api/v3/cryptocurrency/quotes/historical', {
      headers: {
        'X-CMC_PRO_API_KEY': 'c95511d1-8068-4d03-84f5-9c00c33b4dd9',
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
        'X-CMC_PRO_API_KEY': 'c95511d1-8068-4d03-84f5-9c00c33b4dd9',
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

module.exports = router;
