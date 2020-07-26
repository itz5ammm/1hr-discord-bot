const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(user.tag)
        .setImage(user.displayAvatarURL({dynamic: true , size: 2048}))
    .setFooter(`Requested By: ${message.author.tag}`)
        .setTimestamp()
    message.channel.send(avatarEmbed);
}

module.exports.help = {
name: "avatar",
  aliases: ["useravatar"],
  description: "Check a users avatar",
  usage: "<member>",
  category: "Info"
}