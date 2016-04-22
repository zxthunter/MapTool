<template>
  <div class="new-view">
    <div class="container">
      <form class="form-inline">
        <div class="row">
          <label class="col-sm-2 control-label" for="areaName">学区名称：</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" id="areaName" placeholder="请输入学区名称">
          </div>
        </div>
        <div class="row">
          <label class="col-sm-2 col-md-2 control-label" >学区中心坐标：</label>
          <div class="col-md-2 col-sm-2">
            <input type="text" class="form-control" id="exampleInputAmount" placeholder="请输入经度"/>
          </div>
          <div class="col-md-2 col-sm-2">
            <input type="text" class="form-control" id="exampleInputAmount" placeholder="请输入纬度"/>
          </div>
          <div class="col-sm-2 col-md-2 ">
            <button type="button" class="btn btn-primary ">在地图上选择</button>
          </div>
        </div>
        <div class="row">
          <label class="col-sm-2 col-md-2 control-label" >学区围成的点列：</label>
          <div class="col-sm-6 col-md-6">
            <textarea disabled="true" v-model="points" style="width:100%" class="form-control" rows="4"></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-2 col-md-2 "></div>
          <div class="col-sm-2 col-md-2 ">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" >在地图上选择</button>
          </div>
          <div class="col-sm-2 col-md-2 ">
            <button type="button" class="btn btn-warning ">清空点列</button>
          </div>
        </div>
          
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <mapview></mapview>
      </div>
    </div>
  </div>
</template>

<script>
import mapview from './MapView'
export default {
  components: {
    mapview
  },
  data: function () {
    return {
      points: []
    }
  },
  el: function () {
    return '.new-view'
  }
}
</script>

<style>
.new-view{
  overflow: auto;
  height: 500px;
  margin-left: 5px;
  margin-right: 5px;
}
.new-view label {
  line-height:34px;
  text-align:right;
}
.new-view .row {
  margin-top:8px;
  margin-bottom:8px
}
.new-view .row div{
  margin: 2px 5px 2px 5px;
}


</style>