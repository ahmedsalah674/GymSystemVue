/* eslint-disable prettier/prettier */
import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Tables from "@/views/Tables.vue";
import Billing from "@/views/Billing.vue";
import VirtualReality from "@/views/VirtualReality.vue";
import Profile from "@/views/Profile.vue";
import Rtl from "@/views/Rtl.vue";
import SignIn from "@/views/SignIn.vue";
import GymMembers from "@/views/GymMembers.vue";
import GymManagers from "@/views/GymManagers.vue";
import TrainingSessions from "@/views/TrainingSessions.vue";
import addTrainingSessions from "@/views/components/addTrainingSessions.vue";
import CityManagers from "@/views/CityManagers.vue";
import SignUp from "@/views/SignUp.vue";
import addCityManager from "@/views/components/addCityManager.vue";
import editCityManager from "@/views/components/editCityManager.vue";
import CityTable from "@/views/components/CitiesTable.vue";
import editTrainingSession from "@/views/components/editTrainingSession.vue";
import Packages from "@/views/components/Packages.vue";

const routes = [{
        path: "/",
        name: "/",
        redirect: "/dashboard",
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
    },
    // route for Gym Members
    {
        path: "/GymMembers",
        name: "GymMembers",
        component: GymMembers,
    },
    {
        path: "/cities",
        name: "Cities",
        component: CityTable,
    },
    {
        path: "/citymanagers/create",
        name: "addCityManager",
        component: addCityManager,
    },
    {
        path: "/citymanagers/:id/edit",
        name: "editCityManager",
        props:true,
        component: editCityManager,
    },
    {
        path: "/GymManagers",
        name: "GymManagers",
        component: GymManagers,
    },
    {
        path: "/TrainingSessions",
        name: "TrainingSessions",
        component: TrainingSessions,
    },
    {
        path: "/TrainingSessions/create",
        name: "AddTrainingSession",
        component: addTrainingSessions,
    },
    {
        path: "/TrainingSessions/:id/update",
        name: "editTrainingSession",
        props:true,
        component: editTrainingSession,
    },
    {
        path: "/citymanagers",
        name: "CityManagers",
        component: CityManagers,
    },
    {
        path: "/Packages",
        name: "Packages",
        component: Packages,
    },
    {
        path: "/tables",
        name: "Tables",
        component: Tables,
    },
    {
        path: "/billing",
        name: "Billing",
        component: Billing,
    },
    {
        path: "/virtual-reality",
        name: "Virtual Reality",
        component: VirtualReality,
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
    },
    {
        path: "/rtl-page",
        name: "Rtl",
        component: Rtl,
    },
    {
        path: "/sign-in",
        name: "Sign In",
        component: SignIn,
    },
    {
        path: "/sign-up",
        name: "Sign Up",
        component: SignUp,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: "active",
});

export default router;