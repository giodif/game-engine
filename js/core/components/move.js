define( [
    "keys",
    "util/isnumber"
], function( keys, isnum ){

    return function( body, velocity ){

        var _v = isnum( velocity ) ? velocity : 1;

        keys.listen( "a", function( e ){
                body.set( { vx : -_v } );
            },function( e ){
                body.set( { vx : 0 } );
            }
        );

        keys.listen( "d", function( e ){
                body.set( { vx : _v } );
            },function( e ){
                body.set( { vx : 0 } );
            }
        );

        keys.listen( "w", function( e ){
                body.accel.y( -300 );
            },function( e ){}
        );

        keys.listen( "s", function( e ){
                body.set( { vy : _v } );
            },function( e ){
                body.set( { vy : 0 } );
            }
        );
    }
} );