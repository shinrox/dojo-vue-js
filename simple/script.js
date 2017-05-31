Vue.use(VueRouter)

const Item = {
  template: '<li>{{item.text}}</li>',
  props: ['item']
}

Vue.component('list', {
  template: '#list',
  props: ['itens'],
  components: {
    'item': Item
  }
})


const Foo = {
  template: '#foo' ,
  data () {
    return {
      itens: [
        {
          text: 'Foo 1'
        },
        {
          text: 'Foo 2'
        }
      ]
    }
  }
}

const Bar = {
  template: '<list :itens="itens"></list>',
  data () {
    return {
      itens: [
        {
          text: 'Bar 1'
        },
        {
          text: 'Bar 2'
        }
      ]
    }
  }
}


const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]


const router = new VueRouter({
  routes
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  router
}).$mount('#app')

// Now the app has started!
