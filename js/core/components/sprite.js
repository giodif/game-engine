define( function(){
    function r( a, b ){ return a + b; }
    return function( s ){
        // list of named animations
        // includes index list of slices
        // and indexed list of durations per slice
        var animations  = {};
        // current millisecond count
        // used to switch frames at the correct time
        var time = 0;
        // frame index within
        // the current animation
        var index = 0;
        // array of indexed panels
        // cut from the spritesheet
        var slices = null;
        // string name of current animation
        var anim = null;
        // source image
        var spritesheet = null;
        // has the spritesheet been loaded
        var spritesheetCreated = false;

        function sequence(){ return animations[ anim ]; }

        var ANIM = {
            index : {
                set : function( idx ){ index = idx; },
                get : function(){ return index; }
            },
            current : {
                animId : function(){ return anim; },
                frame  : function(){ return slices[ sequence().idx[ index ] ]; },
                frameDuration : function(){ return sequence().len[ index ]; },
                animDuration  : function(){ return sequence().idx.reduce( r ); },
                sequence : sequence
            },
            time : {
                update  : function( dt ){ time += dt; },
                elapsed : function(){ return time; },
                reset   : function(){  time = 0; }
            },
            goto : function( name ){
                if( animations[ name ] ){
                    anim = name;
                    return true;
                }
                return false;
            },
            make : function( name, idx, len ){
                animations[ name ] = { idx : idx, len : len };
                ANIM.goto( name );
            }
        };
        
        var SPRITE = {
            make : function( img, w, h ){
                var fz = [];
                var iw = img.naturalWidth;
                var ih = img.naturalHeight;
                for( var i = 0; i < ih; i += h ){
                    for( var j = 0; j < iw; j += w ){
                        fz.push( { x : j, y : i } );
                    }
                }
                slices = fz.map( function( fzi ){
                    var cvs = document.createElement( "canvas" );
                    var ctx = cvs.getContext( "2d" );
                    cvs.width = w;
                    cvs.height = h;
                    ctx.drawImage( img, fzi.x, fzi.y, w, h, 0, 0, w, h );
                    return cvs;
                } );
                
                spritesheet = img;
                spritesheetCreated = true;
            },
            created : function(){ return spritesheetCreated; },
            current : function(){ return spritesheet; }
        };

        return {
            anim : ANIM,
            sprite : SPRITE
        };
    }
} );