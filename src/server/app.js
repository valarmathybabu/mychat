const express = require('express')
const bodyparser = require('body-parser')
const path=require('path')
const mongoose = require('mongoose')
const uri = 'mongodb+srv://salesuser:salesuser123@sales-j0wyr.mongodb.net/chat';
mongoose.connect(uri,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  
}
).then(()=>console.log('mongodb connection successful')).catch((err)=>console.error(err))

//mongoose.Promise=global.Promiseapp.use(bodyparser.json())
const app = new express()
const http = require('http')
const server=http.createServer(app)
 
const io=require('socket.io')(server)

io.on('connection',function(socket) {
let  user =''
  
  socket.on('newmessage',(data)=>{
    console.log(data)
    const newmessage = new message({
      _id:mongoose.Types.ObjectId(),
      message:data,
      user:user
    })
    newmessage.save().then(rec=>{
      if(rec){
    return io.emit('message received',rec)
      }
      else{
     
      }
    }).catch((err)=>console.error(err))
  })

  socket.on('new user',(data)=>{
    console.log('new user connected')
    socket.broadcast.emit('user connected', data);
 user =data;
 message.find().then( rec=>{
  if(rec)
  {
    socket.emit('allmessages',rec)
  }
  else{}
   
   })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user disconnected', user);
  })


  })

  io.on
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname,'../../dist')))
const message = require('./models/message')
app.get('/api/chat',(req,res)=>{
  message.find().then( rec=>{
 if(rec)
 {
   return res.send(rec)
 }
 return res.send([])

  })
})

app.post('/api/chat',(req,res)=>{
const newmessage = new message({
  _id:mongoose.Schema.Types.ObjectId,
  message:req.body.message,
  user:'dbtestuser'
})
newmessage.save().then(rec=>{
  if(rec){
return res.send(rec)
  }
  else{
    return res.send([])
  }
})
  message.find().then( rec=>{
 if(rec)
 {
   return res.send(rec)
 }
 return res.send([])

  })
})

app.get('*',(req,res)=>{

  res.sendFile(path.join(__dirname,'../../dist/index.html'))

})

server.listen(3000,()=>console.log('listening to port 3000'))


  