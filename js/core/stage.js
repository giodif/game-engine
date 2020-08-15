define( function(){
    return function( id ){
        var cvs    = document.querySelector( id );
        var ctx    = cvs.getContext( "2d" );
        var parent = document.querySelector( id ).parentElement;
        var dpr    = window.devicePixelRatio;
        
        var tM = [ 1, 0, 0, 1, 0, 0 ];
        var size = { w : -1, h : -1 };

        var _translate = {
            x : function( _x ){
                var x = tM[ 4 ] += _x;
                var b = size.w - cvs.width;
                if( size.w > 0 ){
                    if( x > 0 ){ x = 0; }
                    else if( x < b ){ x = b; }
                }
                tM[ 4 ] = x;
                _transform();
            },
            y : function( _y ){
                var y = tM[ 5 ] += _y;
                var b = size.h - cvs.height;
                if( size.h > 0 ){
                    if( y > 0 ){ y = 0; }
                    else if( y < b ){ y = b; }
                }
                tM[ 5 ] = y;
                _transform();
            }
        };

        // TODO
        var _rotate = {};
        var _skew = {};

        var _transform = function( identity ){
            if( identity ){
                ctx.setTransform( 1, 0, 0, 1, 0, 0 );
            }
            else{
                var a = tM[ 0 ];
                var b = tM[ 1 ];
                var c = tM[ 2 ];
                var d = tM[ 3 ];
                var e = tM[ 4 ];
                var f = tM[ 5 ];
                ctx.setTransform( a, b, c, d, e, f );
            }
        };

        var _frame = {
            width : {
                true     : function(){ return cvs.width; },
                apparent : function(){ return cvs.width / dpr; }
            },
            height : {
                true     : function(){ return cvs.height; },
                apparent : function(){ return cvs.height / dpr; }
            },
            resize : function( w, h ){
                cvs.width = w * dpr;
                cvs.height = h * dpr;
                cvs.style.width = w + 'px';
                cvs.style.height = h + 'px';
                ctx.scale( dpr, dpr );
            }
        };

        // DECORATING CANVAS API
        // TO MANAGE PIXEL DENSITY
        var _drawImage = function( img, _a, _b, _c, _d, _e, _f, _g, _h ){
            var a = _a * dpr;
            var b = _b * dpr;
            var c = _c ? _c * dpr : img.naturalWidth * dpr;
            var d = _d ? _d * dpr : img.naturalHeight * dpr;
            if( !_e ){
                ctx.drawImage( img, a, b, c, d );
                return;
            }
            var e = _e * dpr;
            var f = _f * dpr;
            var g = _g * dpr;
            var h = _h * dpr;

            ctx.drawImage( img, a, b, c, d, e, f, g, h );
        };
        var _fillStyle = function( val ){
            ctx.fillStyle = val;
        };
        var _fillRect = function( _x, _y, _w, _h ){
            ctx.fillRect( _x * dpr, _y * dpr, _w * dpr, _h * dpr );
        };
        var _strokeStyle = function( val ){
            ctx.strokeStyle = val;
        };
        var _strokeRect = function( _x, _y, _w, _h ){
            ctx.strokeRect( _x * dpr, _y * dpr, _w * dpr, _h * dpr );
        };
        var _lineWidth = function( val ){
            ctx.lineWidth = val * dpr;
        };

        var _clear = function( _x, _y, _w, _h ){
            var x = _x ? _x * dpr : 0;
            var y = _y ? _y * dpr : 0;
            var w = _w ? _w * dpr : cvs.width;
            var h = _h ? _h * dpr : cvs.height;
            _transform( true );
            ctx.clearRect( x, y, w, h );
            _transform();
        };
        
        var _resizeEvent = function( e ){
            _frame.resize( parent.offsetWidth, parent.offsetHeight );
        };

        window.addEventListener( "load", _resizeEvent );
        window.addEventListener( "resize", _resizeEvent );

        ctx.imageSmoothingEnabled = false;

        _clear();

        return {
            clear       : _clear,
            translate   : _translate,
            transform   : _transform,
            resizeFrame : _frame.resize,
            frameHeight : _frame.height,
            frameWidth  : _frame.width,

            drawImage   : _drawImage,
            fillRect    : _fillRect,
            fillStyle   : _fillStyle,
            strokeRect  : _strokeRect,
            strokeStyle : _strokeStyle,
            lineWidth   : _lineWidth
        };
    };
} );