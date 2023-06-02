const express = require('express');
const cors = require('cors')
const app=express();
const PORT = 8080;

app.use(cors())
app.use(express.json())

app.listen(PORT,
    ()=>{
        console.log("andando en puerto:"+PORT);
    })


app.post('/registrarUsuario',(req,res)=>{
    const {user} = req.body;
    const {email} = req.body;

    res.status(200).send({
        respesta:'a',
        respuesta2:'d',
        usuario: user,
        email:email
    })
})

app.post('/loginUser',(req,res)=>{

    res.status(200).send({
        respuesta: 'ok!'
    })
    console.log("request post loginUser")
})