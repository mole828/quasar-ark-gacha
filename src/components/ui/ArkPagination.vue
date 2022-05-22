<template>
    <ul>
        <li @click="dp(-1)" :class="{'able':page!==0}">上一页</li>
        <li v-for="p in pages.slice(Math.max(0,page-3),Math.min(page+4,pages.length))"
        :key="p.value" @click="jump(p.value)"
        :class="{'able':page!==p.value}">{{p.value+1}}</li>
        <li @click="dp(1)" :class="{'able':page!==this.pages.length-1}">下一页</li>
    </ul>
</template>

<script>
    export default {
        name: "ArkPagination",
        props: {
            pageSize: Number,
            total: Number,
            hook: Function,
        },
        data(){
            return {
                page: 0,
                pages: [],
            }
        },
        methods:{
            jump(target){
                if(target===this.page)return
                this.page = target
                this.hook(target)
            },
            dp(d){
                const target = Math.max(0, Math.min(this.page+d, this.pages.length-1))
                this.jump(target)
            },
            pp(){
                this.pages=[]
                for(let i=0;i*this.pageSize<this.total;i++){
                    this.pages.push({
                        value: i,
                    })
                }
            }
        },
        watch:{
            total(){
                this.pp()
            }
        },
        mounted(){
            this.pp()
        },
    }
</script>

<style scoped>
    ul {
        display: flex;
        list-style-type: none;
        margin: 1em 0 0;
        padding: 0;
        width: 100%;
        justify-content: center;
    }
    ul li {
        margin: 0 0.5em;
        transition: background-color .3s;
        list-style-type: none;
    }
    li.able{
        color: #158fc5;
        cursor: pointer;
    }
    li.able:hover:not(.disabled) {
        background-color: silver;
    }
</style>