<template>
    <div id="main" style="width: 480px;height: 300px"></div>
</template>

<script>
    // 引入echarts
    import * as echarts from 'echarts'
    import axios from 'axios'

    export default {
        props: {
            uid: String,
        },
        data(){
            return{
                data:[],
                title: "",
            }
        },
        methods: {
            initChart(){
                // 需要获取到element,所以是onMounted的Hook
                let chartDom = document.getElementById('main');
                let myChart = echarts.init(chartDom);
                let option;
                option = {
                    title: {
                        text: '抽卡统计',
                        subtext: this.title,
                        left: 'right'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [
                        {
                            name: 'Access From',
                            type: 'pie',
                            radius: '50%',
                            data: this.data,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                option && myChart.setOption(option);
            },
        },
        mounted() {
            axios.get('https://www.moles.top/api/ark/statistic',{
                params: {
                    uid: this.uid,
                }
            }).then(res=>{
                this.title=res.data.nickName
                for(let i in res.data.rar) {
                    let per = Number((res.data.rar[i]/res.data.sum) * 100).toFixed(2);
                    this.data.push({
                        name: String(Number(i)+1)+'星 '+per+'%',
                        value: res.data[i],
                    })
                }
                this.initChart()
            })

        },
    }
</script>
