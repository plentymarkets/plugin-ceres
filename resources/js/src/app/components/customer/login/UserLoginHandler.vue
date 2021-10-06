<template>
    <div class="position-relative">
        <div class="dropdown" v-if="isLoggedIn">
            <a href="#" class="dropdown-toggle nav-link" id="accountMenuList" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-boundary="window">
                <i class="fa fa-user mr-1 d-sm-none" aria-hidden="true"></i>
                <span class="d-none d-sm-inline">{{ $translate("Ceres::Template.loginHello", {"username": username }) }}</span>
            </a>
            <div class="dropdown-menu small m-0 p-0 mw-100">
                <div class="list-group" aria-labelledby="accountMenuList" >
                    <a :href="$ceres.urls.myAccount" class="list-group-item small"><i class="fa fa-user"></i> {{ $translate("Ceres::Template.loginMyAccount") }}</a>
                    <a href="#" class="list-group-item small" v-logout><i class="fa fa-sign-out"></i> {{ $translate("Ceres::Template.loginLogout") }}</a>
                </div>
            </div>
        </div>
        <div v-if="!isLoggedIn">
            <a class="nav-link" data-testing="login-select" v-if="showLogin" :href="isLogin ? 'javascript:void(0)' : '#login'" :data-toggle="isLogin ? false : 'modal'" @click="createLoginModal(); unmarkInputFields();" :aria-label="$translate('Ceres::Template.login')">
                <i class="fa fa-user mr-1" aria-hidden="true"></i>
                <span class="d-none d-sm-inline">{{ $translate("Ceres::Template.login") }}</span>
            </a>
            <template v-if="showRegistration">
                <span class="pipe" v-if="!showLogin"></span>
                <a class="nav-link" data-testing="register-select" :href="isRegister ? 'javascript:void(0)' : '#registration'" :data-toggle="isRegister ? false : 'modal'"  @click="createRegisterModal(); unmarkInputFields();" :aria-label="$translate('Ceres::Template.loginRegister')">
                    <i class="fa fa-user-plus mr-1" aria-hidden="true"></i>
                    <span class="d-none d-sm-inline">{{ $translate("Ceres::Template.loginRegister") }}</span>
                </a>
            </template>
        </div>
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
        } 
    },

    computed: {
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
