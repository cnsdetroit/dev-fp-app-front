<template>
<div class="container">    
    <div v-if="sub.status">
        <div v-if="cursub">
            <modal name="cancelsub" width=500px height=auto>
                <div class="m">
                    <h3> {{ dialog.subCancel.h3 }} </h3>
                    <hr>
                    <p>{{ dialog.subCancel.p }}</p>
                    <hr>
                    <div class="act">
                        <button class="btn badge-primary" @click="cancelSub">✔️</button>
                        &nbsp;
                        <button class="btn badge-warning" @click="$modal.hide('cancelsub')">❌</button>
                    </div>
                </div>
            </modal>
        </div>
        <div v-else>
            <modal name="cancelsub" width=500px height=auto>
                <div class="m">
                    <h3> {{ dialog.subRenew.h3 }} </h3>
                    <hr>
                    <p>{{ dialog.subRenew.p }}</p>
                    <div v-if="!cursub" class="actions">
                        <a id="ftsbtn" class="btn badge-primary" @click='navigate' >Subscribe</a>
                    </div>  
                    <hr>
                    <div class="actd">
                        <button class="btn badge-warning" @click="$modal.hide('cancelsub')">❌</button>
                    </div>
                </div>
            </modal>
        </div>
        <modal name="changeNotifications" width=500px height=auto>
            <div class="m">
                <h3> {{ dialog.changeNotifications.h3 }} </h3>
                <hr>
                <p>{{ dialog.changeNotifications.p }}</p>
                <div class="input-fields">
                    <div class="input-container" v-for="(field, index) in dialog.changeNotifications.fields" :key="'field'+index">
                        <input :name="field.id" :id="field.id" :type="field.type" :placeholder="field.label" v-model="field.value" required>
                        <label :for="field.id">{{ field.label }}</label><br>
                    </div>
                </div>  
                <hr>
                <div class="act">
                    <button class="btn badge-primary" @click="changeNotification">✔️</button>
                    &nbsp;
                    <button class="btn badge-warning" @click="$modal.hide('changeNotifications')">❌</button>
                </div>
            </div>
        </modal>
        <modal name="changePass" width=500px height=auto>
            <div class="m">
                <h3> {{ dialog.changePass.h3 }} </h3>
                <hr>
                <p>{{ dialog.changePass.p }}</p>
                <div class="input-fields">
                    <div class="input-container" v-for="(field, index) in dialog.changePass.fields" :key="'field'+index">
                        <input :name="field.id" :id="field.id" :type="field.type" :placeholder="field.label" v-model="field.value" required>
                    </div>
                </div>  
                <hr>
                <div class="act">
                    <button class="btn badge-primary" @click="changePassword">✔️</button>
                    &nbsp;
                    <button class="btn badge-warning" @click="$modal.hide('changePass')">❌</button>
                </div>
            </div>
        </modal>
        <modal name="updateEmail" width=500px height=auto>
            <div class="m">
                <h3> {{ dialog.updateEmail.h3 }} </h3>
                <hr>
                <p>{{ dialog.updateEmail.p }}</p>
                <div class="input-fields">
                    <div class="input-container" v-for="(field, index) in dialog.updateEmail.fields" :key="'field'+index">
                        <input :name="field.id" :id="field.id" :type="field.type" :placeholder="field.label" v-model="field.value" required>
                    </div>
                </div>  
                <hr>
                <div class="act">
                    <button class="btn badge-primary" @click="changeEmail">✔️</button>
                    &nbsp;
                    <button class="btn badge-warning" @click="$modal.hide('updateEmail')">❌</button>
                </div>
            </div>
        </modal>
        <modal name="subDetails" width=500px height=auto>
            <div class="m">
                <h3> {{ dialog.subDetails.h3 }} </h3>
                <hr>
                <p>{{ dialog.subDetails.p }}</p>
                <div>
                    <label><strong>Status:</strong></label> {{ sub.status }}
                </div>
                <div>
                    <label><strong>Creation Date:</strong></label> {{ sub.create_time }}
                </div>
                <div>
                    <label><strong>Update Date:</strong></label> {{ sub.status_update_time }}
                </div>
                <div>
                    <label><strong>Subscriber Name:</strong></label> {{ sub.subscriber.name.given_name + " " + sub.subscriber.name.surname }}
                </div>
                <div>
                    <label><strong>Subscriber Email:</strong></label> {{ sub.subscriber.email_address }}
                </div>
                <hr>
                <div class="actd">
                    <button class="btn badge-primary" @click="$modal.hide('subDetails')">✔️</button>
                </div>
            </div>
        </modal>
    </div>
    <div v-else>
      <modal name="cancelsub" width=500px height=auto>
          <div class="m">
              <h3> {{ dialog.subNew.h3 }} </h3>
              <hr>
              <p>{{ dialog.subNew.p }}</p>
              <div v-if="!cursub" class="actions">
                  <a id="ftsbtn" class="btn badge-primary" @click='navigate'>Subscribe</a>
              </div>  
              <hr>
              <div class="actd">
                  <button class="btn badge-warning" @click="$modal.hide('cancelsub')">❌</button>
              </div>
          </div>
      </modal>
    </div>
    <div class="artdiv">
        <article>
            <section :class="animation">
                    <h3 class="DashTitle">Settings Panel</h3>
                    <p class="WelcomeTitle">Welcome, {{ this.currentUser.firstname }}</p>
                    <p class="DateTitle">{{ this.date(Date()) }}</p>
                    <div class="vll"></div>                    
                    <div class="hlm"></div>                    
                    <div class="vlr"></div>
                    <div id="user">
                        <h3 class="huser">Account Details</h3>
                        <hr>                        
                        <h5 class="huser">Basic Information</h5>
                        <hr class="hhr">
                        <div>
                            <label><strong>User:</strong></label> {{ currentUser.username }}
                        </div>
                        <div>
                            <label><strong>Email:</strong></label> {{ currentUser.email }}
                        </div>
                        <div>
                            <label><strong>Type:</strong></label> {{ currentUser.usertype }}
                        </div>

                        <div>
                            <label><strong>FTS:</strong></label> {{ Boolean(currentUser.submit)  }}
                        </div>
                        <div class="address">
                            <br>
                            <h5 class="huser">Address</h5>                        
                            <hr class="hhrr">
                            <div>
                                <div>
                                    <div>
                                        <label><strong>Address:</strong></label> {{ currentUser.address }}
                                    </div>
                                    <div>
                                        <label><strong>City:</strong></label> {{ currentUser.city }}
                                    </div>
                                    <div>
                                        <label><strong>State:</strong></label> {{ currentUser.state }}
                                    </div>
                                    <div>
                                        <label><strong>Zip Code:</strong></label> {{ currentUser.zip  }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="subscription">
                        <h3 class="huser">Subscription</h3>
                        <hr>
                        <div v-if="cursub">
                        <div>
                            <label><strong>Current Subscription:</strong></label> {{ Boolean(currentUser.cursub)  }}
                        </div>
                        <div>
                            <label><strong>Subscription Date:</strong></label> {{ currentUser.subdate }}
                        </div>
                        <div>
                            <label><strong>Subscription End:</strong></label> {{ currentUser.subenddate }}
                        </div>
                        <div>
                            <label><strong>Subscription Type:</strong></label> {{ currentSub.subtype }}
                        </div>
                        <div>
                            <label><strong>Subscription Amount:</strong></label> {{ "$" + currentSub.subamt }}
                        </div>                            
                        <div>
                            <label><strong>Subscription Addons:</strong></label> {{ currentSub.subid }}
                        </div>
                        </div>
                    </div>
                    &nbsp;
                    &nbsp;
                    <div id="stats">

                    </div>  
                    <div id="signinlinks">
                        <h5>Manage Sign-in & Security</h5>
                        <hr>
                        <ul class="acclinks" style="list-style-type:circle">
                            <li><a href="javascript:void(0)" @click="changePass()">Change Your Password</a></li>
                            <li><a href="javascript:void(0)" @click="updateEmail()">Update Your Email Address</a></li>
                            <li><a href="javascript:void(0)">Configure Privacy And Data</a></li>
                        </ul>
                        <hr>
                    </div>
                    <div id="billinglinks">
                        <h5>Manage Subscription</h5>
                        <hr>
                        <ul class="acclinks" style="list-style-type:circle">
                            <li id="viewsubscribeli"><a href="javascript:void(0)" @click="subDetails()">View Subscription Details</a></li>
                            <li id="editsubscribeli"><a href="javascript:void(0)" @click="showeditSub()">Edit Subscription</a></li>
                            <li id="subscribeli"><a id="subscribe" href="javascript:void(0)"  @click="show()">Cancel Subscription</a></li>
                        </ul>
                        <hr>
                    </div>
                    <div id="eventlinks">
                        <h5>Manage Product</h5>
                        <hr>
                        <ul class="acclinks" style="list-style-type:circle">
                            <li><a href="javascript:void(0)" @click="changeNotifications()">Manage Notifications</a></li>
                            <li><a href="javascript:void(0)">Manage Language and Time</a></li>
                            <li><a href="javascript:void(0)">Manage Addons</a></li>
                        </ul>
                        <hr>
                    </div>         
                    <button class="Logout btn badge-warning" @click="Logout">Logout</button>
                    <button class="Dash btn badge-primary" @click="LevelFront">Dashboard</button>
            </section>
        </article>  
    </div>
</div>  
</template>

<script>
import DataService from "../services/DataService";

var bcrypt = require("bcryptjs");

export default {
  name: "d",

  data() {
    return {
        user: {
            id: null,
            username: "",
            email: "",
            firstname: "",
            lastname: "",
            usertype: "",
            cdate: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            mnumber: "",
            refc: "",
            reft: "",
            submit: false,
            cursub: false,
            ppsubid: "",
            subtype: ""
        },
        updatePassword: {
          curpass: '',
          newpass: '',
          cpass: ''
        },
        animation: 'animate-in',
        submitted: false,
        cursub: false,
        ppsubid: '',
        subtype: '',    
        currentUser: '',
        currentSub: '',
        sub: '',
        dialog: {
            subCancel: {
                h3: 'Cancel Subscription',
                p: 'Are you sure you would like to cancel your subscription?'
            },
            subDetails: {
                h3: 'Subscription Details',
                p: 'Please See Subscription Details Below'
            },
            subRenew: {
                h3: 'Subscription Renewal',
                p: 'Please renew your subscription'
            },
            subNew: {
                h3: 'Setup Subscription',
                p: 'Please setup your subscription'
            },
            changePass: {
                h3: 'Change Password',
                p: 'Please See Below To Change Password',
                fields: [
                { label: "Current Password", id: 'curpass', value: '', type: 'text', valid: true, pattern: /.+/ },
                { label: "New Password", id: 'newpass', value: '', type: 'text', valid: true, pattern: /.+/ },
                { label: "Confirm Password", id: 'cpass', value: '', type: 'text', valid: true, pattern: /.+/ }
                ]
            },
            updateEmail: {
                h3: 'Update Email Address',
                p: 'Please See Below To Update Email Address',
                fields: [
                { label: "Current Email Address", id: 'curpass', value: '', type: 'text', valid: true, pattern: /.+/ },
                { label: "New Email Address", id: 'newpass', value: '', type: 'text', valid: true, pattern: /.+/ },
                { label: "Confirm Email Address", id: 'cpass', value: '', type: 'text', valid: true, pattern: /.+/ }
                ]
            },
            changeNotifications: {
                h3: 'Manage Notifications',
                p: 'Please See Below To Update Email Address',
                fields: [
                { label: "Current Email Address", id: 'curpass', value: '', type: 'radio', valid: true, pattern: /.+/ },
                { label: "New Email Address", id: 'newpass', value: '', type: 'radio', valid: true, pattern: /.+/ },
                { label: "Confirm Email Address", id: 'cpass', value: '', type: 'radio', valid: true, pattern: /.+/ }
                ]
            }
        },
        message: '',
        loaded: false,
    };
  },

    mounted: function() {         
        this.message = '';
        this.getUser(this.$route.params.username);
    },

  methods: {

    // #region - Page Data
    getUser(username) {
      DataService.getAllSubByUsername(username)
        .then(response => {
          this.currentUser = response.data[0];
          console.log(response.data);        
          this.cursub = Boolean(this.currentUser.cursub)
          if (this.cursub != false) {
                this.getSub(this.currentUser.username)
          }          
          if (this.cursub == false && this.currentUser.subdate !=null) {
              console.log(this.currentUser.cursub);
              document.getElementById("subscribe").innerHTML = "Renew Your Subscription"
          }
          if (this.cursub == false && this.currentUser.subdate == null) {
              console.log(this.currentUser.cursub);
              document.getElementById("subscribe").innerHTML = "Subscribe Now"
              document.getElementById("editsubscribeli").style.display = "none";
              document.getElementById("viewsubscribeli").style.display = "none";
          }
          var d = this.date(this.currentUser.subenddate, true)
          if (Date.now() < d) {
              document.getElementById("editsubscribeli").style.display = "none";
              document.getElementById("subscribeli").style.display = "none";
          }
        })
        .catch(e => {
          console.log(e);
        });
    },

    getSub(username) {
      DataService.getSubByUsername(username)
        .then(response => {
          this.currentSub = response.data[0];
          console.log(response.data);
       
          this.subDetail(this.currentSub.subid);
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    subDetail(subid) {
      DataService.subDetail(subid)
        .then(response => {
          this.sub = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    cPassword(username, data) {
      DataService.cPassword(username, data)
        .then(response => {
          console.log(subid)
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    cancelSubs(subid) {
      DataService.cancelSubs(subid)
        .then(response => {
          console.log(subid)
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    // #endregion

    // #region - Page Actions
    date(d, s=false) {
        var d = new Date(d)
        if(s==true) { return Date.parse(d)}
        return d.toDateString()
    },
    show() {
        this.$modal.show('cancelsub');
    },
    showeditSub () {
        this.$modal.show('editSub');
    },
    async subDetails() {
        this.$modal.show('subDetails');
    },
    changePass() {
        this.$modal.show('changePass');
    },
    updateEmail() {
        this.$modal.show('updateEmail');
    },
    async changePassword() {
      var newpassword = {
        curpass: document.getElementById("curpass").value,
        newpass: document.getElementById("newpass").value,
        cpass: document.getElementById("cpass").value
      };

        //this.updatePassword.curpass = document.getElementById("curpass").value;
        //this.updatePassword.newpass = document.getElementById("newpass").value;
        //this.updatePassword.cpass = document.getElementById("cpass").value;
        this.$modal.hide('changePass')
        await this.cPassword(this.currentUser.username, newpassword);
    },
    changeNotifications () {
        this.$modal.show('changeNotifications');
    },
    changeNotification() {

    },
    async cancelSub() {      
        await this.getUser(this.currentUser.username);
        await this.cancelSubs(this.currentSub.subid);

        this.$modal.hide('cancelsub');
    },
    // #endregion

    // #region - Page Navigation
    LevelFront() {
        window.location.href = 'https://level.cnsdetroit.com/index';
    },
    navigate() {      
      this.$router.push({ path: `../../fts/${this.currentUser.id}` })
    },

    Logout() {
        this.$store.dispatch('auth/logout');
        //this.$router.push('/login');
        
        window.location.href = 'https://level.cnsdetroit.com/login';
    }
    // #endregion
  }
};
</script>

<style lang="scss" scoped>
@media (min-width: 420px) {
  .double-wide {
    display: flex;
  }
  .double-wide #dstate {
    flex-grow: 1;
    width: calc(50% - .25em);
  }
  .double-wide #dzip:first-child {
    margin-right: .99em;
  }
  .double-wide #dstate:last-child {
    margin-left: .01em;
  }
}   

  @import url('https://fonts.googleapis.com/css?family=Noto+Sans&display=swap');

  @mixin flexbox() {
    display: flex;
    justify-content: center;
    align-items: center;
  }

    .m {
        padding: 15px 15px;

        .input-fields {
        @include flexbox();
        flex-direction: column;
        width: 100%;
      }

      .input-container {
        position: relative;
        padding: 10px 80px 15px 0px;
        width: calc(100% - 40px);
        max-width: 400px;
        top: -5px;
        left: -32px;

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

        .act {
            position: relative;
            left: 364px;

            button {
            font-family: 'Noto Sans', sans-serif;
            outline: none;
            border: none;
            color: #fff;
            font-size: 1rem;
            padding: 7.5px 12.5px;
            margin: 0;
            cursor: pointer;
            }
        }

        .actd {
        position: relative;
        left: 423px;

            button {
            font-family: 'Noto Sans', sans-serif;
            outline: none;
            border: none;
            color: #fff;
            font-size: 1rem;
            padding: 7.5px 12.5px;
            margin: 0;
            cursor: pointer;
            }
        }   
        
    }

    .container {
    @include flexbox();
    width: 100%;
    margin: 0 auto 0;
    min-width: 1440px;
    min-height: 94vh;
    padding: 0px 0px;
    font-family: 'Noto Sans', sans-serif;
  }

  .artdiv {
    display: flex;
    margin: 0px;
    width: 100%;
    max-width: 1440px;
    min-height: 875px;
    perspective: 1000px;
    }

  article {
    display: flex;
    margin: 0px;
    width: 100%;
    max-width: 1440px;
    min-height: 875px;
    perspective: 1000px;

    section {
      @include flexbox();
      flex-direction: row;
      width: 100%;
      background-color: #fff;
      border-radius: 16px 16px 16px 16px;
      box-shadow: 0 15px 30px rgba(0,0,0,.2),
                  0 10px 10px rgba(0,0,0,.2);

      .DashTitle {
          top: 25px;
          left: 25px;
          position: fixed;
      }

      .WelcomeTitle {
          top: 65px;    
          left: 25px;
          position: fixed;
      }

      .DateTitle {
          top: 70px;    
          left: 1291px;
          position: fixed;
      }

      .Dash {
          top: 25px;
          left: 1220px;
          position: fixed;
      }  

      .Logout {
          top: 25px;
          left: 1342.5px;
          position: fixed;
      }

      .vll {
          border-left: 0.5px solid rgb(211, 211, 211);
          height: 740px;
          left: 25px;
          position: fixed;
          top: 115px;
      }

      .vlr {
          border-left: 0.5px solid rgb(211, 211, 211);
          height: 740px;
          left: 1136.25px;
          position: fixed;
          top: 115px;
      }

      .hlm {
          border: 0.25px solid rgb(211, 211, 211);
          width: 1080px;          
          height: 0px;
          left: 42.8125px;
          top: 435px;
          position: fixed;
      }

      .hhr {
          width: 225px;
          margin: 0px;
      }

      .hhrr {
          width: 225px;
          margin: 0px;
      }

      #user {    
          display: block;
          text-align: left;
          width: 590px;
          height: 300px;  
          padding: 15px 15px;
          margin: 0px;
          border-radius: .25rem;
          border: 0.25px solid LightGray;
          background-color: LightGray;
          box-shadow: 0 5px 10px rgba(0,0,0,.2),
                      0 5px 10px rgba(0,0,0,.2);
          top: 115px;
          left: 42.8125px;
          position: fixed;

          .address {
            top: 173px;
            left: 335px;
            position: fixed;
      }
      }

      #subscription {    
          display: block;
          text-align: left;
          width: 450px;
          height: 300px;  
          padding: 15px 15px;
          margin: 0px;
          border-radius: .25rem;
          border: 0.25px solid LightGray;
          background-color: LightGray;
          box-shadow: 0 5px 10px rgba(0,0,0,.2),
                      0 5px 10px rgba(0,0,0,.2);
          top: 115px;
          left: 668.4375px;
          position: fixed;
      }  

        #stats {    
          display: block;
          text-align: left;
          width: 1080px;
          height: 400px;  
          padding: 15px 15px;
          margin: 0px;
          border-radius: .25rem;
          border: 0.25px solid LightGray;
          background-color: LightGray;
          box-shadow: 0 -5px 10px rgba(0,0,0,.2),
                      0 -5px 10px rgba(0,0,0,.2);
          top: 455px;
          left: 42.8125px;
          position: fixed;
      } 

        .acclinks{
            padding: 0px 20px;
            margin: 0px;
            margin-bottom: 5px;
        }

        .acclinks li:not(:last-child) {
            margin-bottom: 20px;
        }

        #signinlinks {    
          display: block;
          text-align: left;
          width: 290px;
          height: 230px;  
          padding: 10px 15px;
          margin: 0px;
          border-radius: .25rem;
          border: 0.25px solid white;
          background-color: white;
          box-shadow: 0 -5px 10px white,
                      0 -5px 10px white;
          top: 125px;
          left: 1140px;
          position: fixed;
      }      

      #billinglinks {    
          display: block;
          text-align: left;
          width: 290px;
          height: 230px;  
          padding: 10px 15px;
          margin: 0px;
          border-radius: .25rem;
          border: 0.25px solid white;
          background-color: white;
          box-shadow: 0 -5px 10px white,
                      0 -5px 10px white;
          top: 385px;
          left: 1140px;
          position: fixed;
      }  

      #eventlinks {    
          display: block;
          text-align: left;
          width: 290px;
          height: 230px;  
          padding: 10px 15px;
          margin: 0px;
          border-radius: .25rem;
          border: 0.25px solid white;
          background-color: white;
          box-shadow: 0 -5px 10px white,
                      0 -5px 10px white;
          top: 642px;
          left: 1140px;
          position: fixed;
      }     

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
        margin: 0px;

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
    transform-origin: top;
    animation: in .85s ease-in-out;
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
