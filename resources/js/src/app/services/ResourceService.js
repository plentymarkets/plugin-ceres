var ApiService = require('services/ApiService');

module.exports = (function( $, global ) {

    var resources = {};
    var queues = {};

    if( !global.registerResource )
    {
        global.registerResource = registerResource;
    }

    if( !global.registerResourceList )
    {
        global.registerResourceList = registerResourceList;
    }

    return {
        registerResource: registerResource,
        registerResourceList: registerResourceList,
        getResource: getResource,
        watch: watch,
        bind: bind
    };

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
    }

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
    }

    function getResource( name )
    {
        if( !resources[name] )
        {
            throw new Error("Unkown resource: " + name );
        }

        return resources[name];
    }

    function watch( name, callback )
    {
        getResource( name ).watch( callback );
    }

    function bind( name, vue, property )
    {
        property = property || name;
        getResource( name ).bind( vue, property );
    }

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

    function Resource( url, initialValue )
    {
        var data = new Observable();
        var ready = false;

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
            set: set
        };

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

        function val()
        {
            return data.value;
        }

        function set( value )
        {
            return ApiService
                .put( url, value )
                .done( function( response ) {
                    data.value = response;
                } );
        }
    }

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
            remove: remove
        };

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

        function val()
        {
            return data.value;
        }

        function set( key, value )
        {
            return ApiService
                .put( url + key , value )
                .done( function( response ) {
                    data.value = response;
                } );
        }

        function push( value )
        {
            return ApiService
                .post( url, value )
                .done( function( response ) {
                    data.value = response;
                } );
        }

        function remove( key )
        {
            return ApiService
                .delete( url + key )
                .done( function( response ) {
                    data.value = response;
                } );
        }
    }

})( jQuery, window );