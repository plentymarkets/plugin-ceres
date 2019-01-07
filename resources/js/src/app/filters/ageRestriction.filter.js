import TranslationService from "services/TranslationService";

Vue.filter("ageRestriction", value =>
{
    const map = {
        0: "singleItemAgeRestrictionNone",
        1: "singleItemAgeRestriction",
        50: "singleItemAgeRestrictionNotFlagged",
        88: "singleItemAgeRestrictionNotRequired",
        99: "singleItemAgeRestrictionNotUnknown"
    };

    const mapAccessor = value > 0 && value <= 18 ? 1 : value;

    return TranslationService.translate("Ceres::Template." + map[mapAccessor], {age: value});
});
