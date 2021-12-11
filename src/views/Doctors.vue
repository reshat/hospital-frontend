<template>
<a-layout style="min-height: 100vh; background: white">
  <SidePanel :role="this.role"></SidePanel>
<a-layout>
  <Header style="margin-left: 12px"></Header>
  <a-layout-content style="margin: 0 16px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="font-size: large; font-weight:bold "> Список докторов </a-breadcrumb-item>
    </a-breadcrumb>
      <div class="boxing" :style="{ padding: '24px', background: '#fff', minHeight: '360px'}">
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
  <a-layout-footer style="text-align: center">
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