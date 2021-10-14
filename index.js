(async() => {
    const express = require('express')
const cheerio = require('cheerio');
const axios = require('axios');
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

const { data } = await axios.get('https://coinmarketcap.com/')
  const $ = cheerio.load(data)
 const selector1 = "#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr > td:nth-child(3) > div > a > div > div > div > p"
const selector2 = '#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr > td:nth-child(4) > div > a'
const selector3 = '#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr > td:nth-child(3) > div > a > div > div > p'
const selector4 = "#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr > td:nth-child(3) > div > a > div > img" 
let money = []



$(selector1).each((parentIdx,parentElem) => {
  console.log($(parentElem).text())
  const timeElapsed = Date.now();
const today = new Date(timeElapsed);
  money.push({shortName:$(parentElem).text(),rank:parentIdx + 1,date:today.toUTCString(),dateInNum:Date.now()})
})
$(selector3).each((parentIdx,parentElem) => {
  money[parentIdx].name = $(parentElem).text()
})
$(selector4).each((parentIdx,parentElem)=> { 
    money[parentIdx].icon = $(parentElem).attr('src') 
})
$(selector2).each((parentIdx,parentElem) => {
  console.log($(parentElem).text())
  money[parentIdx].price = $(parentElem).text()
  

})
app.get('/',async (req, res) => {
  
res.json(money)
})
app.get('/watchRank/:rank',async (req,res) => {
  const money = await axios.get('https://coinprice.jessenqu07.repl.co/')
  console.log()
  if(req.params.rank < 1){
    res.json({
      message:'Invalid Data'
    })
  }
  if(req.params.rank > 10){
    res.json({
      message:'Invalid Data'
    })
  }
  else{
 res.send(money.data[req.params.rank - 1])

  }
})
app.get('/name/:name',(req,res) => {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      
   var allName = []
   var allLongname =[]
   for(let i = 0;i< money.length;i++){
     allName.push(money[i].shortName)
     allLongname.push(money[i].name)

   }
   let partam = req.params.name 
   let realParams = partam.toUpperCase()
   let realParams2 = capitalizeFirstLetter(partam)
   console.log(allName)
   console.log(allLongname)
   if(allName.includes(realParams)){
    res.send(money[allName.indexOf(realParams)])

   }
   console.log(partam)
   console.log(allLongname.includes(realParams2))
   if(allLongname.includes(realParams2)){
    res.send(money[allLongname.indexOf(realParams2)])

   }
   else{
       res.json({
           message:'Invalid Data'
       })
   }


})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

})()
