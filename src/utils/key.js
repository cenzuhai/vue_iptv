export var KeyObj = {}

var KeyCodeList = {
  // ok
  13: 'OK',
  273: 'OK',
  // 0
  0x0030: 'ZERO',
  48: 'ZERO',
  49: 'ONE', // 1
  50: 'TWO', // 2
  51: 'THREE', // 3
  52: 'FOUR', // 4
  53: 'FIVE', // 5
  54: 'SIX', // 6
  55: 'SEVEN', // 7
  56: 'EIGHT', // 8
  57: 'NINE', // 9
  // back
  8: 'BACK',
  27: 'BACK',
  122: 'BACK',
  126: 'BACK',
  339: 'BACK',
  340: 'BACK',
  640: 'BACK',
  // left
  3: 'LEFT',
  29: 'LEFT',
  37: 'LEFT',
  65: 'LEFT',
  271: 'LEFT',
  // up
  1: 'UP',
  28: 'UP',
  38: 'UP',
  87: 'UP',
  269: 'UP',
  // right
  4: 'RIGHT',
  30: 'RIGHT',
  39: 'RIGHT',
  68: 'RIGHT',
  272: 'RIGHT',
  // down
  2: 'DOWN',
  31: 'DOWN',
  40: 'DOWN',
  83: 'DOWN',
  270: 'DOWN'
}

keyEvent()
function keyEvent () {
  document.ua = navigator.userAgent.toLowerCase()
  // 如果(是谷歌浏览器)或者(是IE浏览器并且不是iPanel浏览器)
  if (document.ua.indexOf('chrome') > 0 || (document.ua.indexOf('msie') > 0 && document.ua.indexOf('ipanel') < 0)) { document.onkeydown = dokeydown } else // 否则，如果是其它浏览器
  { document.onkeypress = dokeydown }

  function dokeydown (ev) {
    var ev = ev || window.event // 获取event对象
    var keyCode = ev.which || ev.keyCode // 获取事件源
    var keyName = KeyCodeList[keyCode]
    DoKeyPress(keyName, keyCode)
  }
}

function DoKeyPress (keyName, keyCode) {
  if (keyCode >= 48 && keyCode <= 57) {
    try {
      KeyObj.toNum(keyCode - 48)
    } catch (err) {}
  }
  switch (keyName) {
    case 'LEFT':
      KeyObj.toLeft()
      break
    case 'RIGHT':
      KeyObj.toRight()
      break
    case 'UP':
      KeyObj.toUp()
      break
    case 'DOWN':
      KeyObj.toDown()
      break
    case 'OK':
      KeyObj.toOK()
      break
    case 'BACK':
      KeyObj.toBack()
      break
    default:
      break
  }
  try {
    KeyObj.toDefault(keyCode)
  } catch (err) {}
}
