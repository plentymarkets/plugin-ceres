<template>
    <div class="container-max mt-5">
        <div class="row mb-5">
            <div class="col-sm-10 offset-sm-1 col-md-6 offset-md-3">
                <div>
                    <h1 class="login-view-title mb-5">{{ $translate("Ceres::Template.login") }}</h1>
                    <login :backlink="sanitizedBacklink" :has-to-forward="true">
                        <template #extend-overlay-buttons>
                            <slot name="extend-overlay-buttons"></slot>
                        </template>
                    </login>
                </div>

                <hr>

                <div class="row">
                    <div class="col-sm-{% if 'my-account' not in backlink %}6{% else %}12{% endif %}" :class="{'col-sm-6': !myAccountInBacklink, 'col-sm-12': myAccountInBacklink}">
                        <a class="btn btn-primary btn-block mb-3" :href="registrationUrl">
                            <i class="fa fa-user-plus" aria-hidden="true"></i>
                            {{ $translate("Ceres::Template.loginRegister") }}
                        </a>
                    </div>

                    <div v-if="!myAccountInBacklink" class="col-sm-6">
                        <button class="btn btn-primary btn-block mb-3" @click="openGuestModal()">
                            <i class="fa fa-shopping-bag" aria-hidden="true"></i>
                            {{ $translate("Ceres::Template.loginOrderAsGuest") }}
                        </button>
                    </div>
                </div>

                <slot name="additional-content-after-buttons"></slot>
            </div>
        </div>

        <div class="modal fade" ref="guestModal" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title h3">{{ $translate("Ceres::Template.loginOrderAsGuest") }}</div>
                        <button type="button" class="close" data-testing="guest-login-modal" data-dismiss="modal" aria-hidden="true" :aria-label="$translate('Ceres::Template.closeIcon')">&times;</button>
                    </div>
                    <div class="modal-body">
                        <guest-login :backlink="sanitizedBacklink" :initial-email="guestEmail"></guest-login>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ModalService from "../../../services/ModalService";

export default {
    props: {
        backlink: {
            type: String,
            default: ""
        },
        guestEmail: {
            type: String
        }
    },

    computed: {
        registrationUrl()
        {
            if(this.backlink !== "")
            {
                return App.urls.registration + "?backlink=" + this.sanitizedBacklink;
            }

            return App.urls.registration;
        },

        sanitizedBacklink()
        {
            return encodeURI(this.backlink);
        },

        myAccountInBacklink()
        {
            return this.backlink.includes(App.urls.myAccount);
        }
    },

    methods:
    {
        openGuestModal() {
            ModalService.findModal(this.$refs.guestModal).show();
        }
    }
}
</script>
