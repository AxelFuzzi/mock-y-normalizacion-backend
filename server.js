import express from 'express';
import { Server as httpServer } from 'http';
import { Server as ioServer } from 'socket.io';
import Sockets from './sockets.js';
import mongoose from 'mongoose';
import msgNormalizr from './normalizr/normalizer.js';
const msgNormalizer = msgNormalizr;

const app = express();
const serverHTTP = new httpServer(app);
const io = new ioServer(serverHTTP);

/* ----------------------------- socket settings ---------------------------- */
Sockets(io);

/* -------------------------- middlewares settings -------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

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

msgNormalizer()

const server = serverHTTP.listen(PORT, (error) => {
  if (error) throw new Error(`Error en servidor ${error}`);
  console.log(`Running in http://localHost:${PORT}`);
});

