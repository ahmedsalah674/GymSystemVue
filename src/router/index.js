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
// import SignUp from "@/views/SignUp.vue";
import addCityManager from "@/views/components/addCityManager.vue";
import editCityManager from "@/views/components/editCityManager.vue";
import CityTable from "@/views/components/CitiesTable.vue";
import editTrainingSession from "@/views/components/editTrainingSession.vue";
import Swal from "sweetalert2";
import store from '../store'

const routes = [{
        path: "/",
        name: "/",
        redirect: "/dashboard",
        meta: {
            requiresAuth:true,
            role: ["gym_manager","city_manager","admin"]
        }
  
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
            requiresAuth:true,
            role: ["gym_manager","city_manager","admin"]
        }
    
    },
    ////////////////// route for Gym Members
    {
        path: "/GymMembers",
        name: "GymMembers",
        component: GymMembers,
        meta: {
            requiresAuth:true,
            role: ["gym_manager","city_manager","admin"]

        }
    },
   
    

  

    ////////////// end routes for gym members
    {
        path: "/cities",
        name: "Cities",
        component: CityTable,
        meta: {
            requiresAuth:true,
            role: ["admin"]
        }
    },
    {
        path: "/citymanagers",
        name: "CityManagers",
        component: CityManagers,
        meta: {
            requiresAuth:true,
            role: ["admin"]
        }
    },
    {
        path: "/citymanagers/create",
        name: "addCityManager",
        component: addCityManager,
        meta: {
            requiresAuth:true,
            role: ["admin"]
        }
    },
    {
        path: "/citymanagers/:id/edit",
        name: "editCityManager",
        props:true,
        component: editCityManager,
        meta: {
            requiresAuth:true,
            role: ["admin"]
        }
    },
    {
        path: "/GymManagers",
        name: "GymManagers",
        component: GymManagers,
        meta: {
            requiresAuth:true,
            role:["city_manager","admin"]

        }
    },
    {
        path: "/TrainingSessions",
        name: "TrainingSessions",
        component: TrainingSessions,
        meta: {
            requiresAuth:true,
            role:["gym_manager","city_manager","admin"]

        }
    },
    {
        path: "/TrainingSessions/create",
        name: "addTrainingSession",
        component: addTrainingSessions,
        meta: {
            requiresAuth:true,
            role: ["gym_manager","city_manager","admin"]

        }
    },
    {
        path: "/TrainingSessions/:id/update",
        name: "editTrainingSession",
        props:true,
        component: editTrainingSession,
        meta: {
            requiresAuth:true,
            role: ["gym_manager","city_manager","admin"]


        }
    },

    {
        path: "/tables",
        name: "Tables",
        component: Tables,
        meta: {
            requiresAuth:true,
            role: ["gym_manager","city_manager","admin"]


        }
     
    },
    {
        path: "/billing",
        name: "Billing",
        component: Billing,
        meta: {
            requiresAuth:true,
            role: ["gym_manager","city_manager","admin"]


        }
    },
    {
        path: "/virtual-reality",
        name: "Virtual Reality",
        component: VirtualReality,
        meta: {
            requiresAuth:true,
            role: ["gym_manager","city_manager","admin"]


        }
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
        meta: {
            requiresAuth:true,
            role: ["user","gym_manager","city_manager","admin"]
        }
    },
    {
        path: "/rtl-page",
        name: "Rtl",
        component: Rtl,
        meta: {
            requiresAuth:true,
            role: ["user","gym_manager","city_manager","admin"]
        }
    },
    {
        path: "/sign-in",
        name: "Sign In",
        component: SignIn,
    },
    // {
    //     path: "/sign-up",
    //     name: "Sign Up",
    //     component: SignUp,
    // },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: "active",
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
            // if not, redirect to login page.
            if (store.getters.isLoggedIn) {
                if (!to.matched.some(record => record.meta.role.includes(store.state.user["role"]))) {
                    Swal.fire({
                        text: "You are not Authorized",
                        icon: "warning",
                        confirmButtonText: "ok",
                      });
                      next('/profile');
                      
                      return;
                    
                  }
            }else{
                next("/sign-in")

            } 

    } 
   

      return next();    
  
});
export default router;