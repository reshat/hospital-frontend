import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/Main.vue'
import Doctors from '@/views/Doctors'
import Appoint from "@/views/Appoint";
import PatientAppoints from "@/views/PatientAppoints";
import DoctorAppoint from "@/views/DoctorAppoint";
import register from "@/views/register";
import PatientComments from "@/views/PatientComments";

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/doctors',
    component: Doctors
  },
  {
    path: '/patientsAppoints',
    component: PatientAppoints
  },
  {
    path: '/patientsComments',
    component: PatientComments
  },
  {
    path: '/appoint',
    component: Appoint
  },
  {
    path: '/doctorAppoint',
    component: DoctorAppoint
  },
  {
    path: '/register',
    component: register
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  mode: "hash"
})

export default router
