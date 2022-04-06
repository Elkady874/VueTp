<template>
  <div id="MyAdmin">
    <div>
     <ag-grid-vue style="width: 100%; height: 200px;margin-left: 180px;padding-right: 350px;"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        :rowData="rowData"
         rowSelection="single"
        @grid-ready="onGridReady"
        @selection-changed="onSelectionChanged">
    </ag-grid-vue>
    </div>
     <div >
    <link
      href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      rel="stylesheet"
      id="bootstrap-css"
    />

    <!------ Include the above in your HEAD tag ---------->
<button @click="getSelectedRow()">Get Selected Rows</button>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.0.8/css/all.css"
    />

    <div class="card bg-light">
      <article class="card-body mx-auto" style="max-width: 400px">
        <h4 class="card-title mt-3 text-center">Submit Data</h4>
        <form >
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
              <option selected={{country}}>Select country</option>
              <option>Egypt</option>
              <option>Ksa</option>
              <option>USA</option>
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
            <button type="submit" class="btn btn-primary btn-block" @click="UserSubmit()">
              Submit
            </button>
            <button type="submit" class="btn btn-primary btn-block" @click="update()">
              Update
            </button>
            <button type="submit" class="btn btn-primary btn-block" @click="_delete()">
              Delete
            </button>
          </div>
          <!-- form-group// -->
        </form>
      </article>
    </div>
  </div>
    <h1></h1>
  </div>
</template>
<style lang="scss">
@import "~ag-grid-community/dist/styles/ag-grid.css";
@import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
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
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
export default {
  name: "MyAdmin",
  data() {
    return {
      columnDef: null,
      rowData: null,
      gridApi:null,
      columnApi:null,
      id:"",
      full_Name: "",
       phoneCompany:"",
      phone_Number: "",
      email: "",
      country: "",
    };
  },methods:{
   async getData(){
      var getRole = await axios.get ("/Users/Submited", {
          headers: {
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (getRole.status == 200) 
        {
          
        this.rowData= getRole.data;
          
          //this.$router.push("/My" + getRole.data + "Home");
        }
    },
   async UserSubmit() {

      const submitedData = {
        
        full_Name: this.full_Name,
         phoneCompany:this.phoneCompany,
        phone_Number: this.phone_Number,
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
        alert ("/Users/Submit?" + body);
        alert(localStorage.getItem("token"));

        console.log(localStorage.getItem("token"));
      }
      // localStorage.setItem('token',res.data)
    },
    async update(){
      
      const submitedData = {
        id:this.id,
        full_Name: this.full_Name,
        phoneCompany:this.phoneCompany,
        phone_Number: this.phone_Number,
        email: this.email,
        country: this.country,
      };

      //delete axios.defaults.headers.common["Authorization"];
      axios.defaults.headers.post;
     
      var body ="Id="+submitedData.id+
        "&FullName=" +
        submitedData.full_Name +
        "&Email=" +
        submitedData.email +
        "&Phone=" +
        submitedData.phoneCompany+ submitedData.phone_Number +
        "&Country=" +
        submitedData.country;
     
      try {
        await axios.put(
          "/Users/Edit?" + body,null,
         
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
        alert(localStorage.getItem(this.id+"token"));

    }
    },
    async _delete(){
      
      const submitedData = {
        id:this.id,
        full_Name: this.full_Name,
        phone_Number: this.phone_Number,
        email: this.email,
        country: this.country,
      };

      //delete axios.defaults.headers.common["Authorization"];
      axios.defaults.headers.post;
     
      var body ="Id="+submitedData.id

      try {
        await axios.delete(
          "/Users/Delete?" + body,
          
          {
            headers: {
              Accept: "*/*",
              "Accept-Encoding": "gzip, deflate, br",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        this.clearFillds();
      } catch(e) {
        document.querySelector('#result_').innerHTML ="there was a problem try again later"
        alert(e);

    }
    },
    async CheckLogin() {
      if (
        localStorage.getItem("token") != null &&
        localStorage.getItem("token") != ""
      ) {
        var getRole = await axios.get ("/Users/role", {
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
    },
    getSelectedRow(){
       const selectedNodes = this.gridApi.getSelectedNodes();
       const selectedData = selectedNodes.map( node => node.data );
       const selectedDataStringPresentation = selectedData.map( node => `${node.make} ${node.model}`).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
    },
    onGridReady(params){
      this.gridApi= params.api;
      this.gridColumnApi=params.columnApi;
    },
    onSelectionChanged() {
      const selectedRows = this.gridApi.getSelectedRows();
      this.id=selectedRows[0].Id;
      this.full_Name=selectedRows[0].FullName;
      this.phone_Number=selectedRows[0].Phone;
      this.email=selectedRows[0].Email;
      this.country=selectedRows[0].Country;
      console.log(selectedRows[0].Id);
     //alert(selectedRows);
    },clearFillds(){
       this.id="";
      this.full_Name="";
      this.phone_Number="";
      this.email="";
      this.country="";
       document.querySelector('#result_').innerHTML ="Your Changes havebeen submited"
    }
  }
,
  components: {
    AgGridVue,
  },
  beforeMount() {
    this.CheckLogin();
    this.columnDefs = [
      { headersName: "Id", field: "Id" },
      { headersName: "CreatedBy", field: "CreatedBy",sortable:true,filter:true },
      { headersName: "FullName", field: "FullName" ,sortable:true,filter:true},
      { headersName: "Email", field: "Email",sortable:true,filter:true },
      { headersName: "Phone", field: "Phone" ,sortable:true,filter:true},
      { headersName: "Country", field: "Country" ,sortable:true,filter:true},
    ];
    /*this.rowData = [
      {
        id:"0",
        createdBy: "testuser",
        fullName: "useruser",
        email: "@ay&aga",
        phone: "010",
        country: "hnak",
      },
    ];*/
    this.getData();
    
     //this.rowData= 

  },
};
</script>