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
