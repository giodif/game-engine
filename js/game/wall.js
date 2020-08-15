define( [
    "components/body",
    "collision/groups/solids"
],
function( body, collisiongroupsolids ) {
    
    var defaults = {
        x : 0,
        y : 570,
        w : 1000,
        h : 30
    };

    return function( settings ){
        var _b = body();
        _b.set( settings || defaults );
        collisiongroupsolids.add( _b );

        return {
            render : function( stg ){
                var x = _b.x();
                var y = _b.y();
                var w = _b.w();
                var h = _b.h();

                _b.render( stg, x, y, w, h );
                return true;
            }
        };
    }
});