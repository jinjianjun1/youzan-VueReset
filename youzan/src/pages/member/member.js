import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let routes=[{
        path:'/',
    component:require('./components/member.vue')
},
{   
    path:'/address',
    component:require('./components/address.vue'),
    children:[{
        path:'',
        // component:require('./components/all.vue')
        redirect: 'all'
    },{
        name:'all',
        path:'all',
        component:require('./components/all.vue')
    },{
        name:'form',
        path:'form',
        component:require('./components/form.vue')
    }]
}]

const router = new Router({
    routes
})
new Vue({
    el:'#app',
    router
})