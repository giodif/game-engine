define( function(){
    return function( s ){
        var _s = s || {};
        var color = _s.color || "lime";
        var width = _s.lineWidth || 2;

        return {
            area : function( w, h ){
                return w * h;
            },
            center : function( x, y, w, h ){
                return {
                    x : x + w / 2,
                    y : y + h / 2
                };
            },
            bounds : function( x, y, w, h ){
                return {
                    t : y,
                    l : x,
                    r : x + w,
                    b : y + h
                };
            },
            render : function( stg, x, y, w, h ){
                stg.lineWidth( width );
                stg.strokeStyle( color );
                stg.strokeRect( x, y, w, h );  
            }
        };
    }
} );