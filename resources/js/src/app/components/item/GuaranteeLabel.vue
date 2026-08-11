<template>
    <div class="guarantee-label-container">
        <button type="button" class="guarantee-badge-toggle p-0 border-0 bg-transparent"
                data-toggle="modal" :data-target="'#guarantee-label-modal-' + _uid"
                :aria-label="$translate('Ceres::Widget.guaranteeLabelBadgeAlt')">
            <guarantee-badge :guarantee="guarantee"></guarantee-badge>
        </button>

        <div :id="'guarantee-label-modal-' + _uid" class="modal fade guarantee-label-modal" tabindex="-1" role="dialog" aria-labelledby="guarantee-label-modal-title" aria-modal="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 id="guarantee-label-modal-title" class="modal-title">{{ $translate("Ceres::Widget.guaranteeLabelFullAlt") }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" :aria-label="$translate('Ceres::Template.closeIcon')">&times;</button>
                    </div>
                    <div class="modal-body">
                        <guarantee-label-full :guarantee="guarantee" :brand="brand" :model="model"></guarantee-label-full>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "guarantee-label",

    props: {
        guarantee: {
            type: [String, Number],
            default: "XX"
        },
        brand: {
            type: String,
            default: ""
        },
        model: {
            type: String,
            default: ""
        }
    }
}
</script>
