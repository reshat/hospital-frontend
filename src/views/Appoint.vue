<template>
  <a-layout class="sidepanel" style="min-height: 100vh; background: white">
    <SidePanel :role="this.role"></SidePanel>
    <a-layout class="backimage">
      <Header style=""></Header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item style="font-size: large; font-weight:bold; text-align: justify "> </a-breadcrumb-item>
        </a-breadcrumb>
        <div class="boxing" :style="{ padding: '24px', background: '#fff', minHeight: '360px', textJustify: justify}">
          <a-card class="card" style="width: 70%; margin: 12px;" >
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

          <a-card class="card" style="width: 70%; margin: 12px;" >
            <div style="margin: 12px; text-align: left;-moz-text-align-last: left; text-align-last: left;">
              <strong style = " margin-right: 12px ">Часы приема: </strong>
              <a-popover class="card" placement="bottom">
                <template class="card" #content>
                  <div class="card" :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
                    <a-calendar :value="date" @select="onSelect" @panelChange="onPanelChange" :fullscreen="false" />
                  </div>
                  <a-button class="card" style ="margin: 12px" @click = "showTime(selectedValue && selectedValue.format('YYYY-MM-DD'))">Выбрать</a-button>
                </template>
                <a-button class="card">Выбор даты </a-button>
              </a-popover>

              <a-alert class="card" v-if= "(selectedValue && selectedValue.format('YYYY-MM-DD')) === undefined"  style = "display: inline-block; margin-left: 12px" :message="'Дата не выбрана '" />
              <a-alert class="card" v-else style = "display: inline-block; margin-left: 12px" :message="`Вы выбрали: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`" />


            </div>
            <div v-for="item in this.times" v-bind:key="item" style="display: inline-block;" >
                <a-popconfirm
                    v-if = "check(item) === true"
                    title="Вы уверены, что хотите записаться в это время??"
                    ok-text="Да"
                    cancel-text="Нет"
                    @confirm="sendAppoint(selectedValue && selectedValue.format('YYYY-MM-DD'), item)">
                  <a-button class="card" style = "margin:12px; display: inline-block; width: 100px;height: 80px; background-color: aquamarine" type="default" >{{item}}.00</a-button>
                </a-popconfirm>
                <a-button class="card" v-else  style = "margin:12px; display: inline-block; width: 100px; height: 80px; background-color: gray" disabled type="default">
                  {{item}}.00
                </a-button>
            </div>
            <div style=" margin: 12px">
            <a-alert class="card" v-if = "this.error === ''"  style = "display: inline-block; margin-left: 12px" :message="`Прием будет: ${selectedValue && selectedValue.format('YYYY-MM-DD')} в ${this.selectedTime}`" />
            <a-alert class="card" v-else-if= "this.error === null"  style = "display: inline-block; margin-left: 12px" :message="'Запись на прием не произведен! '" />
            <a-alert class="card" v-else-if = "this.error === 'Reached maximum number of appointments'"  style = "display: inline-block; margin-left: 12px; background-color: pink" :message="'Вы можете записаться только 2 раза! '" />
            <a-alert class="card" v-else style = "display: inline-block; margin-left: 12px; background-color: pink" :message="`${this.error}`" />
            </div>
          </a-card>
        </div>
      </a-layout-content>
      <a-layout-footer class="underheader" style="text-align: center">
        Санкт-Петербург, 2021
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>

import {
  UserOutlined,
} from '@ant-design/icons-vue';
import {defineComponent, ref} from 'vue';
import axios from 'axios';
import SidePanel from "@/components/SidePanel";
import Header from "@/components/Header";


export default defineComponent({
  components: {
    Header,
    SidePanel,
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
      error: null,
      time: null,
      pressedButton: true,
      times: [8,9,10,11,12,13,14,15,16,17,18,19,20],
      selectedTime: null
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
  methods: {
    sendAppoint: function (date, time) {
      var postdata = new URLSearchParams();

      postdata.append('doctor_id', this.doctor.id);
      postdata.append('patient_id', localStorage.getItem('userId'));
      postdata.append('date_of_receipt', date);
      postdata.append('time_of_receipt', time + ':00:00');

      console.log(date);
      console.log(time + ':00:00')
      axios
          .post('http://ec2-3-120-138-66.eu-central-1.compute.amazonaws.com:8080/makeAnAppointment',
              postdata, {
            auth: {
              username: localStorage.getItem('loginData'),
              password: localStorage.getItem('passwordData')
            }
              })
          .then(response => {
            console.log(response.data)
            this.error = '';
            this.selectedTime = time + ':00:00'
            this.getInfo(date);
          })
          .catch(error => {
            this.error = error.response.data;
          })

      this.pressedButton = false;
    },
    check: function (i){
      let a = false;
      for (let j = 0; j < this.info.length; j++){
        if(this.info[j].timeOfReceipt.localeCompare((i.toString() + ':00:00')) === 0)
        {
          a = true;
          this.time = a;
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



    return {
      buttonWidth: ref(70),
      date,
      selectedValue,
      onSelect,
      onPanelChange,
    };
  }
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
  text-align: left;
  -moz-text-align-last: left;
  text-align-last: left;
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
  background: #e8ebed;
  box-shadow:  5px 5px 10px #b4b6b8,
  -5px -5px 10px #ffffff;
}

.card {
  border-radius: 20px;
  box-shadow:  5px 5px 10px #b4b6b8,
  -5px -5px 10px #ffffff;
}
</style>


