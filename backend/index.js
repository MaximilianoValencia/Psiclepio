const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app=express();
const PORT = 8080;
const filePath = "data.json"
// const mysql = require('mysql');
//const bodyParser = require('body-parser');
app.use(cors())
app.use(express.json())

// Start the server
app.listen(PORT,()=>{
  console.log("andando en http://localhost:"+PORT);
  console.log("inicio");
  data = loadData(filePath);
})

function loadData(filePath){
  console.log("cargando datos");
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    console.log("datoscargados");
    return JSON.parse(fileData);
  } catch (err) {
    console.error('Error cargando datos', err);
    return null;
  }

}

function writedata(data, filePath) {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error escribiendo al archivo:', err);
    } else {
      console.log('Datos escritos exitosamente:', filePath);
    }
  });
}

// GET /users
// app.get('/users', (req, res) => {
//   res.json(data.array);
// });

// GET /users/:uuid
app.get('/users/:uuid', (req, res) => {
  
});


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

app.get('/getUserPhoto',(req,res)=>{
    
})

app.get('/getUserInfo', (req, res) => {
    const {uuid} = req.body;
    const user = data.array.find(item => item.user.uuid === uuid);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  
  });
  