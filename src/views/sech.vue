<template>
  <div>
    <div class="topint">
      <input type="text" @change="sechint" placeholder="搜索歌曲、歌手、专辑" />
    </div>

    <div v-if="!dataSech.mocList">
      <p class="sstit">热门搜索</p>
      <span
        @click="sechint"
        class="sechl"
        v-for="(v, i) in dataSech.rem"
        :key="i"
      >
        {{ v.first }}
      </span>
    </div>
    <div v-else class="sechList">
      <div
        v-for="v in dataSech.mocList"
        :key="v.id"
        :id="v.id"
        @click="mocInfo"
      >
        <p>{{ v.name }}</p>
        <p>{{ v.artists[0].name }}-{{ v.album.name }}</p>
        <div class="sgchfr">
          <img
            class="sgchply"
            src="https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880="
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "sech",
  setup(props) {
    let dataSech = reactive({
      rem: [],
      mocList: null,
    });
    let router = useRouter();

    const instance = getCurrentInstance();
    const { myaxios } = instance.appContext.config.globalProperties;
    myaxios.get(`https://autumnfish.cn/search/hot`).then((data) => {
      // console.log(data.data.result.hots);
      dataSech.rem = data.data.result.hots;
    });
    function sechint(e) {
      // console.log(e.path[0].innerText);
      myaxios
        .get(
          `http://localhost:3000/search?keywords= ${
            e.target.value || e.path[0].innerText
          }`
        )
        .then((data) => {
          // console.log(data.data.result.songs);
          dataSech.mocList = data.data.result.songs;
        });
    }
    function mocInfo(e) {
      // console.log(e.path[0].outerHTML);
      // console.log(e.path[1].id);
      if (e.target.tagName == "P") {
        router.push(`/mocInfo?id=${e.path[1].id}&name=${e.path[0].outerHTML}`);
      }
    }
    return {
      dataSech,
      sechint,
      mocInfo,
    };
  },
};
</script>

<style lang="less" scoped>
.sgchfr {
  position: absolute;
  right: 0.4rem;
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
.topint {
  width: 7.1rem;
  height: 0.6rem;
  margin: 0 auto;
  padding: 0.3rem 0.2rem;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(196, 196, 196);
  > input {
    border: 0;
    width: 6.3rem;
    height: 0.5rem;
    padding-left: 0.7rem;
    border-radius: 0.25rem;
    background-color: rgb(235, 236, 236);
  }
  > input:focus {
    outline: none;
  }
}
.sechl {
  display: inline-block;
  padding: 0.1rem;
  border: 1px solid rgb(218, 218, 218);
  margin: 0.1rem;
  border-radius: 0.7rem;
  font-size: 0.28rem;
  color: rgb(49, 49, 49);
}
.sstit {
  margin-left: 0.2rem;
  font-size: 0.24rem;
  color: rgb(136, 136, 136);
}
.sechList {
  width: 100%;
  > div {
    width: 100%;
    height: 1.1rem;
    margin-left: 0.2rem;
    box-sizing: border-box;
    position: relative;
    padding-top: 0.2rem;
    border-bottom: 1px solid rgb(218, 218, 218);
    p {
      margin: 0;
    }
    > p:nth-child(1) {
      width: 4rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    > p:nth-child(2) {
      font-size: 0.24rem;
      margin-top: 0.1rem;
      color: rgb(146, 146, 146);
    }
  }
}
</style>