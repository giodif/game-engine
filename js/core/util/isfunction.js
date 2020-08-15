define( function(){
    return function(fn) {
        return fn && {}.toString.call(fn) === '[object Function]';
    };
} );