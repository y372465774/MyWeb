<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> --> 
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Header /> -->
    <el-container style="height: 1000px; border: 1px solid #eee">
      <xxxAside /> 
      <xxxContent />
    </el-container>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
//import Header from './components/Header.vue'
import xxxAside from './components/xxxAside.vue'
import xxxContent from './components/xxxContent.vue'

export default {
  name: 'app',
  components: {
    xxxAside,
    xxxContent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
