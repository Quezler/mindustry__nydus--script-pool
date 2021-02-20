# Nydus script pool

Call your script with `/ts scriptName` (without `.js`).
Scripts are ran in the global namespace (same as with `/js`).

## Script template

If you are going to need persistent state between command invocations,
or you need lots of variables, here's an useful snippet.

This script template avoids namespace pollution by having the code in a function
and storing all the persistent state in the `ts` global variable.
This way you can also access your script state with js:
`/js ts.scriptName.somePersistentVariable`.

To access the argument(s) passed to the script use the variable `argument`.
This contains all the arguments as a single string.

```javascript
// Remember to change "yourScriptName"
// (just the string. the rest is adjusted automatically)
// with the name of your script:
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "yourScriptName";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];
    const args = ts.global.parseArguments(argument);

    /*
      Your script goes here.
      
      Do not use global variables. Instead, declare variables with `var`:
        var randomPlayer = Vars.playerGroup.all().random();
      
      Store any persistent state you need between runs in `state`, for example:
        state.timer = new java.util.Timer("my timer");
        state.running = true;

      Anything returned by this function is sent back to the player.
    */
};
ts[ts.currentScriptName].function();
```
