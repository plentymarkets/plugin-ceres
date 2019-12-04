import Vue from "vue";

import { mapState } from "vuex";

Vue.component("step-by-step-navigation", {

    props: {
        template:
        {
            type: String,
            default: "#vue-step-by-step-navigation"
        },
        categoryId:
        {
            type: Number,
            required: false,
            default: 28
        },
        chunkSize:
        {
            type: Number,
            default: 8
        },
        imageSource:
        {
            type: String,
            default: "imagePath"
        }
    },

    data()
    {
        return {
            isWaiting: false
        };
    },

    computed: mapState({
        categoryChildren: state => state.navigation.categoryChildren
    }),

    created()
    {
        this.loadChunk();
    },

    methods:
    {
        loadChunk()
        {
            if (!this.isWaiting)
            {

            }

            this.isWaiting = true;

            this.$store.dispatch("loadCategoryChildrenChunk",
                { categoryId: this.categoryId, size: this.chunkSize })
                .finally(() =>
                {
                    this.isWaiting = false;
                });
        }
    }
});
