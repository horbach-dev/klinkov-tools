const {Router} = require("express");
const {getMessages} = require("../bootTGBot");
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
    {
        title:'А нас и здесь неплохо кормят',
        link:'https://t.me/test-link'
    },
]

function truncateString(str, maxLength = 50) {
    if (str.length <= maxLength) {
        return str;
    } else {
        return str.substring(0, maxLength - 3) + '...';
    }
}

router.get('/get-last-messages',async (req,res)=>{
    const messages = await getMessages().then(res => res.map(message => ({
        link: `https://t.me/ProfessorKlinkov/${message.id}`,
        title: truncateString(message.message)
    })))

    return res.status(200).json({ data: messages})
})

module.exports = router;
