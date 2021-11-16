<template>
  <a-layout style="min-height: 100vh; background: white">
    <a-layout-sider style="background: white">
      <div class="logo" />
      <a-menu theme="light" mode="inline"  >
        <img src="https://user-images.githubusercontent.com/1532675/139324825-8b20b805-b192-429c-8d07-9bc060829957.png" width="50" height="50" style="margin: 2px; margin-left:5px">
        <span style="color: black; font-size: 12px; margin-left: 5px">Городская больница №1</span>
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
      <a-layout-header style="background: #fff; padding: 0;" >
        <a-avatar style="float: right; margin: 16px">
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
        <span style="float: right; margin-right: 16px; margin-left: 16px ">Горячая линия: +7 962 72 73 773</span>
        <div class="certain-category-search-wrapper" style="width: 300px; margin-left: 15px">
          <a-auto-complete
              v-model:value="value"
              class="certain-category-search"
              dropdown-class-name="certain-category-search-dropdown"
              :dropdown-match-select-width="false"
              :dropdown-style="{ width: '300px' }"
              size="large"
              style="width: 100%"
              option-label-prop="value"
          >
            <a-input placeholder="Введите поисковый запрос">
              <template #suffix><search-outlined class="certain-category-icon" /></template>
            </a-input>
          </a-auto-complete>
        </div>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item style="font-size: large; font-weight:bold; text-align: justify "> </a-breadcrumb-item>
        </a-breadcrumb>
        <div class="boxing" :style="{ padding: '24px', background: '#fff', minHeight: '360px', textJustify: justify}">
          <span>   </span>
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
  UserOutlined,
} from '@ant-design/icons-vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import axios from 'axios';


export default defineComponent({
  components: {
    HomeOutlined,
    TeamOutlined,
    CalendarOutlined,
    SearchOutlined,
    UserOutlined,
  },

  data() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(['1']),
      info: []
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
.boxing {
  font-size: medium;
  text-align: justify;
  -moz-text-align-last: justify;
  text-align-last: justify;
}
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
.certain-category-search-dropdown .ant-select-dropdown-menu-item-group-title {
  color: #666;
  font-weight: bold;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item-group {
  border-bottom: 1px solid #f6f6f6;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item {
  padding-left: 16px;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item.show-all {
  text-align: center;
  cursor: default;
}

.certain-category-search-dropdown .ant-select-dropdown-menu {
  max-height: 300px;
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
.certain-category-search-wrapper
:deep(.certain-category-search.ant-select-auto-complete)
.ant-input-affix-wrapper
.ant-input-suffix {
  right: 12px;
}
.certain-category-search-wrapper :deep(.certain-search-item-count) {
  position: absolute;
  color: #999;
  right: 16px;
}
.certain-category-search-wrapper
:deep(.certain-category-search.ant-select-focused)
.certain-category-icon {
  color: #108ee9;
}
.certain-category-search-wrapper :deep(.certain-category-icon) {
  color: #6e6e6e;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-size: 16px;
}
</style>