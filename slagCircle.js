// /ts slagCircle player=scripter

player = args.length > 0 ?  Vars.playerGroup.find(boolf(p => p.name.match(args[0]))) : Vars.scripter;

for(i=0;i<360;i++)
	for(j=0;j<0.5;j+=0.08)
		Calls.createBullet(Bullets.slagShot, player.team, player.x, player.y, i, j, 30);
0;
