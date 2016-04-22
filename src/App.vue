<template>
  <div id="app" class="container-fluid">
    <titlebar></titlebar>
    <sidebar></sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import sidebar from './components/SideBar'
import titlebar from './components/TitleBar'

export default {
  components: {
    sidebar,
    titlebar
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  padding: 0;
  margin: 0;
  height: 100%;
  width:100%;
}

</style>
