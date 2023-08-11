<style scoped>
    table {
        border-collapse: separate;
        text-indent: initial;
        border-spacing: 2px;
        width: 100%;
    }
    table thead {
        font-size: .8em;
        color: #158fc5;
        font-weight: bolder;
    }
    table tbody {
        font-size: .75em;
    }
    td{
        text-align: center;
        word-break: break-word;
        display: table-cell;
        vertical-align: inherit;
        padding: 10px;
    }

</style>

<template>
    <div style="width: 100%">



        <div style="font-size: 0.9em; margin: 1em 0px;">
            <span style="color: rgb(21, 143, 197); font-weight: bold;">
                玩家
            </span>
            <span style="margin-left: 0.5em; width: 60%; display:inline-block">
                <q-select
                    filled
                    v-model="doc"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    :options="filterDocs"
                    @filter="filterFn"
                    style="width: 80%; padding-bottom: 0px"
                >
                    <template v-slot:no-option>
                    <q-item>
                        <q-item-section class="text-grey">
                        No results
                        </q-item-section>
                    </q-item>
                    </template> 
                </q-select>
            </span>
        </div>
        <table >
            <thead>
                <tr>
                    <td>博士</td>
                    <td>时间</td>
                    <td>寻访卡池</td>
                    <td>获得干员</td>
                </tr>
            </thead>
            <tbody>
                <GachaEntiy v-for="(gacha,index) in gachas" :key="gacha.ts+index" :gacha="gacha" />
            </tbody>
        </table>
        <ArkPagination
                :key="this.uid"
                v-if="pagination"
                :pageSize="pagination.pageSize"
                :total="pagination.total"
                :hook="jump"
        />
        <div style="font-size: 0.75em; color: rgb(86, 86, 86); margin: 1em 0px;">
            *1.可查询<b>不止30日、100条以内</b>有效数据，
        </div>
        <div style="font-size: 0.75em; color: rgb(86, 86, 86); margin: 1em 0px;">
            **2.查询结果可能与游戏内实际操作存在延迟。
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import GachaEntiy from "@/components/gacha/GachaEntiy";
    import ArkPagination from "@/components/ui/ArkPagination";
    export default {
        name: "GachaTable",
        components: {ArkPagination, GachaEntiy,},
        props:{
            callback: Function,
        },
        data(){
            return {
                docs: [],
                doc: {label: '全部',value: undefined,},
                filterDocs: {},
                gachas: [],
                page: 0,
                uid: undefined,
                pagination: undefined,
            }
        },
        methods: {
            initUsers(){
                axios.get('/api/ark/list.doc').then(res=>{
                    // this.docs=res.data
                    this.docs.push({
                        label: '全部',
                        value: undefined,
                    })
                    res.data.forEach(e => {
                        //console.log(e)
                        this.docs.push({
                            label: e.nickName,
                            value: e.uid,
                        })
                    });
                    this.filterDocs = this.docs
                })
            },
            ga(page,uid){
                axios.get('/api/ark/gacha',{
                    params: {
                        page,
                        uid,
                    }
                }).then(res=>{
                    //console.log(res)
                    this.gachas=res.data.data.list
                    this.pagination=res.data.data.pagination
                })
            },
            jump(page){
                this.ga(page,this.uid)
            },
            se(selection){
                console.log(selection)
                this.uid=selection.value
                this.callback(selection.value)
                this.jump(0)
            },

            filterFn (val, update, ) {
                //console.log(val, update, abort)
                update(() => {
                    const needle = val.toLowerCase()
                    this.filterDocs = this.docs.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
                })
            },
        },
        watch:{
            doc(newVal){
                console.log(newVal)
                this.se(newVal)
            }
        },
        mounted(){
            this.initUsers()
            this.jump(0)
        },
    }
</script>

