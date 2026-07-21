const {
SlashCommandBuilder,
PermissionFlagsBits,
EmbedBuilder
} = require("discord.js");



module.exports = {


data: new SlashCommandBuilder()

.setName("fechar-ticket")

.setDescription("Fecha o ticket atual"),





async execute(interaction){



const cargosPermitidos = [


"1493905534376742974",
"1493905535492427836",
"1528241558204317788",
"1493905538566590524",
"1493905541699997726",
"1493905547626287197"

];




const autorizado = interaction.member.roles.cache.some(

role => cargosPermitidos.includes(role.id)

);



if(!autorizado){


return interaction.reply({

content:"❌ Você não tem permissão para fechar tickets.",

ephemeral:true

});


}






const embed = new EmbedBuilder()

.setColor("#E30613")

.setTitle("🔒 Ticket encerrado")

.setDescription(

`
Este ticket foi fechado por:

${interaction.user}


🗑️ O canal será apagado em **5 segundos**.
`

)

.setTimestamp();






await interaction.reply({

embeds:[embed]

});






setTimeout(()=>{


interaction.channel.delete()

.catch(()=>{});


},5000);



}


};
