import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/app/Customer/Form'
import List from '@/app/Customer/List'
import Layout from '@/components/Arch/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/form',
          name: 'Form',
          component: Form,
          children: [
            {
              path: '/form/:id',
              name: 'FormEdit',
              component: Form
            }
          ]
        },
        {
          path: '/list',
          name: 'List',
          component: List
        }
      ]
    }
  ]
})
