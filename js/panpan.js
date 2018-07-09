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
  console.log(localStorage.usertype)
  console.log(localStorage.id)
});

//清除过期localstorage函数
$(function () {
  $.ajax({
    url: 'http://192.168.1.193/EAnnotation/getCurrentUser',
    type: 'post',
    dataType: 'jsonp',
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
    success: function (data) {
      if (data == 0) {
        localStorage.id = null;
        localStorage.classid = null;
        localStorage.usertype = null;
        console.log("清除localstorage")
      } 
    },
    error: function () {}
  });
});