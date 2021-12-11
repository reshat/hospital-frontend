<template>
  <a-layout style="min-height: 100vh; background: white">
    <SidePanel :role="this.role"></SidePanel>
    <a-layout>
      <Header style="margin-left: 12px"></Header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item style="font-size: large; font-weight:bold; text-align: justify "> </a-breadcrumb-item>
        </a-breadcrumb>
        <div class="boxing" :style="{ padding: '24px', background: '#fff', minHeight: '360px', textJustify: justify}">
          <div style="max-width: 155px">
            <a-dropdown >
              <a-button @click.prevent>
                Выбрать пациента
                <DownOutlined />
              </a-button>
              <template #overlay>
                <a-menu style="max-width: 400px">
                  <a-menu-item>
                    <a href="javascript:;">1st menu item</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">2nd menu item</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">3rd menu item</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
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
  DownOutlined,
} from '@ant-design/icons-vue';
import {defineComponent, ref} from 'vue';
import axios from 'axios';
import SidePanel from "@/components/SidePanel";
import Header from "@/components/Header";


export default defineComponent({
  components: {
    Header,
    SidePanel,
    DownOutlined,
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