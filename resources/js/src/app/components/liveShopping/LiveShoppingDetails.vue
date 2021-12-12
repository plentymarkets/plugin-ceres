<template>
    <div class="live-shopping-details">
        <div class="h3 live-shopping-item-name">
            <a :href="liveShoppingData.item | itemURL">
                {{ liveShoppingData.item | itemName }}
            </a>
        </div>

        <slot name="after-item-name"></slot>

        <div class="live-shopping-countdown" v-if="displaySettings.showTimer || displaySettings.showStock">
            <hr class="live-shopping-countdown-separator">
            <div class="live-shopping-countdown-heading" v-if="displaySettings.showTimer">
                <div v-if="hasStarted">
                    {{ $translate("Ceres::Template.liveShoppingOfferEndsIn") }}
                </div>
                <div v-else>
                    {{ $translate("Ceres::Template.liveShoppingOfferBeginsIn") }}
                </div>
            </div>

            <div class="live-shopping-countdown-thread-container" v-if="displaySettings.showTimer && !!duration">
                <div v-if="duration.days > 0" class="live-shopping-countdown-thread">
                    <div class="live-shopping-countdown-thread-number">{{ duration.days }}</div>
                    <div class="small">{{ $translate("Ceres::Template.liveShoppingDays") }}</div>
                </div>
                <div class="live-shopping-countdown-thread">
                    <div class="live-shopping-countdown-thread-number">{{ duration.hours }}</div>
                    <div class="small">{{ $translate("Ceres::Template.liveShoppingHours") }}</div>
                </div>
                <div class="live-shopping-countdown-thread">
                    <div class="live-shopping-countdown-thread-number">{{ duration.minutes }}</div>
                    <div class="small">{{ $translate("Ceres::Template.liveShoppingMinutes") }}</div>
                </div>
                <div v-if="duration.days <= 0" class="live-shopping-countdown-thread">
                    <div class="live-shopping-countdown-thread-number">{{ duration.seconds }}</div>
                    <div class="small">{{ $translate("Ceres::Template.liveShoppingSeconds") }}</div>
                </div>
            </div>

            <template v-if="hasStarted && !hasClosed">
                <div class="live-shopping-progress" v-if="displaySettings.showTimer && displaySettings.showTimerProgress">
                    <div class="progress">
                        <div :class="'progress-' + Math.round(timePercentage / 10) * 10" class="progress-bar" role="progressbar" :style="'width:' + timePercentage + '%'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>

                <div class="live-shopping-progress" v-if="displaySettings.showStock">
                    <div class="live-shopping-progress-heading">
                        <span>{{ $translate("Ceres::Template.liveShoppingRemainingStock", {"quantityRemaining": itemQuantityRemaining, "quantityMax": liveShoppingData.liveShopping.quantityMax }) }}</span>
                    </div>

                    <div class="progress" v-if="displaySettings.showStockProgress">
                        <div :class="'progress-' + Math.round(quantitySoldPercentage / 10) * 10" class="progress-bar" role="progressbar" :style="'width:' + quantitySoldPercentage + '%'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </template>
        </div>

        <div class="live-shopping-prices bg-danger" v-if="hasStarted && !hasClosed">
            <div class="live-shopping-prices-inner">
                <div class="live-shopping-prices-rebate" v-if="!isNaN(itemPriceRebatePercentage) && itemPriceRebatePercentage > 0">{{ $translate("Ceres::Template.liveShoppingRebate", {"rebate": itemPriceRebatePercentage }) }}</div>
                <div class="live-shopping-prices-container">
                    <div class="live-shopping-price">
                        <strong>{{ prices.price.unitPrice.formatted }} *</strong>
                    </div>
                    <span v-if="displaySettings.showCrossPrice && prices.rrp && prices.rrp.unitPrice.value > 0">
                        <span v-if="prices.isRrpDefaultPrice" v-html="oldPriceBefore"></span>
                        <span v-else v-html="oldPriceRrp"></span>
                    </span>
                </div>
            </div>

            <div class="live-shopping-prices-additional-info">
                <div v-if="!(liveShoppingData.item.unit.unitOfMeasurement === 'C62' && liveShoppingData.item.unit.content === 1)">
                    <span>{{ liveShoppingData.item.unit.content }}</span>
                    <span>{{ liveShoppingData.item.unit.names.name }}</span>
                    <span v-if="liveShoppingData.item.variation.mayShowUnitPrice">| {{ prices.price.basePrice }}</span>
                </div>

                * <template v-if="showNetPrices">{{ $translate("Ceres::Template.itemExclVAT") }}</template><template v-else>{{ $translate("Ceres::Template.itemInclVAT") }}</template> {{ $translate("Ceres::Template.itemExclusive") }}
                <a v-if="$ceres.config.global.shippingCostsCategoryId > 0" data-toggle="modal" href="#shippingscosts" :title="$translate('Ceres::Template.itemShippingCosts')">{{ $translate("Ceres::Template.itemShippingCosts") }}</a>
                <a v-else :title="$translate('Ceres::Template.itemShippingCosts')">{{ $translate("Ceres::Template.itemShippingCosts") }}</a>
            </div>
        </div>

        <div class="thumb-content" v-else>
            <div>
                <div class="prices">
                    <div class="price-view-port">
                        <del class="crossprice" v-if="displaySettings.showCrossPrice && prices.rrp && prices.rrp.price.value > 0">
                            {{ prices.rrp.price.formatted | itemCrossPrice  }}
                        </del>
                    </div>

                    <div class="price">
                        {{ prices.price.price.formatted }} *
                    </div>
                </div>

                <div class="category-unit-price small" v-if="!(liveShoppingData.item.unit.unitOfMeasurement === 'C62' && liveShoppingData.item.unit.content === 1)">
                    <span>{{ liveShoppingData.item.unit.content }}</span>
                    <span>{{ liveShoppingData.item.unit.names.name }}</span>
                    <span v-if="liveShoppingData.item.variation.mayShowUnitPrice">| {{ prices.price.basePrice }}</span>
                </div>

                <span class="vat small text-muted">
                    * <template v-if="showNetPrices">{{ $translate("Ceres::Template.itemExclVAT") }}</template><template v-else>{{ $translate("Ceres::Template.itemInclVAT") }}</template> {{ $translate("Ceres::Template.itemExclusive") }}
                    <a v-if="$ceres.config.global.shippingCostsCategoryId > 0" data-toggle="modal" href="#shippingscosts" :title="$translate('Ceres::Template.itemShippingCosts')">{{ $translate("Ceres::Template.itemShippingCosts") }}</a>
                    <a v-else :title="$translate('Ceres::Template.itemShippingCosts')">{{ $translate("Ceres::Template.itemShippingCosts") }}</a>
                </span>
            </div>
        </div>

    </div>
</template>

<script>
import dayjs from "dayjs";

export default {
    props:
    {
        liveShoppingData:
        {
            type: Object,
            required: true
        },

        displaySettings:
        {
            type: Object,
            default: () =>
            {
                return {
                    showCrossPrice: true,
                    showStock: true,
                    showStockProgress: true,
                    showTimer: true,
                    showTimerProgress: true
                };
            }
        },

        prices:
        {
            type: Object,
            required: true
        },

        isActiveByStock:
        {
            type: Boolean
        },

        showNetPrices:
        {
            type: Boolean
        }
    },

    data()
    {
        return {
            currentInterval: null,
            duration: null,
            hasClosed: null,
            hasStarted: null,
            itemPriceRebatePercentage: 0,
            itemQuantityRemaining: 0,
            momentBegin: null,
            momentEnd: null,
            quantitySoldPercentage: 0,
            timePercentage: 0
        };
    },

    computed:
    {
        oldPriceBefore()
        {
            return this.$translate('Ceres::Template.liveShoppingBefore', {'price': '<del>' + this.prices.rrp.unitPrice.formatted + '</del>'})
        },

        oldPriceRrp()
        {
            return this.$translate('Ceres::Template.liveShoppingRrp', {'price': '<del>' + this.prices.rrp.unitPrice.formatted + '</del>'})
        }
    },

    created()
    {
        this.initializeDataAndTimer();
    },

    methods:
    {
        initializeDataAndTimer()
        {
            const momentNow = dayjs();

            this.momentBegin = dayjs.unix(this.liveShoppingData.liveShopping.fromTime);
            this.momentEnd = dayjs.unix(this.liveShoppingData.liveShopping.toTime);
            this.hasStarted = this.momentBegin.valueOf() < momentNow.valueOf();
            this.hasClosed = this.momentEnd.valueOf() < momentNow.valueOf();

            this.setQuantitySoldPercentage();

            if (this.hasStarted && !this.hasClosed)
            {
                this.setItemPriceRebatePercentage();
            }

            clearInterval(this.currentInterval);

            this.calculations();
            this.currentInterval = setInterval(() =>
            {
                this.calculations();
            }, 1000);
        },

        setQuantitySoldPercentage()
        {
            const data            = this.liveShoppingData.liveShopping;
            const percentage      = 100 - data.quantitySold / data.quantityMax * 100;

            this.itemQuantityRemaining = data.quantityMax - data.quantitySold;
            this.quantitySoldPercentage = percentage.toFixed(App.config.item.storeSpecial);
        },

        setItemPriceRebatePercentage()
        {
            const specialOfferPrice = this.prices.price.price.value;
            const defaultPrice      = this.prices.rrp && this.prices.rrp.price.value || 0;

            if (defaultPrice === 0)
            {
                this.itemPriceRebatePercentage = 0;
            }
            else
            {
                let percentage          = 100 - specialOfferPrice / defaultPrice * 100;

                percentage = percentage.toFixed(App.config.item.storeSpecial);
                percentage = percentage.replace(".", App.decimalSeparator);

                this.itemPriceRebatePercentage = percentage;
            }

        },

        calculations()
        {
            const momentNow = dayjs();
            let fullSeconds = 0;
            let remainSeconds = 0;

            fullSeconds = this.momentEnd.diff(this.momentBegin, "second");
            if (this.hasStarted)
            {
                remainSeconds = this.momentEnd.diff(momentNow, "second");
            }
            else
            {
                remainSeconds = this.momentBegin.diff(momentNow, "second");
            }

            this.timePercentage = (remainSeconds / fullSeconds * 100).toFixed(App.config.item.storeSpecial);
            this.duration = this.getDuration(remainSeconds);

            const hasToStart = !this.hasStarted && this.momentBegin < momentNow;
            const hasToClose = !this.hasClosed && this.momentEnd < momentNow;

            if (hasToStart || hasToClose)
            {
                clearInterval(this.currentInterval);

                this.$emit("reload-offer");
            }
        },

        getDuration(seconds)
        {
            const days = Math.floor(seconds / (60 * 60 * 24));

            seconds = seconds - (days * 60 * 60 * 24);

            const hours = Math.floor(seconds / (60 * 60));

            seconds = seconds - (hours * 60 * 60);

            const minutes = Math.floor(seconds / 60);

            seconds = seconds - (minutes * 60);

            return {
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds
            };
        }
    },

    watch:
    {
        liveShoppingData()
        {
            this.initializeDataAndTimer();
        }
    }
}
</script>
