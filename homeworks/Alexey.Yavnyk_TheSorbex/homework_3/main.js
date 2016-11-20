(function () {

    //1

    var testObj = {};

    testObj.setTimeout = window.setTimeout;

    window.setTimeout = function (delay,callback) {

        testObj.setTimeout.call(window,callback,delay);

    }

    //2

    window.setInterval = function (callback,delay) {

        window.setTimeout(delay,function () {

            window.setTimeout(0,callback);

            window.setTimeout(window.setInterval(callback,delay));

        })

    }

    //3

    window.setTimeout = testObj.setTimeout;

    function fncToDelay(param){

        console.log('Delayed run : ' + param);

    }

    function freeze(delay,fnc) {

        var timeout;

        return function () {

            var args = arguments;

            timeout = setTimeout(function () {

                fnc.apply(this, args);

            }, delay)

            if (args[0]>1){

                clearTimeout(timeout);

            }

        }

    }

    var frozenFunc = freeze(1000, fncToDelay)

    frozenFunc('1');
    frozenFunc('2');
    frozenFunc('3');
    frozenFunc('4');
    frozenFunc('5');
    frozenFunc('6');
    frozenFunc('7');
    frozenFunc('8');
    frozenFunc('9');

    //4

    function createPipe(fnc, filters){

        return function(string){

            var str = string;

            for (var i = 0; i < filters.length; i++){

                str = filters[i](str);

            }
            
            return fnc(str);
        }
        
    }
    
    function originalFnc(string) {

        var result = string;

        for (var i = 0; i < result.length; i++) {

            if (result[i - 1] == ' ') {

                result[i] = result[i].toUpperCase();

            } else {

                result[i] = result[i].toLowerCase();

            }

        }

            result[0] = result[0].toUpperCase();

            result = result.join('');

            console.log(result);

        
    }
    
    function filterDigits(string) {

        var result = [];

        var k = 0;

        for (var i = 0; i < string.length; i++){

            if (isNaN(parseInt(string[i])) == true){

                result[k] = string[i];

                k++;

            }

        }

        return result;

    }

    function filterSpecial(string) {

        var result = [];

        var k = 0;

        for (var i = 0; i < string.length; i++){

            switch (string[i]){

                case '!' : continue;
                case '@' : continue;
                case '#' : continue;
                case '$' : continue;
                case '%' : continue;
                case '^' : continue;
                case '&' : continue;
                case '*' : continue;
                case '(' : continue;
                case ')' : continue;
                case '+' : continue;
                case '=' : continue;
                default :
                    result[k] = string[i];
                    k++;

            }

        }

        return result;
        
    }
    
    function filterWhiteSpaces (string) {

        var result = [];

        var space = " ";

        var k = 0;

        for (var i = 0; i < string.length; i++){

            if (string[i] == space){

                if (string[i-1] != space){

                    result[k] = string[i];

                    k++;

                }

            } else {

                result[k] = string[i];

                k++;

            }

        }

        return result;

    }

    var pipe = createPipe(originalFnc, [filterDigits, filterSpecial, filterWhiteSpaces]);

    pipe('on345l90y    te**x((((t     h$&er@@@e');

})();
