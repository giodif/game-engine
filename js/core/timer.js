define( function(){
    var abs    = Math.abs;
    var floor  = Math.floor;
    var random = Math.random;
    var raf    = window.requestAnimationFrame;

    var ruid = function(){ return floor( random() * 1000000000 ); };

    return function( _frameRate, ID ){
        //PRIVATE
        var listeners  = {};
        var _initial   = 0;
        var frameDelta = 0;
        var frameRate  = _frameRate || 60;
        var run        = false;
        var last       = undefined;
        var ID         = ID || "TIMER_id_";

        var update = function( time ){
            if( last ){
                var delta = time - last;
                if( delta >= frameDelta ){
                    last = time;
                    if( run ){
                        for( var el in listeners ){
                            listeners[ el ]( delta );
                        }
                    }
                }
            }else{
                last = time;
            }
            raf( update );
        };

        //PUBLIC
        var _once = function(){
            for( var el in listeners ){
                listeners[ el ]( frameDelta );
            }
            _reset();
        };
        var _start = function(){
            run = true;
        };
        var _stop = function(){
            reset();
        };
        var _setRate = function( rate ){
            var r = abs( rate || 60 );
            frameRate = r > 60 ? 60 : r === 0 ? 0.000000001 : r;
            frameDelta = floor( 1000 / frameRate );
            return frameRate;
        };
        var _add = function( func, uid ){
            var id = ID + ( ruid() || uid );
            listeners[ id ] = func;
            return id;
        };
        var _remove = function( id ){
            delete listeners[ id ];
        };
        var _running = function(){
            return run;
        };
        var _delta = function(){
            return frameDelta;
        };
        var _reset = function(){
            _initial = 0;
            last = undefined;
            run = false;
        };

        //get starting timestamp
        raf( update );
        _initial = last;

        //calculate the framerate and frame delta, safety checks
        _setRate( frameRate );

        //pass along public functions
        return {
            once    : _once,
            start   : _start,
            stop    : _stop,
            setRate : _setRate,
            add     : _add,
            remove  : _remove,
            running : _running,
            delta   : _delta,
            reset   : _reset
        };
    };
} );