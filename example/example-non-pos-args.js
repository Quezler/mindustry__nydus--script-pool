// Welcome to the example of non-positional arguemnts for /ts command
// Hopefully this example script will clear the confusion of non-positional arguments
// The way the new /ts command now works is that,
// when you enter the command e.g. /ts someScript PlayerObj "Name" Team x-cord
// the arguments "PlayerObj "Name" Team x-cord" are put into a js array like this [PlayerObj, "Name", Team, x-cord]
// and assigned to a variable named 'args'
// if you want to pass in a string to the script simply use " or '
// non-positional arguments depend on you're script, if the want to place the arguments in one place and make them non-movable
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
    // since this script is going to be using non-positional arguments
    // in this case we dont what comes first
    // but we do know that,
    // 'SomeNumber' is a number
    // 'SomeString' is a string
    // 'SomePlayerObject' is a player object

    // so we will loop through all the arguments
    // checking of the arguement is one of the above things
    // ie a string or a number or a player object

    // the loop
    for(i = 0; i < args.length; i++) {
        // check if it was a string
        if (typeof args[i] == 'string') {
            // if it was then assign
            // since in this case
            // we r having only one string argument
            // so it should be fine
            // but for some other purpose of script if you have,
            // two or more arguements of the same type
            // then just do some other js magic
            // or check the non-common thing the strings have
            // ie, if one supposed to be only numbers and other only alphabets
            // then check if one of the contains only numbers or can be converted to a number
            // then it is the number one and other is the alphabet one

            SomeString = args[i]
        } else if (Number.isInteger(args[i])) { // was it a number
            // same big previous paragraph applies here
            
            // if it was then assign it
            SomeNumber = args[i]
        } else if (args[i] instanceof Player) { // was it a player 
            // and also here
            
            // if it was assign it
            SomePlayerObject = args[i]
        }
    }
    // so at this point the loop should have gone throuh all arguments
    // lets see if we got what we wanted ie the required argument (SomeNumber)

    // if you want check two required arguments then you can do so by:
    // if (Arg1 == defualtValue && typeof Arg2 == defualtValue)
    // you can use '||' operator to check if either one condition is true ie either one argument is defined
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
