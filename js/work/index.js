let token = sessionStorage.getItem("token");
let arrayId = [];
$("#show").addClass("animated fadeInDown");
console.log(token);
let element = null;
layui.use('element', function(){
    element = layui.element;
});
let unreadData = new Vue({
    el:'#unread',
    data:{
        unreadList:[]
    },
    methods: {
        onget(){
            alert("1");
        }
    }
});
window.addEventListener('message',function (e) {
    let date = e.data;
    console.log(date);
    $("#answerNum").html(date.length);
    sessionStorage.setItem("unread",e.data);
},false);
function addPublic(id,name,url) {
    for(let i=0;i<$('.i-class').length;i++){
        if (parseInt($('.i-class').eq(i).attr("id"))===id){
            element.tabChange('tables',id);
            return;
        }
    }
    element.tabAdd('tables', {
        title: name //用于演示
        , content: ' <iframe src="' + url + '" scrolling="no" id="'+id+'" style="width: 100%;height: 720px;" frameborder="0" class="i-class"></iframe>'//'内容'+ (Math.random()*1000|0)
        , id: id //new Date().getTime() //实际使用一般是规定好的id，这里以时间戳模拟下
    });
    element.tabChange('tables',id);
}
function add(id,name,url){
    addPublic(id,name,url)
}
$(function () {
    let appVue = new Vue({
        //el:"#menus",
        el:".sidebar-content",
        data:{
            userPermission:[],
            cl:false,
            isOk:-1
        },
        mounted:function () {
            if (!!token){
                this.getPermission()
            }else {
                window.location.href="login.html";
            }
        },
        computed:{

        },
        methods:{
            getPermission:function () {
                this.$http.get(SERVER_PATH+'getPermission',{
                    headers:{
                        Authorization:token
                    }
                }).then(function (res) {
                    if (res.body.message.code==="0") {
                        let userData = JSON.parse(res.body.data);
                        this.userPermission = JSON.parse(res.body.data).permission;
                        console.log(JSON.parse(res.body.data));
                        sessionStorage.setItem("userInfo",res.body.data);
                        $("#account").html(userData.userInfo.uEmail);
                        $("#auth").html(userData.userInfo.auth.aRank);
                        $("#uIm").attr('src',userData.userInfo.uImage);
                    }else {
                        console.log(res.body.message.code);
                        if (res.body.message.code==="401"){
                            //window.location.href="login.html";
                        }
                    }
                })
            },
            change(mId){
                $("#"+mId).addClass("active");
                this.isOk = mId;
            },
            add:function (id,name,url) {
                addPublic(id,name,url);
            },
            logout:function () {
                $.ajax({
                    url: SERVER_PATH + "logout",
                    type: "get",
                    contentType: "application/json;charset=utf-8",
                    beforeSend:function(request){
                        request.setRequestHeader("Authorization",token);
                    },
                    success: function (data) {
                        alert(data);
                        sessionStorage.removeItem("token");
                    }
                });
            }
        }
    });
});