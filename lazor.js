//Makes the dart fire meltdown lasers
//NOTE:the laser only hapens server side,and as such you will not see the laser itself only the effects(also lag)
if (Mechs.dart.weapon.bullet===Bullets.meltdownLaser) {
    Mechs.dart.weapon.bullet=Bullets.standardMechSmall;
    Vars.scripter.sendMessage("Laser deactivated");
} else {
    Mechs.dart.weapon.bullet=Bullets.meltdownLaser;
    Vars.scripter.sendMessage("Laser activated");
}
0;
