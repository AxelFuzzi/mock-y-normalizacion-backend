const socket = io.connect();

/* ---------------------------- products section ---------------------------- */

/*socket.on('view-products', products => {
  makeHtmlTable(products).then(html => {
    document.getElementById('product-list').innerHTML = html
  });
});

async function makeHtmlTable(products) {
  const res = await fetch('templates/viewProducts.hbs');
  let template = await res.text();
  template = Handlebars.compile(template);
  const html = template({ products });
  return html;
}*/
 

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

