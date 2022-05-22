<template>
    <tr>
        <td width="30%">{{gacha.nickName}}</td>
        <td width="25%">{{ time }}</td>
        <td width="25%">{{gacha.pool}}</td>
        <td width="20%">
            <ol>
                <CharEntiy v-for="(char,index) in this.gacha.chars" :key="index" :char="char"></CharEntiy>
            </ol>
        </td>
    </tr>
</template>

<script>
    import CharEntiy from "@/components/gacha/CharEntiy";
    import formatTime from "@/components/gacha/util"
    export default {
        name: "GachaEntiy",
        components: {CharEntiy},
        props:{
            gacha: Object,
        },
        method:{
        },
        computed:{
            time(){return formatTime(this.gacha.ts)},
        }
    }

</script>

<style scoped>
    tr:not(:last-of-type) td{
        border-bottom: 1px solid #e0e0e0;
    }
    td{
        display: table-cell;
        vertical-align: inherit;
        text-align: center;
        word-break: break-word;
        padding: 10px;
    }
    ol{
        margin: 0;
        padding: 0;
        list-style-type: none;
    }
</style>