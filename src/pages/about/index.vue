<template>
  <div class="mt-20">
    <div class="profile-wrap">
      <div
        class="avatar-wrap"
        :style="{ backgroundImage: `url(${BASE_HEAD_LOGO})` }"
      />
      <!-- :style="{ backgroundImage: `url(${profile.avatar})` }" -->

      <div class="main-wrap">
        <div class="header">
          <h3>CTWood</h3>
          <h4>杜 成</h4>
        </div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="body">
          全日制本科计算机专业大四准毕业生，一年前端开发经验 <br />
          熟练掌握JavaScript、TypeScript、Node.js、Koa、Vue2、
          Vue3、MYSQL等语言或技术， <br />
          具备 Web 全栈独立开发能力。<br />
          爱好上网、游戏、技术研究，完美主义者，细节控。
        </div>
        <div v-if="profile.email" class="footer">
          <span v-if="profile.email" title="Email">
            <!-- <font-awesome-icon :icon="['far', 'envelope']" /> -->

            <A href="https://gitee.com/Isaw/vitesse-blog" target="_blank">
              {{ `gitee地址: https://gitee.com/Isaw` }}
            </A>
          </span>
        </div>

        <div class="body mt-3">
          {{
            `网站logo寓意 绽放 
          三个色彩取自打印机中的三原色即CMYK中的C（青）M（品）Y（黄），
          打印机用这三种颜色打印出绚丽的图片，
          论坛中的各位从讨论中获得多元多彩的结果；`
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUserDetail, BASE_HEAD_LOGO } from '~/api'
import type { IUserInfoType } from '~/api'

// @ts-ignore
const profile = ref<IUserInfoType>({})

const getData = async () => {
  const res = await getUserDetail(38)

  profile.value = res.data!
}

onMounted(() => {
  getData()
})
</script>

<style lang="less" scoped>
.profile-wrap {
  background-image: linear-gradient(-90deg, #00bcd4 0, #1890ff 100%);
  border-radius: 10px;
  max-width: 680px;
  margin: 0 auto;
  position: relative;
  padding: 30px;
  top: 85px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  .avatar-wrap {
    width: 120px;
    height: 120px;
    background-size: contain;
    background-color: #ccc;
    border-radius: 50%;
    border: 3px solid #fff;
    position: absolute;
    top: -60px;
    left: 50%;
    margin-left: -60px;
  }

  .main-wrap {
    color: #fff;
    padding-top: 55px;

    .header {
      text-align: center;

      h3 {
        font-size: 36px;
        color: #fff;
        font-weight: 300;
        margin-bottom: 5px;
      }

      h4 {
        font-size: 32px;
        color: #fff;
        font-weight: 400;
      }
    }

    .body {
      font-size: 16px;
      margin-top: 30px;
      white-space: pre-line;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      font-size: 15px;

      a {
        color: #fff;
        display: block;
      }
    }
  }
}

.empty-profile {
  padding-top: 150px;
}
</style>
