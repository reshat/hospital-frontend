<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-button type="text" key="1" href="http://localhost:3000/" block>
          <HomeOutlined />
          <span>
            Общая информация
          </span>
        </a-button>
        <a-button type="text" key="1" href="http://localhost:3000/" block>
          <TeamOutlined />
          <span>
            Наши врачи
          </span>
        </a-button>
        <a-button type="text" key="1" href="http://localhost:3000/" block>
          <CalendarOutlined />
          <span>
            Запись на прием
          </span>
        </a-button>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Пользователь</a-breadcrumb-item>
          <a-breadcrumb-item>Баранов Денис</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          Общая информация
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
    };
  },
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
