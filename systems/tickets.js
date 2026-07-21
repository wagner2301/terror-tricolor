const {
ChannelType,
PermissionFlagsBits,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle,
StringSelectMenuBuilder
} = require("discord.js");



const cargosStaff = [

"1493905534376742974",
"1493905535492427836",
"1528241558204317788",
"1493905538566590524",
"1493905541699997726",
"1493905547626287197"

];


// ID DO CANAL DE LOGS

const canalLogs = "1529030957578063962";





module.exports = {



async criarTicket(interaction, motivo){



const guild = interaction.guild;





// ==========================
// BLOQUEAR DUPLICADO
// ==========================


const ticketAberto = guild.channels.cache.find(

canal => canal.topic === `ticket-${interaction.user.id}`

);



if(ticketAberto){


return interaction.reply({

content:

`❌ Você já possui um ticket aberto!\n\n🎫 ${ticketAberto}`,

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
// EMBED TICKET
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









// ==========================
// RESET MENU
// ==========================


const menuNovo = new ActionRowBuilder()

.addComponents(

new StringSelectMenuBuilder()

.setCustomId("ticket_menu")

.setPlaceholder("Escolha uma opção.")

.addOptions([

{

label:"Recrutamento TUTT",

description:"Clique aqui para iniciar seu recrutamento",

value:"recrutamento",

emoji:{

id:"1209867647529783396"

}

}

])

);



await interaction.message.edit({

components:[menuNovo]

});







// ==========================
// LOG DE CRIAÇÃO
// ==========================


const logs = guild.channels.cache.get(canalLogs);



if(logs){


const logEmbed = new EmbedBuilder()

.setColor("#00FF00")

.setTitle("🎫 NOVO TICKET ABERTO")

.setDescription(

`
👤 **Usuário:**
${interaction.user}


📋 **Motivo:**
${motivo}


📌 **Canal:**
${canal}


🕒 **Data:**
<t:${Math.floor(Date.now()/1000)}:F>
`

);



logs.send({

embeds:[logEmbed]

});


}







await interaction.reply({

content:

`✅ Seu ticket foi criado com sucesso: ${canal}`,

ephemeral:true

});



}



};
