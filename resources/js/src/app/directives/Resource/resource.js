var ResourceService = require('services/ResourceService');

Vue.elementDirective('resource', {
    priority: 10000,
    params: [
        'name',
        'route',
        'data'
    ],
    bind: function()
    {
        ResourceService.registerResource(
            this.params.name,
            this.params.route,
            this.params.data
        );
    }
});

Vue.elementDirective('resource-list', {
    priority: 10000,
    params: [
        'name',
        'route',
        'data'
    ],
    bind: function()
    {
        ResourceService.registerResourceList(
            this.params.name,
            this.params.route,
            this.params.data
        );
    }
});
