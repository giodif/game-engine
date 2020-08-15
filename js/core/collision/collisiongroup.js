define( [
    "collision/intersection"
],function( intersection ){
    var count = 0;
    return function( groupID ){
        var bodies = [];
        var intersections = [];

        function _createIntersectionList(){
            bodies.forEach( function( b1, j ){
                var colliders = [];
                if( !b1.static() ){
                    bodies.forEach( function( b2, i ){
                        if( i === j ){ return; }
                        var int = intersection.rectrect( b1, b2 );
                        if( int ){
                            colliders.push( [ b2, int ] );
                        }
                    } );
                    if( colliders.length > 0 ){
                        intersections.push( [ b1, colliders ] );
                    }
                }
            } );
        }

        function _resolveIntersections(){
            intersections.forEach( function( int, i ){
                var b1 = int[ 0 ];
                var c  = int[ 1 ];

                var b1center = b1.center();
                var move  = { x : 0, y : 0 };
                var force = { x : 0, y : 0 };

                c.forEach( function( col, j ){
                    // RESOLVE INTERSECTIONS BY MOVING
                    // OUT OF THE WAY OF ONE ANOTHER
                    var int = col[ 1 ];
                    var iw  = int.w;
                    var ih  = int.h;

                    var intcenter = {
                        x : int.x + int.w / 2,
                        y : int.y + int.h / 2
                    };

                    if( iw > ih ){
                        move.y += intcenter.y > b1center.y ? -ih : ih
                    }else{
                        move.x += intcenter.x > b1center.x ? -iw : iw;
                    }

                    // TODO : RESOLVE COLLISIONS
                    // BOUNCE AND FRICTION AND SUCH: MASS, ETC.
                    // NOT NEEDED NOW
                } );

                // MOVE OBJECT AWAY FROM INTERSECTIONS
                if( move.x !== 0 ){
                    force.x -= b1.vx() + b1.ax();
                }
                if( move.y !== 0 ){
                    force.y -= b1.vy() + b1.ay();
                }

                b1.move( move );
                b1.accel( force );
            } );
        };

        return {
            id : function(){ return groupID; },
            res : function(){
                intersections = [];
                _createIntersectionList();

                if( intersections.length > 0 ){
                    _resolveIntersections();
                }
            },
            add : function( item ){
                bodies.push( item );
            },
            bodies : function(){
                return bodies;
            }
        }
    }
} );