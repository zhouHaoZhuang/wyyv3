<template>
  <div class="home">
    <div class="topNav">
      <router-link to="/" @click="cNav" :class="cid == 0 ? 'reds' : ''"
        >推荐音乐</router-link
      >
      <router-link to="/Home/rege" @click="cNav" :class="cid == 1 ? 'reds' : ''"
        >热歌榜</router-link
      >
      <router-link to="/Home/sech" @click="cNav" :class="cid == 2 ? 'reds' : ''"
        >搜索</router-link
      >
    </div>
    <a class="dingti"></a>

    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { ref, toRaw } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";

export default {
  name: "Home",
  components: {},
  setup(props) {
    let cid = ref(0);
    const route = useRoute();
    let path = toRaw(route).path.value;
    if (path == "/Home/tuijian") cid.value = 0;
    if (path == "/Home/rege") cid.value = 1;
    if (path == "/Home/sech") cid.value = 2;
    onBeforeRouteUpdate((to) => {
      // console.log(to.path, "=====");
      let path = to.path;
      if (path == "/Home/tuijian") cid.value = 0;
      if (path == "/Home/rege") cid.value = 1;
      if (path == "/Home/sech") cid.value = 2;
    });

    function cNav(e) {
      if (e.path[0].innerText == "推荐音乐") cid.value = 0;
      if (e.path[0].innerText == "热歌榜") cid.value = 1;
      if (e.path[0].innerText == "搜索") cid.value = 2;
    }
    return {
      cNav,
      cid,
    };
  },
};
</script>
<style lang="less" scoped>
.reds {
  color: rgb(255, 3, 3) !important;
}
.topNav {
  display: flex;
  width: 7.5rem;
  font-size: 0.3rem;
  position: fixed;
  top: 0;
  left: 0;
  height: 0.8rem;
  z-index: 100;
  background-color: rgb(252, 252, 252);
  > a {
    flex: 1;
    display: block;
    text-align: center;
    text-decoration: none;
    height: 0.8rem;
    line-height: 0.8rem;
    color: #000;
    background-color: rgb(255, 255, 255);
    border-bottom: 1px solid rgb(206, 206, 206);
  }
}
.dingti {
  display: block;
  height: 0.8rem;
  width: 100%;
}
</style>
