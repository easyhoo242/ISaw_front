<template>
  <div>
    <Module>
      <div>这是图表页面</div>
    </Module>

    <div class="flex h-150">
      <Module title="文章数" class="flex-grow-0 h-600px mr-3">
        <div id="momentCount" style="width: 600px; height: 550px" />
      </Module>

      <div class="flex-1">
        <Module title="浏览量" class="h-294px">
          <div class="flex items-center justify-center">
            <div id="momentLook" style="width: 725px; height: 280px" />
          </div>
        </Module>
        <Module title="最近发表" class="h-294px"> </Module>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { requestMomentInfo } from '~/api'
import * as echartsPet from 'echarts/core'
import * as echarts from 'echarts'
import {
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components'
import { PieChart, PieSeriesOption } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echartsPet.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
])

type EChartsOptionPet = echarts.ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption
>

type EChartsOptionLine = echarts.EChartsOption

interface IMomentCount {
  name: string
  value: number
}

interface IMomentInfo {
  momentCount: IMomentCount[]
  momentLook: {
    name: string[]
    value: number[]
  }
}

const momentInfo = reactive<IMomentInfo>({
  momentCount: [],
  momentLook: {
    name: [],
    value: []
  }
})

const getData = async () => {
  const res = await requestMomentInfo()

  console.log(res.data)

  momentInfo.momentCount = res.data?.lookResult!

  res.data?.lookResult.forEach((res) => {
    momentInfo.momentLook.name.push(res.name)
    momentInfo.momentLook.value.push(res.lookCount)
  })

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
  const momentCountCharDom = document.getElementById('momentCount')!
  const momentCountChar = echarts.init(momentCountCharDom)
  let momentCountOption: EChartsOptionPet

  momentCountOption = {
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

  momentCountOption && momentCountChar.setOption(momentCountOption)

  const momentLookChartDom = document.getElementById('momentLook')!
  const momentLookChart = echarts.init(momentLookChartDom)
  let momentLookOption: EChartsOptionLine

  momentLookOption = {
    xAxis: {
      type: 'category',
      data: momentInfo.momentLook.name
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '文章浏览量',
        type: 'bar',
        color: 'RGB(91,155,213)',
        data: momentInfo.momentLook.value,
        itemStyle: {
          //@ts-ignore
          normal: {
            label: {
              show: true,
              position: 'top',
              // 文字的颜色，字体大小，字体加深
              textStyle: {
                color: 'RGB(0,112,192)',
                fontSize: 12,
                fontWeight: 'bold'
              }
            }
          }
        },
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ],
    grid: {
      // @ts-ignore
      // x: 0,
      y: 20
    }
  }

  momentLookOption && momentLookChart.setOption(momentLookOption)
}
</script>

<style lang="less" scoped></style>
