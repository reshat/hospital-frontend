<template>
  <a-layout style="min-height: 100vh; background: white">
    <SidePanel :role="this.role"></SidePanel>
    <a-layout>
     <Header></Header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item style="font-size: large; font-weight:bold; text-align: justify "> </a-breadcrumb-item>
        </a-breadcrumb>
        <div class="boxing" :style="{ padding: '24px', background: '#fff', minHeight: '360px'}">
          <p style="margin: 12px"><strong>Записи</strong></p>
          <a-card  style="margin: 12px; width: 650px;" v-for="appoint in info" :key="appoint">
            <div style="display: inline-block;margin-left: 12px; margin-right: 12px">
              <div style="display: inline-block; margin-right: 12px">
                <span > <small> Доктор:  <span style="color: #108ee9"> {{appoint.name + ' ' + appoint.surname + ' ' + appoint.patronymic }} </span> </small></span>
              </div>
              <div style="display: inline-block; margin-left: 12px; margin-right: 12px">
                <span> <small> Дата: <span style="color: #108ee9"> {{appoint.dateOfReceipt}} </span> </small></span>
              </div>
            </div>
            <div style="margin: 12px;">
              <p> <small> Запись: </small> </p>
              <a-card style="width: 550px">
                <p style = "text-align-all: left; text-align: right; -moz-text-align-last: left; text-align-last: left;"> <small> {{appoint.record}}</small> </p>
              </a-card>
            </div>
          </a-card>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Санкт-Петербург, 2021
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>

import {defineComponent} from 'vue';
import axios from 'axios';
import SidePanel from "@/components/SidePanel";
import Header from "@/components/Header";



export default defineComponent({
  computed: {
    axiosParams() {
      const params = new URLSearchParams();
      params.append('username', localStorage.getItem('loginData'));
      params.append('password', localStorage.getItem('passwordData'));
      return params;
    }
  },
  components: {
    SidePanel,
    Header
  },

  data() {
    return {
      role: localStorage.getItem('userRole'),
      info: []
    };
  },
  mounted() {
    this.getAppoint();
  },
  methods: {
    getAppoint: function (){
      return  axios
          .get('http://ec2-3-120-138-66.eu-central-1.compute.amazonaws.com:8080/viewRecords?id=' + localStorage.getItem('userId'), {auth: {
              username: localStorage.getItem('loginData'),
              password: localStorage.getItem('passwordData')
            }})
          .then(response => {
            this.info = response.data;
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => (this.loading = false));
    },
  },
});
</script>

<style>
#components-layout-demo-side .logo {
  height: 16px;
  margin: 16px;
  background: rgba(255, 255, 255, 255.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 0px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: black;
}
</style>