<template>
  <a-layout class="sidepanel" style="min-height: 100vh; background: white">
    <SidePanel :role="this.role"></SidePanel>
    <a-layout class="backimage">
      <Header @update = "updateRole" style=""></Header>
      <a-layout-content>
        <div class="boxing" :style="{ padding: '24px', background: '#fff', minHeight: '360px'}">
          <div style="margin: 24px;">
            <a-dropdown style="width: 50%">
              <a-button @click.prevent style="">
                Выбрать пациента
                <DownOutlined />
              </a-button>
              <template #overlay>
                <a-menu style="max-width: 100%">
                  <a-menu-item v-for="patient in info" :key = "patient">
                    <a style = "width: 100%; height: 100%" @click = "takeData(patient)"> {{patient.surname + '  '+  patient.name + ' ' + patient.patronymic + ' в ' + patient.dateOfReceipt + ' в ' + patient.timeOfReceipt}}</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>

          <div v-if="this.patient !== 'none'">
            <a-card class="card" style="margin: 48px 24px; width: 70%; height: 400px">
              <div style="display: inline-block;margin-left: 12px; margin-right: 12px">
                <div style="display: inline-block; margin-right: 24px; margin-right: 24px">
                  <span > Пациент:  <span style="color: #108ee9"> {{this.patient.name + ' ' + this.patient.surname + ' ' + this.patient.patronymic }} </span></span>
                </div>
                <div style="display: inline-block; margin-left: 24px; margin-right: 24px">
                  <span> Дата: <span style="color: #108ee9"> {{this.patient.dateOfReceipt}} </span> </span>
                </div>
                <div style="display: inline-block; margin-left: 24px; margin-right: 24px">
                  <span> Время: <span style="color: #108ee9"> {{this.patient.timeOfReceipt}} </span> </span>
                </div>
              </div>
              <a-form
                  :model="formState"
                  @finish="handleFinish"
                  @finishFailed="handleFinishFailed"
              >
                <p style = "margin: 12px 12px;">Запись: </p>
                  <a-textarea  v-model:value="formState.record" placeholder="Коментарий врача" style = "margin: 0px 12px; width: 95%; height: 220px">
                    <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                  </a-textarea>
                <div style="margin: 12px;">
                  <a-button class="card"  @click = "sendComment(formState.record)">Отправить комментарий</a-button>
                  <a-alert class="card" v-if = "this.sended === 'sended'"  style = "display: inline-block; margin-left: 12px" :message="`Комментарий отправлен!`" />
                </div>
              </a-form>
            </a-card>
        </div>
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
  DownOutlined,
} from '@ant-design/icons-vue';
import {defineComponent, reactive, ref} from 'vue';
import axios from 'axios';
import SidePanel from "@/components/SidePanel";
import Header from "@/components/Header";


export default defineComponent({
  components: {
    Header,
    SidePanel,
    DownOutlined,
  },

  data() {
    return {
      role: localStorage.getItem('userRole'),
      collapsed: ref(false),
      selectedKeys: ref(['1']),
      info: [],
      patient: 'none',
      sended: 'not sended'
    };
  },
  mounted() {
    this.takePatients();
  },
  methods: {
    sendComment: function (record) {
      var postdata = new URLSearchParams();

      postdata.append('doctor_id', localStorage.getItem('userId'));
      postdata.append('patient_id', this.patient.id);
      postdata.append('record', record);
      postdata.append('date_of_receipt', this.patient.dateOfReceipt);

      axios
          .post('http://ec2-3-120-138-66.eu-central-1.compute.amazonaws.com:8080/patientRecord',postdata, {auth: {
              username: localStorage.getItem('loginData'),
              password: localStorage.getItem('passwordData')
            }})
          .then(response => {
            console.log(response.data);
            this.sended = 'sended';
          })
          .catch(error => {
            this.errorMessage = error.response.data;
            console.log(error);
          });
    },
    takeData: function (patient) {
      this.patient = patient;
    },
    updateRole: function (role) {
          this.role = role;
        },
    takePatients: function (){
      return  axios
          .get('http://ec2-3-120-138-66.eu-central-1.compute.amazonaws.com:8080/patientList?id=' + localStorage.getItem('userId'), {auth: {
              username: localStorage.getItem('loginData'),
              password: localStorage.getItem('passwordData')
            }})
          .then(response => {
            this.info = response.data;
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => (this.loading = false));
    },

  },
  setup() {
    const formState = reactive({
      doctor_id: '',
      patient_id: '',
      record: '',
      date_of_receipt: '',
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
