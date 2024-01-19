<template>
    <div class="descriptionContent row">
        <div class="col-4">
            <img class="openPorto" :src="shippingIconUrl" :alt="shippingName" />
        </div>
        <div class="detail col-8">
            <span>Versand per {{ shippingName }}</span>
            <ul class="ship">
            <li v-html="shippingCosts + ' innerhalb ' + countryName"></li>
            <li><biokinder-availability :short="true" :avd="avd" :variation="variation"></biokinder-availability></li>
            <li v-html="middleLlistElement"></li>
            <li>... <a data-toggle="modal" class="openPorto" href="#shippingscosts" :title="$translate('Ceres::Template.singleItemShippingCosts')">{{ $translate("biokinderDesign::Template.itemMoreInformation") }}</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "biokinder-shipping-icon",

    data() {
        return {
            freightExpress: 'https://cdn.bio-kinder.de/frontend/seals/spedition_sl.svg',
            packageExpress: 'https://cdn.bio-kinder.de/frontend/seals/paket_sl.svg',
            freightStd: 'https://cdn.bio-kinder.de/frontend/seals/truck.svg',
            packageStd: 'https://cdn.bio-kinder.de/frontend/seals/package.svg',
            easterPackage: 'https://cdn.bio-kinder.de/frontend/seals/lieferbar-ostern.svg'
        }
    },
    props: {
        avd: {
            type: Object
        },
        variation: {
            type: Object
        },
        availability: {
            type: Number,
            default: 1
        },
        shipping: {
            float: Object,
            default: 5.95
        },
        countryId: {
            type: Number,
            default: 1
        }
    },
    computed: {
        shippingCosts() {
            if (this.shipping !== null)
                return this.formatFloat(this.shipping) + ' €'
            else
                return '0,00 €';
        },
        countryName() {
            if (this.countryId == 2)
                return "&Ouml;sterreichs";
            return "Deutschlands";
        },
        shippingIconUrl() {
            if (this.availability == 1) 
                return this.freightExpress;

            if (this.avd.isSped)
                return this.freightStd;

            return this.packageStd;
        },
        shippingName() {
            if (this.avd.isSped)
                return "Spedition";
            return "DHL Paket";
        },
        middleLlistElement() {
            if (this.avd.isSped)
                return 'Lieferung mit 2-Mann-Spedition bis ins Zimmer';
            return 'online Tracking via DHL-Paket';
        }
    },
    methods: {
        formatFloat: e => e.toFixed(2).replace(".", ",").toString()
    }
}
</script>
