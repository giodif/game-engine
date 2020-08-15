define( function(){
    var images = {};
    var queue = 0;

    return function( srcs, completeCallback, progressCallback ){
        srcs.forEach( function( _img ){
            var img = new Image();
            queue += 1;
            img.addEventListener( "load", function( e ){
                images[ _img.name ] = img;
                queue -= 1;
                if( _img.callback ){
                    img.callback( e, img );
                }
                if( progressCallback ){
                    progressCallback( images );
                }
                if( queue <= 0 ){
                    completeCallback( images );
                }
            } );
            img.src = _img.src;
        } );
    };
} );