// this script is not meant to be directly called using /ts
// this script is run every time the server starts up or script pool is updated

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "global";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    // parses arguments into an array
    state.parseArgument = function(arg) {
        function parse(val) {
            if (val.startsWith('"') && val.endsWith('"')) return val.slice(1, val.length - 1);
            if (val.startsWith("'") && val.endsWith("'")) return val.slice(1, val.length - 1);
            if (Strings.canParseFloat(val)) return parseFloat(val);
            if (Strings.canParseInt(val)) return parseInt(val);
            if (val === "Infinity") return Infinity;
            if (val === "NaN") return NaN;
            if (val === "undefined") return undefined;
            if (val === "null") return undefined;
            if (typeof this[val] !== 'undefined') return this[val];
            if (val.includes('.')) {
                let split = val.split('.').slice(1);
                let temp = this[val.split('.')[0]];
                for (let i = 0; i < split.length; i++) {
                    send(temp[split[i]])
                    if (typeof temp[split[i]] !== 'undefined') temp = temp[split[i]];
                }
                return temp;
            }
            return val;
        }

        let inDoubleQuote = false;
        let args = [];

        let str = '';
        for(let i = 0; i < arg.length; i++) {
            let lastChar = i === 0 ? '' : arg[i - 1];
            let nextChar = i === arg.length - 1 ? '' : arg[i + 1];
            let char = arg[i];

            if (char == '"' && lastChar !== '\\') inDoubleQuote = !inDoubleQuote; // check if we managed to get inside a string

            if (lastChar === '"' && char !== ' ' && !inDoubleQuote) { // a string just ended and no space afterwards
                args.push(parse(str))
                str = '';
            }

            if (char === ' ' && !inDoubleQuote) { // reached a space and is not inside a string
                args.push(parse(str))
                str = '';
                continue
            }

            if (nextChar === '') { // end of string
                args.push(parse(str + char))
                str = '';
                continue;
            }

            str += char;
        }
        return args;
    }

    return "You are not meant to run this directly"
};
ts[ts.currentScriptName].function();