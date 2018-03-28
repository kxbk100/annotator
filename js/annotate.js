// 选中并传递到popup
var text;

function getString(n) {
  text = rangy.getSelection().toString();
  console.log(text);
  var string = 'selectedtxt' + n;
  var selectedtxt = document.getElementById(string);
  selectedtxt.innerText = text;
}

//将popu中的文字传递到侧边栏
function panel(m) {
  var string = 'note' + m;
  var textarea = document.getElementById(string).value;
  $$('#ancontent').append(
    '<div class="card">' +
    '<div class="card-content card-content">' +
    '<blockquote class="blockquote">' +
    '<p>' + text + '</p>' +
    '</blockquote>' +
    '<p  id="anPnode">' + textarea + '</p>' +
    '</div >' +

    ' <div class="card-footer">' +
    '<a href="#" class="link" id="change">修改</a><a href="#" class="link" id="delete">删除</a>' +
    '</div>' +
    '</div>' +
    '</div>');
  document.getElementById(string).value = '';
}

//获取选中文字的位置
function getLocation() {
  var userSelection;
  if (window.getSelection) { //现代浏览器
    userSelection = window.getSelection();
  }
  var getRangeObject = function (selectionObject) {
    if (selectionObject.getRangeAt)
      return selectionObject.getRangeAt(0);
    else { // 较老版本Safari!
      var range = document.createRange();
      range.setStart(selectionObject.anchorNode, selectionObject.anchorOffset);
      range.setEnd(selectionObject.focusNode, selectionObject.focusOffset);
      return range;
    }
  }
  var rangeObject = getRangeObject(userSelection);
  var p = rangeObject.startContainer.parentNode;
  var i = 0;
  while (p = p.previousSibling) {
    i++;
  }
  i = (i + 1) / 2;
  alert(i);
  alert(rangeObject.startOffset);
  alert(rangeObject.endOffset);
  alert(getString());
}

//添加批注样式
function anPaint(bton) {
  rangy.init();
  var classApplierModule = rangy.modules.ClassApplier;
  if (true) {
    switch (bton) {
      case 0:
        cssApplier = rangy.createClassApplier("Bton0Backgrond", false);
        cssApplier.toggleSelection();
        break;
      case 1:
        cssApplier = rangy.createClassApplier("Bton1Backgrond", false);
        cssApplier.toggleSelection();
        break;
      case 2:
        cssApplier = rangy.createClassApplier("Bton2Backgrond", false);
        cssApplier.toggleSelection();
        break;
      case 3:
        cssApplier = rangy.createClassApplier("Bton3Backgrond", false);
        cssApplier.toggleSelection();
        break;
      case 4:
        cssApplier = rangy.createClassApplier("Bton4Backgrond", false);
        cssApplier.toggleSelection();
        break;
    }
  }
}

//蒙板
var anblock = document.getElementById("anpanel").className;
console.log(anblock);
while (anblock == "panel panel-left panel-cover anpanel panel-active") {
  $$('txblock').addClass('anblock');
  console.log("yes");
}

//修改批注
function anChange() {
  console.log('132')
  $$('change').parent().prev().children('#anPnode').text = '132';
};

// 底部工具栏按钮事件
var button0 = document.getElementById("button0");
button0.addEventListener('touchstart', function () {
  getString(0);
  anPaint(0);
});

var botton1 = document.getElementById("button1");
button1.addEventListener('touchstart', function () {
  getString(1);
  anPaint(1);
});

var botton2 = document.getElementById("button2");
button2.addEventListener('touchstart', function () {
  getString(2);
  anPaint(2);
});

var botton3 = document.getElementById("button3");
button3.addEventListener('touchstart', function () {
  getString(3);
  anPaint(3);
});

var botton4 = document.getElementById("button4");
button4.addEventListener('touchstart', function () {
  getString(4);
  anPaint(4);
});
//添加批注按钮点击事件
var add0 = document.getElementById("add0");
add0.addEventListener('touchstart', function () {
  panel(0);
});

var add1 = document.getElementById("add1");
add1.addEventListener('touchstart', function () {
  panel(1);
});

var add2 = document.getElementById("add2");
add2.addEventListener('touchstart', function () {
  panel(2);
});

var add3 = document.getElementById("add3");
add3.addEventListener('touchstart', function () {
  panel(3);
});

var add4 = document.getElementById("add4");
add4.addEventListener('touchstart', function () {
  panel(4);
});

//修改按钮
var change = document.getElementById("change");
change.addEventListener('touchstart', function () {
  anChange();
});