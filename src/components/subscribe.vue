<template>
  <div class="container">
    <div class="artdiv">
      <article>
        <header>
          <button class="btn" @click="navigate">&#60;</button>  
            <div class="">
            </div>
        </header>
        <section :class="animation">          
          <h2 v-if="!cursub" id="paypal1">Subscribe</h2> 
          <p v-if="!cursub" id="paypal2">Please select an option below to subscribe</p>
          <br>
            <div v-if="!cursub" id="paypal3" ref="paypal">            
            </div>
          <p v-if="cursub">You have completed this form!</p>
          <div class="actions"> 
              <button v-if="cursub" @click="done">Dashboard</button>
            </div>  
        </section>
      </article>
    </div>
  </div>
</template>

<script>
  import DataService from "../services/DataService";

  export default {
    name: 'subscribe',

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
        ppsubid: '',
        subamt: 14.99,
        subtype: '',    
        currentUser: null,
        message: '',
        loaded: false,
        paidFor: false,
        product: {
          price: 14.99,
          d: "Monthly Subscription for Level Financial Planner"
        },
        activeStep: 0,
        animation: 'animate-in',
        formSteps: [
          {
            title: "Basic Information",
            descrip: "Please fill out the form to subscribe to Level Financial Planner",
            fields: [
              { label: "Email Address", id: 'email', value: '', type: 'text', valid: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
              { label: "Username", id: 'username', value: '', type: 'text', valid: true, pattern: /.+/ },
              { label: "First Name", id: 'firstname', value: '', type: 'text', valid: true, pattern: /.+/ },
              { label: "Last Name", id: 'lastname', value: '', type: 'text', valid: true, pattern: /.+/ }
            ]
          },
          {
            title: "Address",
            descrip: "Please fill out the form to subscribe to Level Financial Planner",
            fields: [
              { label: "Street Address", id: 'address', value: '', type: 'text', valid: true, pattern: /.+/ },
              { label: "City", id: 'city', value: '', type: 'text', valid: true, pattern: /.+/ },
              { label: "State", id: 'state', value: '', type: 'text', valid: true, pattern: /.+/ },
              { label: "Zip Code", id: 'zip', value: '', type: 'text', valid: true, pattern: /.+/ }
            ]
          },
          {
            title: "Payment Information",
            descrip: "Please fill out the form to subscribe to Level Financial Planner",
            fields: [
              { label: "Mobile Phone Number", id: 'mnumber', value: '', type: 'text', valid: true, pattern: /.+/ },
              { label: "Referral Code", id: 'refc', value: '', type: 'text', valid: true, pattern: /.+/ },
              { label: "Referral Type", id: 'reft', value: '', type: 'text', valid: true, pattern: /.+/ }
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
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=AQxuC9pvE_QC3dYQb_DuEGHqGqwbtf3JIbb37jTvee8Gv6xTMG6ZvhFEoNakFl_FLsDPYLQhfa0XRNpE&vault=true&intent=subscription";
        script['data-sdk-integration-source'] = "button-factory"
        script.addEventListener("load", this.setLoaded);
        document.body.appendChild(script);
        this.message = '';
        this.getUser(this.$route.params.id);
    },

    methods: {
      
      setLoaded: function() {
        this.loaded = true;
        window.paypal
          .Buttons({
            style: {
                shape: 'rect',
                color: 'black',
                layout: 'vertical',
                label: 'subscribe'
            },
            createSubscription: (data, actions) => {
                return actions.subscription.create({
                'plan_id': 'P-7RP452091L0043215MEFEAJQ'
              });
            },
            onApprove: (data, actions) => {
              console.log(data.subscriptionID);
              this.ppsubid = data.subscriptionID;
              this.cursub = true;
              this.subtype = "pp"
              this.updatesub();
            }
            })
            .render(this.$refs.paypal);
      },

      // #region - Page Data
      getUser(id) {
        DataService.getUserByID(id)
          .then(response => {
            this.currentUser = response.data[0];
              console.log(response.data);
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
            console.log(response.data);
            if(this.submitted == false || this.userfts.submit != this.submitted) {
              this.submitted = Boolean(this.userfts.submit);
            }
            if(this.cursub == false || this.userfts.cursub != this.cursub) {
              this.cursub = Boolean(this.userfts.cursub);
            }          
            console.log(this.submitted)
            console.log(this.cursub)
          })
          .catch(e => {
            console.log(e);
          });
      },
      // #endregion

      // #region - Page Actions
      updatesub() {
        var data = this.user;
        DataService.updatesub(this.currentUser.id, this.currentUser.username, Number(this.cursub), this.ppsubid, this.subamt, this.subtype)
          .then(response => {
            this.user.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
            const retrievedString = localStorage.getItem("user");
            const parsedObject = JSON.parse(retrievedString);
            parsedObject.cursub = true;
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
        this.formSteps[this.activeStep].fields.forEach(field => {
          if(!field.pattern.test(field.value)) {
            valid = false;
            field.valid = false;
          }
          else {
            field.valid = true;
          }
        });
        
        return new Promise((resolve, reject) => {
          if(valid) {
            this.nextStep();
            return resolve(valid);
          }
          else {
            this.animation = 'animate-wrong';
            return resolve(valid);
            setTimeout(() => {
              this.animation = '';
            }, 400);
          }
        });
      },
      // #endregion

      // #region - Page Navigation
    navigate() {
      router.push({ path: `../../settings/${this.currentUser.username}` })
      //router.push({ name: "settings", params: { username: this.currentUser.username } });
      if(document.getElementById("add").style.display == "none"){
        document.getElementById("add").style.display = "flex";            
        document.getElementById("fts").style.display = "flex";        
        document.getElementById("users").style.display = "flex";
      }
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

      var form = this.formSteps[this.activeStep].fields; var i;
        for (i = 0; i < form.length; i++) {
          const field = form[i].id;
          const user = this.user[field];
          const input = document.getElementById(field).value
          if (this.user[field] == "" || this.user[field] != input ) {
            this.user[field] = input;
          }
        }
    },
    done(){
      window.location.href = 'https://level.cnsdetroit.com/index';
    }
    // #endregion
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
