define( function(){

    var isObject = function( obj ){ return typeof obj === "object" && !(obj instanceof Array); };
    var isArray = function( obj ){ return typeof obj === "array"; };

    var setDefaults = function( settings, defaults ){
        if( isObject( defaults ) && isObject( settings ) ){
            var obj = {};
            for( key in defaults ){
                obj[ key ] = setDefaults( settings[ key ], defaults[ key ] );
            }
            return obj;
        }
        if( isArray( defaults ) && isArray( settings ) ){
            return defaults.map( function( d, i ){
                return setDefaults( settings[ i ], d );
            } );
        }
        return settings || defaults;
    };

    return setDefaults;
} );