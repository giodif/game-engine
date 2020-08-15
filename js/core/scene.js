define( function( ){
    return function( stg ){
        // TODOS:
        // - ZDEPTH for PARALLAX
        var drawlayers = [
            {
                id : "background",
                objects : []
            },
            {
                id : "midground",
                objects : []
            },
            {
                id : "player",
                objects : []
            },
            {
                id : "obstructions",
                objects : []
            },
            {
                id : "foreground",
                objects : []
            }
        ];
        var defaultDrawLayer = "midground";
        var layer = {
            index : function( id ){
                for( var i = 0; i < drawlayers.length; i++ ){
                    if( drawlayers[ i ].id === id ){
                        return i;
                    }
                }
                return -1;
            },
            addobject : function( obj, id ){
                var i = layer.index( id );
                if( i < 0 ){ return false; }
                drawlayers[ i ].objects.push( obj );
                return false;
            },
            create( id, depth ){
                if( layer.index( layerId ) > -1 ){
                    return false;
                }
                drawlayers[ depth || drawlayers.length ].push( { id : id, objects : 0 } );
                return true;
            }
        };
        var draworder = {
            set : function( ids ){
                var bail = false;
                ids.forEach( function( id ){
                    if( layer.index( id ) < 0 ){
                        bail = true;
                    }
                } );
                if( bail ){
                    return false;
                }
                var current = draworder.get();
                layers = ids.map( function( l ){
                    return layers[ current[ l ] ]; 
                } );
            },
            get : function(){
                var order = {};
                drawlayers.forEach( function( l, i ){
                    return order[ l.id ] = i;
                } );
                return order;
            }
        };
        var draw = function( stg ){
            stg.clear();
            drawlayers.forEach( function( l ){
                l.objects.forEach( function( obj ){
                    obj.draw( stg );
                } );
            } );
        };
        return {
            getIndexFromId : layer.index,
            createLayer    : layer.create,
            setDrawOrder : draworder.set,
            getDrawOrder : draworder.get,
            draw   : draw,

            addObject : function( obj, id ){
                if( id ){
                    if( layer.index( id ) > -1  ){
                        layer.addobject( obj, id );
                        return id;
                    }else{
                        return false;
                    }
                }else{
                    layer.addobject( obj, defaultDrawLayer );
                    return id;
                }
            }
        };
    };
} );