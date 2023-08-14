<template>
    <div>
        <ArkInput
                :title="'提交你的token 加入我们'"
                :placeholder="'复制token到此'"
                :hook="register"
        />
        <div style="font-size: 0.75em; color: rgb(86, 86, 86); margin: 1em 0px;">
            *请首先在
            <a href="https://ak.hypergryph.com/user" target="_blank">官网</a>
            登录，随后访问
            <a href="https://as.hypergryph.com/user/info/v1/token_by_cookie" target="_blank">此处</a>
            复制全部内容（如了解JSON也可仅复制data中的token），然后在此填入。（请使用同一浏览器）
        </div>
        <div data-v-32447a35="" style="font-size: 0.75em; color: rgb(86, 86, 86); margin: 1em 0px;">
            **token失效的博士:
            <span v-for="(data,i) in invalid" :key="i">{{data}} &nbsp;</span>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import ArkInput from "@/components/ui/ArkInput";
    export default {
        name: "GachaRegister",
        components: {
            ArkInput,
        },
        data(){
            return {
                invalid: [],
            }
        },
        methods: {
            register: (function () {
                let lock = false
                return function(e){
                    console.log(e)
                    if(lock)return
                    lock = true
                    axios.post('/api/ark/register',null ,{
                        params:{
                            token: e
                        }
                    }).then(res=>{
                        alert(res.data.msg)
                    }).finally(()=>{
                        lock = false
                    })
                }
            })(),
            initInvalid(){
                axios.get('/api/ark/users.invalid').then(res=>{
                    this.invalid = res.data
                })
            },
        },
        mounted(){
            this.initInvalid()
        },
    }
</script>

<style scoped>
div{
    float: bottom;
}
</style>