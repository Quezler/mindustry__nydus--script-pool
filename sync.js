// Syncs all players

(function(){
    let num = 0;
    Groups.player.each(cons(p => {
        sync(p);
        num++;
    }))
    return "[#85C1E9]Synced [#A9CCE3]" + num + "[] player" + (num === 1 ? '' : 's');
})();
