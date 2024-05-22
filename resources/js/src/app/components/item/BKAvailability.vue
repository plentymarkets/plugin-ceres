<template>
    <div :class="{'row': !short}">
        <div
            :class="{ 'col-12 d-flex align-items-center': !short, 'liveShippingInfo': short }">
            <span class="availabilityText sofortLieferbar" :class="{'bkIcon': !short}" v-html="avDisplayHoliday"></span>
        </div>

        <!-- Modal -->
        <div v-if="!short" class="modal fade" id="freightInfo" tabindex="-1" role="dialog" aria-labelledby="freightInfoToggle"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body d-flex flex-column">
                        <h3 class="mb-2">Lieferung per Spedition</h3>
                        <p>Das Produkt ist auf Lager und wird umgehend für den Versand vorbereitet. 
                            Die Spedition wird sich in den nächsten Tagen mit Ihnen in Verbindung setzen,
                            um einen Liefertermin zu vereinbaren.</p>
                        <button type="button" class="btn btn-bkm btn-sm ml-auto mt-2"
                            data-dismiss="modal">Schließen</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { isHoliday } from 'feiertagejs';

export default {
    name: "biokinder-availability",

    data() {
      return {
        txt1to3Days: this.$translate("biokinderDesign::Template.availabilityDisplayTxt1to3Days"),
        txt3to5Days: this.$translate("biokinderDesign::Template.availabilityDisplayTxt3to5Days"),
        txt5to8Days: this.$translate("biokinderDesign::Template.availabilityDisplayTxt5to8Days"),
        txt1to2Weeks: this.$translate("biokinderDesign::Template.availabilityDisplayTxt1to2Weeks"),
        txt2to4Weeks: this.$translate("biokinderDesign::Template.availabilityDisplayTxt2to4Weeks"),
        txt4to6Weeks: this.$translate("biokinderDesign::Template.availabilityDisplayTxt4to6Weeks"),
        txt6to8Weeks: this.$translate("biokinderDesign::Template.availabilityDisplayTxt6to8Weeks"),
        txt8to10Weeks: this.$translate("biokinderDesign::Template.availabilityDisplayTxt8to10Weeks"),
        txtDefaultDelivery: this.$translate("biokinderDesign::Template.availabilityDisplayTxtDefaultDelivery"),
        txtShipsToday: this.$translate("biokinderDesign::Template.availabilityDisplayTxtShipsToday"),
        txtChristmasHint: "<span class='christmas'><i class='fa fa-gift' aria-hidden='true'></i> Pünktlich zu Weihnachten!</span>",
        txtEasterHint: "<span class='easter'><i class='fa fa-gift' aria-hidden='true'></i> Pünktlich zu Ostern!</span>",
        txtShipsTomorrow: this.$translate("biokinderDesign::Template.availabilityDisplayTxtShipsTomorrow"),
        txtShipsMondays: this.$translate("biokinderDesign::Template.availabilityDisplayTxtShipsMondays"),
        // txtFrightShipsFriday: this.$translate("biokinderDesign::Template.availabilityDisplayTxtFrightShipsFriday"),
        txtFrightShipsTomorow: this.$translate("biokinderDesign::Template.availabilityDisplayTxtFrightShipsTomorow"),
        txtFrightNextFriday: this.$translate("biokinderDesign::Template.availabilityDisplayTxtFrightNextFriday"),
        isLoading: true,
        requestLoading: false
      }
    },
    props: {
      variation: {
        type: Object
      },
      avd: {
        type: Object
      },
      short: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      requestAvailabilityData()
      {
        this.isLoading = true;

        // Already requested this variation
        if (this.$store.erid.some((e) => { if (e && e.id == this.variation.id) return true; })) {
            this.isLoading = false;
            return;
        }

        if(this.variation.availabilityId == 1)
        {
            let avd = {
                'id': variationId,
                'd': 0
            };
            this.$store.erid.push(avd);
            this.isLoading = false;
            return;
        }

        let variationId = this.variation.id;

        if(this.variation.availabilityId != 1 && !this.requestLoading)
        {
            this.requestLoading = true;
            $.ajax({
                method: 'GET',
                context: this,
                url: 'availabilities/' + variationId + '/',
                success: function(intDays)
                {
                    let avd = {
                        'id': variationId,
                        'd': intDays
                    };
                    this.$store.erid.push(avd);
                    this.requestLoading = false;
                    this.isLoading = false;
                }
            });
        } 
      }
    },
    computed: {
        availabilityDisplay() {
            // availability != 1
            if(this.isLoading)
                return "...";

            if (this.variation.availability.id > 1) {

                var tage = this.$store.erid.find((e) => { if (e && e.id == this.variation.id) return e; }).d;

                // days not set properly
                if (999 == tage || null == tage || 0 == tage || 5 != this.variation.availability.id)
                    return this.variation.availability.names.name;

                switch (!0) {
                    case tage < 3:
                        return this.txt1to3Days;
                    case tage < 6:
                        return this.txt3to5Days;
                    case tage < 11:
                        return this.txt5to8Days;
                    case tage < 14:
                        return this.txt1to2Weeks;
                    case tage < 28:
                        return this.txt2to4Weeks;
                    case tage < 42:
                        return this.txt4to6Weeks;
                    case tage < 56:
                    case tage < 70:
                        return this.txt6to8Weeks;
                    default:
                        return this.txtDefaultDelivery
                }
            }

            // availability = 1


            // if (this.avd.isSped) {
                
            //     // today is friday before 10 and no holiday, ships today!
            //     if(currentWeekDay == 5 && !isHoliday(dateTodayNow, "HE") && dateTodayNow.getHours() < 10)
            //          return this.txtShipsToday;
            //    

            //     
            //     if (isHoliday(dateTodayNow, "HE"))
            //         return this.variation.availability.names.name;

            //     if(dateTodayNow.getHours() < 16)
            //         return this.txtShipsToday; 
                
            //     var nextFriday = new Date(this.avd.time.now * 1000);
            //     var add = 0;
            //     if (dateTodayNow.getDay() == 5)
            //         var add = 7;
                
            //      nextFriday.setDate(dateTodayNow.getDate() + ((5 + 7 - dateTodayNow.getDay()) % 7) + add);
        
            //     // today is friday after 10, or not friday or friday + holiday 
            //     // next friday is (also) a holiday 
            //     // lost -> show default value
            //     if (isHoliday(nextFriday, "HE"))
            //         return this.variation.availability.names.name;
                
            //     // we now know, next friday is not a holiday
            //     // we also know, it's thursday
            //     // so we will ship tomorrow
            //     if(currentWeekDay == 4)
            //         return this.txtFrightShipsTomorow;

            //     // today is not friday or its friday and too late 
            //     // it is also not thursday
            //     // next friday, shipping is possible. so output that.
            //     return this.txtFrightNextFriday;
            // }

            // product is available
            // product is not freight
            // check for holiday on monday
            // check for holidays
            let dateTodayNow = new Date(1000 * this.avd.time.now);
            let dateTomorrow = new Date(1000 * this.avd.time.now + 86400000);
            let currentWeekDay = new Date(1000 * this.avd.time.now).getDay();

            var daysUntilMonday = 8 - currentWeekDay % 7; // 8 - 5 % 7 = 3 --> friday + 3 days =) monday
            var timestampMonday = 1000 * this.avd.time.now + 86400000 * daysUntilMonday;
            let dateMonday = new Date(timestampMonday);
            let mondayIsHoliday = isHoliday(dateMonday, "HE"); // <<--

            if (this.avd.time.now < this.avd.time.until && currentWeekDay > 0 && currentWeekDay <= 5 && !isHoliday(dateTodayNow, "HE")) // mo - fr, 0 - ~14h
                return this.txtShipsToday;

            if (this.avd.time.now > this.avd.time.until && currentWeekDay > 0 && currentWeekDay <= 4 && !isHoliday(dateTomorrow, "HE")) // mo - do, 14 - 0
                return this.txtShipsTomorrow;

            // Friday afternoon, saturday, sunday 00:00 - 23:59 -> ships on monday
            if ([5, 6, 0].includes(currentWeekDay) && !mondayIsHoliday)
                return this.txtShipsMondays;

            // if we forgot any case, default
            console.info("BKAvailability", "default");
            return this.variation.availability.names.name;
        },
        avDisplayHoliday()
        {
            // Not available today, show default message
            if (this.txtShipsToday != this.availabilityDisplay && 
                this.txtShipsTomorrow != this.availabilityDisplay && 
                this.txtShipsMondays != this.availabilityDisplay) {
                return this.availabilityDisplay;
            }
            // let dateTodayNow = new Date(1000 * this.avd.time.now);
            // const currentDayOfYear = Math.floor((dateTodayNow - new Date(dateTodayNow.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
            // 
            // Easter
            // if (dateTodayNow.getFullYear() == 2024 && currentDayOfYear < 87)
                // return "<span>" + this.availabilityDisplay + "</span>" + this.txtEasterHint;

            // INFO Button for Freight-Goods to explain "Ships today" via Modal
            if (this.avd.isSped && !this.short) {
                let infoHint = '<svg data-toggle="modal" data-target="#freightInfo" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
                return "<span>" + this.availabilityDisplay + "</span>" + infoHint;
            }

            return this.availabilityDisplay;
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (this.$store.erid === undefined)
                this.$store.erid = [];
            this.requestAvailabilityData()
        });
    },
    watch: {
      variation: function()
      {
          this.requestAvailabilityData()
      }
    }
}
</script>
