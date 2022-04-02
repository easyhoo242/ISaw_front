<template>
  <div class="hotlist flex flex-col mt-3">
    <Module class="module flex">
      <div class="logo flex-0 w-210px h-158px rounded-md overflow-hidden mr-5">
        <img
          src="https://www.talklee.com/zb_users/upload/2021/12/202112311640917749854303.png"
          alt=""
        />
      </div>

      <div class="hotlist-content flex-1 pr-3">
        <div class="title flex items-center">
          <div class="hot-tag mr-2">热文</div>
          <div class="text-lg">恭喜你通关2021，进入下一关2022</div>
        </div>

        <div class="content text-sm my-3">
          律回春渐，新元肇启，烟火夜白。朝朝暮暮，沉淀过往，迎来新光。还有十几个小时，我们将跨越2021，进入2022，你的时光列车即将出发。回顾这一年，你有没有哪一刻感觉自己被上天眷顾到了?这一年，人类仍然生活在扫雷游戏里。...
          律回春渐，新元肇启，烟火夜白。朝朝暮暮，沉淀过往，迎来新光。还有十几个小时，我们将跨越2021，进入2022，你的时光列车即将出发。回顾这一年，你有没有哪一刻感觉自己被上天眷顾到了?这一年，人类仍然生活在扫雷游戏里。...
        </div>

        <div class="footer pt-2 flex items-center justify-between">
          <div class="tag flex-1 flex items-center">
            <span>🕒2021-12-31</span>
            <span>👁‍🗨1.75 K 阅读</span>
            <span>💬6 评论</span>
          </div>
          <div class="who flex-0">
            <!-- <a-icon></a-icon> -->
            🏆 ISaw
          </div>
        </div>
      </div>
    </Module>
  </div>
</template>

<style lang="less" scoped>
.module {
  .logo {
    img {
      max-width: 100%;
      height: 100%;
    }
  }

  .hotlist-content {
    .content {
      line-height: 1.8 !important;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .footer {
      .tag {
        span {
          margin-right: 12px;
        }
      }
    }
  }
}

.hot-tag {
  background-color: #ff9627;
  border-radius: 2px;
  color: #fff;
  font-size: 12px;
  padding: 2px 4px;
}
</style>
