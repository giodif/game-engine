// var testObject = {
//     a : 1,
//     b : 2,
//     c : 3,
//     d : 4,
//     e : 5,
//     f : {
//         g : 78,
//         h : 97235,
//     },
//     i : [ 1, 2, 3, 4, 5, 6 ]
// };
// downloadJSON( JSON.stringify( testObject ), "test" );

define( [ "util/timestamp" ], function( ts ){
    return function( content, fileName ) {
        var file = new Blob( [ content ], { type: 'application/json' } );
        var a    = document.createElement( "a" );

        a.href     = URL.createObjectURL( file );
        a.download = ( fileName || ts() ) + '.json';

        a.click();

        URL.revokeObjectURL( a.href );
    };
} );