define( function(){
    return function(){
        var date = new Date();
        var pad = function( str, mlen, char ){
            var len = str.length;
            var diff = mlen - len;
            var buff = "";
            char = char || "0";

            if( diff <= 0 ){
                return str;
            }else{
                while( diff > 0 ){
                    buff += char;
                    diff -= 1;
                }
            }
            return buff + ( "" + str );
        };

        return [
            pad( date.getUTCDate() + "", 2 ),
            pad( date.getUTCMonth() + "",    2 ),
            pad( date.getUTCFullYear() + "", 4 ),
            pad( date.getUTCHours() + "", 2 ),
            pad( date.getUTCMinutes() + "", 2 ),
            pad( date.getUTCSeconds() + "", 2 ),
            pad( date.getUTCMilliseconds() + "", 3 )
        ].reduce(
            function( a, c, i ){
                return a + "-" + c;
            }
        );
    };
} );