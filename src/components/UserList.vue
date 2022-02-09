<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="8">
      <v-text-field v-model="searchUser" label="Search by Username"></v-text-field>
    </v-col>

    <v-col cols="12" sm="4">
      <v-btn small @click="page = 1; retrieveUsers();">
        Search
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-row>
        <v-col cols="4" sm="3">
          <v-select
            v-model="pageSize"
            :items="pageSizes"
            label="Items per Page"
            @change="handlePageSizeChange"
          ></v-select>
        </v-col>

        <v-col cols="12" sm="9">
          <v-pagination
            v-model="page"
            :length="totalPages"
            total-visible="7"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"
            @input="handlePageChange"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Users</v-card-title>

        <v-data-table
          :headers="headers"
          :items="users"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editUser(item.id)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteUser(item.username, item.id)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DataService from "../services/DataService";
export default {
  name: "UserList",
  data() {
    return {
      users: [],
      searchUser: "",
      headers: [
        { text: "id", sortable: false, value: "id", align: ' d-none' },
        { text: "Username", align: "start", sortable: false, value: "username" },
        { text: "Email", value: "email", sortable: false },
        { text: "FTS Completed", value: "completefts", sortable: false },
        { text: "User Type", value: "usertype", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],

      page: 1,
      totalPages: 0,
      pageSize: 5,

      pageSizes: [5, 10, 15, 25, 50],
    };
  },
  methods: {
    getRequestParams(searchUser, page, pageSize) {
      let params = {};

      if (searchUser) {
        params["username"] = searchUser;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    retrieveUsers() {
      const params = this.getRequestParams(
        this.searchUser,
        this.page,
        this.pageSize
      );

      DataService.getAllPaging(params)
        .then((response) => {
          const { users, totalPages } = response.data;
          this.users = users.map(this.getDisplayUser);
          this.totalPages = totalPages;

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveUsers();
    },

    editUser(id) {
      this.$router.push({ name: "/edituser", params: { id: id } });
    },

    deleteUser(username, id) {
      DataService.delete(username, id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    handlePageChange(value) {
      this.page = value;
      this.retrieveUsers();
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveUsers();
    },

    getDisplayUser(user) {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        completefts: user.completefts,
        usertype: user.usertype
      };
    },
    },
    mounted() {
        this.retrieveUsers();
    },
};
</script>