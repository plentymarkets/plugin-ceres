import TranslationService from "services/TranslationService";

Vue.filter("ageRestriction", age =>
{
    let ageRestrictionText = "";

    if (age === 0)
    {
        ageRestrictionText = TranslationService.translate("Ceres::Template.singleItemAgeRestrictionNone");
    }
    else if (age > 0 && age <= 18)
    {
        ageRestrictionText = TranslationService.translate("Ceres::Template.singleItemAgeRestriction", { age });
    }
    else if (age === 50)
    {
        ageRestrictionText = TranslationService.translate("Ceres::Template.singleItemAgeRestrictionNotFlagged");
    }
    else if (age === 88)
    {
        ageRestrictionText = TranslationService.translate("Ceres::Template.singleItemAgeRestrictionNotRequired");
    }
    else
    {
        ageRestrictionText = TranslationService.translate("Ceres::Template.singleItemAgeRestrictionUnknown");
    }

    return ageRestrictionText;
});
