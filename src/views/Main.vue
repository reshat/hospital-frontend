<template>
  <a-layout class = "sidepanel" style="min-height: 100vh; background: white">
    <SidePanel :role="this.role"></SidePanel>
    <a-layout class="backimage">
      <Header @update = "updateRole" style=""></Header>
      <a-layout-content >
        <div class="boxing" :style="{ padding: '24px', background: '#fff', minHeight: '90%'}">
          <p style="font-size: large; font-weight:bold; text-align: center; font-family: Eras Bold ITC,serif"> {{info.header}}</p>
          <span>  {{info.text}} </span>
        </div>
      </a-layout-content>
      <a-layout-footer class="underheader" style="text-align: center">
        Санкт-Петербург, 2021
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>

import {defineComponent, ref} from 'vue';
import axios from 'axios';
import SidePanel from "@/components/SidePanel";
import Header from "@/components/Header";

export default defineComponent({
  components: {
    Header,
    SidePanel,
  },
  data() {
    return {
      role: localStorage.getItem('userRole'),
      collapsed: ref(false),
      selectedKeys: ref(['1']),
      info: []
    };
  },
  created() {
    this.role = localStorage.getItem('userRole');
  },
  mounted() {
    axios
        .get('http://ec2-3-120-138-66.eu-central-1.compute.amazonaws.com:8080/general')
        .then(response => {
          this.info = response.data;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
  },

  methods: {
    updateRole: function (role){
      this.role = role;
    },
    getData: async function(url,config, vm){
      return axios.post(url,{}, {auth: config})
          .then(function (response) {
            vm.userData = response.data;
            console.log(response)
          })
          .catch(function (error) {
            vm.status = error;
          });
    } ,

  },

});
</script>

<style scoped>
.backimage {
  background-image: url(../assets/background.jpg);
  background-size: 700px;
}
.boxing {
  font-family: 'Open Sans',serif;
  margin: 24px;
  font-size: medium;
  text-align: center;
  -moz-text-align-last: center;
  text-align-last: center;
  border-radius: 20px;
  background: #edf0f2;
  box-shadow:  5px 5px 10px #b4b6b8,
  -5px -5px 10px #ffffff;
}

.sidepanel {
  font-family: 'Open Sans',serif;
  font-size: 14px;
}

.underheader {
  margin:24px;
  border-radius: 20px;
  background: #e8ebed;
  box-shadow:  5px 5px 10px #b4b6b8,
  -5px -5px 10px #ffffff;
}
</style>



<!-- Add "scoped" attribute to limit CSS to this component only -->


