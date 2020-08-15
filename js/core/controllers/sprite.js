define( [
    "controllers/controller"
], function( controller ){
    return controller( function( s ){
        var sprite = s.sprite;
        var anim = s.anim;

        if( sprite.created() ){
            if( anim.time.elapsed() >= anim.current.frameDuration() ){
                var idx = anim.index.get();
                var dl = anim.current.sequence().idx.length - 1;
                anim.index.set( idx < dl ? ++idx : 0 );
                anim.time.reset();
            }else{
                anim.time.update( this.dx );
            }
        }
    } );
} );