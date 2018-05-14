// 选中并传递到popup
var text;

function getString(n) {
  text = rangy.getSelection().toString();
  console.log(text);
  var string = 'selectedtxt' + n;
  var selectedtxt = document.getElementById(string);
  selectedtxt.innerText = text;
}
var userID = 1;
//将popu中的文字传递到侧边栏
function panel(m) {
  var leftID;
  var string = 'note' + m;
  var textarea = document.getElementById(string).value;

  //ajax传递数据到后台并获得批注id
  app.request.post('http://47.52.230.212:8080/EAnnotation/addAnnotation', {
    content: textarea,
    paragraph: paragraph,
    start: start,
    end: end,
    type: type,
    userId: userID,
    passageId: passageId,
    selected: text
  }, function (data) {
    leftID = jQuery.parseJSON(data);
    $$('#ancontent').append(
      '<div class="card cardcss" id="' + leftID + '">' +
      '<blockquote class="blockquote bqcolor' + m + '" id="bq'+leftID+'">' +
      '<p>' + text + '</p>' +
      '</blockquote>' +
      '<div class="card-content cardct ">' +
      '<p  id="an' + leftID + '">' + textarea + '</p>' +
      '</div >' +
      '<div class="card-footer cgdel">' +
      '<a class="link popup-open" id="change" data-popup=".popup5" onclick="modify(' + leftID + ')">修改</a><a  class="link" id="delete" onclick="del(' + leftID + ')">删除</a>' +
      '</div>' +
      '</div>');
    document.getElementById(string).value = '';
  });
}


//获取选中文字的位置
var paragraph = 0;
var start;
var end;
var type;

function getLocation(n) {
  var userSelection;
  var par = 0;
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
  while (p = p.previousSibling) {
    par++;
  }
  par = par + 1;
  paragraph = par;
  start = rangeObject.startOffset;
  console.log(start);
  end = rangeObject.endOffset;
  type = n;
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
};

var reg = new RegExp("(^|&)id=([^&]*)(&|$)");
var r = window.location.search.substr(1).match(reg);
var passageId = unescape(r[2]);
var userId = 1; //预设的用户id
//获取文章id
function getPassage(dele) {
  $.ajax({
    url: 'http://47.52.230.212:8080/EAnnotation/getPassage?id=' + passageId,
    type: "post",
    cache: false,
    success: function (data) {
      console.log(data);
      $("#title").html(data.title);
      $("#count").html(data.count + '个批注');
      $("#box").html(data.content);
      $("#person").html('发布人：' + data.auth + '老师');
      getAnnotator(passageId, userId, dele);
    },
    error: function (e) { }
  })
};
window.onload=function () {
  getPassage()
}

 var par, st, ed, type, anID, content, selected;
 //从数据库获得json类型数据并解析
 function getAnnotator(passageId, userId,dele) {
   app.request.get('http://47.52.230.212:8080/EAnnotation/getAnnotations?passageId=' + passageId + '&userId=' +
     userId,
     function (data) {
       var result = jQuery.parseJSON(data);
       each(result,dele);
     }, JSON);
 }


 // 从数据库取回数据后重新渲染批注
 function each(result,dele) {
   $.each(result, function (i, item) {
     par = item.paragraph;
     st = item.start;
     ed = item.end;
     type = item.type;
     anID = item.id;
     content = item.content;
     selected = item.selected;
     annotate();
     if(dele!="ture"){
       rePanel();
     }
   })
 }

 function annotate() {
   var px = $$("#box p")[par - 1].firstChild;
   console.log(px);
   var range = rangy.createRange();
   range.setStart(px, st);
   range.setEnd(px, ed);
   range.select();
   switch (type) {
     case 0:
       cssApplier = rangy.createClassApplier("Bton0Backgrond", false);
       break;
     case 1:
       cssApplier = rangy.createClassApplier("Bton1Backgrond", false);
       break;
     case 2:
       cssApplier = rangy.createClassApplier("Bton2Backgrond", false);
       break;
     case 3:
       cssApplier = rangy.createClassApplier("Bton3Backgrond", false);
       break;
     case 4:
       cssApplier = rangy.createClassApplier("Bton4Backgrond", false);
       break;
   }
   cssApplier.toggleSelection();
   window.getSelection().removeAllRanges();
 }

 //渲染侧边栏批注
 function rePanel() {
   var string = 'note' + type;
   var textarea = content;
   $$('#ancontent').append(
     '<div class="card cardcss" id="' + anID + '">' +
     '<blockquote class="blockquote bqcolor' + type + '" id="bq'+anID+'">' +
     '<p>' + selected + '</p>' +
     '</blockquote>' +
     '<div class="card-content cardct ">' +
     '<p  id="an' + anID + '">' + textarea + '</p>' +
     '</div >' +
     '<div class="card-footer">' +
     '<a class="link popup-open" id="change" data-popup=".popup5" onclick="modify(' + anID +
     ')">修改</a><a  class="link" id="delete" onclick="del(' + anID + ')">删除</a>' +
     '</div>' +
     '</div>');
   document.getElementById(string).value = '';
 }

//删除批注
function del(delID) {
  $$('#' + delID).remove();
  //ajax传输给后台
  app.request.post('http://47.52.230.212:8080/EAnnotation/deleteAnnotation', {
    id: delID
  }, function (data) {
    var dele = "ture";
    getPassage(dele);
  })
};

//修改批注
function modify(modId) {
  var x = $$('#an' + modId).text();
  var t = $$('#bq'+modId+'>p').text();
  var bqcolor = $$('#bq'+modId).attr('class')
  $$('#sendID').text(modId);
  $$('#old').text(t);
  $$('#mod').val(x);
  $$('#bqcolor').attr('class',bqcolor);
}

var ad = document.getElementById("modadd");
ad.addEventListener('touchstart', function () {
  add();
});

function add() {
  var nw = $$('#mod').val();
  var getID = $$('#sendID').text();
  $$('#an' + getID).text(nw);
  //ajax传输给后台
  app.request.post('http://47.52.230.212:8080/EAnnotation/updateAnnotation', {
    content: nw,
    id: getID
  }, function (data) {
    if (data.msg == "ture") {
      console.log("成功")
    }
  });
}


// 底部工具栏按钮事件
var button0 = document.getElementById("button0");
button0.addEventListener('touchstart', function () {
  getString(0);
  anPaint(0);
  getLocation(0);
});

var botton1 = document.getElementById("button1");
button1.addEventListener('touchstart', function () {
  getString(1);
  anPaint(1);
  getLocation(1);
});

var botton2 = document.getElementById("button2");
button2.addEventListener('touchstart', function () {
  getString(2);
  anPaint(2);
  getLocation(2);
});

var botton3 = document.getElementById("button3");
button3.addEventListener('touchstart', function () {
  getString(3);
  anPaint(3);
  getLocation(3);
});

var botton4 = document.getElementById("button4");
button4.addEventListener('touchstart', function () {
  getString(4);
  anPaint(4);
  getLocation(4);
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

//删除按钮
var delbutn = document.getElementById("delete");
delbutn.addEventListener('touchstart', function () {
  del();
  refresh();
});