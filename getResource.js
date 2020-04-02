// /ts getResource resource=Items.graphite amount=10 team=Team.sharded
// team is optional. if empty, your team is used
((typeof team === 'undefined') ? me().team : team).core().items.add(resource, amount)
"added [accent]" + amount + "[] " + resource + " to the core."

