Vue.use(VueRouter)

let lists = {
  '1': [
    {
      text: 'List 1-1'
    },
    {
      text: 'List 1-2'
    }
  ],
  '2': [
    {
      text: 'List 2-1'
    },
    {
      text: 'List 2-2'
    }
  ]
}

let itens = {
  '1': [
    {
      text: 'Item 1-1'
    },
    {
      text: 'Item 1-2'
    }
  ]
}

const Item = {
  template: '<li>{{item.text}}</li>',
  props: ['item']
}

Vue.component('list', {
  template: '#list',
  props: ['itens'],
  data () {
    return {
      noItem: {
        text: 'No item'
      }
    }
  },
  components: {
    'item': Item
  }
})


const PropsRouteComponent = {
  template: '#route-component' ,
  watch: {
    '$route' (to, from) {
      console.log(to, from)
    }
  },
  props: ['id'],
  computed: {
    itens () {
      return lists[this.id] || [];
    }
  }
}

const RouteComponent = {
  template: '#route-component' ,
  watch: {
    '$route' (to, from) {
      console.log(to, from)
    }
  },
  computed: {
    itens () {
      return itens[this.$route.params.id] || [];
    }
  }
}

const routes = [
  { path: '/lists/:id', component: PropsRouteComponent, props: true },
  { path: '/itens/:id', name: 'itens', component: RouteComponent }
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
