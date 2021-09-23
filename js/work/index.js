let token = sessionStorage.getItem("token");
$(function () {
    if (!token){
        window.location.href = "login.html";
        return;
    }
    $.ajax({
        url: SERVER_PATH + "indexToken?token="+token,
        type: "get",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            console.log(JSON.parse(data));
            let d = JSON.parse(data).data;
            if (JSON.parse(data).message.code==="0") {

            } else {
                $("#remind").html(JSON.parse(data).message.msg);
                //window.location.href = "login.html";
            }
        }
    });

});
