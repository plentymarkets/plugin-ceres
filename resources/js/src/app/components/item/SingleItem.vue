<template>
    <div>
        <slot :getDataField="getDataField" :getFilteredDataField="getFilteredDataField">
          <div class="single singleItem container-flex page-content">
        
            <!--  Loading Animation when changing variation / add to basket -->
            <div v-if="$store.state.items.isAddToBasketLoading != 0" class="item-loading-splash-screen">
               <icon icon="spinner" :loading="$store.state.items.isAddToBasketLoading != 0"></icon>
            </div>

            <div class="bg-white">
              <div class="container-max">
                <div class="row position-relative">
            

                    <bkAddToWishlist :variation-id="currentVariation.variation.id"></bkAddToWishlist>

                    <div class="col-md-7 singleItemImage text-center mb-2">
                        <slot name="image-carousel"></slot>

                        <!-- Video Modal -->
                        <template v-for="property in getProperty(192)">
                            <div class="modal fade" id="videoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-body">
                                    <iframe
                                        id="videoFrame"
                                        :src="'https://www.youtube.com/embed/' + property.values.value + '?rel=0;controls=0;showinfo=0;theme=light'"
                                        allowfullscreen=""
                                        width="100%"
                                        height="400px"
                                        frameborder="0"></iframe>
                                    </div>
                                </div>
                                </div>
                            </div><!-- ./ Modal -->
                        </template>
                    </div>

                    <div class="col-md-5 singleItemDetails single-rightside mb-4">

                        <h1 v-html="this.currentVariation.texts.name1"></h1>

                        <div><!-- v-stick-in-parent -->
                            
                            <div class="feedbackTags">
                                <feedback-average
                                    class="box-feedback"
                                    :show-empty-ratings="false"
                                    size-of-stars="small"
                                    :show-ratings-amount="true">
                                </feedback-average>

                                <span class="tag tagFavorit" v-if="hasPropertySelection(166, 397)">Bestseller</span>
                                <span class="tag tagVegan" v-if="hasPropertySelection(166, 393)">Vegan</span>
                                <template v-for="tag in currentVariation.tags" v-if="[130,131,132,133].includes(tag.id)">
                                  <span target="#sizeTable" :class="'scrollTo tag tagSize' + (parseInt(tag.id) - 129)" v-html="tag.names.name"></span>
                                </template>
                            </div>

                          <div :class="'availabilityRow availabilityRow_' + currentVariation.variation.availability.id">
                            <client-only>
                              <biokinder-availability :avd="$attrs.availabilitydata" :variation="currentVariation.variation" ></biokinder-availability>
                            </client-only>
                          </div>

                          <!-- Variation -->
                          <div class="mb-3 variationSelect" v-if="attributes.length">
                              <variation-select></variation-select>
                          </div>
                          <!-- /Variation -->

                          <!-- ORDER PROPERTIES -->
                          <div class="row" v-if="currentVariation.filter.isSalable && variationGroupedProperties.length">
                                <div class="col-12 mt-2">
                                <order-property-list></order-property-list>
                                </div>
                                <slot name="aufbauservice"></slot>
                          </div>


                          <slot name="before-price"></slot>

                          <div class="singleartprice my-2" itemprop="offerDetails" itemscope="" itemtype="http://data-vocabulary.org/Offer">
                            <span data-toggle="collapse" aria-expanded="false" class="variationManufacturer" data-target="#manufacturer">
                              <img v-if="currentVariation.item.manufacturer.id && currentVariation.item.manufacturer.logo" :src="currentVariation.item.manufacturer.logo" :alt="'Marken-Logo-' + currentVariation.item.manufacturer.externalName" />
                            </span>
                            <div class="variationPrice">
                              <graduated-prices></graduated-prices>
                              <item-price></item-price>
                              <input type="hidden" id="stdShippingCosts" :value="currentVariation.variation.defaultShippingCosts" />

                              <slot v-if="currentVariation.prices.default.price && currentVariation.prices.default.price.value > 200" name="before-add-to-basket" class="mt-2"></slot>
                            </div>
                          </div>

                        <add-to-basket
                            :variation-id="currentVariation.variation.id"
                            :is-salable="!!currentVariation.filter && currentVariation.filter.isSalable"
                            :has-children="!!currentVariation.filter && currentVariation.filter.hasActiveChildren"
                            :interval-quantity="currentVariation.variation.intervalOrderQuantity || 1"
                            :minimum-quantity="currentVariation.variation.minimumOrderQuantity"
                            :maximum-quantity="!!currentVariation.variation.maximumOrderQuantity && currentVariation.variation.maximumOrderQuantity > 0 ? currentVariation.variation.maximumOrderQuantity : null"
                            :order-properties="currentVariation.properties.filter(function (prop) { return prop.property.isOderProperty })"
                            :use-large-scale="false"
                            :show-quantity="true"
                            :item-url="currentVariation | itemURL"
                            :is-variation-selected="isVariationSelected && currentVariation.filter.isSalable"
                            :has-price="currentVariation | hasItemDefaultPrice">
                        </add-to-basket>

                           <div>

                           <slot name="cross-selling-cart"></slot>

                           <slot name="additional-content-after-add-to-basket"></slot>

                           <!-- Audioplayer -->
                           <template v-if="hasProperty(193)">
                              <div v-for="prop in getProperty(193)" v-if="prop.values.value != ''" class='title'>
                                <span v-html="prop.values.value"></span>
                              </div>
                              <div class="button">
                                <i class="fa fa-play" id="playBtn"></i>
                                <i class="fa fa-undo" id="resetBtn"></i>
                              </div>
                              <div class="contents">
                                <div class="time">
                                  <span class="elapsed" id="elapsedTime">0:00</span>
                                  <span class="seperator">&nbsp;/&nbsp;</span>
                                  <span class="totalLength" id="totalLength">0:00</span>
                                </div>
                              </div>
                              <div class="playLine">
                                <div class="playLineActive" id="playLineActive"></div>
                              </div>
                              <audio id="audioPlayer" v-for="prop in getProperty(194)" v-if="prop.values.value != ''">
                                <source :src="prop.values.value" type="audio/mp3">
                              </audio>
                           </template>

                           <slot name="beaver"></slot>

                         </div>

                        <div v-if="hasProperty(166)" class="siegelContainer">
                            <a v-if="hasPropertySelection(166, 346)" href="/textseiten/natuerliche-rohstoffe/" alt="Natürliche Rohstoffe" aria-label="Natürliche Rohstoffe" click-count>
                                <img :src="'https://cdn.bio-kinder.de/frontend/seals/natural.svg'" alt="Natürliche Rohstoffe" />
                            </a>
                            <a v-if="hasPropertySelection(166, 275)" href="/textseiten/bio-erlenholzmoebel-kindermoebel-fuer-babys-und-kinder/" aria-label="Bio-Erlenholz" alt="Bio-Erlenholz" click-count>
                                <img :src="'https://cdn.bio-kinder.de/frontend/seals/alderwood.svg'" alt="100% Bio-Erlenholz" />
                            </a>

                            <img v-if="hasPropertySelection(166, 449)" :src="'https://cdn.bio-kinder.de/frontend/seals/oak.svg'" alt="Bio-Eichenholz" />

                            <a v-if="hasPropertySelection(166, 276)" href="/textseiten/bio-kiefernholz-von-bio-kinder/" aria-label="Bio-Kiefernholz" alt="Bio-Kiefernholz" click-count >
                                <img :src="'https://cdn.bio-kinder.de/frontend/seals/pinewood.svg'" alt="100% Bio-Kiefernholz" />
                            </a>
                            <a v-if="hasPropertySelection(166, 345)" href="/content/10-jahre-garantie/" aria-label="Möbelgarantie" alt="Möbelgarantie" click-count>
                                <img :src="'https://cdn.bio-kinder.de/frontend/seals/guarantee.svg'" alt="10 Jahre Möbel-Garantie" />
                            </a>
                            <a v-if="hasPropertySelection(166, 344)" href="/content/100-fair-produziert/" aria-label="Fair produziert" alt="Fair produziert" click-count>
                                <img :src="'https://cdn.bio-kinder.de/frontend/seals/fair.svg'" alt="Fair produziert" />
                            </a>
                            <img v-if="hasPropertySelection(166, 403)" :src="'https://cdn.bio-kinder.de/frontend/seals/organictreewool.svg'" alt="kbA Baumwolle" />
                            <img v-if="hasPropertySelection(166, 404)" :src="'https://cdn.bio-kinder.de/frontend/seals/sheepwool.svg'" alt="100% Schurwolle"/>
                        </div>

                        <div v-if="hasProperty(166)" class="siegelContainer">
                            <img data-toggle="modal" class="bioolaLogo" data-target="#bioola" v-if="hasPropertySelection(166, 274)" :src="'https://cdn.bio-kinder.de/frontend/assets/bioola/bioola.svg'" alt="bioola Lasur" />
                            <img class="softCloseLogo" v-if="hasPropertySelection(166, 622)" :src="'https://cdn.bio-kinder.de/frontend/seals/soft_close.svg'" alt="Soft-Close" />
                            <img v-if="hasPropertySelection(166, 617)" :src="'https://cdn.bio-kinder.de/frontend/seals/din1729.svg'" alt="DIN geprueft" />
                            <img style="max-height:80px" v-if="hasPropertySelection(166, 652)" :src="'https://cdn.bio-kinder.de/frontend/images/icons/made_in_germany.svg'" alt="Hergestellt in Deutschland"/>
                        </div>

                        </div><!--stick-end-->

                      </div>
                </div>
              </div>
            </div>

            <div class="container-max">

              <div class="row">
                <div class="col-md-7">
                  <slot name="item-description"></slot>
                </div>

                <div class="col-md-5" id="rightSide">
                  <div class="descriptionContainer shippingInfo">
                      <client-only>
                          <biokinder-shipping-icon :variation="currentVariation.variation" :avd="$attrs.availabilitydata" :availability="currentVariation.variation.availabilityId" :shipping="currentVariation.variation.defaultShippingCosts"></biokinder-shipping-icon>
                      </client-only>
                  </div>

                  <!-- instagram -->
                  <template v-if="hasProperty(197)">
                    <div class="descriptionContainer instagram">
                      <button class="btn btn-block text-left descriptionButton collapsed"  data-toggle="modal" data-target="#instagramModal" aria-label="Instagram Gallerie" click-count>
                        <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        <div>
                          <span class="small" v-html="currentVariation.texts.name1"></span>
                          <span v-html="'Beiträge aus der Community'"></span>
                        </div>
                      </button>

                      <!-- Modal -->
                      <div class="modal fade" :variationId="currentVariation.variation.id" id="instagramModal" tabindex="-1" role="dialog" aria-labelledby="Beiträge aus der Community" aria-hidden="true">
                        <a class="closeModal" data-dismiss="modal" aria-label="Schliessen"><i data-feather="x"></i></a>
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-body" id="instagramImageSlider">
                              <i>Beitr&auml;ge werden geladen...</i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </template>



                <!-- Manufacturer -->
                <div id="manufacturerDetail" class="descriptionContainer" v-if="currentVariation.item.manufacturer.id && currentVariation.item.manufacturer.logo">
                  <button class="btn btn-block text-left descriptionButton collapsed" data-toggle="collapse" data-target="#manufacturer" aria-expanded="false" aria-controls="manufacturer" :aria-label="'Hersteller-Details: ' + currentVariation.item.manufacturer.externalName" click-count>
                    <img :src="currentVariation.item.manufacturer.logo" :alt="'Marken-Logo-' + currentVariation.item.manufacturer.externalName" />
                    <span v-html="currentVariation.item.manufacturer.externalName"></span>
                    <i data-feather="plus"></i>
                  </button>

                  <div id="manufacturer" class="collapse mt-1" aria-labelledby="manufacturer" data-parent="#rightSide">
                    <img :src="currentVariation.item.manufacturer.logo" class="producerlogo_article col-md-8 offset-md-2" :alt="'Marken-Logo-' + currentVariation.item.manufacturer.externalName" />
                    <div v-html="currentVariation.item.manufacturer.comment"></div>
                    <a :href="'/markenwelt/?marke=' + currentVariation.item.manufacturer.id" class="btn btn-block btn-sm btn-bkm" :aria-label="'Mehr Artikel von ' + currentVariation.item.manufacturer.externalName" click-count>Weiteres Sortiment entdecken <i data-feather="chevron-right"></i></a>
                  </div>
                </div>

                <!-- Bundle -->
                <template v-if="showBundleComponents">
                  <div id="bundleDetail" class="descriptionContainer">
                    <button class="btn btn-block text-left descriptionButton collapsed" data-toggle="collapse" data-target="#bundleComponents" aria-expanded="false" aria-controls="bundleComponents" aria-label="Paketbestandteile anzeigen" click-count>
                      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon-bundle"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                      <span>In diesem Set enthalten</span>
                      <i data-feather="plus"></i>
                    </button>
                    <div id="bundleComponents" class="collapse mt-1" aria-labelledby="bundleComponents" data-parent="#rightSide">
                      <article v-for="bundleComponent in currentVariation.bundleComponents" class="itemCategoryProduct horizontal">
                        <div class="produkt_picture">
                          <a :href="bundleComponent.data.texts.urlPath + '_' + bundleComponent.data.variation.itemId + '_' + bundleComponent.data.variation.id + '/'" aria-label="Paketbestandteil" click-count>
                            <picture v-if="bundleComponent.data.images.variation[0]" data-picture-class="img-fluid" class="" data-loaded="true">
                              <source :srcset="bundleComponent.data.images.variation[0].urlPreview">
                            <img class="img-fluid">
                            </picture>
                          </a>
                        </div>
                        <div class="productInfoContainer">
                          <div class="productName">
                            <a
                              :href="bundleComponent.data.texts.urlPath + '_' + bundleComponent.data.variation.itemId + '_' + bundleComponent.data.variation.id + '/'"
                              class="thumb-title small"
                              v-html="bundleComponent.quantity + 'x&nbsp;' + bundleComponent.data.texts.name1"></a>
                              <p class="variationHint" v-if="bundleComponent.data.attributes"><span class="text-left" v-for="attribute in bundleComponent.data.attributes"><span v-html="attribute.attribute.names.name + ': ' + attribute.value.names.name"></span></span></p>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </template>


                <!-- Technical Data -->
                <div class="descriptionContainer">
                  <div id="application">
                      <button class="btn btn-block text-left descriptionButton collapsed" data-toggle="collapse" data-target="#applicationContainer" aria-expanded="false" aria-controls="applicationContainer" aria-label="Technische Daten" click-count>
                        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon-technicaldata"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        <span v-html="$translate('Ceres::Template.singleItemTechnicalData')"></span>
                        <i data-feather="plus"></i>
                      </button>
                  </div>
                  <div id="applicationContainer" class="collapse" aria-labelledby="more_details" data-parent="#rightSide">
                      <div class="descriptionContent">
                          <table class="table table-borderless table-sm">
                            <tbody>

                            <tr>
                                <th>Artikelnummer</th>
                                <td>{{ currentVariation.item.id }}-{{ currentVariation.variation.id }}</td>
                            </tr>

                            <tr v-if="currentVariation.filter.hasManufacturer && currentVariation.item.manufacturer.externalName !== ''">
                              <th>{{ $translate("Ceres::Template.singleItemManufacturer") }}</th>
                              <td>{{ currentVariation.item.manufacturer.externalName }}</td>
                            </tr>

                            <tr v-if="currentVariation.variation.weightG > 0">
                              <th>Gewicht</th>
                              <td>ca. {{ (currentVariation.variation.weightG / 1000) | numberFormat(2, ',') }} kg</td>
                            </tr>

                            <tr>
                              <th>Pakete</th>
                              <td v-if="currentVariation.variation.packingUnits > 0">{{ currentVariation.variation.packingUnits }}</td>
                              <td v-else>1</td>
                            </tr>

                            <!-- loop -->
                            <template v-if="$store.getters.currentItemVariation.variationProperties && $store.getters.currentItemVariation.variationProperties.filter(function (prop) { return (prop.id == 4) })[0]">
                              <tr v-for="vProperty in $store.getters.currentItemVariation.variationProperties.filter(function (prop) { return (prop.id == 4) })[0].properties"
                                  v-if="vProperty && vProperty.id != 166 && vProperty.id != 246 && vProperty.id != 191 && vProperty.id != 197 && vProperty.id != 192 && vProperty.id != 235 && vProperty.values.value != 0 && vProperty.values.value != ''">
                                <th v-html="vProperty.names.name"></th>
                                <td v-html="vProperty.values.value" v></td>
                              </tr>
                            </template>
                          </tbody>
                        </table>

                        <div v-html="currentVariation.texts.technicalData"></div>
                    </div>
                  </div>
                </div>

                <!-- Accessories -->
                <slot name="cross-selling-accessory"></slot>


                <!-- Care -->
                <template v-if="$store.getters.currentItemVariation.variationProperties && $store.getters.currentItemVariation.variationProperties.filter(function (prop) { return (prop.id == 4) })[0]">
                  <div class="descriptionContainer" v-for="vProperty in $store.getters.currentItemVariation.variationProperties.filter(function (prop) { return (prop.id == 4) })[0].properties.filter(function (prop) { return (prop.id == 191) })">
                    <button class="btn btn-block text-left descriptionButton collapsed" data-toggle="collapse" data-target="#careTaking" aria-expanded="false" aria-controls="careTaking" aria-label="Pflegehinweise" click-count>
                      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon-care"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
                      <span v-html="'Pflegehinweis & Anwendung'"></span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                    <div id="careTaking" class="collapse" aria-labelledby="more_details" data-parent="#rightSide">
                      <div class="descriptionContent" v-html="vProperty.values.value"></div>
                      <template v-if="$attrs.availabilitydata.ourFurniture && (color1 !== null || color2 !== null)">
                        <div class="row">
                            <div class="col-6" v-for="careSet in availableCareSets" >
                            <a :href="careSet.url" class="careSet">
                                <img :src="careSet.image" />
                                {{ careSet.name }}
                            </a>
                            </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </template>

                <!-- Support -->
                <div class="descriptionContainer">
                  <button class="btn btn-block text-left descriptionButton collapsed" data-toggle="collapse" data-target="#supportBox" aria-expanded="false" aria-controls="supportBox" aria-label="Sie haben Fragen?" click-count>
                    <i data-feather="help-circle" class="icon-care"></i>      
                    <span v-html="'Sie haben Fragen?'"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                  <div id="supportBox" class="collapse" aria-labelledby="more_details" data-parent="#rightSide">
                    <div class="descriptionContent">
                      <p>Wir helfen Ihnen gerne! Rufen Sie uns an oder schreiben Sie uns eine Nachricht. Wir stehen Ihnen Montags bis Freitags von 8:00 bis 16:00 Uhr zur Verfügung und beraten Sie gerne.</p>
                      <div class="contactBox">
                        <p>
                          <a id="phoneNumberLink" href="tel:+4960814456315">+49 (0) 6081 - 44 563 15</a>
                        </p>
                        <span>Mo. - Fr., 8:00 - 16:00 Uhr</span>
                      </div>
                      <div class="numItemsCol my-4 text-right">
                        <span class="numItems bg-white">Anfrage per Mail:</span>
                      </div>
                      <form class="row" id="12fd" method="post" @submit.prevent="$store.dispatch('sendContactForm', $event)">
                        <input type="hidden" data-mail="recipient" value="info@bio-kinder.de" />
                        <input type="hidden" data-mail="subject" value="Frage zu Produkt" />
                        <div class="col-12 cmp-contact">
                          <div class="input-unit mb-1 required" data-validate="text">
                            <input name="name12" type="text" id="name12">
                            <label for="name12">
                            Name *
                              </label>
                          </div>
                          <div class="widget-mail-input">
                            <div class="input-unit mb-1 required" data-validate="mail">
                            <input name="mail12" type="email" id="mail12">
                            <input type="hidden" data-mail="reply-to-address" value="mail12">
                            <label for="mail12">
                                Ihre E-Mail Adrresse *
                              </label>
                            </div>
                          </div>
                          <div class="input-unit">
                            <input name="product" disabled="disabled" type="text" :value="currentVariation.item.id + '-' + currentVariation.variation.id + ' ' + this.$options.filters.itemName(currentVariation)" id="product">
                            <label for="product">
                              Produkt
                            </label>
                          </div>
                          <div class="input-unit mb-1 required textarea" data-validate="text">
                            <textarea name="text12" id="text12" rows="4" class="no-resize" ></textarea>
                            <label for="text12">
                              Ihre Anfrage *
                            </label>
                          </div>
                        </div>
                        <input class="honey" type="text" name="username" autocomplete="new-password" tabindex="-1">
                        <div class="col-12 text-right">
                          <recaptcha></recaptcha>
                          <input type="submit" value="Anfrage senden" class="btn btn-bkm btn-sm btn-send-contact-form" />
                        </div>
                      </form>

                    </div>
                  </div>
                </div>


               </div>
              </div><!-- row close -->

              <!-- beaver content -->
              <slot name="additional-beaver-content"></slot>

              <!-- size guide tables and chairs -->
              <slot v-if="showChairTableSizeGuide" name="table-chair-size-guide"></slot>

              <div class="row">
                <div class="col-12">
                  <slot name="item-list-container"></slot>
                  <slot name="series-slide"></slot>
                  <slot v-if="currentVariation.variation.id != 8802" name="cross-selling-similar"></slot>
                </div>
              </div>
              <div class="row">
                <div data-feedback class="widget col-12">
                  <slot name="feedback-container"></slot>
                </div>
              </div>
            </div> <!-- ./container max -->

          </div>
        </slot>
    </div>
</template>

<script>
import { get } from "../../helper/get";
import { isNullOrUndefined } from "../../helper/utils";

export default {

    name: "single-item",

    props: {
        pleaseSelectOptionVariationId: {
            type: Number,
            default: 0
        },
        initPleaseSelectOption: {
            type: Boolean,
            default: false
        },
        showNetPrices: {
            type: Boolean,
            default: false
        },
        isWishListEnabled: {
            type: Boolean,
            default: false
        },
        itemId: {
            type: Number,
            required: true
        },
        afterKey: Object
    },

    jsonDataFields: [
        "itemData",
        "attributesData",
        "variations"
    ],

    provide()
    {
        return {
            itemId: this.$props.itemId
        }
    },

    computed:
    {
        itemConfig()
        {
            return App.config.item.itemData;
        },

        isRecommendedPriceActive()
        {
            return App.config.item.itemData.includes("item.recommendedPrice") || App.config.item.itemData.includes("all");
        },

        hasShippingCostsCategoryId()
        {
            return App.config.global.shippingCostsCategoryId > 0;
        },

        variationGroupedProperties()
        {
            return this.$store.getters[`${this.itemId}/variationGroupedProperties`];
        },

        variationMissingProperties()
        {
            return this.$store.getters[`${this.itemId}/variationMissingProperties`];
        },

        currentVariation() {
            return get(this.$store.state, `items[${this.itemId}].variation.documents[0].data`);
        },

        isVariationSelected() {
            return get(this.$store.state, `items[${this.itemId}].variationSelect.isVariationSelected`);
        },

        attributes() {
            return get(this.$store.state, `items[${this.itemId}].variationSelect.attributes`);
        },

        units() {
            return get(this.$store.state, `items[${this.itemId}].variationSelect.units`);
        },

        isItemSet() {
            return this.$store.state.items.isItemSet;
        },
        showBundleComponents()
        {
            return (this.hasProperty(235) && this.currentVariation.variation.bundleType === 'bundle' && this.currentVariation.bundleComponents.length)
        },
        showChairTableSizeGuide() {
          // Check if any of the values are included in the array
          if(!this.currentVariation.tags || this.currentVariation.tags.length <= 0)
            return false;

          return this.currentVariation.tags.some(tag => [130, 131, 132, 133].includes(tag.id));
        },
        color1() {
            const valueId = this.getFurnitureColor(3); // Front
            const valueMap = {
                119: 'alder',
                110: 'white',
                802: 'gray',
                803: 'rose',
                109: 'lilac',
                107: 'green',
                90: 'blue'
            };
            return valueMap[valueId] || null;
        },
        color2() {
            const valueId = this.getFurnitureColor(9); // Korpus
            const valueMap = {
                804: 'alder',
                806: 'white',
                816: 'gray'
            };
            return valueMap[valueId] || null;
        },
        availableCareSets() { 
            let retVal = [];
            
            if (this.color1 !== null && this.getCareData(this.color1) !== null)
                retVal.push(this.getCareData(this.color1))
            if (this.color2 !== null && this.getCareData(this.color2) !== null && this.color1 != this.color2)
                retVal.push(this.getCareData(this.color2))
            return retVal;
        },
    },

    created()
    {
        this.$store.dispatch("initVariation", this.itemData);
        this.$store.commit(`${this.itemId}/setPleaseSelectVariationId`, this.pleaseSelectOptionVariationId);
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            this.$store.dispatch(`${this.itemId}/variationSelect/setVariationSelect`, {
                itemId:             this.itemId,
                attributes:         this.attributesData,
                variations:         this.variations,
                initialVariationId: this.currentVariation.variation.id,
                isPleaseSelectOption: this.initPleaseSelectOption,
                afterKey:           this.afterKey
            });

            if (this.isItemSet)
            {
                this.$store.dispatch("initSetComponents", this.itemData);   
            }
        })

        // listen for variation change to hydrate all children lazy-hydrate components
        document.addEventListener("onVariationChanged", () => this.hydrateChildren(this.$children));
    },

    methods:
    {
        getDataField(field)
        {
            return get(this.currentVariation, field);
        },

        getFilteredDataField(field, filter)
        {
            if (!isNullOrUndefined(this.$options.filters[filter]))
            {
                return this.$options.filters[filter](this.getDataField(field));
            }

            return this.getDataField(field);
        },

        hasProperty(propertyId) {
            if(isNullOrUndefined(this.currentVariation.variationProperties))
                return false;
            
            for (const item of this.currentVariation.variationProperties) {
                for (const prop of item.properties) {
                    if (prop.id === propertyId) 
                        return true;
                }
            }

            return false;
        },

        getProperty(propertyId) { // returns array with one element
            if(!this.hasProperty(propertyId))
                return [];
            
            for (const item of this.currentVariation.variationProperties) {
                for (const prop of item.properties) {
                    if (prop.id === propertyId)
                        return [prop];
                }
            } 
        },

        hasPropertySelection(propertyId, propertySelectionId)
        {
            if(!this.hasProperty(propertyId)) 
                return false;

            if(this.getProperty(propertyId)[0].values.find(function (value) { return (value.selectionId == propertySelectionId) }) === undefined)
                return false;
            
            return true;
            
        },
        getFurnitureColor(attributeId) {
            if (this.currentVariation.attributes.length == 0)
                return null;

            for (const item of this.currentVariation.attributes) {
                if (item.attributeId == attributeId) {
                    return item.valueId;
                }
            }
            return null;
        },
        getCareData(colorString)
        {
            let dataMap = {
                'alder': {
                    'name': 'bioola® nature Pflegeset',
                    'url': '/bioola-pflegeset-naturholz_22505_17402/',
                    'image': 'https://cdn.bio-kinder.de/item/images/22505/secondPreview/22505-bioola---nature-Pflegeset-Naturholz-27900-16802-bioola-Leinoel-Firnis-Pflegeset.jpg'
                },
                'white': {
                    'name': 'bioola® colour Pflegeset',
                    'url': '/bioola-pflegeset-lasur_22506_17407/',
                    'image': 'https://cdn.bio-kinder.de/item/images/22506/secondPreview/22506-bioola---Pflegeset-Lasur-Pflegeset-Naturweiss-web.jpg'
                },
                'gray': {
                    'name': 'bioola® colour Pflegeset',
                    'url': '/bioola-pflegeset-lasur_22506_17408/',
                    'image': 'https://cdn.bio-kinder.de/item/images/22506/secondPreview/22506-bioola---Pflegeset-Lasur-Pflegeset-Elefantengrau-web.jpg'
                },
                'rose': {
                    'name': 'bioola® colour Pflegeset',
                    'url': '/bioola-pflegeset-lasur_22506_17409/',
                    'image': 'https://cdn.bio-kinder.de/item/images/22506/secondPreview/22506-bioola---Pflegeset-Lasur-Pflegeset-Steinrose-web.jpg'
                },
                'lilac': {
                    'name': 'bioola® colour Pflegeset',
                    'url': '/bioola-pflegeset-lasur_22506_17406/',
                    'image': 'https://cdn.bio-kinder.de/item/images/22506/secondPreview/22506-bioola---Pflegeset-Lasur-Pflegeset-Flieder-web.jpg'
                },
                'green': {
                    'name': 'bioola® colour Pflegeset',
                    'url': '/bioola-pflegeset-lasur_22506_17404/',
                    'image': 'https://cdn.bio-kinder.de/item/images/22506/secondPreview/22506-bioola---Pflegeset-Lasur-Pflegeset-Ozeanblau-web.jpg'
                }
            };
            return dataMap[colorString] ?? null;
        },
        // iterate recursively the children components and call their hydrate method, if it is a lazy-hydrate component
        hydrateChildren(nodes)
        {
            nodes.forEach(component => {
                if (component.$options.name === "lazy-hydrate")
                {
                    component.hydrate();
                }
                else if (component.$children.length)
                {
                    this.hydrateChildren(component.$children);
                }
            })
        }
    }
}
</script>
