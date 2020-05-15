if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "splat";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];

  state.createWalls = true;
  if(args.length == 0) {
    Vars.scripter.sendMessage("[yellow] no action specified. use /ts splat 'start'|'stop'|'status'");
  } else switch(args[0]) {
    case "start-nowalls":
      state.createWalls = false;
    case "start":
      try{state.timer.cancel()}catch(e){} // just in case
      const task = new java.util.TimerTask() { run() {
        Vars.playerGroup.all().each(cons(function(p) {
          const tileOn = p.tileOn();
          const blockOn = tileOn.block();
          if(state.createWalls && blockOn === Blocks.air) {
            tileOn.setNet(Blocks.copperWall, p.team, 0);
            Blocks.copperWall.placed(tileOn);
          }else if(tileOn.getTeam() !== p.team) switch(blockOn){
            //TODO tweak status effects and damages
            case Blocks.copperWall:
            case Blocks.copperWallLarge:
              p.applyEffect(StatusEffects.burning,2*60)
              p.damage(2);
              break;
            case Blocks.titaniumWall:
            case Blocks.titaniumWallLarge:
              p.applyEffect(StatusEffects.freezing,1*60)
              p.damage(4);
              break;
            case Blocks.thoriumWall:
            case Blocks.thoriumWallLarge:
              p.applyEffect(StatusEffects.corroded,5*60)
              p.damage(10);
              break;
            case Blocks.plastaniumWall:
            case Blocks.plastaniumWallLarge:
              p.applyEffect(StatusEffects.overdrive,5*60)
              p.damage(14);
              break;
            case Blocks.phaseWall:
            case Blocks.phaseWallLarge:
              p.applyEffect(StatusEffects.tarred,10*60)
              p.damage(6);
              break;
            case Blocks.surgeWall:
            case Blocks.surgeWallLarge:
              Calls.createBullet(Bullets.flakSurge, tileOn.getTeam(), p.x, p.y, 0, 0, 30);
              p.damage(20);
              break;
          }else if(tileOn.getTeam() == p.team) switch(blockOn){
            //TODO tweak buffs
            case Blocks.copperWall:
            case Blocks.copperWallLarge:
              p.health(Math.min(p.health()+10, p.maxHealth()));
              break;
            case Blocks.titaniumWall:
            case Blocks.titaniumWallLarge:
              p.health(Math.min(p.health()+10, p.maxHealth()));
              break;
            case Blocks.thoriumWall:
            case Blocks.thoriumWallLarge:
              p.health(Math.min(p.health()+10, p.maxHealth()));
              break;
            case Blocks.plastaniumWall:
            case Blocks.plastaniumWallLarge:
              p.health(Math.min(p.health()+10, p.maxHealth()));
              break;
            case Blocks.phaseWall:
            case Blocks.phaseWallLarge:
              p.health(Math.min(p.health()+10, p.maxHealth()));
              break;
            case Blocks.surgeWall:
            case Blocks.surgeWallLarge:
              p.health(Math.min(p.health()+10, p.maxHealth()));
              break;
          }
        }));
      }};
      state.timer = new java.util.Timer("splat")
      state.timer.schedule(task, 0,100);
      state.running = true;
      break;
    case "stop":
      state.timer.cancel();
      state.running = false;
      break;
    case "status":
      Vars.scripter.sendMessage(state.running ? "[green]running" : "[red]stopped");
      break;
    case "help":
    default:
      Vars.scripter.sendMessage("[yellow] Usage: /ts splat 'start'|'stop'|'status'");
  }

};
ts[ts.currentScriptName].function();

