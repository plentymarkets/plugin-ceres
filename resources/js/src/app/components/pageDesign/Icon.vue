<template>
    <i class="fa" :class="classes" aria-hidden="true"></i>
</template>

<script>

    export default {
        props: {
            // the class name of the icon. The prefix "fa-" is optional.
            icon: String,

            // flag indicating loading state of the icon
            loading: {
                type: Boolean,
                default: false
            },

            // classes to be added while loading
            classLoading: {
                type: String,
                default: "fa-circle-o-notch"
            },

            // classes to be added while not loading
            classIdle: {
                type: String,
                default: ""
            }
        },

        computed:
        {
            classes()
            {
                const classes = [];
                if(this.loading)
                {
                    classes.push("fa-spin", this.classLoading)
                }
                else
                {
                    let iconClass = this.icon.substr(0, 3) === "fa-" ? this.icon : "fa-" + this.icon;
                    classes.push(iconClass, this.classIdle);
                }

                return classes;
            }
        }
    }
</script>