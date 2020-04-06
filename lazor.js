//Makes the dart fire meltdown lasers
//NOTE:the laser only hapens server side,and as such you will not see the laser itself only the effects(also lag)
if (Mechs.dart.weapon.bullet===Bullets.meltdownLaser) {
    Mechs.dart.weapon.bullet=Bullets.standartMechSmall;
    "Laser deactivated";
} else {
    Mechs.dart.weapon.bullet=Bullets.meltdownLaser;
    "Laser activated";
}
