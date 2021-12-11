<template>
  <a-layout-header style="background: #fff; padding: 0;" >
    <div id="components-popover-demo-placement" style="float: right; margin: 2px" >
      <div :style="{ clear: 'both', whiteSpace: 'nowrap' }">
        <a-popover placement="bottomRight" >
          <template #content >
            <div v-if="this.status != null || this.status === 'undefined'">
              <a-button type="link" @click="showModal">Войти</a-button>
              <a-modal v-model:visible="visible"  @ok="handleOk" style="text-align: center" :footer="null">
                <p><strong> Войти </strong></p>
                <a-form
                    :model="formState"
                    @finish="handleFinish"
                    @finishFailed="handleFinishFailed">
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
                    <a-button type="link" href = "/register" style = "margin-top: 12px" ><strong>Зарегистрироваться</strong></a-button>
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
  </a-layout-header>
</template>

<script>
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import {reactive, ref} from "vue";
import axios from "axios";
export default {
  components: {
    UserOutlined,
    LockOutlined,
  },
  name: "Header",
  props: {
    //status: String,
  },
  data() {
    return {
      status: localStorage.getItem('status'),
    };
  },
  methods: {
    getData: async function(url,config, vm){
      return axios.post(url,{}, {auth: config})
          .then(function (response) {
            vm.userData = response.data;
            console.log(response)
          })
          .catch(function (error) {
            localStorage.setItem('status', error);
          });
    } ,
    autorization: async function (formState) {
      console.log("Author ggg");
      console.log(formState);
      console.log(this);

      let vm = this;
      console.log("1");

      //localStorage.setItem('status', "undefined");
      console.log("Author");
      console.log(this);
      console.log(formState.user);
      let user = formState.user;
      let pass = formState.password;

      let url = 'http://ec2-3-120-138-66.eu-central-1.compute.amazonaws.com:8080/login';

      this.authorizationBasic = {
        username: user,
        password: pass
      }

      await this.getData(url, this.authorizationBasic, vm);
      console.log(this.userData);
      console.log("look");
      console.log(localStorage.getItem('status'));
      if (localStorage.getItem('status')==undefined) {
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
        localStorage.setItem('status', "defined");
      } else {
        this.authorizationBasic = undefined;
        this.userData = undefined;
        localStorage.clear();
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

    exitAccount: function () {
      this.authorizationBasic = undefined;
      this.userData = undefined;
      localStorage.clear();
      window.location.reload();
      console.log(this.authorizationBasic);
    },
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
}
</script>

<style scoped>

</style>