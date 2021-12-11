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
      error: ''
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
      postdata.append('patient_id', this.userData.id);
      postdata.append('date_of_receipt', date);
      postdata.append('time_of_receipt', time + ':00:00');

      console.log(this.doctor.id)
      console.log(this.userData.id)

      console.log(date);
      console.log(time + ':00:00')
      axios
          .post('http://ec2-3-120-138-66.eu-central-1.compute.amazonaws.com:8080/makeAnAppointment',
              postdata, {
            auth: this.authorizationBasic
              })
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            this.error = error.response.data;
            console.log(error.response.data)
          })

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