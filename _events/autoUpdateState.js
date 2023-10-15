module.exports = async (client) =>{
  async function update() {
    const guild = client.guilds.cache.get('1150446046007283734');
   if(!guild) {
     return;
   }
  const channel = guild.channels.cache.find(c => c.id === '1162979196402925569');
   if(!channel) {
     return;
   } 
  const m = await channel.messages.fetch('1163003635291140138');
    if(!m) {
     return;
    }
let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);

let uptime = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
/*
    var ram = Math.floor(Math.random() * 60) * 6 * 11;
    if(ram <= 1024){
      var ram = Math.floor(ram + 1024);
    };
    
    var cpu = Math.random(1 * 9) * 9;
    if(cpu <= 2){
      var cpu = Math.floor(cpu + 2);
    }
 */
    var embed = new Discord.EmbedBuilder()
    .setColor('#2b2d30').setTitle(`📈 | Status | 📉`).setDescription(`\`\`\`js
Â» Client Uptime: ${uptime} 
Â» Client Ping: ${client.ws.ping} ms \`\`\``).setTimestamp().setFooter({text: "Update every 30sec"});
    m.edit({content: "", embeds: [embed], components: []} )
  }
  
  update();
  setInterval(update, 30000);
    }
