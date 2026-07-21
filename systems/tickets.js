const {
ChannelType,
PermissionFlagsBits,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js");



const cargosStaff = [

"1493905534376742974",
"1493905535492427836",
"1528241558204317788",
"1493905538566590524",
"1493905541699997726",
"1493905547626287197"

];



module.exports = {


async criarTicket(interaction, motivo){



const guild = interaction.guild;



const canal = await guild.channels.create({

name:`recrutamento-${interaction.user.username}`,

type:ChannelType.GuildText,

permissionOverwrites:[


{

id:guild.id,

deny:[

PermissionFlagsBits.ViewChannel

]

},



{

id:interaction.user.id,

allow:[

PermissionFlagsBits.ViewChannel,
PermissionFlagsBits.SendMessages,
PermissionFlagsBits.ReadMessageHistory

]

},



...cargosStaff.map(id=>({

id:id,

allow:[

PermissionFlagsBits.ViewChannel,
PermissionFlagsBits.SendMessages,
PermissionFlagsBits.ReadMessageHistory

]

}))



]

});






const embed = new EmbedBuilder()


.setColor("#E30613")


.setTitle("🔴🔵⚪ Terror Tricolor | Recrutamento")


.setDescription(`

Olá ${interaction.user}, seja bem-vindo(a)!


Seu ticket de recrutamento foi criado.


👤 **Usuário:**
${interaction.user}


📅 **Horário:**
<t:${Math.floor(Date.now()/1000)}:F>


📋 **Motivo:**
${motivo}


🛠️ **Staff responsável:**
Ticket não assumido.


Aguarde um membro da equipe de recrutamento atender você.


`);






const botoes = new ActionRowBuilder()


.addComponents(


new ButtonBuilder()

.setCustomId("assumir")

.setLabel("Assumir Ticket")

.setEmoji("🛠️")

.setStyle(ButtonStyle.Success),



new ButtonBuilder()

.setCustomId("fechar")

.setLabel("Fechar Ticket")

.setEmoji("❌")

.setStyle(ButtonStyle.Danger)


);







await canal.send({


content:

`${interaction.user} ${cargosStaff.map(id=>`<@&${id}>`).join(" ")}`,


embeds:[embed],


components:[botoes]


});






await interaction.reply({

content:`✅ Ticket criado: ${canal}`,

ephemeral:true

});



},



};
