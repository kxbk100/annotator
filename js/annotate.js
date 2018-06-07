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
  var leftID;
  var string = 'note' + m;
  var textarea = document.getElementById(string).value;  
  //ajax传递数据到后台并获得批注id
  app.request.post('http://192.168.1.111/EAnnotation/addAnnotation', {
    content: textarea,
    paragraph: paragraph,
    start: start,
    end: end,
    type: type,
    userId: userId,
    passageId: passageId,
    selected: text
  }, function (data) {
    leftID = jQuery.parseJSON(data);
    $$('#ancontent').append(
      '<div class="card cardcss" id="' + leftID + '">' +
      '<blockquote class="blockquote bqcolor' + m + '" id="bq' + leftID + '">' +
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
        cssApplier = rangy.createClassApplier("Bton0Backgrond",false);
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
var userId = localStorage.id; 
var ancount;  //统计批注数量，用于数量随时变化
//获取文章id
function getPassage(dele) { //dele用来标记是否需要重新渲染侧边栏
  $.ajax({
    url: 'http://192.168.1.111/EAnnotation/getPassage?id=' + passageId,
    type: "post",
    cache: false,
    success: function (data) {
      console.log(data);
      $("#title").html(data.title);
      $("#count").html(data.count + '个批注');
      $("#allantate").text(data.count);
      ancount = data.count;
      $("#box").html(data.content);
      $("#person").html('发布人：' + data.auth + '老师');
      getAnnotator(passageId, userId, dele);
    },
    error: function (e) {}
  })
};
window.onload = function () {
  getPassage()
}

var par, st, ed, type, anID, content, selected; //用于传递数据的参数

//从数据库获得json类型数据并解析
function getAnnotator(passageId, userId, dele) {
  app.request.get('http://192.168.1.111/EAnnotation/getAnnotations?passageId=' + passageId + '&userId=' +
    userId,
    function (data) {
      var result = jQuery.parseJSON(data);
      each(result, dele);
    }, JSON);
}


// 从数据库取回数据后重新渲染批注
function each(result, dele) {
  $.each(result, function (i, item) {
    par = item.paragraph;
    st = item.start;
    ed = item.end;
    type = item.type;
    anID = item.id;
    content = item.content;
    selected = item.selected;
    annotate();
    if (dele != "ture") {
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
  $$('#ancontent').html('<div id="ancontent"><div class="texbg">暂无批注</div></div>');
  $$('#ancontent').append(
    '<div class="card cardcss" id="' + anID + '">' +
    '<blockquote class="blockquote bqcolor' + type + '" id="bq' + anID + '">' +
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
  app.request.post('http://192.168.1.111/EAnnotation/deleteAnnotation', {
    id: delID
  }, function (data) {
    var dele = "ture";
    getPassage(dele);
  })
};

//修改批注
function modify(modId) {
  var x = $$('#an' + modId).text(); //获取批注的文章内容
  var t = $$('#bq' + modId + '>p').text(); //获得原批注
  var bqcolor = $$('#bq' + modId).attr('class'); //获得颜色样式
  $$('#sendID').text(modId); //传递id
  $$('#old').text(t); //传递原批注
  $$('#mod').val(x); //传递文章内容到popup
  $$('#bqcolor').attr('class', bqcolor);
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
  app.request.post('http://192.168.1.111/EAnnotation/updateAnnotation', {
    content: nw,
    id: getID
  }, function (data) {
    if (data.msg == "ture") {
      console.log("成功")
    }
  });
}

// 页面上随时改变批注数量的方法
function addNum () {
  ancount++;
  $("#count").html(ancount + '个批注');
  $("#allantate").text(ancount);
}
function rdNum () {
  ancount--;
  $("#count").html(ancount + '个批注');
  $("#allantate").text(ancount);
}

// 右侧侧边栏显示所有批注
$(function() {
$.ajax({
  url: 'http://192.168.1.111/EAnnotation/getAllAnnotations?passageId=' + passageId,
  type: "post",
  cache: false,
  success: function (data) {
  $.each(data,function(i,item) {
    if(item.userType == 0){
      var antator = "学生";
      var antype = "student";
    }
    else {
      antator = "教师";
      var antype = "teacher";
    };

    $('#ancontent2').append(
      `    <div class="card cardcss" id="`+antype+`">
      <blockquote class="blockquote bqcolor2">
        <p>`+ item.selected +`</p>
      </blockquote>
      <div class="card-content cardct">
        <p id="anPnode">`+ item.content +`</p>
      </div>
      <div class="card-footer">
        <a href="#" class="link">
          <i class="f7-icons size-13">heart_fill</i>` + Math.ceil(Math.random() * 10 + 26) + `赞同
        </a>
        <a href="#" class="link" id="change">`+ antator +`:`+ item.userName +`</a>
      </div>
      <p id="rstart" style="display: none">`+ item.start +`</p>
      <p id="rend" style="display: none">`+ item.end +`</p>
      <p id="rparagraph" style="display: none">`+ item.paragraph +`</p>
    </div>`
    )
  })
  },
  error: function (e) {}
})
})
// 批注筛选
$$("input[name='teacher']").change(function () {
  if (!$$(this).is(':checked')) {
    $$("[id=teacher]").css('display', 'none');
  } else {
    $$("[id=teacher]").css('display', 'block');
  }
});
$$("input[name='student']").change(function () {
  if (!$$(this).is(':checked')) {
    $$("[id=student]").css('display', 'none');
  } else {
    $$("[id=student]").css('display', 'block');
  }
});

  var user;
    //获取登录者id
    $.ajax({
      url: 'http://192.168.1.111/EAnnotation/getCurrentUser',
      type: 'post',
      dataType: 'jsonp',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: function (data) {
        user = data;
      },
      error: function () {}
    })

// 底部工具栏按钮事件
var button0 = document.getElementById("button0");
button0.addEventListener('touchstart', function () {
  getString(0);
  anPaint(0);
  getLocation(0);
  if (user == 0) {
    goload();
  }
});

var botton1 = document.getElementById("button1");
button1.addEventListener('touchstart', function () {
  getString(1);
  anPaint(1);
  getLocation(1);
  if (user == 0) {
    goload();
  }
});

var botton2 = document.getElementById("button2");
button2.addEventListener('touchstart', function () {
  getString(2);
  anPaint(2);
  getLocation(2);
  if (user == 0) {
    goload();
  }
});

var botton3 = document.getElementById("button3");
button3.addEventListener('touchstart', function () {
  getString(3);
  anPaint(3);
  getLocation(3);
  if (user == 0) {
    goload();
  }
});

// var botton4 = document.getElementById("button4");
// button4.addEventListener('touchstart', function () {
//   getString(4);
//   anPaint(4);
//   getLocation(4);
//   if (user == 0) {
//     goload();
//   }
// });
//添加批注按钮点击事件
var add0 = document.getElementById("add0");
add0.addEventListener('touchstart', function () {
  panel(0);
  addNum();
});

var add1 = document.getElementById("add1");
add1.addEventListener('touchstart', function () {
  panel(1);
  addNum();
});

var add2 = document.getElementById("add2");
add2.addEventListener('touchstart', function () {
  panel(2);
  addNum();
});

var add3 = document.getElementById("add3");
add3.addEventListener('touchstart', function () {
  panel(3);
  addNum();
});

// var add4 = document.getElementById("add4");
// add4.addEventListener('touchstart', function () {
//   panel(4);
//   addNum();
// });

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
  rdNum();
});