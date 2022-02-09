<template>
  <hello-world />
</template>

<script>
  import HelloWorld from '../components/HelloWorld'
  import User from '../models/user';

  export default {
    name: 'tokenAuth',

    mounted: function() {
        //document.getElementById("add").style.display = "none";        
        this.message = '';
        //console.log(this.$route.params.token)
        this.handleLogin(this.$route.params.token);
    },

    components: {
      HelloWorld,
    },

    methods: {
      handleLogin(token) {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (token) {
          this.$store.dispatch('auth/tokenAuth', token).then(
            () => {
              this.$router.push('/redirect');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              console.log(this.message)
              this.$router.push('/login');
            }
          );
        }
      });
    }
    }
  }
</script>
