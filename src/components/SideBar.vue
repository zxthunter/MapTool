<template>
  <div class="sidebar">
    <ul class="nav nav-pills nav-stacked">
      <li><a v-link="{ path: '/' , exact: true }"><span>首页</span></a></li>
      <li><a v-link="{ path: '/new' , exact: true }"><span>新增学区</span></a></li>
      <li><a v-link="{ path: '/list' , exact: true }"><span>学区列表</span></a></li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
    }
  }
}
</script>

<style>
.sidebar{
  width:150px;
  float:left;
  height: 500px;
  text-align:center;
  margin-left: 5px;
  margin-right: 5px;
}
</style>