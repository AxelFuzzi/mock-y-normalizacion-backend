import express from 'express';
const app = express();

//  async readMsgs(){
//    try {
//      const messages = await readAllElements();
//      if (!messages.length) {
//        return 'No se encontraron mensajes en la base de datos.';
//      }
//      return messages;
//    } catch (error) {
//      throw `${error}`;
//    }
//  };
//}
//
//export default MsgContainer;
import messageService from '../service/message.js'

class messageContainer{
  constructor(modelo){
    this.modelo = modelo
  }

  async messageVcontroller (req, res, next) {
    try {

      let contenido = await messageService.vistaMessage();

        if(contenido.length == 0){

          throw new Error('no hay mensajes en la base de datos')

        }else{
          //res.status(200).json(contenido)
          return contenido
          
        }

    } catch (error) {
      console.log(error)
      //res.status(404).json (error);
    }
  }
}

export default new messageContainer();
