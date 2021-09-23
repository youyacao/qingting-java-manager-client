$(function () {
    let i = 0;
    let appVue = new Vue({
        el:".layui-form",
        data:{
            us:{}
        },
        methods:{
            addAdmin(i){
                this.$http.post(SERVER_PATH+'addAdmin', this.us).then(function (res) {
                    console.log(res)
                });
            }
        }
    });
});
