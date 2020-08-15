define( function(){
    var min = Math.min;
    var max = Math.max;
    var abs = Math.abs;
    var sqt = Math.sqrt;

    var rectrect = function( r1, r2 ){
        var r1c = r1.bounds();
        var r2c = r2.bounds();
        if( r1c.l >= r2c.r || r1c.r <= r2c.l ||
            r1c.t >= r2c.b || r1c.b <= r2c.t ){
            return false;
        };
        var t = max( r1c.t, r2c.t );
        var b = min( r1c.b, r2c.b );
        var l = max( r1c.l, r2c.l );
        var r = min( r1c.r, r2c.r );
        // Returns intersecting rectangle
        return { x: l, y: t, w: r - l, h: b - t };
    };

    var rectcirc  = function( r, c ){
        /* TODO */
    };
    
    var pointrect = function( p, _r ){
        var rc = _r.bounds();
        if( p.x <= rc.l || p.x >= rc.r ||
            p.y <= rc.t || p.y >= rc.b ){
            return false;
        }
        var sy = p.y - rc.t < rc.b - p.y;
        var sx = p.x - rc.l < rc.r - p.x;
        var t  = sy ? rc.t : p.y;
        var b  = sy ? p.y  : rc.b;
        var l  = sx ? rc.l : p.x;
        var r  = sx ? p.x  : rc.r;
        // Returns intersecting rectangle
        return { x: l, y: t, w: r - l, h: b - t };
    };

    var pointcirc = function( p, c ){
        var dx = p.x() - c.x();
        var dy = p.y() - c.y();
        var dist = sqt( dx * dx + dy * dy );
        if( dist > c.radius() ){ return false; }
        var ratio = c.radius() / dist;
        //returns nearest point on circle edge
        return {
            x : c.x() + dx * ratio,
            y : c.y() + dy * ratio
        };
    };

    var circcirc = function( c1, c2 ){
        var totrad = c1.radius() + c2.radius();
        var dx = c1.x() - c2.x();
        var dy = c1.y() - c2.y();
        var dist = sqt( dx * dx + dy * dy );
        if( dist > totrad ){ return false; }
        // returns circle that fits in overlap space
        return {
            x : c2.x() + dx / 2,
            y : c2.y() + dy / 2,
            r : (totrad - dist) / 2
        }
    };

    return {
        rectrect  : rectrect,
        pointrect : pointrect,
        pointcirc : pointcirc,
        circcirc  : circcirc
    }
} );