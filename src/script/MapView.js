export default function () {
  var PointsModel = function () {
    var points = []
    return {
      push: function (lnglat) {
        points.push(lnglat)
      },
      length: function () {
        return points.length
      },
      getLast: function () {
        return points[points.length - 1]
      },
      getAll: function () {
        return points
      },
      update: function (lnglat, lnglat_id) {
        for (var i = 0; i < points.length; i++) {
          if (points[i] === lnglat_id) {
            break
          }
        }
        points[i] = lnglat
      },
      delete: function (lnglat_id) {
        for (var i = 0; i < points.length; i++) {
          if (points[i] === lnglat_id) {
            break
          }
        }
        points.splice(i, 1)
      },
      clearAll: function () {
        points.splice(0, points.length)
      }
    }
  }
  var mapObj
  var polyline
  var polygon
  var onclicklistener
  var pointsModel = PointsModel()
  var redraw = function (mode, arg1) {
    switch (mode) {
      case 'add':
        var lnglat_id = pointsModel.getLast()
        var marker = new window.AMap.Marker({
          position: lnglat_id,
          map: mapObj,
          draggable: true,
          clickable: true
        })
        if (polyline) {
          mapObj.remove(polyline)
        }
        polyline = new window.AMap.Polyline({
          map: mapObj,
          path: pointsModel.getAll()
        })
        // var index = pointsModel.length()
        // 添加点的点击事件监听
        window.AMap.event.addListener(marker, 'click', function (e) {
          var button = document.createElement('button')
          button.setAttribute('type', 'button')
          button.setAttribute('class', 'btn btn-warning')
          button.innerHTML = '删除'
          window.$(button).on('click', function () {
            pointsModel.delete(lnglat_id)
            redraw('delete', lnglat_id)
          })
          var infoWindow = new window.AMap.InfoWindow({
            content: button
          })
          infoWindow.open(mapObj, e.lnglat)
        })
        // 添加点的拖拽事件监听
        window.AMap.event.addListener(marker, 'dragging', function (e) {
          pointsModel.update(e.lnglat, lnglat_id)
          lnglat_id = e.lnglat
          this.setPosition(e.lnglat)
          redraw('update')
        })
        break
      case 'update':
        if (polygon) {
          mapObj.remove(polygon)
          polygon = new window.AMap.Polygon({
            map: mapObj,
            path: pointsModel.getAll()
          })
        }
        mapObj.remove(polyline)
        polyline = new window.AMap.Polyline({
          map: mapObj,
          path: pointsModel.getAll()
        })
        break
      case 'delete':
        var deleteMarker
        var markers = mapObj.getAllOverlays('marker')
        for (var i = 0; i < markers.length; i++) {
          if (markers[i].getPosition() === arg1) {
            deleteMarker = markers[i]
            break
          }
        }
        mapObj.remove([deleteMarker])
        mapObj.remove(polyline)
        polyline = new window.AMap.Polyline({
          map: mapObj,
          path: pointsModel.getAll()
        })
        break
    }
  }
  var _onClick = function (e) {
    pointsModel.push(e.lnglat)
    redraw('add')
  }
  return {
    init: function () {
      mapObj = new window.AMap.Map('map-container', {
        zoom: 11,
        center: [116.39, 39.9]
      })
      mapObj.setDefaultCursor('default')
      onclicklistener = window.AMap.event.addListener(mapObj, 'click', _onClick)
      window.AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
        var autoOptions = {
          city: '北京',
          input: 'keyword'
        }
        var autocomplete = new window.AMap.Autocomplete(autoOptions)
        var placeSearch = new window.AMap.PlaceSearch({
          city: '北京'
        })
        window.AMap.event.addListener(autocomplete, 'select', function (e) {
          placeSearch.search(e.poi.name, function (status, result) {
            var pois = result.poiList.pois
            mapObj.setCenter(pois[0].location)
            mapObj.setZoom(15)
          })
        })
      })
    },
    data: function () {
      return pointsModel.getAll()
    },
    clearAll: function () {
      pointsModel.clearAll()
      mapObj.clearMap()
    },
    makePolygon: function () {
      if (pointsModel.length() < 3 || polygon) {
        return
      }
      polygon = new window.AMap.Polygon({
        map: mapObj,
        path: pointsModel.getAll()
      })
      window.AMap.event.removeListener(onclicklistener)
    },
    deletePolygon: function () {
      mapObj.remove(polygon)
      onclicklistener = window.AMap.event.addListener(mapObj, 'click', _onClick)
    }
  }
}
