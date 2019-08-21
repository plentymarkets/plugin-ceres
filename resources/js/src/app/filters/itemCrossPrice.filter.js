import TranslationService from "../services/TranslationService";
import Vue from "vue";

Vue.filter("itemCrossPrice", function(crossPrice, isSpecialOffer)
{
    if (isSpecialOffer)
    {
        return TranslationService.translate(
            "Ceres::Template.crossPriceSpecialOffer",
            {
                price: crossPrice
            }
        );
    }

    return TranslationService.translate(
        "Ceres::Template.crossPriceRRP",
        {
            price: crossPrice
        }
    );
});
