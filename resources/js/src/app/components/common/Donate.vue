<template>
    <div class="card donation" :class="{ 'd-none': donationActive , 'smallCard': !isLarge }">
        <template v-if="isLarge">
            <div class="wait"><div class="dot-flashing"></div></div>
            <div class="card-body">
                <h2 class="headline">
                    <img src="https://cdn.bio-kinder.de/frontend/images/forest/headline.svg" alt="BioKinder forstet auf!" />
                    <a href="/aufforstung-mit-biokinder/spendenstand/" :data-target="numTreesPlanted" class="counter"><div class="dot-flashing"></div></a>
                </h2>
                <p>
                    Gemeinsam mit HessenForst pflanzen wir nachhaltig Bäume lokal bei uns im Taunus. Dort werden sie über Jahre gepflegt und großgezogen.
                    <br /><a data-toggle="modal" data-target="#donateModal">Mehr Informationen</a>
                </p>
                
                <label>
                    <input class="mr-2"
                    type="checkbox" 
                    @change="onOff" 
                    :disabled="waiting || !basketFullyLoaded"
                    ref="enableDonation"
                    />
                    <span>Ich möchte für 5,00&euro; einen Baum pflanzen!</span>
                </label>
            </div>
        </template>
        <template v-else>
        <!-- Small -->
            <div class="card-body flex-row">
                <label>
                    <input class="mr-2"
                    type="checkbox" 
                    @change="onOff" 
                    ref="enableDonationSmall"
                    :disabled="waiting || !basketFullyLoaded"
                    />
                    <span>Ich möchte für 5,00&euro; einen<br />Baum im Taunus pflanzen.</span>
                </label>
                <a href="/aufforstung-mit-biokinder/">Mehr Informationen</a>
            </div>
        </template>

        <!--Modal -->
        <div class="modal fade" id="donateModal" tabindex="-1" role="dialog" aria-labelledby="aufforsten-headline" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <img loading="lazy" src="https://cdn.bio-kinder.de/frontend/images/forest/hf-bk-2.svg" alt="BioKinder & HessenForst" class="hessenforst_biokinder_banner" />
                        <p>
                            In den vergangenen Jahren ist uns immer deutlicher geworden, wie sich zu trockene Bedingungen
                            im Sommer negativ auf unsere Wälder ausgewirkt haben. Immer häufiger sind große,
                            leere Flächen zu sehen, wo früher einmal ein dichter Wald gewachsen ist.
                        </p>
                        <p>
                            In Zusammenarbeit mit HessenForst haben wir eine transparente Kooperation auf die Beine gestellt,
                            bei der die Spenden bis auf den letzten Cent dafür eingesetzt werden, wofür sie gedacht sind:
                            <b>Das Pflanzen neuer Bäume</b>!
                        </p>
                        <ul class="list-group cleanList text-left">
                            <li class="list-group-item"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2"
                                fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                                100%-Spende – Keine versteckten Gebühren, kein Kleingedrucktes
                            </li>
                            <li class="list-group-item"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2"
                                fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                                Heimische Bäume für einen gesunden Mischwald
                            </li>
                            <li class="list-group-item"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2"
                                fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                                Wir pflanzen im Herzen des schönen Taunus
                            </li>
                            <li class="list-group-item"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2"
                                fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                                Betreuung durch HessenForst vom Setzling bis zum Baum
                            </li>
                        </ul>

                    </div>
                    <div class="modal-footer">
                        <a href="/aufforstung-mit-biokinder/" class="btn btn-bkm btn-sm mr-auto">Noch mehr erfahren ></a>
                        <button type="button" class="btn btn-bkm-inverted btn-sm ml-auto" data-dismiss="modal">Schließen</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
      donationVariationId: {
          type: Number,
          default: 18212,
      },
      numTreesPlanted: {
          type: Number,
          default: 0,
      },
      boxSize: {
        type: String,
        default: 'large'
      }
  },
  data() {
      return {
          waiting: false,
          basketItem: null
      };
  },
  watch: {
    basketItems()
    {
        this.updateBasketItem()
    }
  },
  mounted() {
    this.updateBasketItem();
    this.$nextTick(() => {
        document.addEventListener('afterBasketChanged', (data) => {
            this.updateBasketItem();
        });

        if(this.isLarge)
        {
            $.ajax({
                type: "GET",
                url: "/bk/trees/",
                success: function (data) {
                    let obj = JSON.parse(data);
                    this.numTreesPlanted = obj.treesPlanted;
                    $('.counter').html(this.numTreesPlanted);
                }
            });
        }
    });
  },
  computed: {
      isLarge() {
        return this.boxSize === "large";
      },
      donationActive() {
        return (this.basketItem !== null);
      },
      ...mapState({
            basketFullyLoaded: state => state.basket.isBasketInitiallyLoaded,
            isBasketLoading: state => state.basket.isBasketLoading,
            basketItems: state => state.basket.items
        })
  },
  methods: {
    onOff() {
      this.waiting = true;
      if (this.basketItem === null) {
        const postData = {
                variationId: this.donationVariationId,
                quantity: 1
            };
        this.$store.dispatch("addBasketItem", postData);
      } else {
        this.$store.dispatch("removeBasketItem", this.basketItem.id);
        this.basketItem = null;
        this.waiting = false;
      } 
    },
    updateBasketItem() 
    {   
        if (this.basketItems.length > 0) {
            this.basketItem = null;
            for (let i = 0; i < this.basketItems.length; i++) {
                const basketItem = this.basketItems[i];
                if (basketItem.variationId === this.donationVariationId) {
                    this.basketItem = basketItem;
                    if(this.$refs.enableDonation)
                        this.$refs.enableDonation.checked = false;

                    if (this.$refs.enableDonationSmall)
                        this.$refs.enableDonationSmall.checked = false;
                }
            }
        }
        this.waiting = false;
    }
  }
}
</script>
