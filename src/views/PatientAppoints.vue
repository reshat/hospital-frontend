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
        <div v-show="this.role === 'PATIENT'">
          <a-menu-item key="3">
            <CalendarOutlined />
            <span> <router-link to="/patientsAppoints"> Смотреть записи </router-link>    </span>
          </a-menu-item>
        </div>
        <div v-show="this.role === 'DOCTOR'">
          <a-menu-item key="3">
            <CalendarOutlined />
            <span> <router-link to="/doctorAppoint"> Сделать записи </router-link>    </span>
          </a-menu-item>
        </div>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0;" >
        <div id="components-popover-demo-placement" style="float: right; margin: 2px" >
          <div :style="{ clear: 'both', whiteSpace: 'nowrap' }">
            <a-popover placement="bottomRight" >
              <template #content >
                <div v-if="authorizationBasic == null">
                  <a-button type="link" @click="showModal">Войти</a-button>
                  <a-modal v-model:visible="visible"  @ok="handleOk" style="text-align: center" :footer="null">
                    <p><strong> Войти </strong></p>
                    <a-form
                        :model="formState"
                        @finish="handleFinish"
                        @finishFailed="handleFinishFailed"
                    >
                      <a-form-item>
                        <a-input v-model:value="formState.user" placeholder="Username">
                          <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                        </a-input>
                      </a-form-item>
                      <a-form-item>
                        <a-input v-model:value="formState.password" type="password" placeholder="Password">
                          <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                        </a-input>
                      </a-form-item>
                      <a-form-item style ="margin: 14px">
                        <p ref="header" style="color: crimson; font-size: 14px; margin: 0px">  </p>
                      </a-form-item>
                      <a-form-item>
                        <a-button
                            v-on:click="autorization(formState)"
                            type="primal" block
                            html-type="submit"
                            :disabled="formState.user === '' || formState.password === ''"
                        >
                          Войти
                        </a-button>
                        <a-button type="link" style = "margin-top: 12px"><strong>Зарегистрироваться</strong></a-button>
                      </a-form-item>
                    </a-form>
                  </a-modal>
                </div>

                <div v-else>
                  <p>Добро пожаловать, {{userData.name}} !</p>
                  <p v-if="userData.role == 'DOCTOR'">Ваша роль:  Доктор </p>
                  <p v-if="userData.role == 'ADMIN'">Ваша роль:  Админ </p>
                  <p v-if="userData.role == 'PATIENT'">Ваша роль:  Пациент </p>
                  <a-button type="link" @click="exitAccount()">Выйти</a-button>
                </div>
              </template>
              <a-button shape="circle"><UserOutlined /></a-button>
            </a-popover>
          </div>
        </div>
        <span style="float: right; margin-right: 16px; margin-left: 16px ">Горячая линия: +7 962 72 73 773</span>
      </a-layout-header>
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

import {
  CalendarOutlined,
  HomeOutlined,
  LockOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import {defineComponent, reactive, ref} from 'vue';
import axios from 'axios';


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
    CalendarOutlined,
    HomeOutlined,
    LockOutlined,
    TeamOutlined,
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
    console.log(this.userData.id);

    this.getAppoint();
  },
  methods: {
    getAppoint: function (){
      return  axios
          .get('http://ec2-3-120-138-66.eu-central-1.compute.amazonaws.com:8080/viewRecords?id=' + this.userData.id, {auth: this.authorizationBasic})
          .then(response => {
            this.info = response.data;
            console.log(response);
          })
          .catch(error => {
            console.log(error);
            this.errored = true;
          })
          .finally(() => (this.loading = false));
    },
    getRole: function (){
      return this.userData.role;
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
    autorization: async function (formState) {
      let vm = this;
      vm.status = undefined;
      let user = formState.user;
      let pass = formState.password;

      let url = 'http://ec2-3-120-138-66.eu-central-1.compute.amazonaws.com:8080/login';

      this.authorizationBasic = {
        username: user,
        password: pass
      }

      await this.getData(url, this.authorizationBasic, vm);
      console.log(this.userData)

      if (vm.status === undefined) {
        console.log('Done!');
        localStorage.setItem('loginData', user);
        localStorage.setItem('passwordData', pass);
        localStorage.setItem('userEmail', this.userData.email);
        localStorage.setItem('userId', this.userData.id);
        localStorage.setItem('userLogin', this.userData.login);
        localStorage.setItem('userName', this.userData.name);
        localStorage.setItem('userPassword', this.userData.password);
        localStorage.setItem('userPatronymic', this.userData.patronymic);
        localStorage.setItem('userRole', this.userData.role);
        localStorage.setItem('userSurname', this.userData.surname);
      } else {
        this.authorizationBasic = undefined;
        this.userData = undefined;
      }

      if (this.authorizationBasic !== undefined) {
        this.visible = false;
        this.$refs.header.innerText = "";
      } else {
        this.visible = true;
        this.$refs.header.innerText = "Неверный логин или пароль";
      }
      if (this.authorizationBasic !== undefined) {
          this.role = localStorage.getItem('userRole');
      }
    },

    exitAccount: function ()
    {
      this.authorizationBasic = undefined;
      this.userData = undefined;
      localStorage.clear();
      window.location.href = '/'
      console.log(this.authorizationBasic);
    }
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