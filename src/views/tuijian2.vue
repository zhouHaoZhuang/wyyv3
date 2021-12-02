<template>
  <div v-if="tuijLi">
    <div v-if="tuijLi.playlist" class="titletj">
      <div class="left_Top">
        <img :src="tuijLi.playlist.coverImgUrl" alt="" />
        <span>{{ (tuijLi.playlist.playCount / 10000).toFixed(1) }}万</span>
      </div>
      <div class="right_Top">
        <p>{{ tuijLi.playlist.name }}</p>
        <img :src="tuijLi.playlist.creator.avatarUrl" alt="" />
        <span class="namem">{{ tuijLi.playlist.creator.nickname }}</span>
      </div>
      <div>
        <div>
          <img :src="tuijLi.playlist.coverImgUrl" alt="" />
        </div>
      </div>
    </div>
    <p class="listtit">歌曲列表</p>
    <div class="moc_all">
      <div v-for="(val, i) in tuijLi.tracks" :id="val.id" :key="val.id" @click="mocInfo">
        <div>
          {{ i + 1 }}
        </div>
        <div class="list">
          <p>{{ val.name }}</p>
          <p>{{ val.ar[0].name }}-{{ val.al.name }}</p>
          <div class="sgchfr"><img class="sgchply" src="https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, reactive } from "vue";

import { useRouter, useRoute } from "vue-router";

export default {
  name: "tuijian2",
  setup(props) {
    let route = useRoute();
    let router = useRouter();

    let { id } = route.query;
    // console.log(id);
    let tuijLi = reactive({
      playlist: null,
      privileges: null,
      tracks: null,
    });
    function mocInfo(e) {
      // console.log(e.path[0].outerHTML);
      // console.log(e.path[2].id);
      if (e.target.tagName == "P") {

      router.push(`/mocInfo?id=${e.path[2].id}&name=${e.path[0].outerHTML}`);
      }
    }
    const instance = getCurrentInstance();
    const { myaxios } = instance.appContext.config.globalProperties;
    myaxios
      .get(`http://localhost:3000/playlist/detail?id=${id}`)
      .then((data) => {
        tuijLi.playlist = data.data.playlist;
        tuijLi.privileges = data.data.privileges;
        tuijLi.tracks = data.data.playlist.tracks;
        // console.log(data.data);
      });

    return {
      tuijLi,
      mocInfo
    };
  },
};
</script>

<style lang="less" scoped>
.moc_all {
  width: 100%;
  > div {
    width: 100%;
    box-sizing: border-box;
    padding: 0.1rem;
    display: flex;
    align-items: center;
    height: 1.08rem;
    border-bottom: 0.02rem solid rgb(194, 194, 194);
    > div:nth-child(1) {
      width: 0.7rem;
      text-align: center;
    }
    > div:nth-child(2) {
      > p {
        margin: 0;
      }
      > p:nth-child(1) {
        width: 6.4rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      > p:nth-child(2) {
        font-size: 0.24rem;
        color: rgb(102, 102, 102);
      }
    }
  }
}
.namem {
  position: relative;
  top: -0.2rem;
  left: 0.2rem;
}
.list{
  position: relative;
}
.sgchfr {
  position: absolute;
  right: .05rem;
  top: 0.15rem;
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
.listtit {
  margin: 1rem 0 0.4rem;
  font-size: 0.3rem;
  width: 100%;
  background-color: rgb(224, 224, 224);
}
.titletj {
  display: flex;
  width: 100%;
  height: 2.52rem;
  padding: 0.6rem 0.3rem 0.2rem;
  box-sizing: border-box;
  > div:nth-child(3) {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 7.5rem;
    overflow: hidden;
    height: 3.52rem;
    > div {
      width: 7.5rem;
      filter: blur(12px);
      height: 3.52rem;
      transform: scale(1.2);
      background-color: rgb(0, 0, 0);
      > img {
        width: 7.5rem !important;
        opacity: 0.6;
      }
    }
  }
}
.left_Top {
  position: relative;
  z-index: 100;
  width: 2.52rem;
  > img {
    width: 2.52rem;
  }
  > span {
    position: absolute;
    right: 0;
    color: rgb(255, 255, 255);
    background-color: rgba(133, 133, 133, 0.486);
  }
}
.right_Top {
  filter: blur(0px);
  position: relative;
  margin-left: 0.2rem;
  z-index: 100;
  color: rgb(255, 255, 255);

  > img {
    width: 0.6rem;
    border-radius: 0.3rem;
  }
}
</style>