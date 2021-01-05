((doc, storage, location) => {
  const olist = doc.querySelector('#list');
  const omessage = doc.querySelector('#message');
  const osend = doc.querySelector('#send')
  const ws = new WebSocket('ws:localhost:8000')

  let username = ''

  const init = () => {
    bindEvent();
  }

  function bindEvent() {
    osend.addEventListener('click', handleSendBtnClick, false)
    ws.addEventListener('open', handleOpen, false);
    ws.addEventListener('close', handleClose, false);
    ws.addEventListener('error', handleError, false);
    ws.addEventListener('message', handleMessage, false);
  }

  function handleSendBtnClick() {
    const msg = omessage.value;
    if (!msg.trim().length) {
      return;
    }

    ws.send(JSON.stringify({
      user: username,
      dataTime: new Date().getTime(),
      message: msg
    }))

    omessage.value = '';
  }

  function handleOpen(e) {
    console.log('Websocket open', e);
    username = storage.getItem('username');
    if (!username) {
      location.href = 'enrty.html';
      return
    }
  }

  function handleClose(e) {
    console.log('Websocket close');
  }

  function handleError(e) {
    console.log('Websocket error');
  }

  function handleMessage(e) {
    console.log('Websocket message');
    const msgData = JSON.parse(e.data);
    olist.appendChild(createMsg(msgData));
  }

  function createMsg(data) {
    const {
      user,
      dateTime,
      message
    } = data;
    const oItem = doc.createElement('li');
    oItem.innerHTML = `
    <p>
      <span>${user}</span>
      <i> ${new Date(dateTime)}</i>
    </p>
    <p>消息:${message}</p>
    `

    return oItem;
  }

  init();
})(document, localStorage, location)