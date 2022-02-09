<template>
  <div class="container">
    <div class="artdiv" v-if="!submitted">
      <article>
        <header>
          <button class="btn" id="navigate" v-if="activeStep +1 < formSteps.length " @click="navigate">&#60;</button>  
            <div class="">          
              <div class="progress-step" :class="{'active':index === activeStep}" v-for="(step, index) in formSteps" :key="'step'+index">
                {{ index + 1 }}
              </div>
            </div>
        </header>
        <section :class="animation"> 
          <h2>{{ formSteps[activeStep].title }}</h2>     
          <p>{{ formSteps[activeStep].descrip }}</p>
            <div class="input-fields">
              <div class="input-container" v-for="(field, index) in formSteps[activeStep].fields" :key="'field'+index">
                <input :name="field.id" :id="field.id" :type="field.type" :class="{'wrong-input': !field.valid}" v-model="field.value" required>
                <label :id="field.labelId" class="input-label">{{ field.label }}</label>
              </div>
            </div>            
            <div class="actions">
              <button v-if="activeStep  > formSteps.length -3 && activeStep  <= formSteps.length -1" @click="back(activeStep)">Back</button>
              &nbsp;
              <button v-if="activeStep +1 < formSteps.length -1" @click="checkFields">Next</button>   
              <button v-if="activeStep +1 === formSteps.length -1" @click="done">Done</button>
            </div>
        </section>
      </article>
    </div>

    <div class="artdiv" v-else>
      <article>
        <header>
          <button class="btn" @click="navigate">&#60;</button>  
            <div class="">          
            </div>
        </header>
        <section :class="animation">     
          <p>You have completed this form.</p>
            <div v-if="!cursub">
              <p>Please click the button to subscribe.</p>
            </div>            
            <div v-else></div>
              <div v-if="!cursub" class="actions">
                <button @click="subscribe">Subscribe</button>
              </div>            
            <div v-else></div>
        </section>
      </article>
    </div>
  </div>
</template>

<script>
  import DataService from "../services/DataService";

  export default {
    name: 'fts',
    
    data: () => {
      return {    
        user: {
            id: null,
            username: "",
            email: "",
            firstname: "",
            lastname: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            mnumber: "",
            refc: "",
            reft: ""
          },
        submitted: false,
        cursub: false,    
        currentUser: null,
        message: '',
        loaded: false,
        paidFor: false,
        product: {
          price: 10.00,
          d: "Monthly Subscription for Level Financial Planner"
        },
        activeStep: 0,
        animation: 'animate-in',
        formSteps: [
          {
            title: "Basic Information",
            descrip: "Please fill out the form to subscribe to Level Financial Planner",
            fields: [
              { label: "", labelId: "email-l", id: 'email', value: '', type: 'text', readonly: true, valid: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
              { label: "", labelId: "username-l", id: 'username', value: '', type: 'text', readonly: true,  valid: true, pattern: /.+/ },
              { label: "First Name", labelId: "firstname-l", id: 'firstname', value: '', type: 'text', valid: true, pattern: /.+/ },
              { label: "Last Name", labelId: "lastname-l", id: 'lastname', value: '', type: 'text', valid: true, pattern: /.+/ }
            ]
          },
          {
            title: "Address",
            descrip: "Please fill out the form to subscribe to Level Financial Planner",
            fields: [
              { label: "Street Address", labelId: "address-l", id: 'address', value: '', type: 'text', valid: true, pattern: /.+/ },
              { label: "City", labelId: "city-l", id: 'city', value: '', type: 'text', valid: true, pattern: /.+/ },
              { label: "State", labelId: "state-l", id: 'state', value: '', type: 'text', valid: true, pattern: /.+/ },
              { label: "Zip Code", labelId: "zip-l", id: 'zip', value: '', type: 'text', valid: true, pattern: /.+/ }
            ]
          },
          {
            title: "Payment Information",
            descrip: "Please fill out the form to subscribe to Level Financial Planner",
            fields: [
              { label: "Mobile Phone Number", labelId: "mnumber-l", id: 'mnumber', value: '', type: 'text', valid: true, pattern: /.+/ },
              { label: "Referral Code", labelId: "refc-l", id: 'refc', value: '', type: 'text', valid: true, pattern: /^\s*$/ },
              { label: "Referral Type", labelId: "reft-l", id: 'reft', value: '', type: 'text', valid: true, pattern: /^\s*$/ }
            ]
          },
          {
            title: "You are on your way!",
            descrip: "Your account setup is being completed, please select below to proceed:",
          }
        ],
      }
    },
    mounted: function() {   
        this.message = '';
        this.getUser(this.$route.params.id);
        var fields = this.formSteps[this.activeStep].fields
        for(var i in fields) {
          var field = fields[i];
          if(field.readonly) {
            document.getElementById(field.id).readOnly = true;
          }
        }
        },
    methods: {
      setLoaded: function() {
        this.loaded = true;
      },
      // #region  - Page Data 
      getUser(id) {
        DataService.getUserByID(id)
          .then(response => {
            this.currentUser = response.data[0];            
            var form = this.formSteps[this.activeStep].fields; var i;
              for (i = 0; i < form.length; i++) {
                var field = form[i].id, user = this.currentUser[field]
                if (user != "") {
                  form[i].value = user;
                  }
              }            
            this.getfts(this.currentUser.username)
          })
          .catch(e => {
            console.log(e);
          });
      },      
      getfts(username) {
        DataService.getfts(username)
          .then(response => {
            this.userfts = response.data[0];
            if(this.userfts) { 
              if(this.submitted == false || this.userfts.submit != this.submitted) {
                  this.submitted = Boolean(this.userfts.submit);
              }
              if(this.cursub == false || this.userfts.cursub != this.cursub) {
                  this.cursub = Boolean(this.userfts.cursub);
              }
            } else if(!this.currentUser.completefts || !this.cursub) {
              document.getElementById("home").style.display = "none";
              document.getElementById("navigate").style.display = "none";
            }
          })
          .catch(e => {
            console.log(e);
          });
      },
      // #endregion 

      // #region - Page Actions 
      completefts() {
        var data = this.user;
        DataService.completefts(this.currentUser.id, data)
          .then(response => {
              this.user.id = response.data.id;
              this.submitted = true; 
              const retrievedString = localStorage.getItem("user");
              const parsedObject = JSON.parse(retrievedString);
              parsedObject.completefts = true;
              const modifiedndstrigifiedForStorage = JSON.stringify(parsedObject); 
              console.log(modifiedndstrigifiedForStorage)
              localStorage.setItem("user", modifiedndstrigifiedForStorage);             
            })
            .catch(e => {
              console.log(e);
            });
      },
      // #endregion 

      // #region - Page Events
      checkFields() {
        let valid = true;
        var fields = this.formSteps[this.activeStep].fields
        for(var i in fields) {
          var field = fields[i];
          if(!field.pattern.test(field.value) || field.value == undefined) {
            valid = false;
            field.valid = false;
          }
          else {
            field.valid = true;
          }
        };     
        return new Promise((resolve, reject) => {
        if(valid) {
          for (var i in fields) {
            var field = fields[i];
            if(field.readonly) {
              document.getElementById(field.id).readOnly = false;
            }            
          }
          this.nextStep();
          return resolve(valid);
        }
        else {
          this.animation = 'animate-wrong';
          return resolve(valid);
        }
      });
      },
      // #endregion 

      // #region - Page Navigations 
      navigate() {
        this.$router.push({ path: `../../settings/${this.currentUser.username}` })
      },
      subscribe() {
        this.$router.push({ name: "subscribe" });
      },
      lastStep() {
        this.animation = 'animate-out';
        setTimeout(() => {
          this.animation = 'animate-in';
          this.activeStep -= 1;
        }, 550);
      },
      nextStep() {
        this.animation = 'animate-out';
        setTimeout(() => {
          this.animation = 'animate-in';
          this.activeStep += 1;
        }, 550);
        var form = this.formSteps[this.activeStep].fields, i;
            for (i = 0; i < form.length; i++) {
              const field = form[i].id;
              const user = this.user[field];
              const input = document.getElementById(field).value
                if (this.user[field] == "" || this.user[field] != input ) {
                  this.user[field] = input;
                }
            }
      },      
      back(x) {
          this.lastStep();
      },
      async done() {        
          let results = await this.checkFields();
          results ? await this.completefts() : false
      }
  // #endregion - Page Navigations
  }
}
</script>

<style lang="scss" scoped>
 
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans&display=swap');

  @mixin flexbox() {
    display: flex;
    justify-content: center;
    align-items: center;
  }

    .container {
    @include flexbox();
    width: 100%;
    min-height: 94vh;
    font-family: 'Noto Sans', sans-serif;
  }

  .artdiv {
    display: flex;
    margin: 10px;
    width: calc(100% - 20px);
    max-width: 720px;
    min-height: 480px;
    perspective: 1000px;
    }

  article {
    display: flex;
    margin: 10px;
    width: calc(100% - 20px);
    max-width: 720px;
    min-height: 480px;
    perspective: 1000px;

    header {
      @include flexbox();
      width: 75px;
      height: 600px;
      background-color: #fff;
      border-right: 2px dotted #4e73df;
      box-shadow: 0 15px 30px rgba(0,0,0,.2),
                  0 10px 10px rgba(0,0,0,.2);
    }
        

        .btn {
      @include flexbox();
          position: fixed;
          left: auto;
          top: 20px;
          width: 30px;
          height: 30px;
          font-family: 'Noto Sans', sans-serif;
          outline: none;
          border: none;
          color: #fff;
          background-color: #4e73df;
          font-size: 1rem;
          padding: 0px 0px;
          margin: 0;
          text-transform: uppercase;
          border-radius: 3px;
          cursor: pointer;
        }

    .progress-step {
      @include flexbox();
      position: relative;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-bottom: 20px;
      color: #fff;
      background-color: #4e73df;
      font-weight: bold;

      &.active {
        background-color: #4e73df;

        ~ .progress-step {
          color: #555;
          background-color: #ccc;
        }

        ~ .progress-step::before {
          background-color: #ccc;
        }
      }

      &:before {
        content: '';
        position: absolute;
        top: -20px;
        width: 2px;
        height: 20px;
        background-color: #4e73df;
        z-index: 10;
      }

      &:first-child::before {
        display: none;
      }
    }

    section {
      @include flexbox();
      flex-direction: column;
      width: 100%;
      background-color: #fff;
      box-shadow: 0 15px 30px rgba(0,0,0,.2),
                  0 10px 10px rgba(0,0,0,.2);

      h2 {
        font-size: 1.6rem;
        color: #4e73df;
        margin: 0;
        padding: 20px;
      }

      .input-fields {
        @include flexbox();
        flex-direction: column;
        width: 100%;
      }

      .input-container {
        position: relative;
        padding: 30px 20px 20px 20px;
        width: calc(100% - 40px);
        max-width: 400px;

        input {
          position: relative;
          width: 100%;
          font-family: 'Noto Sans', sans-serif;
          font-size: 1.35rem;
          outline: none;
          background: transparent;
          box-shadow: none;
          border: none;
          border-bottom: 2px dashed #4e73df;

          &:valid + .input-label {
            top: 10px;
            left: 20px;
            font-size: .7rem;
            font-weight: normal;
            color: #999;
          }

          &.wrong-input + .input-label {
            color: #B92938;
          }
        }
      }

      .input-label {
        position: absolute;
        top: 32px;
        left: 20px;
        font-size: 1.35rem;
        pointer-events: none;
        transition: .2s ease-in-out;
      }

      .actions {
        margin: 0;

        button {
          font-family: 'Noto Sans', sans-serif;
          outline: none;
          border: none;
          color: #fff;
          background-color: #4e73df;
          font-size: 1.35rem;
          padding: 5px 20px;
          margin: 0;
          text-transform: uppercase;
          border-radius: 3px;
          cursor: pointer;
        }
      }
    }
  }

  .animate-in {
    transform-origin: left;
    animation: in .6s ease-in-out;
  }

  .animate-out {
    transform-origin: bottom left;
    animation: out .6s ease-in-out;
  }

  .animate-wrong {
    animation: wrong .4s ease-in-out;
  }

  @keyframes in {
    0% {
      opacity: 0;
      transform: rotateY(90deg);
    }
    100% {
      opacity: 1;
      transform: rotateY(0deg);
    }
  }

  @keyframes out {
    0% { transform: translateY(0px) rotate(0deg); }
    60% { transform: rotate(10deg); }
    100% { transform: translateY(1000px); }
  }

  @keyframes wrong {
    0% { transform: translateX(0); }
    20% { transform: translateX(40px); }
    40% { transform: translateX(20px); }
    60% { transform: translateX(40px); }
    80% { transform: translateX(20px); }
    100% { transform: translateX(0); }
  }
</style>
