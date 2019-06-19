import TranslationService from "services/TranslationService";

Vue.filter("ageRestriction", (age) =>
{
    let ageRestrictionText = "";

    if (age === 0)
    {
        ageRestrictionText = TranslationService.translate("Ceres::Template.singleItemAgeRestrictionNone");
    }
    else if (age > 0 && age < 18)
    {
        ageRestrictionText = TranslationService.translate("Ceres::Template.singleItemAgeRestriction").replace("age", age);
    }
    else if (age === 50)
    {
        ageRestrictionText = TranslationService.translate("Ceres::Template.singleItemAgeRestrictionNotFlagged").replace("age", age);
    }
    else if (age === 80)
    {
        ageRestrictionText = TranslationService.translate("Ceres::Template.singleItemAgeRestrictionNotRequired").replace("age", age);
    }
    else
    {
        ageRestrictionText = TranslationService.translate("Ceres::Template.singleItemAgeRestrictionUnknown").replace("age", age);
    }

    return ageRestrictionText;
});
