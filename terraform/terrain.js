// terrain "<BlockType>" Blocks.<New Block>...
// if the block type is floor then replaces all floors if no replacement is specified

// Optional: terrain "<BlockType>" Blocks.<New Block>... "|" Blocks.<To Be Replaced>
// terrain true to replace last block with air

// there can be more then one block to randomize

if(typeof ts === 'undefined') ts = {}; ts.currentScriptName = "terrain";
if(typeof ts[ts.currentScriptName] === 'undefined') ts[ts.currentScriptName] = {};
ts[ts.currentScriptName].function = function(){
    const state = ts[ts.currentScriptName];

    state.lastBlocks = typeof state.lastBlocks == 'undefined' ? [] : state.lastBlocks;
    state.lastType = typeof state.lastType == 'undefined' ? "null" : state.lastType;

    function isIn(list, item) {
        if (list == null) return false;
        for (i = 0; i < list.length; i++) {
            if (list[i] == item) return true;
        }
        return false;
    }

    function isValidType(str) {
        if (str == 'overlay' || str == 'block' || str == 'floor') return true;
        return false;
    }

    function replace(blocksToReplace, newBlocks, type) {
        count = 0;
        for (x = 0; x < Vars.world.width(); x++) {
            for (y = 0; y < Vars.world.height(); y++) {
                if (type == "overlay" && isIn(blocksToReplace, Vars.world.tile(x, y).overlay())) {
                    Vars.world.tile(x, y).setOverlay(newBlocks[Math.floor(Math.random() * newBlocks.length)])
                    count++;
                } else if (type == "block" && isIn(blocksToReplace, Vars.world.tile(x, y).block())) {
                    Vars.world.tile(x, y).setBlock(newBlocks[Math.floor(Math.random() * newBlocks.length)])
                    count++;
                } else if (type == "floor" && (isIn(blocksToReplace, Vars.world.tile(x, y).floor()) || (blocksToReplace == null && Vars.world.tile(x, y).block() == Blocks.air))) {
                    Vars.world.tile(x, y).setFloor(newBlocks[Math.floor(Math.random() * newBlocks.length)])
                    count++;
                }
            }
        }
        delete x, y;
        return count;
    }

    if (args[0] && typeof args[0] == 'boolean') {
        if (state.lastBlocks.length == 0) {
            Vars.scripter.sendMessage("[#D7BDE2]Revert Failed, random blocks and floor with no specific block cannot be reverted")
            return;
        }
        count = replace(state.lastNewBlocks, state.lastBlocks, state.lastType);
        Vars.scripter.sendMessage("[#D7BDE2]Reverted [#AF7FED]" + count + "[] block" + (count == 1 ? "" : "s"));
        return;
    }

    if (args.length < 2) {
        Vars.scripter.sendMessage("[#F1948A]Specify [#F7DC6F]block[] and [#F7DC6F]block type[]")
        return;
    }

    if (!isValidType(args[0].toLowerCase())) {
        Vars.scripter.sendMessage("[#F1948A]Block Type can only be: [#F4D03F]\"floor\" \"block\" \"overlay\"")
        return;
    }

    blocks = args.slice(1);
    toReplace = [Blocks.air];
    newBlocks = [];

    for (i = 0; i < blocks.length; i++) {
        if (typeof blocks[i] == 'string') {
            toReplace = blocks.slice(i+1);
            break;
        }
        newBlocks.push(blocks[i])
    }

    if (toReplace[0] == Blocks.air && toReplace.length == 1 && args[0].toLowerCase() == 'floor') {
        toReplace = null;
    }

    count = replace(toReplace, newBlocks, args[0].toLowerCase());
    Vars.scripter.sendMessage("[#AED6F1]Replaced [#AF7AC5]" + count + "[] block" + (count == 1 ? "" : "s") + " with " + newBlocks);

    state.lastBlocks = toReplace == null ? [] : toReplace;
    state.lastNewBlocks = newBlocks;
    state.lastType = args[0].toLowerCase();

    function sync(player) {
        function sendWorldData(p) {
            if (typeof ByteArrayOutputStream == 'undefined') importPackage(java.io);
            if (typeof FastDeflaterOutputStream == 'undefined') importPackage(Packages.arc.util.io)
            if (typeof NetworkIO == 'undefined') importPackage(Packages.mindustry.net)
            
            stream = new ByteArrayOutputStream();
            def = new FastDeflaterOutputStream(stream);
            NetworkIO.writeWorld(p, def);
            data = new Packets.WorldStream();
            data.stream = new ByteArrayInputStream(stream.toByteArray());
    
            p.con.sendStream(data);
        }
    
        Call.onWorldDataBegin(player.con);
        sendWorldData(player);
        player.postSync();
    }

    for(i = 0; i < Vars.playerGroup.all().size; i++) {
        sync(Vars.playerGroup.all().get(i));
    }

    delete count, i;
    delete toReplace;
    delete newBlocks;
};
ts[ts.currentScriptName].function();
0;
