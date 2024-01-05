<template>
    <div id="shippingscosts-modal-wrapper" class="shippingCostModal">
        <div id="shippingscosts" role="dialog" class="modal fade" aria-modal="true" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title h3">Versandkosten</div>
                        <a data-dismiss="modal" aria-hidden="true" class="close">×</a>
                    </div>
                    <div class="modal-body">
                        <div :class="'buttonHolder loc_' + localization.localeClient">
                             <button
                                v-for="(region, index) in regions"
                                :key="index"
                                :class="['btn', 'btn-bkm-white', region.class, { 'active': activeRegion === index }]"
                                @click.prevent="setActiveRegion(index)">
                                {{ region.label }}
                            </button>
                        </div>
                        <div class="contentHolder" :class="{'loading': isLoading }">
                            <div class="table">
                                <div class="line" v-for="service in shippingServices">
                                    <span class="nameLogo">
                                        <img v-if="service.gogreen" class="gogreen" src="https://cdn.bio-kinder.de/frontend/resources/img/footer/gogreen.svg" />
                                        <span class="serviceName">{{ service.name }}</span>
                                    </span>
                                    <span class="cost">{{ service.cost }}</span>
                                    <ul class="optionalDetails" v-if="service.details">
                                        <li v-for="detail in service.details" v-html="detail"></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="details">
                                <p>
                                    * Die Versandkosten variieren, je nach Größe und Gewicht der bestellten Artikel.
                                    Es fallen pro Bestellung einmalig die höchsten Versandkosten je nach Artikel an.
                                    Auf Anfrage senden wir Ihnen alle Paketsendungen gerne auch mit unseren
                                    Speditions-Services zu.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import ModalService from "../../services/ModalService";
import { isDefined } from "../../helper/utils";

export default {
    name: "shipping-costs",
    data() {
        return {
            activeRegion: 0, 
            modalElement: 'shippingscosts',
            regions: [
                { label: 'Deutschland', class: 'germany' },
                { label: 'Österreich', class: 'austria' },
                { label: 'EU & CH', class: 'europe' },
                { label: 'Weltweit', class: 'wordlwide' }
            ]  
        };
    },
    computed:
    {
        selectedRegion() {
            if(this.selectedCountryId < 3)
                return this.selectedCountryId - 1; // 1 = de, 2 = at
            
            if(this.isEU)
                return 2;

            return 3;
        },
        isEU() {
            if(this.selectedCountryId == 4) 
                return true; // Schweiz = EU&CH

            return !!this.localization.euShippingCountries.find((country) => { return country.id === this.selectedCountryId });
        },
        shippingProvider() {
            if ([28, 50, 13, 20, 21, 15, 41, 57].includes(this.systemShippingProfile) && this.basket.itemQuantity > 0) 
                return 'parcel';
            
            if ([7, 22, 23, 43, 44, 45].includes(this.systemShippingProfile)) 
                return 'freight';
            
            if ([11, 46, 53].includes(this.systemShippingProfile)) 
                return 'letter';
            
            if ([13].includes(this.systemShippingProfile)) 
                return 'pickup';
            
            return 'none';
        },
        shippingServices()
        {
            let services = [
                [ // DE
                    { name: 'DHL Kleinpaket', gogreen: true, cost: "2,45 €", type: "letter" },
                    { name: 'DHL Paket', gogreen: true, cost: "5,95 € - 29,95 € *", type: "parcel" },
                    {
                        name: 'DHL Spedition', gogreen: true, cost: "39,95 € - 59,95 € *", type: "freight",
                        details: [
                            'telefonische Terminvereinbarung zur Lieferung',
                            'Lieferung mit einem 2-Mann-Team bis zum Aufstellort im Wohnraum',
                            'Auf Wunsch: fachgerechte Entsorgung der Verpackung'
                        ]
                    }
                ],
                [ // AT
                    { name: 'DHL Kleinpaket', gogreen: true, cost: "8,95 €", type: "letter" },
                    { name: 'DHL Paket', gogreen: true, cost: "12,95 € - 49,95 *", type: "parcel" },
                    {
                        name: 'DHL Spedition', gogreen: true, cost: "99,95 € - 129,95 € *", type: "freight",
                        details: [
                            'telefonische Terminvereinbarung zur Lieferung',
                            'Lieferung mit einem 2-Mann-Team bis zum Aufstellort im Wohnraum',
                            'Auf Wunsch: fachgerechte Entsorgung der Verpackung'
                        ]
                    }
                ],
                [ // EU & CH
                    { name: 'Abholung in Wehrheim', gogreen: false, cost: "0,00 €", type: "pickup" },
                    { name: 'DHL Paket', gogreen: true, cost: "ab 12,95 € *", type: "parcel" },
                    {
                        name: 'Spedition', gogreen: false, cost: "ab 249,95 € *", type: "freight",
                        details: [
                            'telefonische Terminvereinbarung zur Lieferung',
                            'Lieferung bis zur Bordsteinkante'
                        ]
                    }
                ],
                [ // WW
                    { name: 'Abholung in Wehrheim', gogreen: false, cost: "0,00 €", type: "pickup" },
                    { name: 'DHL Paket', gogreen: true, cost: "auf Anfrage", type: "parcel" },
                    { name: 'Spedition', gogreen: false, cost: "auf Anfrage", type: "freight" }
                ]
            ]

            return services[this.activeRegion] ?? services[0];
        },
        ...mapState({
            basket: state => state.basket.data,
            selectedCountryId: state => state.basket.data.shippingCountryId,
            systemShippingProfile: state => state.basket.data.shippingProfileId,
            localization: state => state.localization,
            isLoading: state => state.localization.localeLoading
        })
    },
    methods: {
        setActiveRegion(index) {
            console.log("Setting active Region", index)
            this.activeRegion = index;
        },
        initModalEventListeners() {
            const modal = ModalService.findModal(document.getElementById(this.modalElement));

            if (isDefined(modal)) {
                modal.on("show.bs.modal",
                    () => {
                        this.setActiveRegion(this.selectedRegion);
                    });
            }
        }
    },
    watch: {
        selectedRegion(newValue) {
            this.setActiveRegion(newValue);
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (this.modalElement) {
                this.initModalEventListeners();
            }
        });
    }

}
</script>
