import TranslationService from "../services/TranslationService";

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
