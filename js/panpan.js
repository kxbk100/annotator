/*
本文件函数作用于两个以上的页面
*/
//班级，群组按钮定位函数
$(function(){
if(localStorage.usertype == 1){
    $("#jump").attr("href","classlistTeacher.html");
    $("#group_btn").attr("href","grouplist.html");
  } 
  else if (localStorage.usertype == 0) {
    $("#jump").attr("href","classlist.html");
    $("#group_btn").attr("href","grouplist.html");
  }
  else {
    $("#jump").attr("href","person.html");
    $("#group_btn").attr("href","person.html");
  }
});

//清除过期localstorage函数
$(function () {
  $.ajax({
    url: 'http://212.64.11.56:8080/EAnnotation/getCurrentUser',
    type: 'post',
    dataType: 'jsonp',
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
    success: function (data) {
      if (data == 0) {
        localStorage.id = -1;
        localStorage.classid = null;
        localStorage.usertype = null;
        console.log("清除localstorage")
      }
      console.log(localStorage.usertype)
      console.log(localStorage.id) 
    },
    error: function () {}
  });
});