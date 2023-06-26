const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app=express();
const PORT = 8080;
const filePath = "DATA/data.json"
const mysql = require('mysql2');
const bodyParser = require('body-parser');
app.use(cors())
app.use(express.json())

const pool = mysql.createPool({
  host: 'localhost',      
  user: 'db_user', 
  password: 'db_pass',  
  database: 'psiclepio',  
});

// Start the server
app.listen(PORT,()=>{
  console.log("andando en http://localhost:"+PORT);
  console.log("inicio");
  pool.getConnection((error, connection) => {
    if (error) {
      console.error('Error connecting to MySQL:', error);
      return;
    }else{
      console.log("coneccion a db ok!");
    }  
  })
})

//Manejar reinicio por nodemon
let process = require('process');
process.once('SIGINT', function () {
  console.log('SIGINT received');
  //guardarDatos();
});

app.post('/crearUsuario',(req,res)=>{
    const {uid} = req.body;
    const {email} = req.body;
    const {nombre} = req.body;
    console.log("crearUsuario "+ uid + " " + nombre +" "+ email);
    pool.query('INSERT INTO users (uid, nombre, email) VALUES (?, ?, ?)', [uid, nombre, email], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error creando usuario');
      } else {
        console.log("usuario creado");
        res.status(201).send();
      }
    });
})

app.post('/loginUser',(req,res)=>{
  const {uid} = req.body;
  const {nombre} = req.body;
  const {email} = req.body;
  //user={uid:uid,nombre:nombre,email:email}
  console.log("loginUser "+ uid + " " + nombre +" "+ email);
  pool.query('SELECT * FROM users WHERE uid = ?', [uid], (error, results) => {
    if (error) {
      console.error("error"+error);
      res.status(500).send('Error query user');
    } else if (results.length === 0) {
      console.log("not found"+results);
      res.status(404).send('User no encontrado');
    } else {
      console.log(results[0]);
      res.status(200).json(results[0]);
    }
  });
});


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
  

  // function loadData(filePath){
//   console.log("cargando datos");
//   try {
//     const fileData = fs.readFileSync(filePath, 'utf8');
//     console.log("datoscargados");
//     return JSON.parse(fileData);
//   } catch (err) {
//     console.error('Error cargando datos', err);
//     return null;
//   }

// }

// function writedata(data, filePath) {
//   fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
//     if (err) {
//       console.error('Error escribiendo al archivo:', err);
//     } else {
//       console.log('Datos escritos exitosamente:', filePath);
//     }
//   });
// }