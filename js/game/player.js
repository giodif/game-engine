define( [
    "components/body",
    "components/sprite",
    "components/move",
    "controllers/sprite",
    "controllers/player",
    "collision/groups/solids"
],
function(
    body,
    sprite,
    move,
    spritecontroller,
    playercontroller,
    collisiongroupsolids
) {
    var settings = {
        x : 100,
        y : 50,
        w : 100,
        h : 150
    };

    var anims = [
        {
            name : "one",
            idx : [ 0, 1, 0, 2 ],
            len : [ 100, 100, 100, 100 ]
        },
        {
            name : "two",
            idx : [ 0, 1, 3, 4, 5, 6 ],
            len : [ 125, 125, 125, 125, 125, 125 ]
        }
    ];

    return function(){
        var _b = body();
        var _s = sprite();
        var _m = move( _b, 150 );

        _b.set( { static : false } );

        spritecontroller.add( _s );
        playercontroller.add( _b );
        collisiongroupsolids.add( _b );

        return {
            body : _b,
            sprite : _s,
            view : function( img ){
                _b.set( settings );
                _s.sprite.make( img, settings.w, settings.h );
                anims.forEach( function( a ){
                    _s.anim.make( a.name, a.idx, a.len );
                } );
            },
            render : function( stg ){
                var x = _b.x();
                var y = _b.y();
                var w = _b.w();
                var h = _b.h();
                if( _s.sprite.created() ){
                    stg.drawImage( _s.anim.current.frame(), x, y, w, h );
                    _b.render( stg, x, y, w, h );
                    return true;
                }
            }
        };
    }
});