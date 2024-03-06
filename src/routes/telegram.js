const {Router} = require("express");
const router = Router()


const mockData = [
    {
        title:'Тестовое сообщение',
        link:'https://t.me/test-link'
    },
    {
        title:'А вы не были на Таити?',
        link:'https://t.me/test-link'
    },
    {
        title:'А нас и здесь неплохо кормят',
        link:'https://t.me/test-link'
    },
]

router.get('/get-last-messages',(req,res)=>{
    return res.status(200).json({ data: mockData})
})

module.exports = router;
