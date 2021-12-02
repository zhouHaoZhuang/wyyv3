<template>
  <div class="rege">
    <div class="ups">
      <img
        src="https://s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg?f01a252389c26bcf016816242eaa6aee="
        alt=""
      />
      <div class="regbLogo">
        <img
          src="https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880="
          alt=""
        />
      </div>

      <span class="updata"
        >更新日期：{{ dataAll.date[1] }}月{{ dataAll.date[2] }}日</span
      >
    </div>

    <div class="mocList">
      <div
        v-for="(v, i) in dataAll.list"
        :key="v.id"
        :id="v.id"
        @click="mocInfo"
      >
        <div>
          {{ i + 1 > 9 ? i + 1 : "0" + (i + 1) }}
        </div>
        <div class="List">
          <p>
            {{ v.name }}<span>{{ v.alia[0] || "" }}</span>
          </p>
          <p>{{ v.ar[0].name }}-{{ v.al.name }}</p>
          <div class="sgchfr">
            <img
              class="sgchply"
              src="https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880="
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "rege",
  // https://music.163.com/api/playlist/detail?id=3778678
  setup(props) {
    let dataAll = reactive({
      date: "",
      list: [],
    });
    let router = useRouter();

    const instance = getCurrentInstance();
    const { myaxios } = instance.appContext.config.globalProperties;
    myaxios
      .get("http://localhost:3000/playlist/detail?id=3778678")
      .then((data) => {
        // console.log(data.data.playlist.updateTime);
        let date = new Date(data.data.playlist.updateTime);
        date = date.toLocaleDateString().split("/");
        dataAll.date = date;

        // console.log(date.toLocaleDateString(),date,"------");
        dataAll.list = data.data.playlist.tracks;
      });

    function mocInfo(e) {
      // console.log(e.path[0].outerHTML);
      // console.log(e.path[2].id);
      if (e.target.tagName == "P") {
        router.push(`/mocInfo?id=${e.path[2].id}&name=${e.path[0].outerHTML}`);
      }
    }
    return {
      dataAll,
      mocInfo,
    };
  },
};
</script>

<style lang="less" scoped>
.List {
  position: relative;
  > p:nth-child(1) {
    width: 5.2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.sgchfr {
  position: absolute;
  right: 0.2rem;
  top: 0.1rem;
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
.mocList {
  width: 100%;
  > div:nth-child(1) > div:nth-child(1),
  > div:nth-child(2) > div:nth-child(1),
  > div:nth-child(3) > div:nth-child(1) {
    color: rgb(255, 84, 84);
  }
  > div {
    width: 100%;
    display: flex;
    align-items: center;
    height: 1.08rem;
    > div:nth-child(1) {
      width: 0.8rem;
      text-align: center;
    }
    > div:nth-child(2) {
      width: 7rem;
      border-bottom: 0.02rem solid rgb(212, 212, 212);
      > p {
        margin: 0;
      }
      > p:nth-child(2) {
        font-size: 0.24rem;
        color: rgb(138, 138, 138);
        margin: 0.05rem 0;
      }
    }
  }
}
.rege {
  position: relative;
  top: 0;
  z-index: 10;
  .ups {
    position: relative;
  }
  > .ups > img {
    width: 100%;
  }
}
.updata {
  position: absolute;
  left: 0.4rem;
  top: 2.1rem;
  color: #fff;
  font-size: 0.24rem;
  z-index: 200;
}
.regbLogo {
  width: 2.6rem;
  height: 1.4rem;
  overflow: hidden;
  position: absolute;
  top: 0.75rem;
  left: 0.4rem;
  > img {
    width: 3rem;
    margin-top: -25px;
    margin-left: -0.4rem;
  }
}
</style>
