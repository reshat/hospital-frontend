<template>
<a-layout class="sidepanel" style="min-height: 100vh; background: white">
  <SidePanel :role="this.role"></SidePanel>
    <a-layout class="backimage">
      <Header @update = "updateRole" ></Header>
      <a-layout-content style="margin: 0 16px">
          <div class="boxing" :style="{ padding: '24px', background: '#fff', minHeight: '360px'}">
            <p style="font-size: large; font-weight:bold;text-align: center;
  -moz-text-align-last: center;
  text-align-last: center; "> Список докторов </p>

            <a-card style="width: 500px; margin: 2px ; display: inline-block" v-for="post in info" :key="post.id" >
                <div style="display: inline-flex">
                  <a-avatar  :size="128">
                    <UserOutlined />
                  </a-avatar>
                </div>
                <div style="display: inline-block; margin-left: 12px">
                  <p style="margin: 12px; display: flex; align-items: flex-start"> {{post.surname + ' ' + post.name + ' ' + post.patronymic}}</p>
                  <p style="margin: 12px; display: flex; align-items: flex-start"> {{post.specialization}}</p>
                  <p style="margin: 12px; display: flex; align-items: flex-start"> Опыт работы(в годах): {{post.work_experiences}}</p>
                  <div v-show="this.role == 'PATIENT'"><p><a-button @click = "takeDoctorData(post.id,post.surname + ' ' + post.name + ' ' + post.patronymic, post.specialization, post.work_experiences )" type="link" >Записаться на прием</a-button></p></div>
                </div>


              </a-card>
          </div>
      </a-layout-content>
      <a-layout-footer class="underheader" style="text-align: center">
        Санкт-Петербург, 2021
      </a-layout-footer>
    </a-layout>
</a-layout>
</template>

<script>

import {
  UserOutlined,
} from '@ant-design/icons-vue';
import {defineComponent, ref} from 'vue';
import axios from 'axios';
import router from "@/router";
import SidePanel from "@/components/SidePanel";
import Header from "@/components/Header";


export default defineComponent({
  components: {
    Header,
    SidePanel,
    UserOutlined,
  },

  data() {
    return {
      role: localStorage.getItem('userRole'),
      collapsed: ref(false),
      selectedKeys: ref(['1']),
      info: []
    };
  },
  mounted() {
    axios
        .get('http://ec2-3-120-138-66.eu-central-1.compute.amazonaws.com:8080/doctors')
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
    takeDoctorData: function (id, name, spec, exp,){
      localStorage.setItem('doctorIdAppoint',id);
      localStorage.setItem('doctorNameAppoint',name);
      localStorage.setItem('doctorSpecAppoint',spec);
      localStorage.setItem('doctorExpAppoint',exp);
      router.push('/appoint');
    },
  }
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
  background: #e8ebed;;
  box-shadow:  5px 5px 10px #b4b6b8,
  -5px -5px 10px #ffffff;
}
</style>


