define( [
    "controllers/controller"
], function( controller ){
    return controller( function( b ){
        b.res( this.dx / 1000 );
    });
} );