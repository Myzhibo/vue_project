<template>
  <div id="app">
      <router-link to="/home">home</router-link>  <br>
      <router-link to="/user">user</router-link>
      <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  data(){
    return {
        a:1
    }
  },
  components: {
    HelloWorld,
  }
}
</script>

<style>
</style>
