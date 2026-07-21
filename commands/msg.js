const {
SlashCommandBuilder,
PermissionFlagsBits
} = require("discord.js");


module.exports = {


data: new SlashCommandBuilder()

.setName("msg")

.setDescription("Envia uma mensagem pelo bot")

.addStringOption(option =>

option

.setName("texto")

.setDescription("Mensagem que o bot vai enviar")

.setRequired(true)

)



.setDefaultMemberPermissions(
PermissionFlagsBits.Administrator
),



async execute(interaction){


const texto = interaction.options.getString("texto");



await interaction.channel.send({

content:texto

});



await interaction.reply({

content:"✅ Mensagem enviada pelo bot!",

ephemeral:true

});


}


};
