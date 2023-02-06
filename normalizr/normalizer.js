import {normalize, schema} from 'normalizr';
import msgContainer from '../DAO/contenedorMessage.js';
const messageService = msgContainer;

const msgNormalizr = async ()=>{

    let contenido = await messageService.vistaMessages({_id: 0});
    let contenidoID = {id: '1', author:{id:'axelfuzzi@gmail.com', name:'axel fuzzi'}, comments: contenido}
    console.log(JSON.stringify(contenidoID, null, '\t'));

    const authorSchema = new schema.Entity("authors")

    const commentSchema = new schema.Entity("comments")

    const postSchema = new schema.Entity("post", {
        author: authorSchema,
        comments:[commentSchema]
    })

    const normalizedData = normalize(contenidoID, postSchema);

    console.log(JSON.stringify(normalizedData, null, '\t'));

}

export default msgNormalizr




