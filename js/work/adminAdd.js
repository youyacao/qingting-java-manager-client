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
            pageIndex(i){
                this.$http.get(SERVER_PATH+'getAllAdmin',{
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
