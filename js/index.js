requirejs.config({
    baseUrl: 'js/core',
    paths: {
        game: '../game'
    }
});

requirejs( [
    "stage",
    "imageloader",
    "timer",
    "game/player",
    "game/wall",
    "controllers/sprite",
    "controllers/player",
    "collision/groups/solids"
],
function(
    stage,
    load,
    timer,
    player,
    wall,
    spritecontroller,
    playercontroller,
    collisiongroupsolids
) {

    var srcs = [ {
        name : "walk",
        src : "img/walk-cycle.png"
    } ];

    function init( images ){
        var stg = stage( "#stage" );
            stg.resizeFrame( 1000, 600 );
        
        var plr = player();
            plr.view( images.walk );

        var floor     = wall({ x : 0,   y : 570, w : 1000, h : 30 });
        var ceiling   = wall({ x : 0,   y : 0,   w : 1000, h : 30 });
        var leftwall  = wall({ x : 0,   y : 0,   w : 30,   h : 600 });
        var rightwall = wall({ x : 970, y : 0,   w : 30,   h : 600 });
        
        var tmr = timer();
            tmr.add( function( dx ){
                stg.clear();

                plr.body.accel.y( 10 );

                playercontroller.update( dx );
                collisiongroupsolids.res();
                playercontroller.update( dx );

                // console.log( plr.body.vy() );

                spritecontroller.update( dx );

                floor.render( stg );
                ceiling.render( stg );
                leftwall.render( stg );
                rightwall.render( stg );

                plr.render( stg );

            } );
            tmr.start();
    }

    load( srcs, init );
});