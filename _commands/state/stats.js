module.exports = {
  name: "stats",
  aliases: ["botstat", "stat", "botstats", "botinfo"],
  description: "",
  execute: async (client, message, args) => {
var prefix = "-";

    const embed = new Discord.EmbedBuilder()
    .setColor(color.yellow)
    .setAuthor({ name: `Bot Status!`, iconURL: client.user.avatarURL()})
    .setTimestamp()
    .setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.avatarURL()})
    .setDescription(`**•••••••••••••••••••••••••••••••••••••••••••••••••••••••

    ${icon.db} Database in use » 
        ⟩ ${icon.mongoDB} MongoDB      ${mongo_conn? icon.dot_green : icon.dot_red}
        ⟩ ${icon.sql} sql          ${icon.dot_green}
         
    Lybrary                 »  ${icon.djs} Discord Js
    Language used   »  ${icon.nodejs} Node Js
    
    •••••••••••••••••••••••••••••••••••••••••••••••••••••••
    
    ${icon.latency} Ping    » ${Math.round(client.ws.ping)} ms     ${client.ws.ping > 300 ? icon.red_dot : icon.green_dot}
    ${icon.clock} Uptime    » ${ms(client.uptime).days} D, ${ms(client.uptime).hours} H, ${ms(client.uptime).minutes} M, ${ms(client.uptime).seconds} S.
    ${icon.bell} Total Message Command    » ${0}
    ${icon.slash} Total Slash Command    » ${0}

   •••••••••••••••••••••••••••••••••••••••••••••••••••••••

    ${icon.devloper} Bot Devloper    »   ${client.application.owner.tag}
    ${icon.discord} Total Guild Count  » ${client.guilds.cache.size}
    ${icon.channel} Total Channel Count  » ${client.channels.cache.size}
    ${icon.users} Total Bot users  » ${client.users.cache.size}
    
    •••••••••••••••••••••••••••••••••••••••••••••••••••••••**`)
	
    const sentmessage = await message.reply({ embeds: [embed]})
  }
    };
module.exports.help = {
    name: "stats",
    description: "It will shows you the bot stats",
    usage: "stats",
    type: "General" 
                                                  }  
