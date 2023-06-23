<template>
    <div :class="viewModeClass">
        <template v-if="viewMethod == 'default'">
          <span class="icon" :class="{ loggedin: isLoggedIn }">
            <a class="nav-link"
               v-if="!isLoggedIn"
               :href="isLogin ? 'javascript:void(0)' : '#login'"
               :data-toggle="isLogin ? false : 'modal'"
               @click="createLoginModal(); createRegisterModal(); unmarkInputFields();"
               :aria-label="$translate('Ceres::Template.login')"
               >            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="butt" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </a>
                <a v-else :href="$ceres.urls.myAccount">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="butt" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </a>
            </span>
        </template>

        <template v-else-if="viewMethod == 'mobile'">
            <a
                v-if="!isLoggedIn"
                href="#login"
                :data-toggle="isLogin ? false : 'modal'"
                @click="createLoginModal(); createRegisterModal(); unmarkInputFields();">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span class="mini" v-html="$translate('Ceres::Template.login')" nologin></span>
            </a>
            <a v-else class="loggedin" :href="$ceres.urls.myAccount">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span class="mini" v-html="'Mein Konto'" loggedin></span>
            </a>
        </template>
        <template v-else-if="viewMethod == 'wishlist'">
            <span class="icon">
                <i data-feather="heart"></i>
                <a href="#login"
                   :data-toggle="isLogin ? false : 'modal'"
                   @click="createLoginModal(); createRegisterModal(); unmarkInputFields();">Anmelden</a>
            </span>
        </template>
    </div>
</template>

<script>
import ValidationService from "../../../services/ValidationService";
import { mapGetters, mapActions } from "vuex";

export default {
    props: {
        showRegistration: {
            type: Boolean,
            default: true
        },
        showLogin: {
            type: Boolean,
            default: true
        },
        viewMethod: {
            type: String,
            default: 'default'
        }
    },

    computed: {
        viewModeClass() {
            switch (this.viewMethod) {
                case 'mobile': return 'myAccount'; break;
                case 'wishlist': return 'row'; break;
                default: return 'd-inline'
            }
        },
        ...mapGetters([
           "username",
           "isLoggedIn"
        ])
    },

    data()
    {
        return {
            isLogin: App.templateType === "login",
            isRegister: App.templateType === "register"
        };
    },

    methods: {
        unmarkInputFields()
        {
            ValidationService.unmarkAllFields($("#login"));
            ValidationService.unmarkAllFields($("#registration"));
        },
        createLoginModal()
        {
            this.loadComponent("login-modal");
        },

        createRegisterModal()
        {
            this.loadComponent("register-modal");
        },

        ...mapActions([
            "loadComponent"
        ])
    }
}
</script>
