import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import user from '@/pages/user'
import review from '@/pages/review'
import collection from '@/pages/collection'
import details from '@/pages/details'
import purchaseFee from '@/pages/purchase/purchaseFee'
import purchaseResult from '@/pages/purchase/purchaseResult'
import purchaseConfirm from '@/pages/purchase/purchaseConfirm'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/home',
            name: 'home',
            component: home
        },
        {
            path: '/user',
            name: 'user',
            component: user
        },
        {
            path: '/review',
            name: 'review',
            component: review
        },
        {
            path: '/collection',
            name: 'collection',
            component: collection
        },
        {
            path: '/details',
            name: 'details',
            component: details
        },
        {
            path: '/purchaseFee',
            name: 'purchaseFee',
            component: purchaseFee
        },
        {
            path: '/purchaseConfirm',
            name: 'purchaseConfirm',
            component: purchaseConfirm
        },
        {
            path: '/purchaseResult',
            name: 'purchaseResult',
            component: purchaseResult
        },
        {
            path: '/',
            redirect: '/home'
        }
    ]
})