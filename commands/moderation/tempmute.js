const discord = require("discord.js")
const ms = require("ms")

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_ROLES"))return message.channel.send("You need the manage roles permission to use this command")
  
  let logchannel = message.guild.channels.cache.find(ch => ch.name === "logchannel")
  if(!logchannel) return message.channel.send("Cant find channel called logchannel")
  
  let role = message.guild.roles.cache.find(rl => rl.name === "Muted")
  if(!role) return message.channel.send("Cant find role called Muted")
  
  let user = message.mentions.members.first()
  if(!user) return message.channel.send("You need to mention a user to mute. You know that right?")
  
  let time = args[1]
  if(!time) return message.channel.send("Please specify a time!\ns for Second(s)\nm for Minute(s)\nh for Hour(s)\nd for Day(s)")
  
  let reason = args.slice(2).join(" ")
  if(!reason) reason = "No Reason Provided"
  
  if(user.hasPermission("MANAGE_ROLES")) return message.channel.send("You can't mute someone with the manage roles permission")
  
  let logembed = new discord.MessageEmbed()
  .setColor("RED")
  .setTitle(`User Temporariy Muted | ${user.user.tag}`)
  .addField("Staff" , `${message.author}`)
  .addField("Reason" , `${reason}`)

  
  if(ms(time)){
  try{
    user.send(`You have been muted in ${message.guild.name} by ${message.author} for ${reason}`)
  } catch (err) {
    console.log(err)
  }
  
  user.roles.add(role)
  logchannel.send(logembed)
  message.channel.send(`${user} has been successfully muted`)
    
    setTimeout(function()  {
    user.roles.remove(role)
      logchannel.send(`${user} has been unmuted`)
    }, ms(time))
  }
}

module.exports.help = {
  name: "tempmute",
  aliases: ["tempmuteuser"],
  description: "Tempmute a user in your server",
  usage: "<user> <time> (reason)",
  category: "Moderation"
}