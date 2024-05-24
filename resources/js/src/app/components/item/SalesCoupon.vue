<template>
    <div class="sales-coupon">
        <div class="codeHolder">
            <svg v-if="icon" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
                stroke-linecap="round" stroke-linejoin="round" class="sunIcon">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>

            <div class="labeling">
                <h3 v-if="!short">Sommer-Aktion: 20% sparen!*</h3>
                <h3 v-else>Jetzt 20% sparen!*</h3>
                <label v-if="showvalid">gültig bis 16. Juni 2024</label>
            </div>

            <slot name="additionalContent"></slot>

            <button class="codeField" @click="copy">
                <i class="fa" :class="{ 'fa-check': codeActive, 'fa-copy': !codeActive }"></i>
                <span class="code" v-html="code"></span>
            </button>

            <button v-if="details" class="viewDetails collapsed" data-toggle="collapse" data-target="#couponDetails"
                aria-expanded="false" aria-controls="couponDetails">
                <i class="fa fa-chevron-down"></i>
            </button>
        </div>
        <div v-if="details" class="collapse couponDetails" id="couponDetails">
            <p>* G&uuml;ltig für die nächste Bestellung nur in Verbindung mit dem Gutscheincode {{ code }}.
                Gilt <i>nicht</i> auf bereits reduzierte Ware. Nicht mit anderen Aktionen oder Gutscheinen kombinierbar.
                Keine Auszahlung möglich. Gültig bis 16.06.2024</p>
        </div>
    </div>
</template>

<script>
const NotificationService = require("../../services/NotificationService");

export default {

    name: "sales-coupon",

    props: {
        short: {
            type: Boolean,
            default: true
        },
        showvalid: {
            type: Boolean,
            default: true
        },
        details: {
            type: Boolean,
            default: false
        },
        icon: {
            type: Boolean,
            default: true
        },
        bundleType: String,
        bundleComponents: Array
    },

    data() {
        return {
            code: 'SOMMER20',
            codeActive: false
        };
    },


    computed:
    {
        showItemBundleItems() {
            return App.bundleSetting !== 1 && this.bundleType === "bundle";
        }
    },

    methods:
    {
        getBundleInnerText(item) {
            item.variation.bundleType = null;

            return item;
        },

        async copy() {
            try {
                await navigator.clipboard.writeText(this.code);
                this.codeActive = true;
                NotificationService.success(
                   "Der Gutscheincode wurde in Ihre Zwischenablage kopiert!"
                ).closeAfter(5000);

            } catch ($e) {
                this.codeActive = false;
            }
        }
        
    }
}
</script>
