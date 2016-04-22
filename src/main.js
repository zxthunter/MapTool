import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import NewView from './components/NewView'
import ListView from './components/ListView'

Vue.use(VueRouter)

var router = new VueRouter()

router.map({
  '/new': {
    component: NewView
  },
  '/list': {
    component: ListView
  }
})
router.start(App, '#app')
