// /ts slagCircle player=me()
for(i=0;i<360;i++)
  for(j=0;j<0.5;j+=0.08)
    Calls.createBullet(Bullets.slagShot, Team.sharded, player.x, player.y, i, j, 30)

