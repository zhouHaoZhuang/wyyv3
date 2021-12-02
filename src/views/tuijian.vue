<template>
  <div>
    <p>编辑推荐</p>
    <!-- {{ JSON.stringify(dataTop.tuijisn)}} -->
    <div class="bjtjinfo">
      <div
        @click="tztjList"
        v-for="v in dataTop.tuijian"
        :key="v.id"
        :id="v.id"
      >
        <img :src="v.picUrl" alt="" />
        <p>{{ v.name }}</p>
        <span>🎧{{ (v.playCount / 10000).toFixed(1) + "万" }}</span>
      </div>
    </div>
    <p>最新音乐</p>
    <div class="mucList">
      <div v-for="v in dataTop.newMoc" :key="v.id" :id="v.id" @click="mocInfo">
        <p>{{ v.name }}</p>
        <p>{{ v.song.album.artists[0].name }}-{{ v.song.album.name }}</p>
        <div class="sgchfr">
          <img
            class="sgchply"
            src="https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880="
          />
        </div>
      </div>
    </div>
    <img src="../assets/wyybuttom.png" style="width: 100%" alt="" />
  </div>
</template>

<script>
import { getCurrentInstance, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "tuijian",
  setup(props) {
    let dataTop = reactive({
      tuijian: [],
      newMoc: [],
    });
    const router = useRouter();
    // console.log(router,route);
    function tztjList(e) {
      // console.log(e.path[1].id);
      router.push(`/tuijian2?id=${e.path[1].id}`);
    }

    // 调用全局配置的axios进行请求
    const instance = getCurrentInstance();
    const { myaxios } = instance.appContext.config.globalProperties;
    myaxios.get("https://autumnfish.cn/personalized?limit=6").then((data) => {
      // console.log(data.data.result);
      dataTop.tuijian = data.data.result;
      // console.log( dataTop.tuijisn[0]);
    });
    // console.log(a.value);
    // https://autumnfish.cn/personalized/newsong
    myaxios
      .get("https://autumnfish.cn/personalized/newsong?limit=10")
      .then((data) => {
        // console.log(data.data.result);
        dataTop.newMoc = data.data.result;
        // console.log( dataTop.tuijisn[0]);
      });

    function mocInfo(e) {
      if (e.target.tagName == "P") {
        // console.log(e.target.tagName == "P");
        // console.log(e.path[1].id);
        router.push(`/mocInfo?id=${e.path[1].id}&name=${e.path[0].outerHTML}`);
      }
    }

    return {
      dataTop,
      tztjList,
      mocInfo,
    };
  },
};
</script>

<style lang="less" scoped>
.bjtjinfo {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
  > div {
    width: 32%;
    position: relative;
    > img {
      width: 100%;
    }
    > p {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  span {
    position: absolute;
    right: 0;
    top: 0;
    color: rgb(255, 245, 245);
    font-size: 0.24rem;
    background-color: rgba(236, 231, 231, 0.158);
  }
}
.sgchfr {
  position: absolute;
  right: 0.2rem;
  top: 0.3rem;
  width: 0.5rem;
  height: 0.5rem;
  overflow: hidden;
  // background-color: rgb(255, 255, 255);
}
.sgchply {
  width: 3.6rem;
  margin-top: 0rem;
  margin-left: -25px;
}
.mucList {
  width: 100%;
  > div {
    height: 0.84rem;
    padding: 0.12rem 0;
    margin-left: 0.2rem;
    position: relative;
    border-bottom: 0.02rem solid rgb(196, 196, 196);
    > p {
      margin: 0;
    }
    > p:nth-child(2) {
      font-size: 0.24rem;
      color: rgb(148, 148, 148);
    }
  }
}
</style>