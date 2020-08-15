define( function(){
    return function( _iterator ){
        var items = [];
        var iterator = _iterator || function( s ){};
        return {
            update : function( dx ){
                items.forEach( iterator, { dx : dx } );
            },
            add : function( item ){
                items.push( item );
            }
        };

    };
} );