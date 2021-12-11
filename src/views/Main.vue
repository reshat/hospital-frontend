<template>
  <a-layout style="min-height: 100vh; background: white">
    <SidePanel :role="this.role"></SidePanel>
    <a-layout>
      <Header></Header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item style="font-size: large; font-weight:bold; text-align: justify "> {{info.header}}</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="boxing" :style="{ padding: '24px', background: '#fff', minHeight: '360px', textJustify: justify}">
          <span>  {{info.text}} </span>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Санкт-Петербург, 2021
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>

import {defineComponent, reactive, ref} from 'vue';
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
  mounted() {
    if(localStorage.getItem('userRole') == undefined){
      localStorage.setItem('userRole', 'none');
    }
    if(localStorage.getItem('loginData')){
      this.authorizationBasic = {
        username: localStorage.getItem('loginData'),
        password: localStorage.getItem('passwordData')
      }
    }
    console.log(this.authorizationBasic);
    if(localStorage.getItem('userId')){
      this.userData = {
        email:localStorage.getItem('userEmail'),
        id: localStorage.getItem('userId'),
        login: localStorage.getItem('userLogin'),
        name: localStorage.getItem('userName'),
        password: localStorage.getItem('userPassword'),
        patronymic: localStorage.getItem('userPatronymic'),
        role: localStorage.getItem('userRole'),
        surname: localStorage.getItem('userSurname')
      }
    }
    console.log(this.userData);

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

  setup() {
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    }
      const handleOk = e => {
        console.log(e);
        visible.value = false;
      };

    const formState = reactive({
      user: '',
      password: '',
    });

    const handleFinish = values => {
      console.log(values, formState);
    };

    const handleFinishFailed = errors => {
      console.log(errors);
    };

    return {
      buttonWidth: ref(70),
      visible,
      showModal,
      handleOk,
      formState,
      handleFinish,
      handleFinishFailed,
    };
  }
});
</script>

<style>

#components-popover-demo-placement .ant-btn {
  width: 30px;
  text-align: center;
  padding: 0;
  margin-right: 8px;
  margin-bottom: 8px;
}

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
