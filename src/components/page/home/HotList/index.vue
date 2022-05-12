<template>
  <div class="hotlist flex flex-col">
    <Hot :data="hotList || list" />
    <a-pagination
      :current="currentPage"
      :pageSize="10"
      :total="total || 200"
      show-quick-jumper
      hideOnSinglePage
      class="my-3"
      @change="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { requestMomentAll } from '~/api'
import type { IMomentType } from '~/api'

export default defineComponent({
  setup() {
    const currentPage = ref(1)
    const total = ref(0)
    const hotList = ref<IMomentType[]>([])

    const getData = async () => {
      const res = await requestMomentAll(currentPage.value)

      hotList.value = res.data?.list!
      total.value = res.data?.momentCount!
    }

    const handlePageChange = (page: number) => {
      currentPage.value = page
      getData()

      window.scrollTo({
        top: 992,
        behavior: 'smooth'
      })
    }

    onMounted(() => {
      getData()
    })

    const list = [
      {
        momentId: 54,
        title: '候要京',
        content:
          '入响统由所整议达温光广由高地。决及该群名所样件干手细入。拉调劳复委后带将格物的化基称命思。给许律龙连气级他计热而派变更金好阶。道须由便年计上月与期为前革了。 重海量完两何代增花属清给。老已重标志将信太完候但六事转。么存见特边须党这界这提半整。路观须性任才量统接该八比着着该常。 道想际亲局影做定此长准特新证体南圆眼。好张叫收交际县间于果商使力。动十满千利则元真门行节水他认。众科达活新称育西取军北听空。石例众斗次江当看里将直是参农般。',
        createTime: '2022-05-10T13:00:24.000Z',
        updateTime: '2022-05-10T18:16:05.000Z',
        author: {
          id: 38,
          nickname: 'ctwood',
          avatarUrl: 'http://localhost:8000/users/38/avatar'
        },
        images: null,
        commentCount: 0,
        agree: 2,
        isAgree: 1,
        label: {
          id: 3,
          name: '闲言碎语'
        }
      },
      {
        momentId: 55,
        title: '东动步验面正于',
        content: '电过小形响第算状省做对等后增率际。',
        createTime: '2022-05-10T13:00:50.000Z',
        updateTime: '2022-05-11T23:54:08.000Z',
        author: {
          id: 38,
          nickname: 'ctwood',
          avatarUrl: 'http://localhost:8000/users/38/avatar'
        },
        images: null,
        commentCount: 0,
        agree: 1,
        isAgree: 1,
        label: {
          id: 3,
          name: '闲言碎语'
        }
      },
      {
        momentId: 1,
        title: '这是标题哦',
        content: '我认为php是世界上最好的语言',
        createTime: '2022-05-10T12:55:23.000Z',
        updateTime: '2022-05-11T23:54:13.000Z',
        author: {
          id: 38,
          nickname: 'ctwood',
          avatarUrl: 'http://localhost:8000/users/38/avatar'
        },
        images: [
          'http://localhost:8000/moment/picture/b21d1a3b3e550a4ff7a94c2b85548044-y'
        ],
        commentCount: 9,
        agree: 0,
        isAgree: 0,
        label: {
          id: 3,
          name: '闲言碎语'
        }
      },
      {
        momentId: 59,
        title: '派候研为',
        content:
          '主东部比海变集天满有持报图查县带。从面作一水各强保风火通业角更就。表合周整作接时新例影出备接派种。响教性效相组系可住月力级周。 形安儿始实命战问七属个少形空重。形连研其别相标好王器验声南克。必本全斯了基带内方质口育率。领张八身再持候种划光类达。 江圆称单对作外基知能斗史书往然马入。集过象花队指你结好天支人保会说且。此点强形基有儿又红备快被。各种米家北农许代离给构中设号界。它使省来越根等必便团民山却进他。',
        createTime: '2022-05-11T16:47:31.000Z',
        updateTime: '2022-05-11T17:09:36.000Z',
        author: {
          id: 38,
          nickname: 'ctwood',
          avatarUrl: 'http://localhost:8000/users/38/avatar'
        },
        images: null,
        commentCount: 0,
        agree: 0,
        isAgree: 0,
        label: {
          id: 3,
          name: '闲言碎语'
        }
      },
      {
        momentId: 60,
        title: '连名十区王',
        content:
          '识增力老二引真料每指老须石少对道。酸而及加空今整北放关众生式科四。府经平同发器被是外每八立起全格龙决。角济等被几样记确义角最导复并位律。 管着取就因法目合流你况际院联研。构系权时路历每商用与极消便林省得指着。报将学张拉后于习查业织系细如文经它十。务成众设只深色或可矿引议连都特周。性今住会华步斗走商美场育当千。比成区维光快变细度深八向自力日节下。建保六据众理然机程确北风斗型示。 观近快活去周相力法明精万几干飞。引包别得已装才量红风运转党。派一手老入段很儿生高确线子习新值油。深结非变温我团总经造下京极它图型最。质集所门准论收满解来机候。论广速准加合低须技实反商东容。',
        createTime: '2022-05-11T16:47:33.000Z',
        updateTime: '2022-05-11T17:09:36.000Z',
        author: {
          id: 38,
          nickname: 'ctwood',
          avatarUrl: 'http://localhost:8000/users/38/avatar'
        },
        images: null,
        commentCount: 0,
        agree: 0,
        isAgree: 0,
        label: {
          id: 3,
          name: '闲言碎语'
        }
      },
      {
        momentId: 61,
        title: '反表具之过',
        content:
          '思置该两资近龙建备什信海再。小清接增红位程电无安员专技收研准。回划家铁流圆满号们之须反。经统运质即图龙林起此无流器维道族热农。界解西有压族七东越之八多。易而层南往安边口极别音对式。非需心传离没王约成识阶马间特用装完。 律干合打便律形反建定指广地从选以交。重证各转龙干到商新究局再么响。市划强只严直且向重队会值样但原。收山如队了治电快干布布断思。 百人作四划两其它论老保己党红。圆变要需住总量离己反产极。王同候交来群下可力无但力。共府极国收际证团那资得种打文。见就万质金道于织米或命律。',
        createTime: '2022-05-11T16:47:35.000Z',
        updateTime: '2022-05-11T17:09:36.000Z',
        author: {
          id: 38,
          nickname: 'ctwood',
          avatarUrl: 'http://localhost:8000/users/38/avatar'
        },
        images: null,
        commentCount: 0,
        agree: 0,
        isAgree: 0,
        label: {
          id: 3,
          name: '闲言碎语'
        }
      }
    ]

    return {
      hotList,
      list,
      total,
      currentPage,
      handlePageChange
    }
  }
})
</script>
