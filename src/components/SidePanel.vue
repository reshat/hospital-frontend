<template>
  <a-layout-sider class="background" style="background: white">
    <div class="logo" />
    <a-menu theme="light" mode="inline"  style = "margin-top: 24px">
      <img src="..\assets\1863367.png" width="50" height="50" style="margin: 2px; margin-left:5px">
      <span style="color: black; font-size: 12px; margin-left: 5px">Городская больница №1</span>
      <a-menu-item key="1">
        <HomeOutlined />
        <span> <router-link to="/"> Главная </router-link>    </span>
      </a-menu-item>
      <a-menu-item key="2">
        <TeamOutlined />
        <span> <router-link to="/doctors"> Наши доктора </router-link>    </span>
      </a-menu-item>
      <div v-show=" (this.role === 'PATIENT')">
        <a-menu-item key="3">
          <CalendarOutlined />
          <span> <router-link to="/patientsAppoints"> Мои приемы </router-link>    </span>
        </a-menu-item>
      </div>
      <div v-show=" (this.role === 'PATIENT')">
        <a-menu-item key="4">
          <BookOutlined />
          <span> <router-link to="/patientsComments"> Мои комментарии </router-link>    </span>
        </a-menu-item>
      </div>
      <div v-show="this.role === 'DOCTOR'">
        <a-menu-item key="5">
          <CheckSquareOutlined />
          <span> <router-link to="/doctorAppoint"> Сделать записи </router-link>    </span>
        </a-menu-item>
      </div>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import {
  HomeOutlined,
  TeamOutlined,
  CalendarOutlined,
  CheckSquareOutlined,
  BookOutlined,
} from '@ant-design/icons-vue';
export default {
  components: {
    HomeOutlined,
    TeamOutlined,
    CalendarOutlined,
    CheckSquareOutlined,
    BookOutlined,
  },
  name: "SidePanel",
  props: {
    role: String
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
</style>