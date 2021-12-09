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
        <div v-show="this.role === ('PATIENT')">
          <a-menu-item key="3">
            <CalendarOutlined />
            <span> <router-link to="/patientsAppoints"> Смотреть записи </router-link>    </span>
          </a-menu-item>
        </div>
        <div v-show="this.role === 'DOCTOR'">
          <a-menu-item key="4">
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
        <div class="boxing" :style="{ padding: '24px', background: '#fff', minHeight: '360px', textJustify: justify}">
          <a-card style="width: 70%; margin: 12px;" >
            <div style="display: inline-block; padding: 10px;">
              <a-avatar  :size ="128">
                <UserOutlined />
              </a-avatar>
              <p>&nbsp;	</p>
            </div>
            <div style="margin: 12px; display:inline-block; text-align: left;-moz-text-align-last: left; text-align-last: left;">
            <p style="margin: 12px; "><strong> Выбранный врач: </strong> </p>
            <p style="margin: 12px; "> {{doctor.name}}</p>
            <p style="margin: 12px; "> {{doctor.spec}}</p>
            <p style="margin: 12px; "> Опыт работы(в годах): {{doctor.exp}}</p>
              <p>&nbsp;	</p>
            </div>
          </a-card>

          <a-card style="width: 70%; margin: 12px;" >
            <div style="margin: 12px; text-align: left;-moz-text-align-last: left; text-align-last: left;">
              <strong style = " margin-right: 12px ">Часы приема: </strong>
              <a-popover placement="bottom">
                <template #content>
                  <a-alert :message="`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`" />
                  <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
                    <a-calendar :value="date" @select="onSelect" @panelChange="onPanelChange" :fullscreen="false" />
                  </div>
                  <a-button style ="margin: 12px" @click = "showTime(selectedValue && selectedValue.format('YYYY-MM-DD'))">Выбрать</a-button>
                </template>
                <a-button>Выбор даты </a-button>
              </a-popover>
              <div v-show="showAlert">
                <a-alert message="Success Text" type="success" />
              </div>
            </div>
                <div style="display: inline-block;">
                  <a-button v-if = "check(8) === true" style = "margin:12px; display: inline-block; width: 100px;height: 80px; background-color: aquamarine" type="default" @click="sendAppoint(selectedValue && selectedValue.format('YYYY-MM-DD'), 8)">
                    8.00
                  </a-button>
                  <a-button v-else  style = "margin:12px; display: inline-block; width: 100px; height: 80px; background-color: gray" disabled type="default" @click="showModal">
                    8.00
                  </a-button>
                </div>
                <div style="display: inline-block;">
                    <a-button v-if = "check(9) === true" style = "margin:12px; display: inline-block; width: 100px;height: 80px; background-color: aquamarine" type="default" @click="sendAppoint(selectedValue && selectedValue.format('YYYY-MM-DD'), 9)">
                      9.00
                    </a-button>
                    <a-button v-else  style = "margin:12px; display: inline-block; width: 100px; height: 80px; background-color: gray" disabled type="default" @click="showModal">
                      9.00
                    </a-button>
                  </div>
                <div style="display: inline-block;">
                  <a-button v-if = "check(10) === true" style = "margin:12px; display: inline-block; width: 100px;height: 80px; background-color: aquamarine" type="default" @click="sendAppoint(selectedValue && selectedValue.format('YYYY-MM-DD'), 10)">
                    10.00
                  </a-button>
                  <a-button v-else  style = "margin:12px; display: inline-block; width: 100px; height: 80px; background-color: gray" disabled type="default" @click="showModal">
                    10.00
                  </a-button>
                  </div>

                <div style="display: inline-block;">
                  <a-button v-if = "check(11) === true" style = "margin:12px; display: inline-block; width: 100px;height: 80px; background-color: aquamarine" type="default" @click="sendAppoint(selectedValue && selectedValue.format('YYYY-MM-DD'), 11)">
                    11.00
                  </a-button>
                  <a-button v-else  style = "margin:12px; display: inline-block; width: 100px; height: 80px; background-color: gray" disabled type="default" @click="showModal">
                    11.00
                  </a-button>
                </div>

                <div style="display: inline-block;">
                  <a-button v-if = "check(12) === true" style = "margin:12px; display: inline-block; width: 100px;height: 80px; background-color: aquamarine" type="default" @click="sendAppoint(selectedValue && selectedValue.format('YYYY-MM-DD'), 12)">
                    12.00
                  </a-button>
                  <a-button v-else  style = "margin:12px; display: inline-block; width: 100px; height: 80px; background-color: gray" disabled type="default" @click="showModal">
                    12.00
                  </a-button>
                </div>

                <div style="display: inline-block;">
                  <a-button v-if = "check(13) === true" style = "margin:12px; display: inline-block; width: 100px;height: 80px; background-color: aquamarine" type="default" @click="sendAppoint(selectedValue && selectedValue.format('YYYY-MM-DD'), 13)">
                    13.00
                  </a-button>
                  <a-button v-else  style = "margin:12px; display: inline-block; width: 100px; height: 80px; background-color: gray" disabled type="default" >
                    13.00
                  </a-button>
                </div>

                <div style="display: inline-block;">
                  <a-button v-if = "check(14) === true" style = "margin:12px; display: inline-block; width: 100px;height: 80px; background-color: aquamarine" type="default" @click="sendAppoint(selectedValue && selectedValue.format('YYYY-MM-DD'), 14)">
                    14.00
                  </a-button>
                  <a-button v-else  style = "margin:12px; display: inline-block; width: 100px; height: 80px; background-color: gray" disabled type="default" @click="showModal">
                    14.00
                  </a-button>
                </div>



                <div style="display: inline-block;">
                  <a-button v-if = "check(15) === true" style = "margin:12px; display: inline-block; width: 100px;height: 80px; background-color: aquamarine" type="default" @click="sendAppoint(selectedValue && selectedValue.format('YYYY-MM-DD'), 15)">
                    15.00
                  </a-button>
                  <a-button v-else  style = "margin:12px; display: inline-block; width: 100px; height: 80px; background-color: gray" disabled type="default" @click="showModal">
                    15.00
                  </a-button>
                </div>

                <div style="display: inline-block;">
                  <a-button v-if = "check(16) === true" style = "margin:12px; display: inline-block; width: 100px;height: 80px; background-color: aquamarine" type="default" @click="sendAppoint(selectedValue && selectedValue.format('YYYY-MM-DD'), 16)">
                    16.00
                  </a-button>
                  <a-button v-else  style = "margin:12px; display: inline-block; width: 100px; height: 80px; background-color: gray" disabled type="default" @click="showModal">
                    16.00
                  </a-button>
                </div>

                <div style="display: inline-block;">
                  <a-button v-if = "check(17) === true" style = "margin:12px; display: inline-block; width: 100px;height: 80px; background-color: aquamarine" type="default" @click="sendAppoint(selectedValue && selectedValue.format('YYYY-MM-DD'), 17)">
                    17.00
                  </a-button>
                  <a-button v-else  style = "margin:12px; display: inline-block; width: 100px; height: 80px; background-color: gray" disabled type="default" @click="showModal">
                    17.00
                  </a-button>

                </div>

                <div style="display: inline-block;">
                  <a-button v-if = "check(18) === true" style = "margin:12px; display: inline-block; width: 100px;height: 80px; background-color: aquamarine" type="default" @click="sendAppoint(selectedValue && selectedValue.format('YYYY-MM-DD'), 18)">
                    18.00
                  </a-button>
                  <a-button v-else  style = "margin:12px; display: inline-block; width: 100px; height: 80px; background-color: gray" disabled type="default" @click="showModal">
                    18.00
                  </a-button>
                  <a-modal  v-model:visible="visible"  @ok = "sendAppoint(selectedValue && selectedValue.format('YYYY-MM-DD'), 18)" >
                    <p>Вы хотите записаться в 18.00?</p>
                  </a-modal>
                </div>

                <div style="display: inline-block;">
                  <a-button v-if = "check(19) === true" style = "margin:12px; display: inline-block; width: 100px;height: 80px; background-color: aquamarine" type="default" @click="sendAppoint(selectedValue && selectedValue.format('YYYY-MM-DD'), 19)">
                    19.00
                  </a-button>
                  <a-button v-else  style = "margin:12px; display: inline-block; width: 100px; height: 80px; background-color: gray" disabled type="default" @click="showModal">
                    19.00
                  </a-button>
                  <a-modal  v-model:visible="visible"  @ok = "sendAppoint(selectedValue && selectedValue.format('YYYY-MM-DD'), 19)" >
                    <p>Вы хотите записаться в 19.00?</p>
                  </a-modal>
                </div>

                <div style="display: inline-block;">
                  <a-button v-if = "check(20) === true" style = "margin:12px; display: inline-block; width: 100px;height: 80px; background-color: aquamarine" type="default" @click="sendAppoint(selectedValue && selectedValue.format('YYYY-MM-DD'), 20)">
                    20.00
                  </a-button>
                  <a-button v-else  style = "margin:12px; display: inline-block; width: 100px; height: 80px; background-color: gray" disabled type="default" @click="showModal">
                    20.00
                  </a-button>
                  <a-modal v-model:visible="visible"  @ok = "sendAppoint(selectedValue && selectedValue.format('YYYY-MM-DD'), 20)" >
                    <p>Вы хотите записаться в 20.00?</p>
                  </a-modal>
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
  components: {
    CalendarOutlined,
    HomeOutlined,
    LockOutlined,
    TeamOutlined,
    UserOutlined,
  },

  data() {
    return {
      info: [],
      role: localStorage.getItem('userRole'),
      collapsed: ref(false),
      selectedKeys: ref(['1']),
      doctor: null,
      clickedButton: false,
      showAlert: false
    };
  },
  created() {
    this.doctor = {
      id: localStorage.getItem('doctorIdAppoint'),
      name: localStorage.getItem('doctorNameAppoint'),
      spec: localStorage.getItem('doctorSpecAppoint'),
      exp: localStorage.getItem('doctorExpAppoint')
    }
  },
  mounted() {
    if (localStorage.getItem('userRole') == undefined) {
      localStorage.setItem('userRole', 'none');
    }

    if (localStorage.getItem('loginData')) {
      this.authorizationBasic = {
        username: localStorage.getItem('loginData'),
        password: localStorage.getItem('passwordData')
      }
    }
    console.log(this.authorizationBasic);
    if (localStorage.getItem('userId')) {
      this.userData = {
        email: localStorage.getItem('userEmail'),
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
  },
  methods: {
    sendAppoint: function (date, time) {
      var postdata = new URLSearchParams();

      postdata.append('doctor_id', this.doctor.id);
      postdata.append('patient_id', this.userData.id);
      postdata.append('date_of_receipt', date);
      postdata.append('time_of_receipt', time + ':00:00');

      var auth = new URLSearchParams();
      auth.append('username', this.authorizationBasic.username);
      auth.append('password', this.authorizationBasic.password);
      console.log(date);
      console.log(time)
      axios
          .post('http://ec2-3-120-138-66.eu-central-1.compute.amazonaws.com:8080/makeAnAppointment',
              postdata, {
            auth: this.authorizationBasic
              })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
    },
    check: function (i){
      let a = false;
      for (let j = 0; j < this.info.length; j++){
        if(this.info[j].timeOfReceipt.localeCompare((i.toString() + ':00:00')) === 0)
        {
          a = true;
        }
      }
      return a;
    },
    getInfo: async function (date){
      var postdata = new URLSearchParams();

      postdata.append('id', this.doctor.id);
      postdata.append('date', date);

      axios.post('http://ec2-3-120-138-66.eu-central-1.compute.amazonaws.com:8080/appointmentFreeSlots',
      postdata)
          .then((response) => {
            this.info = response.data;
            console.log(this.info);
          })
          .catch(function (error) {
            console.log(error);
          });
      return true;
    },
    showTime: async function (timeDate) {

      this.clickedButton = true;
      await this.getInfo(timeDate);
    },
    getData: async function(url,config, vm){
      return axios.post(url,{}, {auth: config})
          .then(function (response) {
            vm.userData = response.data;
            console.log(response);
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
    const date = ref();
    const selectedValue = ref();

    const onSelect = value => {
      date.value = value;
      selectedValue.value = value;
    };

    const onPanelChange = value => {
      date.value = value;
    };

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
      date,
      selectedValue,
      onSelect,
      onPanelChange,
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