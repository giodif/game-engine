define( [
    "util/isnumber",
    "components/rect"
], function( isnum, rect ){
    return function( s ){
        var _r = rect( s );
        var x  = 0;
        var y  = 0;
        var vx = 0;
        var vy = 0;
        var w  = 0;
        var h  = 0;
        var static = true;

        var ax = 0;
        var ay = 0;
        var mx = 0;
        var my = 0;

        var accel = function( force ){
                ax += isnum( force.x ) ? force.x : 0;
                ay += isnum( force.y ) ? force.y : 0;
            };
            accel.x = function( force ){
                ax += isnum( force ) ? force : 0;
            };
            accel.y = function( force ){
                ay += isnum( force ) ? force : 0;
            };

        var move = function( dist ){
                mx += isnum( dist.x ) ? dist.x : 0;
                my += isnum( dist.y ) ? dist.y : 0;
            };
            move.x = function( dist ){
                mx += isnum( dist ) ? dist : 0;
            };
            move.y = function( dist ){
                my += isnum( dist ) ? dist : 0;
            };

        return {
            set : function( settings ){
                x  = isnum( settings.x  ) ? settings.x  : x;
                y  = isnum( settings.y  ) ? settings.y  : y;
                vx = isnum( settings.vx ) ? settings.vx : vx;
                vy = isnum( settings.vy ) ? settings.vy : vy;
                w  = isnum( settings.w  ) ? settings.w  : w;
                h  = isnum( settings.h  ) ? settings.h  : h;
                // console.log( settings.static );
                static = settings.static !== undefined ? settings.static : static;
            },
            x  : function(){ return x;  },
            y  : function(){ return y;  },
            vx : function(){ return vx; },
            vy : function(){ return vy; },
            ax : function(){ return ax; },
            ay : function(){ return ay; },
            w  : function(){ return w;  },
            h  : function(){ return h;  },

            static : function(){ return static; },
            center : function(){
                return {
                    x : x + w / 2,
                    y : y + h / 2
                };
            },
            res : function( dx ){
                vx += ax;
                vy += ay;

                x += vx * dx + mx;
                y += vy * dx + my;

                ax = 0;
                ay = 0;
                
                mx = 0;
                my = 0;
            },
            bounds : function(){
                return {
                    t : y,
                    l : x,
                    r : x + w,
                    b : y + h
                };
            },

            render : function( stg, x, y, w, h ){
                _r.render( stg, x, y, w, h );
            },

            accel : accel,
            move  : move
        };
    };
} );