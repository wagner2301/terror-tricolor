const {
SlashCommandBuilder,
PermissionFlagsBits
} = require("discord.js");


module.exports = {


data: new SlashCommandBuilder()

.setName("limpar")

.setDescription("Apaga mensagens do chat")

.addIntegerOption(option =>

option

.setName("quantidade")

.setDescription("Quantidade de mensagens para apagar")

.setRequired(true)

),




async execute(interaction){



if(!interaction.member.permissions.has(

PermissionFlagsBits.ManageMessages

)){


return interaction.reply({

content:"❌ Você não tem permissão para apagar mensagens.",

ephemeral:true

});


}




const quantidade = interaction.options.getInteger("quantidade");



if(quantidade < 1 || quantidade > 100){


return interaction.reply({

content:"❌ Escolha entre 1 e 100 mensagens.",

ephemeral:true

});


}




await interaction.deferReply({

ephemeral:true

});





const apagadas = await interaction.channel.bulkDelete(

quantidade,

true

);





await interaction.editReply({

content:`🧹 Foram apagadas **${apagadas.size} mensagens** do chat.`

});



}


};
