<template>
  <div>
    <BranchCrumb route="数据统计" />

    <div class="grid grid-cols-3 gap-3">
      <LatelyData :data="latelyData.moment" />

      <LatelyData :data="latelyData.look" title="浏览" />

      <LatelyData :data="latelyData.comment" title="评论" />
    </div>

    <div class="flex h-150 mb-3">
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

    <Module title="每日动态" class="h-294px mt-[1.70rem]">
      <div class="flex items-center justify-center">
        <div id="dataByDay" style="width: 2050px; height: 280px" />
      </div>
    </Module>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { requestMomentInfo, requestMomentData, requestDataByDay } from '~/api'
import type { ILatelyDataType } from '~/api'
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
import LatelyData from '../../components/page/charts/latelyData.vue'

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

type EChartsOption = echarts.EChartsOption

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

interface ILatelyData {
  moment: ILatelyDataType
  look: ILatelyDataType
  like: ILatelyDataType
  comment: ILatelyDataType
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

const latelyData = reactive<ILatelyData>({
  // @ts-ignore
  moment: {},
  // @ts-ignore
  look: {},
  // @ts-ignore
  like: {},
  // @ts-ignore
  comment: {}
})

interface IDataByDay {
  datatime: string[]
  moment: number[]
  look: number[]
  agree: number[]
  comment: number[]
}

const dataByDay = reactive<IDataByDay>({
  datatime: [],
  moment: [],
  look: [],
  agree: [],
  comment: []
})

const getData = async () => {
  const res = await requestMomentInfo()

  Promise.all(
    [...'0123'].map((number) => requestMomentData(parseInt(number)))
  ).then((res) => {
    res.forEach((item, index) => {
      const indexOfLatelyData = Object.keys(latelyData)[index]

      // @ts-ignore
      latelyData[indexOfLatelyData as keyof latelyData] = item.data
    })
  })

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

  const byDay = (await requestDataByDay()).data!

  dataByDay.datatime = byDay.momentCount.map((res) => res.datatime)
  dataByDay.moment = byDay.momentCount.map((res) => parseInt(res.value))
  dataByDay.look = byDay.lookCount.map((res) => parseInt(res.value))
  dataByDay.agree = byDay.agreeCount.map((res) => parseInt(res.value))
  dataByDay.comment = byDay.commentCount.map((res) => parseInt(res.value))

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
  // 文章按类型分
  const momentCountCharDom = document.getElementById('momentCount')!
  const momentCountChar = echarts.init(momentCountCharDom)
  let momentCountOption: EChartsOptionPet

  momentCountOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
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

  // 浏览量 按类型
  const momentLookChartDom = document.getElementById('momentLook')!
  const momentLookChart = echarts.init(momentLookChartDom)
  let momentLookOption: EChartsOptionLine

  momentLookOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    xAxis: {
      type: 'category',
      data: momentInfo.momentLook.name
    },
    yAxis: {
      type: 'value'
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

  //  点赞评论 按类型
  const agreeAndCommentChartDom = document.getElementById('agreeAndComment')!
  const agreeAndCommentChart = echarts.init(agreeAndCommentChartDom)
  let agreeAndCommentOption: EChartsOptionLine

  agreeAndCommentOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    xAxis: {
      type: 'category',
      data: momentInfo.agreeCount.name
    },
    yAxis: {
      type: 'value'
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

  //  每天的所有数据

  const dataByDayChartDom = document.getElementById('dataByDay')!
  const dataByDayChart = echarts.init(dataByDayChartDom)
  let dataByDayOption: EChartsOption

  dataByDayOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    legend: {
      data: ['文章数量', '浏览人次', '点赞数', '评论数']
    },
    xAxis: [
      {
        type: 'category',
        data: dataByDay.datatime,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '数量',

        interval: 5,
        axisLabel: {
          formatter: '{value} 篇'
        }
      },
      {
        type: 'value',
        name: '人次',
        interval: 10,
        axisLabel: {
          formatter: '{value} 次'
        }
      }
    ],
    series: [
      {
        name: '文章数量',
        type: 'bar',
        tooltip: {
          // @ts-ignore
          valueFormatter: function (value: number) {
            return value + ' 篇'
          }
        },
        data: dataByDay.moment
      },
      {
        name: '浏览人次',
        type: 'line',
        tooltip: {
          // @ts-ignore
          valueFormatter: function (value: number) {
            return value + ' 次'
          }
        },
        data: dataByDay.look
      },
      {
        name: '点赞数',
        type: 'bar',
        yAxisIndex: 1,
        tooltip: {
          // @ts-ignore
          valueFormatter: function (value: number) {
            return value + ' 次'
          }
        },
        data: dataByDay.agree
      },
      {
        name: '评论数',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          // @ts-ignore
          valueFormatter: function (value: number) {
            return value + ' 次'
          }
        },
        data: dataByDay.comment
      }
      // {
      //   name: '点赞数',
      //   type: 'line',
      //   yAxisIndex: 1,
      //   tooltip: {
      //     // @ts-ignore
      //     valueFormatter: function (value: number) {
      //       return value + ' 次'
      //     }
      //   },
      //   data: dataByDay.agree
      // }
    ]
  }

  dataByDayOption && dataByDayChart.setOption(dataByDayOption)
}
</script>

<style lang="less" scoped></style>
