import TranslationService from "services/TranslationService";

Vue.filter("inputUnit", function(basketItem, shortString = false)
{
    let result = "";

    if (shortString)
    {
        if (basketItem.inputWidth > 0)
        {
            result = "(" + TranslationService.translate("Ceres::Template.itemInputWidth");
            if (basketItem.inputLength > 0)
            {
                result += "/" + TranslationService.translate("Ceres::Template.itemInputLength") + ")";
            }
            else
            {
                result += ")";
            }
        }
        else if (basketItem.inputLength > 0)
        {
            result = "(" + TranslationService.translate("Ceres::Template.Length") + ")";
        }
    }
    else
    if (basketItem.inputWidth > 0)
    {
        result = basketItem.inputWidth + basketItem.variation.data.unit.htmlUnit;
        if (basketItem.inputLength > 0)
        {
            result += " * " + basketItem.inputLength + basketItem.variation.data.unit.htmlUnit;
        }
    }
    else if (basketItem.inputLength > 0)
    {
        result = basketItem.inputLength + basketItem.variation.data.unit.htmlUnit;
    }
    return result;
});
