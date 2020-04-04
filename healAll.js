// Heals all allied players.
pg = Vars.playerGroup.all();
for(i=1;i<pg.size(),i++){
If(pg.get(i).team=me().team){pg.heal();};
}
"Players healed.";
