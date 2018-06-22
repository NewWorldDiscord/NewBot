const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "*";

client.login("NDU5NDA2MTg1MDcwODU0MTU5.Dg16Qw.MpEAXVgLHctt8YuTT851l6YLllk");

client.on("ready", () => {
    console.log("Je suis pret !")
    client.user.setGame("Discord New World");
});

client.on(`message`, message => {

    if(message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#FF0000")
        .setTitle("Voici mes commades:")
        .addField("*help", "Affiche les commandes du bot")
        .addField("*info", "Info sur le bot")
        .addField("*kick <utilisateur", "Kick un utilisateur")
        .addField("*ban <utilisateur", "Ban un utilisateur")
        .addField("*clear <1 - 100>", "Permet de clear le tchat")
        .addField("*warn <utilisateur>", "Warn un utilisateur")
        .addField("*mute <utilisateur>", "Mute un utilisateur")
        .setFooter("Menu D'aide")
        message.channel.sendMessage(help_embed);
    }

    if(message.content === prefix + "info"){
        var info_embed = new Discord.RichEmbed()
        .setColor("#FF0000")
        .setTitle("**Info sur le bot:**")
        .addField(":robot: Nom:", `${client.user.tag}`, true)
        .addField("Discriminateur du bot :hash:", `#${client.user.discriminator}`)
        .addField("ID :id: ", `${client.user.id}`)
        .setFooter("Info Du Bot")
        message.channel.sendMessage(info_embed);
    }

    if(message.content.startsWith(prefix + "kick")) {
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez la permission d'effectuer cette commande !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un utilisateur !")
        }

        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("L'utilisateur n'est pas sur ce serveur !")
        }

        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Veuillez m'ajouté la permission pour kick un utilisateur !")
        }

        kick.kick().then(member => {
            message.channel.send(`:thumbsup: ${member.user.username} a été kick !`)
        });
    }

    if(message.content.startsWith(prefix + "ban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez la permission d'effectuer cette commande !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un utilisateur !")
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("L'utilisateur n'est pas sur ce serveur !")
        }

        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Veuillez m'ajouté la permission pour ban un utilisateur !")
        }

        ban.ban().then(member => {
            message.channel.send(`:thumbsup: ${member.user.username} a été ban !`)
        });
    }

    if(message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission d'effectuer cette commande !")
    
       let args = message.content.split(" ").slice(1);
       
       if(!args[0]) return message.channel.send("Vous devez préciser un nombre de messages a supprimer !")
       message.channel.bulkDelete(args[0]).then(() => {
           message.channel.send(`${args[0]} messages ont été supprimés ! :thumbsup:`);
       } 
    )
    }

});