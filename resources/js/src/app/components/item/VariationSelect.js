import { isNull } from "util";
import { textWidth } from "../../helper/dom";
import uniq from "lodash/uniq";

const ApiService = require("services/ApiService");

// cache loaded variation data for reuse
const VariationData = {};

Vue.component("variation-select", {

    delimiters: ["${", "}"],

    props: [
        "attributes",
        "variations",
        "variationUnits",
        "preselect",
        "unitPreselect",
        "template"
    ],

    data()
    {
        return {
            // Collection of currently selected variation attributes.
            selectedAttributes: {},
            possibleUnitIds: [],
            selectedUnitId: 0
        };
    },

    computed:
    {
        hasEmptyOption()
        {
            const hasEmptyVariation = this.variations.some(variation =>
            {
                return variation.attributes.length <= 0;
            });

            const preselectedVariationExists = this.variations.some(variation =>
            {
                return variation.id === this.preselect;
            });

            if (hasEmptyVariation || !preselectedVariationExists)
            {
                // main variation is selectable
                return true;
            }

            // Check if all possible combinations can be selected or if an empty option is required to reset the current selection
            const attributeCombinationCount = Object.keys(this.attributes)
                .map(attributeId =>
                {
                    return Object.keys(this.attributes[attributeId].values).length;
                })
                .reduce((prod, current) =>
                {
                    return prod * current;
                }, 1);

            return (attributeCombinationCount * Object.keys(this.variationUnits).length) !== this.variations.length;

        },
        ...Vuex.mapState({
            currentVariation: state => state.item.variation
        })
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            // initialize selected attributes to be tracked by change detection
            const attributes = {};

            for (const attributeId in this.attributes)
            {
                attributes[attributeId] = null;
            }
            this.selectedAttributes = attributes;

            // set attributes of preselected variation if exists
            if (this.preselect)
            {
                // find variation by id
                const preselectedVariation = this.variations.filter(variation =>
                {
                    // eslint-disable-next-line eqeqeq
                    return variation.variationId == this.preselect;
                });

                if (!!preselectedVariation && preselectedVariation.length === 1)
                {
                    const attributes = this.attributes;

                    // set attributes of preselected variation
                    this.setAttributes(preselectedVariation[0]);

                    if ((preselectedVariation[0].attributes.length > 0 && this.unitPreselect > 0) || attributes.length === 0)
                    {
                        const possibleVariations = this.filterVariations(this.selectedAttributes);

                        if (possibleVariations.length > 1)
                        {
                            this.setUnits(possibleVariations);
                            this.selectedUnitId = this.unitPreselect;
                        }
                        else if (this.variations.length > 1 && this.attributes.length === 0)
                        {
                            this.setUnits(this.variations);
                            this.selectedUnitId = this.unitPreselect;
                        }
                    }
                }
            }
        });
    },

    methods: {

        /**
         * Finds all variations matching a given set of attributes.
         * @param {{[int]: int}}  attributes   A map containing attributeIds and attributeValueIds. Used to filter variations
         * @returns {array}                    A list of matching variations.
         */
        filterVariations(attributes)
        {
            attributes = attributes || this.selectedAttributes;
            return this.variations.filter(variation =>
            {
                for (let i = 0; i < variation.attributes.length; i++)
                {
                    const id = variation.attributes[i].attributeId;
                    const val = variation.attributes[i].attributeValueId;

                    if (!!attributes[id] && attributes[id] != val)
                    {
                        return false;
                    }
                }

                return variation.attributes.length > 0 || this.possibleUnitIds.length > 0;
            }).filter(variation =>
            {
                return this.selectedUnitId === 0 || this.selectedUnitId === variation.unitCombinationId;
            });
        },

        /**
         * Tests if a given attribute value is not available depending on the current selection.
         * @param {int}     attributeId         The id of the attribute
         * @param {int}     attributeValueId    The valueId of the attribute
         * @returns {boolean}                   True if the value can be combined with the current selection.
         */
        isEnabled(attributeId, attributeValueId)
        {
            // clone selectedAttributes to avoid touching objects bound to UI
            const attributes = JSON.parse(JSON.stringify(this.selectedAttributes));

            attributes[attributeId] = attributeValueId;
            return this.filterVariations(attributes).length > 0;
        },

        /**
         * Set selected attributes by a given variation.
         * @param {*}           variation   The variation to set as selected
         * @returns {boolean}               true if at least one attribute has been changed
         */
        setAttributes(variation)
        {
            let hasChanges = false;

            for (let i = 0; i < variation.attributes.length; i++)
            {
                const id = variation.attributes[i].attributeId;
                const val = variation.attributes[i].attributeValueId;

                if (this.selectedAttributes[id] !== val)
                {
                    this.selectedAttributes[id] = val;
                    hasChanges = true;
                }
            }

            return hasChanges;
        },

        isTextCut(name)
        {
            if (this.$refs.labelBoxRef)
            {
                return textWidth(name, "Custom-Font, Helvetica, Arial, sans-serif") > this.$refs.labelBoxRef[0].clientWidth;
            }

            return false;
        },

        onSelectionChange(event)
        {
            this.$emit("is-valid-change", false);

            if (isNull(event))
            {
                const values = Object.values(this.selectedAttributes);
                const uniqueValues = [...new Set(values)];

                if (uniqueValues.length === 1 && isNull(uniqueValues[0]))
                {
                    const mainVariation = this.variations.find(variation => !variation.attributes.length);

                    if (mainVariation)
                    {
                        this.setVariation(mainVariation.variationId);
                    }
                }
            }
            else
            {
                // search variations matching current selection
                const possibleVariations = this.filterVariations();

                if (possibleVariations.length === 1)
                {
                    if (!this.selectedUnitId > 0)
                    {
                        this.possibleUnitIds = [];
                    }

                    // only 1 matching variation remaining:
                    // set remaining attributes if not set already. Will trigger this method again.
                    if (!this.setAttributes(possibleVariations[0]))
                    {
                        // all attributes are set => load variation data
                        this.setVariation(possibleVariations[0].variationId);
                    }
                    else
                    {
                        this.onSelectionChange();
                    }
                }
                else if (possibleVariations.length > 1)
                {
                    this.setUnits(possibleVariations);
                }
                else
                {
                    this.setUnits([]);
                }
            }
        },

        setVariation(variationId)
        {
            if (VariationData[variationId])
            {
                // reuse cached variation data
                this.$store.commit("setVariation", VariationData[variationId]);

                document.dispatchEvent(new CustomEvent("onVariationChanged",
                    {
                        detail:
                        {
                            attributes: VariationData[variationId].attributes,
                            documents: VariationData[variationId].documents
                        }
                    }));

                this.$emit("is-valid-change", true);
            }
            else
            {
                // get variation data from remote
                ApiService
                    .get("/rest/io/variations/" + variationId, { template: "Ceres::Item.SingleItem" })
                    .done(response =>
                    {
                        // store received variation data for later reuse
                        VariationData[variationId] = response;

                        this.$store.commit("setVariation", response);

                        document.dispatchEvent(new CustomEvent("onVariationChanged", { detail: { attributes: response.attributes, documents: response.documents } }));

                        this.$emit("is-valid-change", true);
                    });
            }
        },
        setUnits(possibleVariations)
        {
            let possibleUnitIds = [];

            if (possibleVariations.length > 0)
            {
                possibleUnitIds = uniq(possibleVariations.map(variation =>
                {
                    return variation.unitCombinationId;
                }));
            }

            if (possibleUnitIds.length > 1)
            {
                this.possibleUnitIds = possibleUnitIds;
            }
            else
            {
                this.selectedUnitId = 0;
            }
        }
    },

    watch:
    {
        currentVariation:
        {
            handler(newVariation, oldVariation)
            {
                if (oldVariation)
                {
                    const url = this.$options.filters.itemURL(newVariation.documents[0].data);
                    const title = document.getElementsByTagName("title")[0].innerHTML;

                    window.history.replaceState({}, title, url);
                    document.dispatchEvent(new CustomEvent("onHistoryChanged", { detail: { title: title, url:url } }));

                }
            },
            deep: true
        }
    }
});
