 module.exports = {
  name: "uptime",
  aliases: [],
  execute: async(client, message, args) => {
var rawTime = ms(client.uptime);
    var days = rawTime;
    var hours = rawTime;
    var minutes = rawTime;
    var seconds = rawTime;
let embed = new Discord.EmbedBuilder()
.setTitle(`⏱️ | Bot's Uptime`)
.setDescription(`\`\`\`js\nMy Current Uptime is: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds.\`\`\``)
.setColor("")
.setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.avatarURL()})

message.channel.send({ embeds: [embed] });
}
    }

module.exports.help = {
    name: "uptime",
    description: "Display a bot uptime",
    usage: "uptime",
    type: "General"   
} 
