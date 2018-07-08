
//班级按钮定位函数
(function(){
if(localStorage.usertype == 1){
    $("#jump").attr("href","classlistTeacher.html");
  } 
  else if (localStorage.usertype == 0) {
    $("#jump").attr("href","classlist.html");
  }
  else {
    $("#jump").attr("href","person.html");
  }
  console.log(localStorage.usertype)
})();
