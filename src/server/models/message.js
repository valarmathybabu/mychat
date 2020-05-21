const mongoose = require('mongoose')
const schema =  new mongoose.Schema({
_id: mongoose.Schema.Types.ObjectId,
message:{type:String,require:true},
user:{type:String, require:true},
createddate: {type:Date, default: Date.now()}

})
module.exports=mongoose.model('message',schema)