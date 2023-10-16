module.exports = {
  name: "stats",
  aliases: ["botstat", "stat", "botstats", "botinfo"],
  description: "",
  execute: async (client, message, args, data, db, c, emoji) => {
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
    
    ${icon.latency} Ping    » ${Math.round(client.ws.ping)} ms     ${client.ws.ping > 100 ? icon.red_dot : icon.green_dot}
    ${icon.clock} Uptime    » ${duration}
    ${icon.bell} Total Message Command    » ${client.message_commands}
    ${icon.slash} Total Slash Command    » ${client.slash_commands}

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
