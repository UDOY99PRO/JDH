module.exports = {
  name: "ping",
  aliases: ["pong", "latency"],
  execute: async(client, message, args) => {
    var ping = Math.round(client.ws.ping);
    
var ping_embed = new Discord.EmbedBuilder()
    .setColor("#03fc30")
    .setTitle(`🏓 Pong!`)
    .setDescription(`\`\`\`js\nBot Latency: ${ping} ms;\`\`\``)
    .setTimestamp()

    		message.reply({ embeds: [ping_embed]})
  }}
