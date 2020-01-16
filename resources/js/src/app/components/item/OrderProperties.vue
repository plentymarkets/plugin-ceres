<template>
    <div>
        <div class="col-12" v-for="(property, index) in properties" :key="index">
            <div v-if="property.property.isOderProperty" class="input-unit order-property-input" :class="{ 'active': property.property.value }" data-validate="text">
                <input type="text" name="title" :id="'orderPropertyInput' + index" :value="property.property.value" @change="setVariationOrderProperty({propertyId: property.property.id, value: $event.target.value})">
                <label :for="'orderPropertyInput' + index">
                    {{property.property.names.name}}

                    <strong v-if="property.property.surcharge >= 0 && property.surcharge > 0">(+ {{ property.surcharge | currency}})</strong>
                    <strong v-if="property.property.surcharge > 0 && property.surcharge === 0">(+ {{ property.property.surcharge | currency}})</strong>
                *</label>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {

    computed: mapState({
        properties: state => state.item.variation.documents[0].data.properties
    }),

    methods: mapMutations([
        "setVariationOrderProperty"
    ])
}
</script>

<style>

</style>