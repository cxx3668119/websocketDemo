const ws = require('ws')

;
((ws) => {
  //ws:localhost:8000
  const server = new ws.Server({
    port: 8000
  })

  const init = () => {
    bindEvent();
  };

  function bindEvent() {
    server.on('open', handleOpen);
    server.on('close', handleClose);
    server.on('error', handleError);
    server.on('connection', handleConnection)
  }

  function handleOpen() {
    console.log('Websocket open');
  }

  function handleClose() {
    console.log('Websocket close');
  }

  function handleError() {
    console.log('Websocket error');
  }

  function handleConnection(ws) {
    console.log('Websocket connected');

    ws.on('message', handMessage);
  }

  function handMessage(msg) {
    console.log(msg);
    server.clients.forEach(function (c) {
      c.send(msg);
    })
  }
  init();
})(ws)