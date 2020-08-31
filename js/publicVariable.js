//let SERVER_PATH = "http://122.114.195.108:8100/manager/";
//let SERVER_PATH = "http://122.114.195.108:8102/managerAdmin/";
//let SERVER_PATH = "/managerAdmin/";
let SERVER_PATH = "http://127.0.0.1:8100/manager/";
function lay_alert(msg) {
    layui.use('layer',function () {
        let layer = layui.layer;
        layer.alert(msg);
    });
}
function delAllTemplate (url) {
    let ids = [];
    // 获取选中的id
    $('tbody input').each(function(index, el) {
        if($(this).prop('checked')){
            ids.push($(this).val())
        }
    });
    console.log(ids+":"+url);
    layer.confirm('确认要删除吗？'+ids.toString(),function(index){
        $.ajax({
            url:SERVER_PATH+url,
            type:'get',
            contentType:'application/json;charset=utf-8',
            data:{
                'idArray':ids,
            },
            traditional:true,
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", token);
            },
            success:function (data) {
                console.log(data);
                lay_alert(JSON.parse(data).message.msg);
            }
        })
    });
}
let data = [];
function pageIndexTemplate(vueThis,i,userInfo) {
    vueThis.$http.get(SERVER_PATH+'getUD',{
        headers:{
            Authorization:token
        },
        params:{
            "cid":1,
            "page":i
        }
    }).then(function (res) {
        console.log(JSON.parse(res.body.data));
        data = "s";
        return data;
    });
}
