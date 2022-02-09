<template>
  <div v-if="currentUser" class="edit-form">
    <div class="double-wide">
      <button id="hbtn" class="hbtn" @click="navigate">&#60;</button>
      <h1 id="hh1">Level Admin Portal</h1>      
    </div>
    <br>
    <h3>Update Existing User Account</h3>
    <br>
    <h4>Username: {{ currentUser.username }}</h4>
    <br>
      <div id="user">
        <form>
          <div class="form-group">
            <label for="username">Username</label>
              <input type="text" class="form-control" id="username" v-model="currentUser.username" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="text" class="form-control" id="email" v-model="currentUser.email" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="currentUser.password"/>
          </div>
          <div class="form-group">
            <label for="type">Type</label>
            <input type="text" class="form-control" id="type" v-model="currentUser.usertype" />
          </div>
        </form>
      </div>
      <br>
      <button class="btn badge-danger mr-2" @click="deleteUser">Delete</button>
      <button type="submit" class="btn badge-success" @click="updateUser">Update</button>
        <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a User...</p>
  </div>
</template>

<script>
import DataService from "../services/DataService";

var bcrypt = require("bcryptjs");


export default {
  name: "edituser",

  data() {
    return {
      currentUser: null,
      message: ''
    };
  },

  mounted() {
    this.message = '';
    this.getUser(this.$route.params.id);
  },

  methods: {

    // #region - Page Data
    getUser(id) {
      DataService.getUserByID(id)
        .then(response => {
          this.currentUser = response.data[0];
          console.log(response.data);
          console.log(this.currentUser.username);
        })
        .catch(e => {
          console.log(e);
        });
    },
    // #endregion

    // #region - Page Actions
    updateUser() {
      DataService.update(this.currentUser.id, this.currentUser)
        .then(response => {
          console.log(response.data);
          //this.message = 'The user was updated successfully!';     
          this.$router.push({ name: "/userlist" });
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteUser() {
      DataService.delete(this.currentUser.username, this.currentUser.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "usefts" });
        })
        .catch(e => {
          console.log(e);
        });
    }, 
    // #endregion

    // #region - Page Navigation
    navigate() {
      this.$router.push({ name: "/userlist" });
    }
    // #endregion
  }
}
</script>

<style lang="scss">
@media (min-width: 420px) {
  .double-wide {
    display: flex;
  }
  .double-wide #hh1 {
    flex-grow: 1;
    width: calc(50% - .5em);
  }
  .double-wide #hbtn:first-child {
    margin-right: .99em;
  }
  .double-wide #hh1:last-child {
    margin-left: .01em;
  }
}

.hbtn {
  position: relative;
  top: 12px;
  width: 45px;
  height: 30px;
  font-family: 'Noto Sans', sans-serif;
  outline: none;
  border: none;
  color: #fff;
  background-color: rgb(211, 211, 211);
  font-size: 1rem;
  padding: 0px 0px;
  margin: 0;
  text-transform: uppercase;
  border-radius: 3px;
  cursor: pointer;
}

#user {    
  display: block;
  text-align: left;
  max-width: 300px;  
  padding: 5px;
  margin: 0px;
  border-radius: .25rem;
  border: 0.25px solid gray;
  background-color: #fff;
}

.edit-form {
  max-width: 500px;
  margin: 25px;

    input {
    max-width: 300px;
  }
}
</style>