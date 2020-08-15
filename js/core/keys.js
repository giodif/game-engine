// https://keycode.info/
define( function(){
    var add = document.addEventListener;
    var remove = document.removeEventListener;
        
    var same = function( e, input ){ return e.key === input; };
    var match = function( input, func, func2 ){
        var fired = false;
        var _down = func;
        var _up = func2 ? func2 : func;
        
        return {
            down : function( e ){
                if( same( e, input ) && !fired ){
                    fired = true;
                    _down( e );
                }
            },
            up : function( e ){
                if( same( e, input ) && fired ){
                    fired = false;
                    _up( e );
                }
            }
        };
    };
    return {
        listen : function( input, func, func2 ){
            var _lis = match( input, func, func2 );
            add( "keydown", _lis.down );
            add( "keyup",   _lis.up );
            return function(){
                remove( "keydown", _lis.down );
                remove( "keyup",   _lis.up );
            };
        }
    };
} );