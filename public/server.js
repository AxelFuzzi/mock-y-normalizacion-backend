import express from 'express';
const router = express.Router()
import faker from '../faker/faker.js';
import { Server as httpServer } from 'http';
import { Server as ioServer } from 'socket.io';
import Sockets from '../sockets.js';
import mongoose from 'mongoose';
import msgNormalizr from '../normalizr/normalizer.js';

const msgNormalizer = msgNormalizr;

const fakerjs = faker;

const app = express();
const serverHTTP = new httpServer(app);
const io = new ioServer(serverHTTP);

/* ----------------------------- socket settings ---------------------------- */
Sockets(io);

/* -------------------------- middlewares settings -------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//-----------------------------productos Faker--------------------------------------

app.use('/', router.get('/api/productos-test',(req, res)=>{
  fakerjs();
  res.send('PRODUCTOS GENERADOS EN CONSOLA');
}) )

//----------------------------------productos front-----------------------------

  /*const productList = document.getElementById('product-list')

  fetch('./faker/data.json')
  .then((res) => res.json())
  .then((products)=>{
  const table = products.map((product)=>
  `<div class ='table-responsive'>
  <table class='table table-dark'>
    <tr>
      <th>Nombre</th>
      <th>Precio</th>
      <th>Foto</th>
    </tr>
    <tr>
      <td>${product.nombre}</td>
      <td>$${product.precio}</td>
      <td>
        <img
        width='50'
        src=${product.foto}
        alt='Image not found'/>
      </td>
    </tr>
  </table>
</div>`
    )
    productList.innerHTML = `<div>${table}</div>`
})*/


/* ----------------------------- server settings ---------------------------- */
const PORT = process.env.port || 8080;

const conexion = () => {
  mongoose.set('strictQuery',true).connect('mongodb+srv://coderUser:123@cluster0.ldzjuyz.mongodb.net/DBcoderChat?retryWrites=true&w=majority',
  {
      useNewUrlParser:true,
      useUnifiedTopology:true
  },error=>{
          if(error) console.log(error);
          else console.log("base mongoDB conectada");
      }); 
}
conexion();

//------------------------------mensajes normalizados-----------------------------------
msgNormalizer()

const server = serverHTTP.listen(PORT, (error) => {
  if (error) throw new Error(`Error en servidor ${error}`);
  console.log(`Running in http://localHost:${PORT}`);
});

