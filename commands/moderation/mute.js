const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_ROLES"))return message.channel.send("You need the manage roles permission to use this command")
  
  let logchannel = message.guild.channels.cache.find(ch => ch.name === "logchannel")
  if(!logchannel) return message.channel.send("Cant find channel called logchannel")
  
  let role = message.guild.roles.cache.find(rl => rl.name === "Muted")
  if(!role) return message.channel.send("Cant find role called Muted")
  let user = message.mentions.members.first()
  if(!user) return message.channel.send("You need to mention a user to mute. You know that right?")
  
  let reason = args.slice(1).join(" ")
  if(!reason) reason = "No Reason Provided"
  
  if(user.hasPermission("MANAGE_ROLES")) return message.channel.send("You can't mute someone with the manage roles permission")
  let logembed = new discord.MessageEmbed()
  .setColor("RED")
  .setTitle(`User Muted | ${user.user.tag}`)
  .addField("Staff" , `${message.author}`)
  .addField("Reason" , `${reason}`)

  try{
    user.send(`You have been muted in ${message.guild.name} by ${message.author} for ${reason}`)
  } catch (err) {
    console.log(err)
  }
  
  await user.roles.add(role)
  logchannel.send(logembed)
  message.channel.send(`${user} has been successfully muted`)
  
}

module.exports.help = {
  name: "mute",
  aliases: ["muteuser"],
  description: "Mute a user in your server",
  usage: "<user> (reason)",
  category: "Moderation"
}