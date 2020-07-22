// The way the new /ts command now works is that,
// when you enter the command e.g. /ts someScript PlayerObj "Name" Team x-cord
// the arguments "PlayerObj "Name" Team x-cord" are put into a js array like this [PlayerObj, "Name", Team, x-cord]
// and assigned to a variable named 'args'
// if you want to pass in a string to the script simply use " or '
// Positional arguments depend on you're script, if the want to place the arguments where ever
// then you may need to change you're script to handle that

// btw the new syntax of ts is just no more /ts calc x=a, y=b  but just the values ie /ts calc a b

// Exmaple code
// /ts example SomeNumber SomeString? SomePlayerObject?
// ? represents optional

// pre define the variables with defualts
SomeNumber = undefined
SomeString = "No Value"
SomePlayerObject = null

// check if any arguments were passed
if (args.length == 0) {
    Vars.scripter.sendMessage("No arguements were passed to the script");

} else { // something was passed to the script
    // since this script is going to be using positional arguments
    // well just check if the first argument exists

    // lets say one arguement "SomeNumber" was passed, so the number of arguments,
    // should be greater then zero
    // if you use number of arguemetns equal to one here, multiple arguments may cause issues
    // depending on what you're doing ie if 2 are passed the equal check weill no longer be true

    // if there is one or more argument it will assign the first one to the variable (in this case)
    // if for some reason no argument then return the defual or previously assigned value in this case undefined

    // variable =    condition    ? return on true : return on false
    SomeNumber  = args.length > 0 ?     args[0]    :    SomeNumber

    // checks if two or more arguements were passed
    SomeString = args.length > 1 ? args[1] : SomeString

    // checks if three or more arguements were passed
    SomePlayerObject = args.length > 2 ? args[2] : SomePlayerObject

    // checks if we got the first argument (the one we needed)
    // if it is the same as it was as the defualt value then tell the scripter

    // if you want check two required arguments then you can do so by:
    // if (Arg1 == defualtValue && typeof Arg2 == defualtValue)
    // or you can check them individually like:
    // if (Arg1 == defualtValue) {
    //     Do something ...
    // } else if (Arg2 == defualtValue) {
    //     Do something ...
    // } else {
    //     Do somthing when everything good
    // }

    if (typeof SomeNumber == 'undefined') {
        Vars.scripter.sendMessage("SomeNumber was not defined")

    } else { // it was defined then
        Vars.scripter.sendMessage("SomeNumber was " + String(SomeNumber))
        Vars.scripter.sendMessage("SomeString was " + String(SomeString))
        Vars.scripter.sendMessage("SomePlayerObject was " + String(SomePlayerObject))
    }

    // clean up
    delete SomeNumber
    delete SomeString
    delete SomePlayerObject

    // you can delete variable 'args' if you want
    // it gets redefined every time so it may be fine
}
0; // to tell /ts to not send output of last thing of script
