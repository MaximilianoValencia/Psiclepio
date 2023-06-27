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
      res.status(200)//.json(results[0]);
    }
  });
});

app.get('/getDatosPerfilUsuario::uid',(req, res) => {
  console.log("/getDatosPerfilUsuario/:uid")
  const uid = req.params.uid;
  console.log("uid : "+uid);

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
})

app.put('/guardarPerfil',(req,res)=>{
  console.log("/guardarPerfil");
  const {uid,email,nombre,fotoPerfilUrl,emailVerified,isPaciente,isProfesional,fechaNacimiento,genero,numero,descripcion} = req.body;
  const updateUserQuery = `UPDATE users SET email=?, nombre=?, fotoPerfilUrl=?, emailVerified=?, isPaciente=?, isProfesional=?, fechaNacimiento=?, genero=?, numero=?, descripcion=? WHERE uid=?`;
  const updateValues = [email, nombre, fotoPerfilUrl, emailVerified, isPaciente, isProfesional, fechaNacimiento, genero, numero, descripcion, uid];
  pool.query(updateUserQuery, updateValues, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error updating user');
    } else {
      res.status(200).send();
    }
  });
})