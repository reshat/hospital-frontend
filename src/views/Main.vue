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
        <div v-show="this.role == 'PATIENT'">
          <a-menu-item key="3">
            <CalendarOutlined />
            <span> <router-link to="/patientsAppoints"> Смотреть записи </router-link>    </span>
          </a-menu-item>
        </div>
        <div v-show="this.role == 'DOCTOR'">
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
                <div v-if="authorizationBasic == null || undefined">
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
                            v-on:click="autorization(formState);"
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
                  <p>Добро пожаловать, {{this.userData.name}} </p>
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
import {
  CalendarOutlined,
  HomeOutlined,
  LockOutlined,
  SearchOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import {defineComponent, reactive, ref} from 'vue';
import axios from 'axios';

export default defineComponent({
  components: {
    HomeOutlined,
    TeamOutlined,
    CalendarOutlined,
    SearchOutlined,
    UserOutlined,
    LockOutlined,
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
      window.location.reload();
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
