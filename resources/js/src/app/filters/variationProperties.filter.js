import { transformVariationProperties } from "../services/VariationPropertyService";

Vue.filter("variationProperties", (variationPropertyGroups, variationProperties, propertyTypes = [], displaySetting) =>
{
    return transformVariationProperties(variationPropertyGroups, variationProperties, propertyTypes, displaySetting);
});
