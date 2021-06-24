<template>
    <div class="mail-changed-info alert alert-info w-100" v-if="showMailChanged && !isGuest">
        {{ $translate("Ceres::Template.checkoutChangedMail", { newMail: billingAddressMail, currMail: userMail}) }}
    </div>
</template>
<script>
const ADDRESS_EMAIL_TYPE_ID = 5;

export default {
    name: "mail-changed-info",

    props:
    {
        userMail:
        {
            type: String,
            required: true
        }
    },
    
    computed:
    {
        showMailChanged()
        {
            return !!this.billingAddressMail && this.billingAddressMail !== this.userMail;
        },

        billingAddressMail()
        {
            let mail = ""

            this.$store.state.address.billingAddress?.options?.forEach(option =>
            {
                if (option.typeId === ADDRESS_EMAIL_TYPE_ID)
                {
                    mail = option.value;
                }
            });

            return mail;
        },

        isGuest()
        {
            return !this.$store.getters.isLoggedIn;
        }
    }
}
</script>
