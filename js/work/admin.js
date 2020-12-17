$(function () {let appVue = new Vue({
    el:".layui-fluid",
    data(){
        return{

            userList:[],
        }
    },
    mounted:function () {
        this.getUserList();
    },
    methods:{
        getUserList:function () {
            this.pageIndex(sessionStorage.getItem("updateUser"));
        },
        updateUser(event){
            console.log(JSON.stringify(this.userList))
            this.$http.post(SERVER_PATH+'updateUA', JSON.stringify(this.userList[0])).then(function (res) {
                console.log(res)
            })
        },
        pageIndex(i){
            this.$http.get(SERVER_PATH+'user',{
                params:{
                    "uId":i
                }
            }).then(function (res) {
                console.log(res.data.data);
                this.userList = res.data.data;
                console.log(this.userList)
            });
        }
    }
});
});
