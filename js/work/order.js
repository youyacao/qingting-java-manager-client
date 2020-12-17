$(function () {
    let i = 0;
    let appVue = new Vue({
        el:".layui-fluid",
        data:{
            userList:[],
        },
        mounted:function () {
            this.getUserList();
        },
        methods:{
            getUserList:function () {
                i = 0;
                this.pageIndex(i);
            },
            addUser(){
                window.location.href="addUser.html"
            },
            home(){
                i = 0;
                this.pageIndex(i);
            },
            next(){
                i++;
                this.pageIndex(i);
            },
            last(){
                i--;
                this.pageIndex(i);
            },
            updateUser(uId){
                sessionStorage.setItem("updateUser",uId);
                window.location.href = "updateUser.html";
            },
            deleteUser(uId){
                let indexThis = this;
                layer.confirm('您确定要删除这条信息吗？', {
                    btn: ['确定','取消'], //按钮
                    skin: 'layui-layer-molv'
                }, function(){
                    indexThis.$http.get(SERVER_PATH+'deleteUS',{
                        params:{
                            "uId":uId,
                        }
                    }).then(function (res) {
                        console.log(res);
                        lay_alert(res.body.message.msg);
                    });
                }, function(){
                });
            },
            pageIndex(i){
                this.$http.get(SERVER_PATH+'getAllComment',{
                    params:{
                        "page":10,
                        "limit":i
                    }
                }).then(function (res) {
                    console.log(res.data.data.list)
                    this.userList = res.data.data.list;
                });
            }
        }
    });
});
function delAll(url) {
    delAllTemplate(url);
}
