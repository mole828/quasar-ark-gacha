<template>
    <li :class="this.style">{{this.char.name}}</li>
</template>

<script>
    export default {
        name: "CharEntiy",
        props:{
            char: Object
        },
        data() {
            return {
                style: {},
            }
        },
        mounted() {
            let s = {
                'isNew': this.char.isNew,
            }
            s['r'+this.char.rarity]=true
            this.style = s
        }
    }
</script>

<style scoped>
    li{
        list-style-type: none;
        position: relative;
        display: list-item;
        text-align: -webkit-match-parent;
    }
    li.isNew:after{
        content: "N";
        display: flex;
        position: absolute;
        justify-content: center;
        align-items: center;
        color: #fff;
        background-color: #f5352e;
        padding: 0 0.2em;
        top: 0;
        right: 0;
        height: 100%;
        font-family: SourceHanSansCN-Bold;
        border-radius: 0.2em;
    }
    .r5{color: #ee5700;}
    .r4{color: #cc7a00;}
    .r3{color: #a231ff;}
</style>