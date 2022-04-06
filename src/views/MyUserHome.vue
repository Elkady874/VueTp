<template>
  <div id="MyUserHome">
    <link
      href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      rel="stylesheet"
      id="bootstrap-css"
    />

    <!------ Include the above in your HEAD tag ---------->

    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.0.8/css/all.css"
    />

    <div class="card bg-light">
      <article class="card-body mx-auto" style="max-width: 400px">
        <h4 class="card-title mt-3 text-center">Submit Data</h4>
        <form @submit="UserSubmit">
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"> <i class="fa fa-user"></i> </span>
            </div>
            <input
              name=""
              class="form-control"
              placeholder="Full name"
              type="text"
              v-model="full_Name"
            />
          </div>
          <!-- form-group// -->
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-envelope"></i>
              </span>
            </div>
            <input
              name=""
              class="form-control"
              placeholder="Email address"
              type="email"
              v-model="email"
            />
          </div>
          <!-- form-group// -->
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-phone"></i>
              </span>
            </div>
            <select class="custom-select" style="max-width: 120px" v-model="phoneCompany">
              <option selected="">012</option>
              <option value="1">011</option>
              <option value="2">010</option>
              <option value="3">015</option>
            </select>
            <input
              name=""
              class="form-control"
              placeholder="Phone number"
              type="text"
              v-model="phone_Number"
            />
          </div>
          <!-- form-group// -->
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-globe"></i>
              </span>
            </div>
            <select class="form-control" v-model="country">
              <option selected="">Select country </option>
              <option>Egypt</option>
              <option>Ksa</option>
              <option>Usa</option>
            </select>
          </div>
          <!-- form-group end.// -->
          <div class="form-group input-group">
            <input
              class="form-control form-control-sm"
              id="formFileSm"
              type="file"
            />
          </div>
<div class="result">
                   
                    <span id="result_"></span>
                </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">
              Submit
            </button>
          </div>
          <!-- form-group// -->
        </form>
      </article>
    </div>
  </div>
</template>
<style scoped>
.divider-text {
  position: relative;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
}
.divider-text span {
  padding: 7px;
  font-size: 12px;
  position: relative;
  z-index: 2;
}
.divider-text:after {
  content: "";
  position: absolute;
  width: 100%;
  border-bottom: 1px solid #ddd;
  top: 55%;
  left: 0;
  z-index: 1;
}
</style>
<script>
import axios from "axios";

export default {
  name: "MyUserHome",
  data() {
    return {
      phoneCompany:"",
      full_Name: "",
      phone_Number: "",
      email: "",
      country: "",
    };
  },
  methods: {
    async UserSubmit(e) {
      e.preventDefault();

      const submitedData = {
        full_Name: this.full_Name,
        phone_Number: this.phone_Number,
        phoneCompany:this.phoneCompany,
        email: this.email,
        country: this.country,
      };

      //delete axios.defaults.headers.common["Authorization"];
      axios.defaults.headers.post;
      var body =
        "FullName=" +
        submitedData.full_Name +
        "&Email=" +
        submitedData.email +
        "&Phone=" +
        submitedData.phoneCompany+submitedData.phone_Number +
        "&Country=" +
        submitedData.country;
      console.log(body);
      try {
        await axios.post(
          "/Users/Submit?" + body,
          null,
          {
            headers: {
              Accept: "*/*",
              "Accept-Encoding": "gzip, deflate, br",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        this.clearFillds();
      } catch {
         document.querySelector('#result_').innerHTML ="there was a problem try again later"
      }
      // localStorage.setItem('token',res.data)
    },clearFillds(){
      
      this.full_Name="";
      this.phone_Number="";
      this.email="";
      this.country="";
       document.querySelector('#result_').innerHTML ="Your Changes havebeen submited"
    },async CheckLogin() {
      if (
        localStorage.getItem("token") != null &&
        localStorage.getItem("token") != ""
      ) {
        var getRole = await axios.get("https://localhost:7222/api/Users/role", {
          headers: {
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).catch(e=>{ 
          console.log(e);
          this.$router.push("/MyLogin");
          });
         
        if (getRole.status == 200) {
          this.$router.push("/My" + getRole.data + "Home");
         
        }else{
          this.$router.push("/MyLogin");
        }
      }
    }
  },beforeMount(){
    this.CheckLogin();
  }
};
</script>
