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
            required: true
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
        },
        columns:
        {
            type: Number,
            default: 4
        },
        columnsMax:
        {
            type: Number,
            default: 12
        },
        childrenCount:
        {
            type: Number,
            required: true
        }
    },

    data()
    {
        return {
            isWaiting: false,
            isInitialyLoaded: false
        };
    },

    computed:
    {
        columnDivider()
        {
            return this.columnsMax / this.columns;
        },

        ...mapState({
            categoryChildren: state => state.navigation.categoryChildren
        })
    },

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
                this.isWaiting = true;

                this.$store.dispatch("loadCategoryChildrenChunk",
                    { categoryId: this.categoryId, size: this.chunkSize })
                    .finally(() =>
                    {
                        this.isWaiting = false;
                        this.isInitialyLoaded = true;
                    });
            }
        }
    }
});
