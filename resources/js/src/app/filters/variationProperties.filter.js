import { transformItem } from "../services/VariationPropertyService";

Vue.filter("variationProperties", (variationPropertyGroups, variationProperties, propertyTypes = [], displaySetting) =>
{
    return transformItem(variationPropertyGroups, variationProperties, propertyTypes, displaySetting);
});
