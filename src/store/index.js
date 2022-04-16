import { createStore } from "vuex";

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isTransparent: "",
    isRTL: false,
    mcolor: "",
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    user: null,
  },
  mutations: {
    setUserData(state, userData) {
       state.user = userData,
        localStorage.setItem('user', JSON.stringify(userData))

    },
    clearUserData(state) {
      localStorage.removeItem('user');
      localStorage.removeItem('userToken');
      state.user = null;

    },
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      const sidenav = document.getElementById("sidenav-main");

      if (sidenav_show.classList.contains("g-sidenav-pinned")) {
        sidenav_show.classList.remove("g-sidenav-pinned");
        setTimeout(function () {
          sidenav.classList.remove("bg-white");
        }, 100);
        sidenav.classList.remove("bg-transparent");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-pinned");
        sidenav.classList.add("bg-white");
        sidenav.classList.remove("bg-transparent");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.isTransparent = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    logout({ commit }) {
      commit('clearUserData')
    }
  },
  getters: {
    // isAdmin(state) {
    //   if (state.user) {
    //     return state.user["role"] === "admin";
    //   }
    // },
    // isCityManager(state) {
    //   if (state.user) {
    //     return state.user["role"] === "city_manager";
    //   }
    // },
    // isGymManager(state) {
    //   if (state.user) {
    //     return state.user["role"] === "gym_manager";
    //   }
    // },
    // isUser(state) {
    //   if (state.user) {
    //     return state.user["role"] === "user";
    //   }

    // },
    atLeastAdmin(state) {
      if (state.user) {
        return state.user["role"] === "admin";
      }
    },
    atLeastCityManager(state) {
      if (state.user) {
        return (
          state.user["role"] === "admin" || state.user["role"] === "city_manager"
        );
      }
    },
    atLeastGymManager(state) {
      if (state.user) {
        return (
          state.user["role"] === "gym_manager" ||
          state.user["role"] === "city_manager" ||
          state.user["role"] === "admin"
        );
      }
    },
    atLeastUser(state) {
      if (state.user) {
       return (
        state.user["role"] === "user"||
        state.user["role"] === "gym_manager" ||
        state.user["role"] === "city_manager" ||
        state.user["role"] === "admin"
       );
      }

    },

    isLoggedIn: state => !!state.user

  },
});
