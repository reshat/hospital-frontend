<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" >
        <a-menu-item key="1">
          <HomeOutlined />
          <span> <router-link to="/"> Главная </router-link>    </span>
        </a-menu-item>
        <a-menu-item key="2">
          <TeamOutlined />
          <span> <router-link to="/doctors"> Наши доктора </router-link>    </span>
        </a-menu-item>
        <a-menu-item key="3">
          <CalendarOutlined />
          <span> <router-link to="/appoint"> Запись на прием </router-link>    </span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" >  </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item style="font-size: large; font-weight:bold">Баранов Денис</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          {{info}}
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Психодиспансер для особо-опасных, 2021
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>

import {
  HomeOutlined,
  TeamOutlined,
  CalendarOutlined,
} from '@ant-design/icons-vue';

import { defineComponent, ref } from 'vue';
import axios from 'axios';


export default defineComponent({
  components: {
    HomeOutlined,
    TeamOutlined,
    CalendarOutlined,
  },

  data() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(['1']),
      info: null
    };
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
  }
});
</script>
<style>
#components-layout-demo-side .logo {
  height: 16px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
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
  color: #42b983;
}
</style>

