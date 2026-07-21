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



// ==========================
// BLOQUEAR TICKET DUPLICADO
// ==========================


const ticketAberto = guild.channels.cache.find(

canal =>

canal.topic === `ticket-${interaction.user.id}`

);



if(ticketAberto){


return interaction.reply({

content:

`❌ Você já possui um ticket aberto!\n\n🎫 Seu ticket atual: ${ticketAberto}`,

ephemeral:true

});


}







// ==========================
// CRIAR CANAL
// ==========================


const canal = await guild.channels.create({


name:`🔴・recrutamento-${interaction.user.username}`,


topic:`ticket-${interaction.user.id}`,


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









// ==========================
// EMBED DO TICKET
// ==========================


const embed = new EmbedBuilder()


.setColor("#E30613")


.setTitle("🔴🔵⚪ Terror Tricolor | Recrutamento")



.setDescription(

`Olá ${interaction.user}, seja bem-vindo(a)!


Seu atendimento de recrutamento foi aberto.


👤 **Usuário:**
${interaction.user}


📋 **Motivo:**
${motivo}


🛠️ **Responsável:**
Nenhum recrutador assumiu.


🟡 **Status:**
Aguardando atendimento.


⏰ **Criado em:**
<t:${Math.floor(Date.now()/1000)}:F>


Aguarde um membro da equipe de recrutamento.`

)



.setFooter({

text:"Terror Tricolor • Sistema de Recrutamento"

});









// ==========================
// BOTÕES
// ==========================


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

content:

`✅ Seu ticket foi criado com sucesso: ${canal}`,

ephemeral:true

});



}



};
