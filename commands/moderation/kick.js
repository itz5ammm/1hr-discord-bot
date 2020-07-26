const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("KICK_MEMBERS"))return message.channel.send("You need the kick members permission to use this command")
  
  let logchannel = message.guild.channels.cache.find(ch => ch.name === "logchannel")
  if(!logchannel) return message.channel.send("Cant find channel called logchannel")
  
  let user = message.mentions.members.first()
  if(!user) return message.channel.send("You need to mention a user to kick. You know that right?")
  
  let reason = args.slice(1).join(" ")
  if(!reason) reason = "No Reason Provided"
  
  if(user.hasPermission("KICK_MEMBERS")) return message.channel.send("You can't kick someone with the kick members permission")
  let logembed = new discord.MessageEmbed()
  .setColor("RED")
  .setTitle(`User Kicked | ${user.user.tag}`)
  .addField("Staff" , `${message.author}`)
  .addField("Reason" , `${reason}`)

  try{
    user.send(`You have been kicked in ${message.guild.name} by ${message.author} for ${reason}`)
  } catch (err) {
    console.log(err)
  }
  
  await user.kick()
  logchannel.send(logembed)
  message.channel.send(`${user} has been successfully kicked`)
  
}

module.exports.help = {
  name: "kick",
  aliases: ["kickuser"],
  description: "Kick a user from your server",
  usage: "<user> (reason)",
  category: "Moderation"
}