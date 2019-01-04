import TranslationService from "services/TranslationService";

Vue.filter("ageRestriction", value =>
{
    value = value < 18 ? 0 : value;

    const map = {
        0: "singleItemAgeRestriction",
        18: "singleItemAgeRestrictionShort",
        50: "singleItemAgeRestrictionNotFlagged",
        88: "singleItemAgeRestrictionNotRequired",
        99: "singleItemAgeRestrictionNotUnknown"
    };

    return TranslationService.translate("Ceres::Template." + map[value], {age: value});
});
