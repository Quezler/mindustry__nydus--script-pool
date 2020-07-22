// To enable it on yourself or to disable it:
// /ts triGun
// Sorry for stealing code from laserGun, I hope you dont mind. -Photemy

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "triGun";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];

  if(state.running){
    state.timer.cancel();
    state.running = false;
    Vars.scripter.sendMessage("Trigun has been disabled");
  }else{
    const bullet   = args[1] || Bullets.missileJavelin;
    const accuracy = args[2] || 10
    const speed    = args[3] || 1
    const rotspeed = args[4] || 5
    const reload   = args[5] || 10
    const p        = args[6] || Vars.scripter;
    const team     = args[7] || p.team
    var   rot      = 1
    var   mov      = 0

      state.task = new java.util.TimerTask() {run(){
         if(p.isShooting()){
            for(j=0;j<360;j=j+120){
               Calls.createBullet(
                  Bullets.cryoShot,
                  team,
                  (p.x+(Math.cos((j+rot)/57.3))*5*mov),
                  (p.y+(Math.sin((j+rot)/57.3))*5*mov),
                  0,
                  0,
                  0.2
               );
            };
            rot = rot+rotspeed;
            if(mov<10){
               mov = mov+1/reload
            }else{
               for(i=0;i<360;i=i+120){
                  Calls.createBullet(
                     bullet,
                     team,
                     (p.x+Math.cos((i+rot)/57.3)*50),
                     (p.y+Math.sin((i+rot)/57.3)*50),
                     p.rotation+(Math.random()*accuracy)-(accuracy/2),
                     3,
                     0.3
                  );
               };
            };
         }else{
            for(f=0;f<360;f=f+120){
               Calls.createBullet(
                  Bullets.slagShot,
                  team,
                  (p.x+(Math.cos((f+rot)/57.3))*5*mov),
                  (p.y+(Math.sin((f+rot)/57.3))*5*mov),
                  0,
                  0,
                  0.2
                  );
             };
            if(mov>0){
               mov = mov - 2/rotspeed
            }
         };
    }};
    state.timer = new java.util.Timer("triGun")
    state.timer.schedule(state.task, 0,100*speed);
    state.running = true;
    Vars.scripter.sendMessage(" " + p.name + " has Trigun enabled.Arguments: bullet, accuracy, speed, rotspeed, reload, player, team");
  }
};
ts[ts.currentScriptName].function();0;
