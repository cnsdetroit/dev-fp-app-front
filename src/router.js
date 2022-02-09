import Vue from "vue";
import Router from "vue-router";
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import tokenAuth from './views/tokenAuth.vue';
import AuthService from './services/auth.service';
import store from './store';

Vue.use(Router);

export const router = new Router({
    mode: "history",
  base: "/app/",
    routes: [{
            path: "/",
            name: "/d",
            component: () =>
                import ("./components/d")
        },
        {
            path: "/settings/:username",
            name: "/du",
            component: () =>
                import ("./components/d")
        },
        {
            path: "/userfts",
            name: "/userfts",
            component: () =>
                import ("./components/userfts")
        },
        {
            path: "/adduser",
            name: "/adduser",
            component: () =>
                import ("./components/adduser")
        },
        {
            path: "/edituser/:id",
            name: "/edituser",
            component: () =>
                import ("./components/edituser")
        },
        {
            path: "/user/",
            name: "/user",
            component: () =>
                import ("./components/user")
        },
        {
            path: "/userlist",
            name: "/userlist",
            component: () =>
                import ("./components/UserList")
        },
        {
            path: "/fts/:id",
            alias: "/fts",
            name: "fts",
            component: () =>
                import ("./components/fts")
        },
        {
            path: "/fts/subscribe/:id",
            alias: "/subscribe",
            name: "subscribe",
            component: () =>
                import ("./components/subscribe")
        },
        {
            path: '/home',
            name: 'home',
            component: Home
          },
          {
            path: '/home',
            component: Home
          },
          {
            path: '/login',
            component: Login
          },
          {
            path: '/register',
            component: Register
          },
          {
            path: '/tokenAuth/:token',
            component: tokenAuth
          },
          {
            path: '/profile',
            name: 'profile',
            // lazy-loaded
            component: () => import('./views/Profile.vue')
          },
          {
            path: '/admin',
            name: 'admin',
            // lazy-loaded
            component: () => import('./views/BoardAdmin.vue')
          },
          {
            path: '/mod',
            name: 'moderator',
            // lazy-loaded
            component: () => import('./views/BoardFree.vue')
          },
          {
            path: '/userfree',
            name: 'userfree',
            // lazy-loaded
            component: () => import('./views/BoardUser.vue')
          }
    ]
});

router.beforeEach(async (to, from, next) => {
      const publicPages = [/*'/login',*/ '/tokenAuth', '/register', '/home'];
      var jwt = require("jsonwebtoken");
      const authRequired = !publicPages.includes(to.path);
      const loggedIn = JSON.parse(localStorage.getItem('user'));
      var ftsRequired = loggedIn ? !loggedIn.completefts : false
      let tokenValid = await jwt.verify(loggedIn ? loggedIn.accessToken : null, "fpAPItestPass9876!", function(err, decoded) {
        if (err) return false // Manage different errors here (Expired, untrusted...)
        return decoded // If no error, token info is returned in 'decoded'  
      });

      if(!tokenValid && authRequired) { 
        if(loggedIn) {
          store.dispatch('auth/logout');
          window.location.href = 'https://level.cnsdetroit.com/login';
        } else {
          window.location.href = 'https://level.cnsdetroit.com/index';          
        }
      } else if(to.path == '/logout') {        
        store.dispatch('auth/logout');
        window.location.href = 'https://level.cnsdetroit.com/login';
      } else if (authRequired && !loggedIn) {
        //next();
        window.location.href = 'https://level.cnsdetroit.com/index';
      } else if(ftsRequired && !to.path.includes('fts')) {
        next(`/fts/${loggedIn.id}`);
      } else {
        next();
      }
    });