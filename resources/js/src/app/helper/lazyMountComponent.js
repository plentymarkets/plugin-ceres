export default function lazyMountComponent(componentFactory, loading)
{
    let resolveComponent;

    return () => ({
        component: new Promise((resolve) =>
        {
            resolveComponent = resolve;
        }),

        loading: {
            mounted()
            {
                if (!('IntersectionObserver' in window)) {
                    componentFactory().then(resolveComponent);
                    return;
                }

                const observer = new IntersectionObserver((entries) =>
                {
                    if(entries[0].intersectionRatio <= 0)
                    {
                        return;
                    }

                    observer.unobserve(this.$el);

                    componentFactory().then(resolveComponent);
                });

                observer.observe(this.$el);
            },

            render(createElement)
            {
                return createElement(loading);
            }
        }
    });
}
