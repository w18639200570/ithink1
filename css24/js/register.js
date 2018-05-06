var btn=document.getElementById('btn');
var info;
btn.onclick=function () {
  var uname=document.getElementById('user');
  var upwd=document.getElementById('password');
  var data1=uname.value;
  var data2=upwd.value;
  var formData=new FormData();
  formData.append('name',data1);
  formData.append('pwd',data2);
  console.log(data1);
  console.log(data2);
/*  $.post("/api/a/login",{"name":data1,"pwd":data2},function (data) {
      if(data.code!==0){
          $('#out').html('无此用户或密码不正确');
          console.log(data);
      }
      else {console.log(data)}
  },'json'); */
    $.ajax({
        url: "/api/a/login",
        type: "POST",
        data: formData,
        processData: false,  // 告诉jQuery不要去处理发送的数据
        contentType: false   // 告诉jQuery不要去设置Content-Type请求头
    });
}; 