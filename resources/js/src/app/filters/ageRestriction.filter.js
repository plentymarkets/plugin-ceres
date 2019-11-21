import TranslationService from "../services/TranslationService";
import Vue from "vue";

Vue.filter("ageRestriction", age =>
{
    if (age === 0)
    {
        return TranslationService.translate("Ceres::Template.singleItemAgeRestrictionNone");
    }
    else if (age > 0 && age <= 18)
    {
        return TranslationService.translate("Ceres::Template.singleItemAgeRestriction", { age });
    }
    else if (age === 50)
    {
        return TranslationService.translate("Ceres::Template.singleItemAgeRestrictionNotFlagged");
    }
    else if (age === 88)
    {
        return TranslationService.translate("Ceres::Template.singleItemAgeRestrictionNotRequired");
    }
    else
    {
        return TranslationService.translate("Ceres::Template.singleItemAgeRestrictionUnknown");
    }
});
