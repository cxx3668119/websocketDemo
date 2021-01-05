((doc, s, l) => {

  const oUsername = doc.querySelector('#username')
  const oEnterBtn = doc.querySelector('#entry')

  const init = () => {
    bindEvent();
  }

  function bindEvent() {
    oEnterBtn.addEventListener('click', handleEnterBtnClick, false);

  }

  function handleEnterBtnClick() {
    const username = oUsername.value.trim() //去除字符串的首位空格

    if (username.length < 6) {
      alert('用户名不得小于6位')
      return;
    }

    s.setItem('username', username);
    l.href = 'index.html '
  }

  init();

})(document, localStorage, location);