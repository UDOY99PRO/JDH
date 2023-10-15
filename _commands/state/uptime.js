 module.exports = {
  name: "uptime",
  aliases: [],
  execute: async(client, message, args) => {
var rawTime = ms(client.uptime);
    var days = rawTime.days;
    var hours = rawTime.hours;
    var minutes = rawTime.minutes;
    var seconds = rawTime.seconds;
let embed = new Discord.EmbedBuilder()
.setTitle(`⏱️ | Bot's Uptime`)
.setDescription(`\`\`\`js\nMy Current Uptime is: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds.\`\`\``)
.setColor("#18f02a")
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
