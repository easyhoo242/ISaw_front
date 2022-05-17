<template>
  <div>
    <Module>
      <div>这是图表页面</div>
    </Module>

    <div class="flex h-150">
      <Module title="文章量" class="flex-grow-0 h-600px mr-3">
        <div id="main" style="width: 600px; height: 550px" />
      </Module>

      <div class="flex-1">
        <Module title="最近发表" class="h-294px"> 
          
        </Module>
        <Module title="最近发表" class="h-294px"> </Module>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { requestMomentInfo } from '~/api'
import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components'
import { PieChart, PieSeriesOption } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
])

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption
>

interface IMomentCount {
  name: string
  value: number
}
const momentInfo = reactive<{ momentCount: IMomentCount[] }>({
  momentCount: []
})

const getData = async () => {
  const res = await requestMomentInfo()

  momentInfo.momentCount = res.data!

  new Promise((resolve) => {
    resolve(1)
  }).then(function () {
    EChartsInit()
  })
}

onMounted(() => {
  getData()
})

const EChartsInit = () => {
  const chartDom = document.getElementById('main')!
  const myChart = echarts.init(chartDom)
  let option: EChartsOption

  option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '文章数量',
        type: 'pie',
        radius: ['30%', '75%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 1
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: momentInfo.momentCount
      }
    ]
  }

  option && myChart.setOption(option)
}
</script>

<style lang="less" scoped></style>
