// Heals all allied players.
Vars.playerGroup.all().each(cons((p)=>If(p.team=me().team) p.heal()));
"Players healed.";
