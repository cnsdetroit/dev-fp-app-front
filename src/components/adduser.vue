<template>
  <div class="submit-form">
    <div class="double-wide">
      <button id="hbtn" class="hbtn" @click="navigate">&#60;</button>
        <h1 id="hh1">Level Admin Portal</h1>      
    </div>
    <br>
    <h3>Add a New User</h3>
    <br>
    <div v-if="!submitted">
      <div id="user">
        <div class="form-group">
          <label for="username">Username</label>
            <input type="text" class="form-control" id="username" required v-model="user.username" name="username" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input class="form-control" id="email" required v-model="user.email" name="email" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input class="form-control" id="password" required v-model="user.password" name="password" />
        </div>
        <div class="form-group">
          <label for="usertype">Type</label>
          <input class="form-control" id="usertype" required v-model="user.usertype" name="usertype" />
        </div>
      </div>
      <br>
      <button @click="saveUser" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <br>
      <button class="btn btn-success" @click="newUser">Add</button>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

var bcrypt = require("bcryptjs");

export default {
  name: "adduser",

  data() {
    return {
      user: {
        id: null,
        username: "",
        email: "",
        password: "",
        usertype: ""
      },
      submitted: false
    };
  },

  methods: {

    // #region - Page Action
    saveUser() {
      var data = {
        username: this.user.username,
        email: this.user.email,
        password: bcrypt.hashSync(this.user.password, 8),
        usertype: this.user.usertype
      };

      DataService.create(data)
        .then(response => {
          this.user.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newUser() {
      this.submitted = false;
      this.user = {};
    },
    // #endregion
  
    // #region - Page Navigation
    navigate() {
          this.$router.push({ name: "/userlist" });
    }
    // #endregion
  }
};
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
  max-width: 250px;  
  padding: 5px;
  margin: 0px;
  border-radius: .25rem;
  border: 0.25px solid gray;
  background-color: #fff;
}

.submit-form {
  max-width: 500px;
  margin: 25px;

    input {
    max-width: 300px;
  }
}


</style>