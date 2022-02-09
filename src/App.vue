<template>
<v-app>
  <div id="app">
    <v-app-bar app dark>
    <div class="d-flex align-center mr-2">
      <img class="" id="navLogo" src="https://level.blob.core.windows.net/fp-blob/images/level-favicon-light.png" style="width:40x;height:40px;margin-left:10px">
      </div>
      <div v-if="currentUser" id="home">
      <v-menu open-on-hover offset-y transition="slide-x-transition" bottom right>
          <template v-slot:activator="{ on, attrs }">
              <v-btn text :to="'/settings/' + currentUser.username" v-bind="attrs" v-on="on">
                  <font-awesome-icon icon="home" />Home
              </v-btn>
          </template>
          <!--  <v-list dense>Comment 
              <v-list-item v-for="(item, index) in home" :key="index" router :to="item.link + currentUser.username">
                  <v-list-item-action>
                      <v-list-item-title><font-awesome-icon :icon="item.icon"  />{{ item.title }}</v-list-item-title>
                  </v-list-item-action>
              </v-list-item>
          </v-list>//-->
      </v-menu>
      <v-menu v-if="showAdminBoard" open-on-hover offset-y transition="slide-x-transition" bottom right>
          <template v-slot:activator="{ on, attrs }">
              <v-btn text to="/userlist" v-bind="attrs" v-on="on">
                  <font-awesome-icon icon="users" />Users
              </v-btn>
          </template>
          <v-list dense>
              <v-list-item v-for="(item, index) in user" :key="index" router :to="item.link">
                  <v-list-item-action>
                      <v-list-item-title><font-awesome-icon :icon="item.icon"  />{{ item.title }}</v-list-item-title>
                  </v-list-item-action>
              </v-list-item>
          </v-list>
      </v-menu>
      <v-btn to="/admin" v-if="showAdminBoard" text>
        Future Content
      </v-btn>
      <v-btn to="/free" v-if="showModeratorBoard" text>
        Future Content
      </v-btn>
      </div>
      <div v-if="!currentUser" class="ml-auto">
        <v-btn to="/register" text>
          <font-awesome-icon icon="user-plus" />Sign Up
        </v-btn>
        <v-btn href="https://level.cnsdetroit.com/index" text>
          <font-awesome-icon icon="sign-in-alt" />Login
        </v-btn>
      </div>
      <div v-if="currentUser" class="ml-auto">
        <v-btn to="/profile" text>
          <font-awesome-icon icon="user" />{{ currentUser.username }}
        </v-btn>
        <v-btn href="https://level.cnsdetroit.com/index" @click.prevent="logOut" text>
          <font-awesome-icon icon="sign-out-alt" />LogOut
        </v-btn>
      </div>
    </v-app-bar>
    <v-content>
    <v-container fluid>
      <div class="container">
        <router-view />
      </div>
    </v-container>
  </v-content>
  </div>  
</v-app>
</template>

<script>
  export default {
    name: "app",
     data: () => ({
        home: [{
                icon: "",
                title: "Dashboard",
                link: "/settings/"
            }
        ],
        user: [{
                icon: "user-plus",
                title: "Add User",
                link: "/adduser"
            },
            {
                icon: "list",
                title: "Users",
                link: "/user"
            },
            {
                icon: "cog",
                title: "First Time Setup",
                link: "/userfts"
            }
        ]
    }),
    computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }
      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }
      return false;
    }
  },
    methods: {
      logOut() {
        this.$store.dispatch('auth/logout');
        //this.$router.push('/login');
        
        window.location.href = 'https://level.cnsdetroit.com/login';
      },
      // #region - Navigation Bar
      test(){
        // document.getElementById("nav").style.display = "none";
        document.getElementById("add").style.display = "flex";
        document.getElementById("fts").style.display = "flex";
        document.getElementById("users").style.display = "flex";
      },
      // #endregion
      
        hide () {
            this.$modal.hide('my-first-modal');
        }
    }
  }
</script>

<style lang="scss">
  @import url('https://use.fontawesome.com/releases/v5.8.2/css/all.css');

  body {
    margin: 0;
    padding: 0;
  }


  #app {
    font-size: 1rem;
    color: #444;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    background: radial-gradient(#4e73df, #244cbf);
  }
</style>
