// /ts player="name",server="server",port=6567
// If port is left empty default port is used
((typeof port === 'undefined') ? 6567 : port)
Call.onConnect(Vars.playerGroup.find(boolf(p => p.name.match(player))).con, server, port)
