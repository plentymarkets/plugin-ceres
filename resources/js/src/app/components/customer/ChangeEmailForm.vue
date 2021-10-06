<template>
    <form method="post" @submit.prevent="submit()" class="clearfix">
        <div class="input-unit mt-3">
            <label :for="'new-mail' + _uid" class="disabled">{{ $translate("Ceres::Template.myAccountNewEmail") }}</label>
            <input type="email" name="email" class="form-control" :id="'new-mail' + _uid" :value="newMail" disabled>
        </div>

        <div class="input-unit">
            <label :for="'password' + _uid">{{ $translate("Ceres::Template.loginPassword") }}</label>
            <input type="password" name="password" autocomplete="current-password" class="form-control" :id="'password' + _uid" v-model="password">
        </div>

        <button type="submit" :disabled="isDisabled" class="btn btn-primary btn-appearance float-right btn-medium btn-xs-max-width">
            <span>{{ $translate("Ceres::Template.myAccountChangeEmail") }}</span>
            <icon icon="envelope" :loading="isDisabled"></icon>
        </button>
    </form>
</template>

<script>
import NotificationService from "../../services/NotificationService";
import ApiService from "../../services/ApiService";

export default {

    props: {
        contactId:
        {
            type: Number,
            required: true
        },
        hash:
        {
            type: String,
            required: true
        },
        newMail:
        {
            type: String,
            required: true
        }
    },
    data()
    {
        return {
            password: "",
            isDisabled: false
        };
    },

    methods: {
        /**
         * Send the login data
         */
        submit()
        {
            this.isDisabled = true;

            ApiService.put("/rest/io/customer/mail/" + this.contactId, { password: this.password, hash: this.hash })
                .done(response =>
                {
                    NotificationService.success(
                        this.$translate("Ceres::Template.myAccountChangeEmailSuccessful")
                    ).closeAfter(3000);
                    window.location.assign(window.location.origin);
                })
                .fail(() =>
                {
                    NotificationService.error(
                        this.$translate("Ceres::Template.myAccountChangeEmailFailed")
                    ).closeAfter(10000);
                })
                .always(() =>
                {
                    this.isDisabled = false;
                });
        }
    }
}
</script>