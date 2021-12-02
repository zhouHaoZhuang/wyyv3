<template>
  <div class="info" v-if="mocUrl">
    <!-- {{mocUrl.name}} -->
    <h3 v-html="mocUrl.name"></h3>
    <div class="geci">
      <p v-html="mocUrl.geci"></p>
    </div>
    <div class="bof">
      <!-- <iframe
        frameborder="0"
        border="1"
        marginwidth="0"
        marginheight="0"
        width="100%"
        height="130"
        :src="'//music.163.com/outchain/player?type=2&id='+mocUrl.id+'&auto=1&height=80'"
      >
      </iframe> -->
      <iframe
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        width="100%"
        height="220"
        :src="
          'http://music.163.com/outchain/player?type=2&id=' +
          mocUrl.id +
          '&auto=0&height=80'
        "
      >
      </iframe>

      <!-- <audio class="audio" :src="mocUrl.url" controls="controls"></audio> -->
    </div>
    <div class="pinglunqu">
      <h3>精彩评论</h3>
      <div v-for="v in mocUrl.pinglun" :key="v.commentId">
        <div class="userInfo">
          <div class="userImg">
            <img :src="v.user.avatarUrl" alt="" />
          </div>
          <div>
            <p>{{ v.user.nickname }}</p>
            <p>{{ new Date(v.time).toLocaleDateString() }}</p>
          </div>
          <p>{{ v.likedCount }}👍</p>
        </div>
        <p class="pltext">{{ v.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { getCurrentInstance, reactive } from "vue";

export default {
  name: "mocInfo",
  setup(props) {
    let route = useRoute();
    let mocUrl = reactive({
      url: null,
      name: "",
      geci: "",
      pinglun: [],
      id: "",
    });
    let { id, name } = route.query;
    mocUrl.name = name;
    // console.log(id);
    mocUrl.id = id;
    const instance = getCurrentInstance();
    const { myaxios } = instance.appContext.config.globalProperties;
    myaxios.get(`http://localhost:3000/song/url?id=${id}`).then((data) => {
      mocUrl.url = data.data.data[0].url;
      // console.log(data.data.data[0].url);
    });
    myaxios.get(`http://localhost:3000/lyric?id=${id}`).then((data) => {
      let str = data.data.lrc.lyric.replace(/\[/g, "<br/>[");
      //   console.log(str);
      mocUrl.geci = str;
    });
    // /comment/music?id=186016&limit=1
    myaxios
      .get(`http://localhost:3000/comment/music?id=${id}&limit=1`)
      .then((data) => {
        mocUrl.pinglun = data.data.hotComments;
        // console.log(data.data.hotComments);
      });
    // ?id=33894312
    return { mocUrl };
  },
};
</script>

<style lang="less" scoped>
.userInfo {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  // justify-content: space-between;

  p {
    margin: 0;
  }
  > div:nth-child(2) {
    margin-left: 0.2rem;
    > p:nth-child(2) {
      font-size: 0.24rem;
    }
  }
  > p {
    position: absolute;
    right: 0;
    font-size: 0.24rem;
    color: rgb(145, 145, 145);
  }
}
.pltext {
  border-bottom: 1px solid rgb(158, 158, 158);
  padding-bottom: 0.4rem;
  margin-left: 0.8rem;
}
.userImg {
  width: 0.6rem;
  height: 0.6rem;
  img {
    width: 100%;
    border-radius: 50%;
  }
}
.pinglunqu {
  background-color: #fff;
  width: 100%;
  border-radius: 0.4rem;
  margin: 0 auto;
  padding-top: 0.4rem;
  box-sizing: border-box;
  padding: 0.4rem 0.2rem;
  h3 {
    color: #000;
    text-align: left;
    margin-bottom: 0.4rem;
  }
}
.geci {
  width: 95%;
  height: 8.6rem;
  margin: 0 auto;
  overflow: auto;
  border: 1px solid rgb(212, 212, 212);
  padding: 0.1rem;
  background-color: rgba(160, 160, 160, 0.226);
  color: rgb(255, 255, 255);
}
h3 {
  text-align: center;
  color: rgb(255, 255, 255);
  margin: 0;
  overflow: hidden;
  > p {
    margin: 0, 0 !important;
  }
}
.info {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;

  background-image: radial-gradient(circle, rgb(12, 23, 124), rgb(8, 11, 54));
}
.bof {
  position: relative;
  top: 0.1rem;
  width: 100%;
  background-color: rgb(255, 255, 255);
  height: 5rem;
  border-radius: 0.4rem;
  margin: 0.4rem auto;

  // .audio {
  //   margin-top: 0.2rem;
  //   height: 0.6rem;
  // }
}
</style>