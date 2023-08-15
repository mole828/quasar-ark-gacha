<template>
    <div>
        <div :id="`chart-${uid}`" style="width: 480px; height: 300px;"></div>
        <div v-if="Object.keys(analysis).length > 0 && analysis.user.uid != ''">
            <h5 style="margin: auto;">限定池:</h5>
            <a>
                博士抽了 {{ analysis.hasDraw.limited }} 抽都没出，
                连 {{ once }}%
                这么小的概率都能撞上，果然是杂鱼啊
            </a>
            <br>
            <a>
                杂鱼博士只有 {{
                    ten
                }}% 的概率在未来10抽抽到，合成玉都被吸干了呢好菜哦
            </a>
            <!-- <a>下一发六星的概率: {{ analysis.hasDraw.limited }}</a><br> -->
            <!-- <a>常驻池下一发六星的概率: {{ analysis.hasDraw.normal }}</a> -->
        </div>
    </div>
</template>

<script>
// 引入echarts
import * as echarts from 'echarts'
import axios from 'axios'
/**
 * @typedef {Object} UserData
 * @property {User} user
 * @property {Object.<string, number>} summary
 * @property {Object.<string, PoolData>} pools
 * @property {DrawStatus} hasDraw
 */

/**
 * @typedef {Object} User
 * @property {string} uid
 * @property {string} nickName
 * @property {string} token
 * @property {number} guest
 * @property {number} channelMasterId
 */

/**
 * @typedef {Object.<string, number>} PoolData
 */

/**
 * @typedef {Object} DrawStatus
 * @property {number} limited
 * @property {number} normal
 */


function once_probability(ds) {
    return Math.max(1, ds - 49) * 0.02
}

function cumulative_probability(ds) {
    let not_cumulative_probability = 1;
    for (let d = 0; d<ds; d++){
        not_cumulative_probability *= 1 - once_probability(d);
    }
    return 1 - not_cumulative_probability
}

export default {
    props: {
        uid: String,
    },
    data() {
        return {
            data: [],
            title: "",
            /**
             * @type {UserData}
             */
            analysis: {},
        }
    },
    methods: {
        initChart() {
            // 需要获取到element,所以是onMounted的Hook
            let chartDom = document.getElementById(`chart-${this.uid}`);
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
        console.log("anal mounted")
        axios.get('/api/ark/analysis', {
            params: {
                uid: this.uid,
            }
        }).then(res => {
            const { summary, user } = res.data
            this.title = user.nickName
            this.analysis = res.data
            let sum = 0;
            Object.values(summary).forEach(v => sum += v)
            console.log(summary)
            for (let rarity in summary) {
                let per = Number((summary[rarity] / sum) * 100).toFixed(2);
                this.data.push({
                    name: String(Number(rarity) + 1) + '星 ' + per + '%',
                    value: summary[rarity],
                })
            }
            this.initChart()
        })

    },
    computed: {
        once: function () {
            return ((1-cumulative_probability(this.analysis.hasDraw.limited))*100).toFixed(2)
        },
        ten: function () {
            return Number(
                (1 - (1 - cumulative_probability(this.analysis.hasDraw.limited + 10)) / (1 - cumulative_probability(this.analysis.hasDraw.limited))) * 100
            ).toFixed(2)
        }
    },
}
</script>
