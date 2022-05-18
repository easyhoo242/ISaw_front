<template>
  <div>
    <BranchCrumb route="数据统计" />

    <div class="grid grid-cols-3 gap-3">
      <Module class="h-50">
        <div class="grid grid-cols-2 gap-6">
          <div class="pl-5">
            <h5 class="mt-2 mb-5">今日新增文章：</h5>
            <div>
              <span class="text-blue-400 text-[2.23rem] pr-2">{{ 0 }}</span>
              篇
            </div>

            <div class="mt-10">
              <A
                class="mt-3 py-1 px-2 bg-gray-300 rounded-md text-gray-10 text-md"
                >去发表新文章
              </A>
            </div>
          </div>

          <div>
            <div class="data-item">
              过去7天发表 <span> {{ 0 }} </span> 篇
            </div>
            <div class="data-item">
              过去30天发表 <span> {{ 0 }} </span> 篇
            </div>
            <div class="data-item">
              总计发表 <span> {{ 0 }} </span> 篇
            </div>
            <div class="data-item">
              全部分类 <span> {{ 0 }} </span> 篇
            </div>
          </div>
        </div>
      </Module>
      <Module>
        <div>这是图表页面</div>
      </Module>
      <Module>
        <div>这是图表页面</div>
      </Module>
    </div>

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

        <Module title="点赞 & 评论" class="h-294px">
          <div class="flex items-center justify-center">
            <div id="agreeAndComment" style="width: 725px; height: 280px" />
          </div>
        </Module>
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

interface ImomentCountLine {
  name: string[]
  value: number[]
}

interface IMomentInfo {
  momentCount: IMomentCount[]
  momentLook: ImomentCountLine
  agreeCount: ImomentCountLine
  commentCount: ImomentCountLine
}

const momentInfo = reactive<IMomentInfo>({
  momentCount: [],
  momentLook: {
    name: [],
    value: []
  },
  agreeCount: {
    name: [],
    value: []
  },
  commentCount: {
    name: [],
    value: []
  }
})

const getData = async () => {
  const res = await requestMomentInfo()

  momentInfo.momentCount = res.data?.lookResult!

  res.data?.lookResult.forEach((res) => {
    momentInfo.momentLook.name.push(res.name)
    momentInfo.momentLook.value.push(res.lookCount)
  })

  res.data?.agreeResult.forEach((res) => {
    momentInfo.agreeCount.name.push(res.name)
    momentInfo.agreeCount.value.push(res.value)
  })

  res.data?.commentResult.forEach((res) => {
    momentInfo.commentCount.name.push(res.name)
    momentInfo.commentCount.value.push(res.value)
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
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(59, 130, 246)'
          },
          {
            offset: 1,
            color: '#448ef6'
          }
        ]),
        data: momentInfo.momentLook.value,
        label: {
          show: true,
          position: 'top',
          color: 'RGB(0,112,192)',
          fontSize: 12,
          fontWeight: 'bold'
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

  const agreeAndCommentChartDom = document.getElementById('agreeAndComment')!
  const agreeAndCommentChart = echarts.init(agreeAndCommentChartDom)
  let agreeAndCommentOption: EChartsOptionLine

  agreeAndCommentOption = {
    xAxis: {
      type: 'category',
      data: momentInfo.agreeCount.name
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '点赞',
        type: 'bar',
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(59, 130, 246)'
          },
          {
            offset: 1,
            color: '#448ef6'
          }
        ]),
        data: momentInfo.agreeCount.value,
        label: {
          show: true,
          position: 'top',
          // 文字的颜色，字体大小，字体加深
          color: 'RGB(0,112,192)',
          fontSize: 12,
          fontWeight: 'bold'
        },
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      },
      {
        name: '评论',
        type: 'bar',
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#f86'
          },
          {
            offset: 1,
            color: '#F60'
          }
        ]),
        data: momentInfo.commentCount.value,
        label: {
          show: true,
          position: 'top',
          // 文字的颜色，字体大小，字体加深
          color: 'RGB(0,112,192)',
          fontSize: 12,
          fontWeight: 'bold'
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

  momentLookOption && agreeAndCommentChart.setOption(agreeAndCommentOption)
}
</script>

<style lang="less" scoped>
.data-item {
  padding-top: 20px;

  &:first-child {
    padding-top: 15px;
  }

  span {
    color: rgb(96, 165, 250);
  }
}
</style>
