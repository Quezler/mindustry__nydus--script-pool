//Sends all players on the server to the targeted server
// "/ts invate server="server" port=6567"
if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "invade";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
  const state = ts[ts.currentScriptName];
   
  if ((typeof port)==='undefined') {
      port=6567;
  }
  pg=Vars.playerGroup.all();
  for(i=0;i<pg.size;i++){

   Call.onConnect(pg.get(i).con,server,port);


  }
  "Nobody expects the nydus inquisition!"

};
ts[ts.currentScriptName].function();