const socket = io.connect();

/* ---------------------------- products section ---------------------------- */
const inputName = document.getElementById('nombre');
const inputPrice = document.getElementById('precio');
const inputThumbnail = document.getElementById('foto');
const btnSendProduct = document.getElementById('btnSendProduct');
const addProductForm = document.getElementById('addProductForm');

/*addProductForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const product = {
    title: addProductForm[0].value,
    price: addProductForm[1].value,
    thumbnail: addProductForm[2].value,
  };
  socket.emit('update-product', product);
  addProductForm.reset();
});

socket.on('view-products', products => {
  makeHtmlTable(products).then(html => {
    document.getElementById('product-list').innerHTML = html
  });
});*/

/*async function makeHtmlTable(products) {
  const res = await fetch('templates/viewProducts.hbs');
  let template = await res.text();
  template = Handlebars.compile(template);
  const html = template({ products });
  return html;
}

inputName.addEventListener('input', () => {
  const existName = inputName.value.length;
  const existPrice = inputPrice.value.length;
  inputPrice.disabled = !existName;
  btnSendProduct.disabled = !existName || !existPrice;
});

inputPrice.addEventListener('input', () => {
  const existPrice = inputPrice.value.length;
  inputThumbnail.disabled = !existPrice;
  btnSendProduct.disabled = !existPrice;
});*/

/* ---------------------------- messages section ---------------------------- */

const inputUsername = document.getElementById('inputUsername');
const inputMessage = document.getElementById('inputMessage');
const btnSend = document.getElementById('btnSend');

const enviarMensaje = document.getElementById('addMessageForm')
enviarMensaje.addEventListener('submit', (evt) => {
  evt.preventDefault()

  const msg = { autor: inputUsername.value, msg: inputMessage.value };
  socket.emit('new-message', msg); 
  addMessageForm.reset();
  inputMessage.focus();
  inputUsername.value = '';
});
//--------------------------------------------------------------------------
socket.on('view-messages', messages => {
  console.log(messages);
  const html = createList(messages);
  document.getElementById('message-list').innerHTML = html;
});

function createList(messages) {
  return messages.map(message => {
    return (`
            <div>
                <b style="color:blue;">${message.author.nombre}</b>
                [<span style="color:brown;">${message.author.apellido}</span>] :
                <i style="color:green;">${message.text}</i>
            </div>
        `)
  }).join(" ");
}
//---------------------------------------------------------------------------
inputUsername.addEventListener('input', () => {
  const existEmail = inputUsername.value.length;
  const existText = inputMessage.value.length;
  inputMessage.disabled = !existEmail;
  btnSend.disabled = !existEmail || !existText;
});

inputMessage.addEventListener('input', () => {
  const existText = inputMessage.value.length;
  btnSend.disabled = !existText;
});
