// 选中并传递到popup
var text;
function getString(n) {
  text = rangy.getSelection().toString();
  var string = 'selectedtxt' + n;
  var selectedtxt = document.getElementById(string);
  selectedtxt.innerText = text;
}

//将popu中的文字传递到侧边栏
function panel(m) {
  var string = 'note'+m;
  var textarea = document.getElementById('string').textarea.value;
  $$('#ancontend').append('<div><p>原文：</p><p>' + text + '</p><p>我的批注</p><p>'+textarea+'</P></div>')
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
  // alert(i);
  // alert(rangeObject.startOffset);
  // alert(rangeObject.endOffset);
  // alert(getString());
}

//添加批注样式
function anPaint(bton) {
  rangy.init();
  var classApplierModule = rangy.modules.ClassApplier;

  if (rangy.supported && classApplierModule && classApplierModule.supported) {
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

//传递选中文字
function trans() {
  alert(getString());
  $$('#selectedTxt0').text(getString());
}

// 底部工具栏按钮事件
var button0 = document.getElementById("button0");
button0.ontouchstart = function () {
  // getLocation();
  getString(0);

}
// $$('botton0').on('click',function(){
//   getString();
// })
var botton1 = document.getElementById("button1");
button1.ontouchstart = function () {
  getLocation();
}
var botton2 = document.getElementById("button2");
button2.ontouchstart = function () {
  getLocation();
}
var botton3 = document.getElementById("button3");
button3.ontouchstart = function () {
  getLocation();
}
var botton4 = document.getElementById("button4");
button4.ontouchstart = function () {
  getLocation();
}

//添加批注按钮点击事件
var add0 = document.getElementById("add0");
add0.ontouchstart = function () {
  anPaint(0);
}
var add1 = document.getElementById("add1");
add1.ontouchstart = function () {
  anPaint(1);
}
var add2 = document.getElementById("add2");
add2.ontouchstart = function () {
  anPaint(2);
}
var add3 = document.getElementById("add3");
add3.ontouchstart = function () {
  anPaint(3);
}
var add4 = document.getElementById("add4");
add4.ontouchstart = function () {
  anPaint(4);
}