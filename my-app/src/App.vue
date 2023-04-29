<template>
  <div id="app">
      <router-view></router-view>   <!-- 当前组件下的路由展示区 -->
  </div> 
</template>

<script>
  export default {
    name: 'App',
    data(){
      return {
      }
    },
  }
</script>

<style lang="less">
  html,body,h3,p{       /*修改标签默认样式*/
    margin: 0;
    padding: 0;
  };
  html{
    background-color: rgb(243,243,243);
  }
</style>
