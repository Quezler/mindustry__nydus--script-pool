# Nydus script pool

Call your script with `/ts scriptName` (without `.js`).
Scripts are ran in the global namespace (same as with `/js`).<br>

To access the argument(s) passed to the script use the variable `argument`.
This contains all the arguments as a single string.

## Script template
```javascript
(function(){
    const args = ts.global.parseArguments(argument);

    /*
      Your script goes here.

      Do not use global variables. Instead, declare variables with `var`:
        var randomPlayer = Vars.playerGroup.all().random();

      Anything returned by this function is sent back to the player.
    */
})();
```
