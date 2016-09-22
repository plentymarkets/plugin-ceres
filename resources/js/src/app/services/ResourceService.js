var ApiService = require('services/ApiService');

module.exports = (function( $ ) {

    var resources = {};

    return {
        registerResource: registerResource,
        registerResourceList: registerResourceList,
        getResource: getResource,
        watch: watch,
        bind: bind
    };

    /**
     * Register a new resource
     * @param {string}  name          The name of the resource. Must be a unique identifier
     * @param {string}  route         The route to bind the resource to
     * @param {*}       initialValue  The initial value to assign to the resource
     *
     * @returns {Resource} The created resource.
     */
    function registerResource( name, route, initialValue )
    {
        if( !name )
        {
            throw new Error("Cannot register resource. Name is required.");
        }

        if( !route )
        {
            throw new Error("Cannot register resource. Route is required.");
        }

        if( resources.hasOwnProperty( name ) )
        {
            throw new Error("Resource '" + name + "' already exists." );
        }

        var data;
        try
        {
            data = $.parseJSON( initialValue );
        }
        catch( e )
        {
            data = initialValue;
        }

        resources[name] = new Resource( route, data );

        return resources[name];
    }

    /**
     * Register a new list resource
     * @param {string}  name          The name of the resource. Must be a unique identifier
     * @param {string}  route         The route to bind the resource to
     * @param {*}       initialValue  The initial value to assign to the resource
     *
     * @returns {Resource}            The created resource.
     */
    function registerResourceList( name, route, initialValue )
    {
        if( !name )
        {
            throw new Error("Cannot register resource. Name is required.");
        }

        if( !route )
        {
            throw new Error("Cannot register resource. Route is required.");
        }

        if( resources.hasOwnProperty( name ) )
        {
            throw new Error("Resource '" + name + "' already exists." );
        }

        var data;
        try
        {
            data = $.parseJSON( initialValue );
        }
        catch( e )
        {
            data = initialValue;
        }

        resources[name] = new ResourceList( route, data );

        return resources[name];
    }

    /**
     * Receive a registered resource by its name
     * @param {string}  name    The name of the resource to receive
     *
     * @returns {Resource}      The resource
     */
    function getResource( name )
    {
        if( !resources[name] )
        {
            throw new Error("Unkown resource: " + name );
        }

        return resources[name];
    }

    /**
     * Track changes of a given resource.
     * @param {string}      name        The name of the resource to watch
     * @param {function}    callback    The handler to call on each change
     */
    function watch( name, callback )
    {
        getResource( name ).watch( callback );
    }

    /**
     * Bind a resource to a property of a vue instance.
     * @param {string}  name        The name of the resource to bind
     * @param {Vue}     vue         The vue instance
     * @param {string}  property    The property of the vue instance. Optional if the property name is equal to the resource name.
     */
    function bind( name, vue, property )
    {
        property = property || name;
        getResource( name ).bind( vue, property );
    }

    /**
     * @class Observable
     * Automatically notifies all attached listeners on any changes.
     */
    function Observable()
    {
        var _value;
        var _watchers = [];

        return {
            get value()
            {
                return _value;
            },
            set value( newValue )
            {
                for( var i = 0; i < _watchers.length; i++ )
                {
                    var watcher = _watchers[i];
                    watcher.apply( null, [newValue, _value] );
                }
                _value = newValue;
            },
            watch: function( cb )
            {
                _watchers.push( cb );
            }
        }
    }

    /**
     * @class Resource
     * @param {string}  url             The url to bind the resource to
     * @param {string}  initialValue    The initial value to assign to the resource
     */
    function Resource( url, initialValue )
    {
        var data = new Observable();
        var ready = false;

        // initialize resource
        if( !!initialValue )
        {
            // initial value was given by constructor
            data.value = initialValue;
            ready = true;
        }
        else
        {
            // no initial value given
            // => get value from url
            ApiService
                .get( url )
                .done( function( response ) {
                    data.value = response;
                    ready = true;
                } );
        }

        return {
            watch: watch,
            bind: bind,
            val: val,
            set: set,
            update: update,
            listen: listen
        };

        /**
         * Update this resource on a given event triggered by ApiService.
         * @param {string} event        The event to listen on
         * @param {string} usePayload   A property of the payload to assign to this resource.
         *                              The resource will be updated by GET request if not set.
         */
        function listen( event, usePayload )
        {
            ApiService.listen( event, function( payload ) {
                if( !!usePayload )
                {
                    update( payload[usePayload] );
                }
                else
                {
                    update();
                }
            });
        }

        /**
         * Add handler to track changes on this resource
         * @param {function} cb     The callback to call on each change
         */
        function watch( cb )
        {
            if( typeof cb !== "function" )
            {
                throw new Error( "Callback expected but got '" + (typeof cb) + "'.");
            }
            data.watch( cb );
            if( ready )
            {
                cb.apply( null, [data.value, null] );
            }
        }

        /**
         * Bind a property of a vue instance to this resource
         * @param {Vue}     vue         The vue instance
         * @param {sting}   property    The property of the vue instance
         */
        function bind( vue, property )
        {
            if( !vue )
            {
                throw new Error( "Vue instance not set." );
            }

            if( !property )
            {
                throw new Error( "Cannot bind undefined property." );
            }

            watch( function( newValue ) {
                vue.$set( property, newValue );
            } );
        }

        /**
         * Receive the current value of this resource
         * @returns {*}
         */
        function val()
        {
            return data.value;
        }

        /**
         * Set the value of the resource.
         * @param {*}   value   The value to set.
         * @returns {Deferred}  The PUT request to the url of the resource
         */
        function set( value )
        {
            return ApiService
                .put( url, value )
                .done( function( response ) {
                    data.value = response;
                } );
        }

        /**
         * Update the value of the resource.
         * @param {*}           value   The new value to assign to this resource. Will receive current value from url if not set
         * @returns {Deferred}          The GET request to the url of the resource
         */
        function update( value )
        {
            if( !!value )
            {
                data.value = value;
                var deferred = $.Deferred();
                deferred.resolve();
                return deferred;
            }
            else
            {
                return ApiService
                    .get( url )
                    .done( function( response ) {
                        data.value = response;
                    });
            }
        }
    }

    /**
     * @class ResourceList
     * @param {string}  url             The url to bind the resource to
     * @param {string}  initialValue    The initial value to assign to the resource
     */
    function ResourceList( url, initialValue )
    {
        var data = new Observable();
        var ready = false;

        if( url.charAt( url.length - 1 ) !== "/" )
        {
            url += "/";
        }

        if( !!initialValue )
        {
            data.value = initialValue;
            ready = true;
        }
        else
        {
            ApiService
                .get( url )
                .done( function( response ) {
                    data.value = response;
                    ready = true;
                } );
        }

        return {
            watch: watch,
            bind: bind,
            val: val,
            set: set,
            push: push,
            remove: remove,
            update: update,
            listen: listen
        };

        /**
         * Update this resource on a given event triggered by ApiService.
         * @param {string} event        The event to listen on
         * @param {string} usePayload   A property of the payload to assign to this resource.
         *                              The resource will be updated by GET request if not set.
         */
        function listen( event, usePayload )
        {
            ApiService.listen( event, function( payload ) {
                if( !!usePayload )
                {
                    update( payload[usePayload] );
                }
                else
                {
                    update();
                }
            });
        }

        /**
         * Add handler to track changes on this resource
         * @param {function} cb     The callback to call on each change
         */
        function watch( cb )
        {
            if( typeof cb !== "function" )
            {
                throw new Error( "Callback expected but got '" + (typeof cb) + "'.");
            }
            data.watch( cb );

            if( ready )
            {
                cb.apply( null, [data.value, null] );
            }
        }

        /**
         * Bind a property of a vue instance to this resource
         * @param {Vue}     vue         The vue instance
         * @param {sting}   property    The property of the vue instance
         */
        function bind( vue, property )
        {
            if( !vue )
            {
                throw new Error( "Vue instance not set." );
            }

            if( !property )
            {
                throw new Error( "Cannot bind undefined property." );
            }

            watch( function( newValue ) {
                vue.$set( property, newValue );
            } );
        }

        /**
         * Receive the current value of this resource
         * @returns {*}
         */
        function val()
        {
            return data.value;
        }

        /**
         * Set the value of a single element of this resource.
         * @param {string|number}   key     The key of the element
         * @param {*}               value   The value to set.
         * @returns {Deferred}      The PUT request to the url of the resource
         */
        function set( key, value )
        {
            return ApiService
                .put( url + key , value )
                .done( function( response ) {
                    data.value = response;
                } );
        }

        /**
         * Add a new element to this resource
         * @param {*}   value   The element to add
         * @returns {Deferred}  The POST request to the url of the resource
         */
        function push( value )
        {
            return ApiService
                .post( url, value )
                .done( function( response ) {
                    data.value = response;
                } );
        }

        /**
         * Remove an element from this resource
         * @param {string|number}   key     The key of the element
         * @returns {Deferred}              The DELETE request to the url of the resource
         */
        function remove( key )
        {
            return ApiService
                .delete( url + key )
                .done( function( response ) {
                    data.value = response;
                } );
        }

        /**
         * Update the value of the resource.
         * @param {*}           value   The new value to assign to this resource. Will receive current value from url if not set
         * @returns {Deferred}          The GET request to the url of the resource
         */
        function update( value )
        {
            if( !!value )
            {
                data.value = value;
                var deferred = $.Deferred();
                deferred.resolve();
                return deferred;
            }
            else
            {
                return ApiService
                    .get( url )
                    .done( function( response ) {
                        data.value = response;
                    });
            }
        }
    }

})( jQuery );