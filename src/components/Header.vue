<template>
  <a-layout-header class="background" style="background: #fff; padding: 0;" >
    <div id="components-popover-demo-placement" style="float: right; margin: 2px" >
      <div :style="{ clear: 'both', whiteSpace: 'nowrap' }">
        <a-popover placement="bottomRight" class="popover" >
          <template #content >
            <div v-if="this.status === 'none'">
              <a-button type="link" @click="showModal">Войти</a-button>
              <a-modal v-model:visible="visible"  @ok="handleOk" style="text-align: center" :footer="null" class="modal">
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
            <div v-else-if="this.status === 'defined'">
              <p>Добро пожаловать, {{localStorage.getItem('userName')}} </p>
              <p v-if="userData.role === 'DOCTOR'">Ваша роль:  Доктор </p>
              <p v-if="userData.role === 'ADMIN'">Ваша роль:  Админ </p>
              <p v-if="userData.role === 'PATIENT'">Ваша роль:  Пациент </p>
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
      status: 'none',
    };
  },
  mounted() {
    if(localStorage.getItem('status') === undefined){
      localStorage.setItem('status', 'none');
    }
  },
  methods: {
    getData: async function(url,config, vm){
      return axios.post(url,{}, {auth: config})
          .then(function (response) {
            vm.userData = response.data;
            console.log('lol vm')
            console.log(vm.userData)
            localStorage.setItem('status', 'defined');
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
      console.log();
      if (localStorage.getItem('status')==='defined') {
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
        this.status = localStorage.getItem('status');
        this.visible = false;
        this.$refs.header.innerText = "";
      } else {
        this.authorizationBasic = undefined;
        this.userData = undefined;
        this.visible = true;
        this.$refs.header.innerText = "Неверный логин или пароль";
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
        this.status = localStorage.getItem('status');

      }

      this.authorizationBasic = undefined;
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
.background {
  border-radius: 20px;
  background: #e3e8ed;
  box-shadow:  5px 5px 10px #adb0b4,
  -5px -5px 10px #ffffff;
}

.popover {
  border-radius: 63px;
  background: #edf0f2;
  box-shadow:  5px 5px 7px #c7cacb,
  -5px -5px 7px #ffffff;
}

.modal {
  border-radius: 20px;
  background: #edf0f2;
  box-shadow:  5px 5px 7px #c7cacb,
  -5px -5px 7px #ffffff;
}
</style>