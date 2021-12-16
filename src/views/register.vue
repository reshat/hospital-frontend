<template>
 <div       class="backimage">
  <div style = "height: 10em;
    position: absolute;
    top: 18%;
    left: 50%;
    margin: 0 -50% 0 0;
    transform: translate(-50%, -50%);
">
    <a-form
        class="сard"
        :model="formState"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
        style = "border: 0.5px solid black; width: 400px"

    >
      <a-form-item  style = "width: 80%;  margin: 10%">
        <strong style="font-size: 24px">Регистрация</strong>
      </a-form-item>
      <a-form-item style = "width: 80%;  margin-left: 10%;">
        <a-input class="сard" v-model:value="formState.login" placeholder="Login">
          <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
        </a-input>
      </a-form-item>
      <a-form-item style = "width: 80%;  margin-left: 10%;">
        <a-input class="сard" v-model:value="formState.password" type="password" placeholder="Password">
          <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
        </a-input>
      </a-form-item>
      <a-form-item style = "width: 80%;  margin-left: 10%;">
        <a-input class="сard" v-model:value="formState.name" placeholder="Name">
          <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
        </a-input>
      </a-form-item>
      <a-form-item style = "width: 80%;  margin-left: 10%;">
        <a-input class="сard" v-model:value="formState.surname" placeholder="Surname">
          <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
        </a-input>
      </a-form-item>
      <a-form-item style = "width: 80%;  margin-left: 10%;">
        <a-input class="сard" v-model:value="formState.patronymic" placeholder="Patronymic">
          <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
        </a-input>
      </a-form-item>
      <a-form-item style = "width: 80%;  margin-left: 10%;">
        <a-input class="сard" v-model:value="formState.email" placeholder="Email">
          <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
        </a-input>
      </a-form-item>
      <a-form-item style ="margin: 14px">
        <p  style="color: crimson; font-size: 14px; margin: 0px"> {{this.errorMessage}}  </p>
      </a-form-item>
      <a-form-item>
        <a-button
            class="сard"
            style = "width: 80%;"
            v-on:click="register(formState);"
            block
            html-type="submit"
            :disabled="formState.login === '' || formState.password === ''|| formState.name === ''|| formState.surname === ''|| formState.patronymic === ''|| formState.email === ''"
        >
          Войти
        </a-button>
        <a-button type="link"  style = "margin-top: 12px; width: 80%;" ><strong><router-link to="/"> Назад </router-link></strong></a-button>
      </a-form-item>
    </a-form>
  </div>
 </div>
</template>

<script>
import { defineComponent, reactive, } from 'vue';
import axios from "axios";
import router from "@/router";


export default defineComponent({
  data() {
    return {
      errorMessage: null
    };
  },
      methods: {
        register: async function (formState) {
          var postdata = new URLSearchParams();

          postdata.append('name', formState.name);
          postdata.append('surname', formState.surname);
          postdata.append('patronymic', formState.patronymic);
          postdata.append('login', formState.login);
          postdata.append('email', formState.email);
          postdata.append('password', formState.password);

          axios
              .post('http://ec2-3-120-138-66.eu-central-1.compute.amazonaws.com:8080/signup',postdata)
              .then(response => {
                console.log(response.data);
                this.errorMessage = [];
                router.push('/');
              })
              .catch(error => {
                this.errorMessage = error.response.data;
                console.log(formState)
                console.log(error);
              });
        },
      },
      setup() {
        const formState = reactive({
          name: '',
          surname: '',
          patronymic: '',
          email: '',
          login: '',
          password: '',
        });


        const handleFinish = values => {
          console.log(values, formState);
        };

        const handleFinishFailed = errors => {
          console.log(errors);
        };


        return {
          handleFinish,
          handleFinishFailed,
          formState,
        };
      },
    }

);
</script>

<style scoped>
.backimage {
  background-image: url(../assets/background.jpg);
  background-size: 700px;
  position:fixed;
  padding:0;
  margin:0;

  top:0;
  left:0;

  width: 100%;
  height: 100%;
}
.сard {
  border-radius: 20px;
  background-color: white;
  box-shadow:  5px 5px 10px #b4b6b8,
  -5px -5px 10px #ffffff;
}
</style>