# Nydus script pool

Call your script with `/ts scriptName` (without `.js`).
Scripts are ran in the global namespace (same as with `/js`).

## Script template

This script template avoids namespace pollution by having the code in a function
and storing all the persistent state in the `ts` global variable.
This way you can also access your script state with js:
`/js ts.scriptName.somePersistentVariable`.

```javascript
// Remember to change "yourScriptName"
// (just the string. the rest is adjusted automatically)
// with the name of your script:
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "yourScriptName";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];

  /*
    Your script goes here.
    
    Do not use global variables. Instead, declare variables with `var`:
      var randomPlayer = Vars.playerGroup.all().random();
    
    Store any persistent state you need between runs in `state`, for example:
      state.timer = new java.util.Timer("my timer");
      state.running = true;
    
    It's good to delete the parameters at the end of the script
    so they don't interfere with future runs, for example:
      delete action; // assuming "action" if one of the parameters of the script
  */

  }
};
ts[ts.currentScriptName].function();
```

