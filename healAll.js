// Heals all allied players.
pg = Vars.playerGroup.all();
for(i=0;i<pg.size(),i++){
  if(pg.get(i).team=me().team){pg.heal();};
}
"Players healed.";
