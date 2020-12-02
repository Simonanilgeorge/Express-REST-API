const mongoose=require('mongoose')

const membersSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model('Members',membersSchema)