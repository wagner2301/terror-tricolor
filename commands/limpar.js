const {
SlashCommandBuilder,
PermissionFlagsBits
} = require("discord.js");


module.exports = {


data: new SlashCommandBuilder()

.setName("limpar")

.setDescription("Apaga mensagens do canal")

.addIntegerOption(option =>

option

.setName("quantidade")

.setDescription("Quantidade de mensagens para apagar")

.setRequired(true)

),



async execute(interaction){


if(!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)){


return interaction.reply({

content:"❌ Você não tem permissão para apagar mensagens.",

ephemeral:true

});


}



const quantidade = interaction.options.getInteger("quantidade");



if(quantidade < 1 || quantidade > 100){


return interaction.reply({

content:"❌ Escolha uma quantidade entre 1 e 100.",

ephemeral:true

});


}




await interaction.channel.bulkDelete(

quantidade,

true

);



await interaction.reply({

content:`🧹 Foram apagadas ${quantidade} mensagens.`,

ephemeral:true

});


}


};
