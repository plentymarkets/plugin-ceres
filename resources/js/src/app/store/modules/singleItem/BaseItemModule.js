import ApiService from "../../../services/ApiService";
import ItemModule from "./ItemModule";
import VariationSelectModule from "../VariationSelectModule";

const state =
    {
    };

const mutations =
    {
    };

const actions =
    {
        initVariation({ state, commit }, variation)
        {
            // register a nested module for the main item
            const itemId = variation.documents[0].data.item.id;

            ceresStore.registerModule(["items", itemId], ItemModule);
            ceresStore.registerModule(["items", itemId, "variationSelect"], VariationSelectModule);
            commit(`${itemId}/setVariation`, variation);

            // rest call for sets if set comps set
            const setComponentIds = variation.documents[0].data.setComponentVariationIds;

            if (setComponentIds && setComponentIds.length)
            {
                ApiService.get("/rest/io/variations", { variationIds: setComponentIds, resultFieldTemplate: "SingleItem" })
                    .done(components =>
                    {
                        for (const component of Object.values(components.documents))
                        {
                            const itemId = component.data.item.id;
                            const whackData = { documents: [component] };

                            ceresStore.registerModule(["items", itemId], ItemModule);
                            ceresStore.registerModule(["items", itemId, "variationSelect"], VariationSelectModule);
                            commit(`${itemId}/setVariation`, whackData);
                            commit(`${itemId}/setPleaseSelectVariationId`, component.data.variation.id);
                        }
                    });
            }
        }
    };

const getters =
    {

    };

export default
{
    state,
    actions,
    mutations,
    getters
};
