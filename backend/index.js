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
  console.log("andando en puerto:"+PORT);
  console.log("inicio");
  data = loadData();
})

function loadData(data,filePath){
  console.log("cargando datos");
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    console.log("datoscargados");
    return JSON.parse(fileData);
  } catch (err) {
    console.error('Error loading data from file:', err);
    return null;
  }

}

function writedata(data, filePath) {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Data written to file successfully:', filePath);
    }
  });
}

// GET /users
// app.get('/users', (req, res) => {
//   res.json(data.array);
// });

// GET /users/:uuid
app.get('/users/:uuid', (req, res) => {
  const uuid = req.params.uuid;
  const user = data.array.find(item => item.user.uuid === uuid);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    res.json(user);
  }
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
    // pool.getConnection((err, connection) => {
    //   if (err) {
    //     res.status(500).json({ error: 'Error getting database connection' });
    //     return;
    //   }
    //   const query = 'SELECT * FROM users WHERE uuid = ?';
    //   connection.query(query, [uuid], (error, results) => {
    //     connection.release(); // Release the connection back to the pool
    //     if (error) {
    //       res.status(500).json({ error: 'Error executing query' });
    //       return;
    //     }
    //     res.json(results);
    //   });
    // });
  
  });
  


  
// POST /users
// app.post('/users', (req, res) => {
//   const newUser = req.body;
//   if (!newUser || !newUser.user || !newUser.user.uuid || !newUser.user.name) {
//     res.status(400).json({ error: 'Invalid user data' });
//   } else {
//     data.array.push(newUser);
//     res.status(201).json(newUser);
//   }
// });

// PUT /users/:uuid
// app.put('/users/:uuid', (req, res) => {
//   const uuid = req.params.uuid;
//   const updatedUser = req.body;

//   if (!updatedUser || !updatedUser.user || !updatedUser.user.uuid || !updatedUser.user.name) {
//     res.status(400).json({ error: 'Invalid user data' });
//   } else {
//     const index = data.array.findIndex(item => item.user.uuid === uuid);

//     if (index === -1) {
//       res.status(404).json({ error: 'User not found' });
//     } else {
//       data.array[index] = updatedUser;
//       res.json(updatedUser);
//     }
//   }
// });

// // DELETE /users/:uuid
// app.delete('/users/:uuid', (req, res) => {
//   const uuid = req.params.uuid;
//   const index = data.array.findIndex(item => item.user.uuid === uuid);

//   if (index === -1) {
//     res.status(404).json({ error: 'User not found' });
//   } else {
//     const deletedUser = data.array.splice(index, 1)[0];
//     res.json(deletedUser);
//   }
// });

// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host: 'localhost',
//     port: 3333,
//     user: 'db_user',
//     password: 'b8KPjov0uiyfiTOh68',
//     database: 'db_psiclepio',
//   });