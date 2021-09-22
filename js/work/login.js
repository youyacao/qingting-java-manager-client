$(function () {
    $("#login").on('click',function () {
        alert("")
        let username = $("#username").val();
        let password = $("#password").val();
        let userData  = {
            "username": username,
            "password": password,
        }
        let verifyR = verify(username,password);
        if (verifyR !== true) {
            if (verifyR === false) {
                $("#remind").html("必填项不能为空");
                return;
            }
            $("#remind").html(verifyR);
        } else {
            $("#remind").html("");
            $.ajax({
                url: SERVER_PATH + "login",
                type: "post",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(userData),
                /* beforeSend:function(request){
                   request.setRequestHeader("Authorization","Authorization");
                 },*/
                success: function (data) {
                    console.log(JSON.parse(data));
                    let d = JSON.parse(data).data;
                    if (JSON.parse(data).message.code==="0") {
                        if (!!d) {
                            sessionStorage.setItem("token", d);
                            window.location.href = "index.html";
                        }
                    } else {
                        $("#remind").html(JSON.parse(data).message.msg);
                    }
                }
            });
        }
    });

    function verify(username,password) {
        if (!!username && !!password){
            if (username.length>=11){
                if(password.length<6||password.length>12){
                    return "密码长度不规范";
                }
                return true;
            }else if(username.indexOf("@")!==-1&&username.indexOf(".")!==-1){
                if(password.length<6||password.length>12){
                    return "密码长度不规范";
                }
                return true;
            }else {
                return "账号格式错误";
            }
        }
        return !!username && !!password;
    }
})
