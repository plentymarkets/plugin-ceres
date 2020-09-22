<template>
    <div>
        <slot v-if="!isInitiallyLoaded"></slot>
        <div class="row">
            <div class="mb-3 col-6" :class="'col-md-' + columnDivider" v-for="category in categoryChildren">
                <a :href="getCategoryUrl(category.url)" :title="category.details[0].metaTitle || category.details[0].name">
                    <div class="nav-item border d-flex" :class="{ 'no-img': imageSource === 'none' }">
                        <div v-if="category.details[0][imageSource]" class="prop-1-1">
                            <img v-if="imageSource !== 'none'" :src="'/documents/' + category.details[0][imageSource]" :alt="category.details[0].metaTitle || category.details[0].name">
                        </div>
                        <div class="nav-text d-flex align-center p-2"><span class="text-appearance mx-auto text-truncate">{{ category.details[0].name }}</span></div>
                    </div>
                </a>
            </div>

            <div class="mb-3 mx-auto" v-if="categoryChildren.length && categoryChildren.length < childrenCount">
                <button type="button" class="btn btn-appearance px-4 py-3" @click="loadChunk()" :class="{ 'disabled': isWaiting }">
                    <span>{{ $translate("Ceres::Template.stepByStepNavigationShowMore") }}</span>
                    <icon icon="plus-circle" class="fa-fw" class-loading="fa-repeat" :loading="isWaiting"></icon>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    props: {
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
            isInitiallyLoaded: false
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
                        this.isInitiallyLoaded = true;
                    });
            }
        },

        getCategoryUrl(url)
        {
            const trailingSlash = url[0] === "/" ? "" : "/";
            const prefix = App.urls.includeLanguage ? `/${ App.language }${ trailingSlash }` : "";

            return prefix + url;
        }
    }
}
</script>
