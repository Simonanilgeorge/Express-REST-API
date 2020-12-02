require('dotenv').config()
const express=require('express')
const app=express()
const members=require('./routes/members')
const path=require('path')
const mongoose=require('mongoose')


const PORT=5000

const db=mongoose.connection
db.on('error',()=>console.log(`error`))
db.once('connected',()=>console.log(`connected`))

app.set('view-engine','ejs')
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true ,useUnifiedTopology: true})

app.use(express.json())


app.use(express.static(path.join(__dirname,'public')))

app.use('/members',members)

app.get('/',(req,res)=>{
    res.render('home.ejs')
})



app.listen(PORT,()=>console.log(`server running on port ${PORT}`))