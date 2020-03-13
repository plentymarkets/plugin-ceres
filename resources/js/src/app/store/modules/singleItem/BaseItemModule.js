import ApiService from "../../../services/ApiService";
import ItemModule from "./ItemModule";
import VariationSelectModule from "../VariationSelectModule";

const actions =
    {
        initVariation({ commit }, variation)
        {
            const itemId = variation.documents[0].data.item.id;

            // register a nested module for the main item
            ceresStore.registerModule(["items", itemId], ItemModule);
            ceresStore.registerModule(["items", itemId, "variationSelect"], VariationSelectModule);
            commit(`${itemId}/setVariation`, variation);

            // rest call for sets if set comps are set
            const setComponentIds = variation.documents[0].data.setComponentVariationIds;

            if (setComponentIds && setComponentIds.length)
            {
                ApiService.get("/rest/io/variations", { variationIds: setComponentIds, resultFieldTemplate: "SingleItem" })
                    .done(components =>
                    {
                        for (const component of Object.values(components.documents))
                        {
                            const itemId = component.data.item.id;
                            // extend the structur of the object to match the old objects
                            const extendedData = { documents: [component] };

                            // register a module for every set item
                            ceresStore.registerModule(["items", itemId], ItemModule);
                            ceresStore.registerModule(["items", itemId, "variationSelect"], VariationSelectModule);
                            commit(`${itemId}/setVariation`, extendedData);
                            commit(`${itemId}/setPleaseSelectVariationId`, component.data.variation.id);
                        }
                    });
            }
        }
    };

export default
{
    actions
};
