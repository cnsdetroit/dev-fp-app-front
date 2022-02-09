<template>
  <div class="search">
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <select id="func" class="form-control" @change="change">
          <option>id</option>
          <option>username</option>
          <option>email</option>
          <option>usertype</option>  
        </select>
      </div>
        <input id="ser" type="text" class="" placeholder=" Search by id" v-model="title"/>
          <div class="input-group-append">
            <button id="btn" class="btn btn-outline-secondary" type="button" @click="searchUser">Search</button>
          </div>
    </div>  
    <div class="list row">
      <div class="col-md-8">
      </div>
      <div class="col-md-6">
        <h4>First Time Setup</h4>
        <ul class="list-group">
          <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(user, index) in users" :key="index" @click="setUser(user, index)">
          {{ user.username }}
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <div v-if="user">
        <br />
        <br />
          <div id="user">
            <h4>{{ user.username }}</h4>
            <div>
              <label><strong>Email:</strong></label> {{ user.email }}
            </div>
            <div>
              <label><strong>Password:</strong></label> {{ user.password }}
            </div>
            <div>
              <label><strong>Type:</strong></label> {{ user.usertype }}
            </div>            
            <div>
              <label><strong>FTS:</strong></label> {{ Boolean(user.completefts)  }}
            </div>
            <div>
              <label><strong>id:</strong></label> {{ user.id  }}
            </div>
            <a id="ebtn" class="btn badge-primary" :href="'/app/edituser/' + user.id">Edit</a>
            &nbsp;
            <a id="ftsbtn" class="btn badge-warning" :href="'/app/fts/' + user.id">FTS</a>
          </div>
        </div>
        <div v-else>
        <br />
        <br />
          <p>Please click on a user...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "userfts",

  data() {
    return {
      users: [],
      user: null,
      currentIndex: -1,
      title: ""
    };
  },

  mounted() {
    this.GetUsers();
  },

  methods: {

    // #region - Page Data
    GetUsers() {
      DataService.getAll()
        .then(response => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    // #endregion

    // #region - Page Actions
    refreshList() {
      this.GetUsers();
      this.user = null;
      this.currentIndex = -1;
    },

    setUser(user, index) {
      this.user = user;
      this.currentIndex = index;
    },
    
    searchUser() {
      DataService.findByUsername(document.getElementById("func").value, document.getElementById("ser").value)
        .then(response => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    // #endregion

    // #region - Page Events
    change() {
      let x = document.getElementById("func");
      let y = document.getElementById("ser");
      y.placeholder = " Search by " + x.value;
    }
    // #endregion
  }
};

</script>

<style lang="scss">
#user {    
  display: block;
  text-align: left;
  max-width: 500px;  
  padding: 5px;
  margin: 0px;
  border-radius: .25rem;
  border: 0.25px solid gray;
  background-color: #fff;
}

#btn {
    background-color: rgb(211, 211, 211);
    color: rgb(5, 5, 5);
}

select {
    max-width: 125px;
    border-radius: .25rem;
    border: 0.1px solid gray;
}

.search {
  max-width: 800px;
  margin: 25px;

    input {
    width: 500px;
  }

  .list {
  text-align: left;
  max-width: 500px;
  margin: 0px;
}
}
</style>