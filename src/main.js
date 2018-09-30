import "font-awesome/css/font-awesome.css"
import "normalize.css"
import "./rest.css"
import "./main.css"

import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"

import session from './lib/session'



import Home from "./page/Home"
import Search from "./page/Search"
import Detail from "./page/Detail"
import Cart from "./page/Cart"
import UserOrder from "./page/UserOrder"
import Setting from "./page/setting/Base"


import AdminSignIn from "./page/AdminSignIn"
import AdminBase from "./page/admin/Base"
import User from "./page/admin/User"
import Pet from "./page/admin/Pet"
import Order from "./page/admin/Order"
import Category from "./page/admin/Category"
import Breed from "./page/admin/Breed"
import Account from "./page/admin/Account"


import focus from "./directive/focus"
import signInRoot from './hub/signInRoot'


Vue.use(VueRouter);

Vue.config.productionTip = false


const RouterConfig = {
  routes: [{
      path: '/',
      component: Home,
      meta: {
        title: 'pet-首页'
      }
    },
    {
      path: '/search/:category',
      component: Search,
      meta: {
        title: 'pet-搜索页'
      }
    },
    {
      path: '/detail/:id',
      component: Detail,
      meta: {
        title: 'pet-详情页'
      }
    },
    {
      path: '/cart',
      component: Cart,
      meta: {
        title: 'pet-我的购物车'
      }
    },
    {
      path: '/userOrder',
      component: UserOrder,
      meta: {
        title: 'pet-我的订单'
      }
    },
    {
      path: '/setting',
      component: Setting,
      meta: {
        title: 'pet-设置'
      }
    },
    {
      path: '/setting',
      component: Setting,
      children: [{
          path: 'user',
          component: User,
          meta: {
            title: 'pet-设置'
          }
        },
        {
          path: 'pet',
          component: Pet,
          meta: {
            title: 'pet-设置'
          }
        },
        {
          path: 'order',
          component: Order,
          meta: {
            title: 'pet-订单管理'
          }
        },
      ]
    },
    {
      path: '/adminSignIn',
      component: AdminSignIn,
      meta: {
        title: 'pet-管理员登入页'
      }
    },
    {
      path: '/admin',
      component: AdminBase,
      meta: {
        title: 'pet-管理页'
      },
      children: [{
          path: 'user',
          component: User,
          meta: {
            title: 'pet-管理页'
          }
        },
        {
          path: 'pet',
          component: Pet,
          meta: {
            title: 'pet-管理页-宠物信息'
          }
        },
        {
          path: 'order',
          component: Order,
          meta: {
            title: 'pet-管理页-用户订单'
          }
        },
        {
          path: 'category',
          component: Category,
          meta: {
            title: 'pet-管理页-宠物分类'
          }
        },
        {
          path: 'breed',
          component: Breed,
          meta: {
            title: 'pet-管理页-宠物品种'
          }
        },
        {
          path: 'account',
          component: Account,
          meta: {
            title: 'pet-管理页账户'
          }
        },
      ]
    },
  ]
}

const router = new VueRouter(
  RouterConfig
);
router.beforeEach((to, from, next) => {
  let goAdmin = to.fullPath.startsWith('/admin/');
  let goUserOrder = to.fullPath.startsWith('/userOrder');
  let goSetting = to.fullPath.startsWith('/setting');

  let modalList = signInRoot.modalList();

  if (goAdmin && !session.signUped('uinfo_pet_admin')) {
    next('/adminSignIn');
  }

  if ((goUserOrder || goSetting) && !session.signUped()) {
    // alert('请先登入');
    modalList.modal = true;
    modalList.signIn = true;
    modalList.signUp = false;
    next(false);
  } else next();

  document.title = to.meta.title;
});


new Vue({
  directives: {
    focus
  },
  render: h => h(App),
  router
}).$mount('#app')