<template>
<div id="mapview">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title" id="myModalLabel">请按一定顺序点出您所需要的边界点</h4>
  </div>
  <div class="modal-body">
    <div id="tip">
      <input type="text" id="keyword" name="keyword" value="请输入关键字：(选定后搜索)" onfocus='this.value=""'/>
    </div>
    <div id="map-container"></div>
  </div>
  <div class="modal-footer">
    <button v-on:click="makePolygon" type="button" class="btn btn-success">连成回路</button>
    <button v-on:click="clear" type="button" class="btn btn-warning">清空点列</button>
    <button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>  
  </div>
</div>
</template>

<script>
import mapview from '../script/MapView.js'
var mv = mapview()
module.exports = {
  components: {
  },
  ready: function () {
    mv.init()
    this.$parent.points = mv.data()
  },
  data: function () {
    return {
      points: mv.data()
    }
  },
  el: function () {
    return '#mapview'
  },
  methods: {
    clear: function () {
      mv.clearAll()
    },
    makePolygon: function () {
      mv.makePolygon()
    }
  }
}

</script>

<style>
#map-container {
  width : 870px;
  height : 400px;
  position: relative;
}
#tip {
   background-color: #ddf;
   color: #333;
   border: 1px solid silver;
   box-shadow: 3px 4px 3px 0px silver;
   position: absolute;
   top: 10px;
   right: 10px;
   border-radius: 5px;
   overflow: hidden;
   line-height: 20px;
   z-index: 9999;
}
#tip input[type="text"] {
    height: 25px;
    border: 0;
    padding-left: 5px;
    width: 280px;
    border-radius: 3px;
    outline: none;
}
.amap-sug-result {
	z-index:9999;
}
</style>
