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


async criarTicket(interaction){


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
PermissionFlagsBits.SendMessages
]

},


...cargosStaff.map(id=>({

id:id,

allow:[
PermissionFlagsBits.ViewChannel,
PermissionFlagsBits.SendMessages
]

}))

]


});



const embed = new EmbedBuilder()

.setColor("#005CA9")

.setTitle("🔵🔴⚪ Terror Tricolor | Recrutamento")

.setDescription(`

Olá ${interaction.user} 👋


Seu ticket de recrutamento foi criado!


📌 **Motivo:**
Recrutamento TUTT


Aguarde um recrutador da equipe.


🔵 Terror Tricolor
🔴 Diretoria
⚪ Recrutamento

`);



const botoes = new ActionRowBuilder()

.addComponents(

new ButtonBuilder()

.setCustomId("assumir_ticket")

.setLabel("Assumir Ticket")

.setEmoji("🛠️")

.setStyle(ButtonStyle.Success),



new ButtonBuilder()

.setCustomId("fechar_ticket")

.setLabel("Fechar Ticket")

.setEmoji("❌")

.setStyle(ButtonStyle.Danger)


);



await canal.send({

content:
`${interaction.user} ${cargosStaff.map(x=>`<@&${x}>`).join(" ")}`,

embeds:[embed],

components:[botoes]

});



await interaction.reply({

content:`✅ Seu ticket foi criado: ${canal}`,

ephemeral:true

});


},



async fecharTicket(interaction){


const temCargo = interaction.member.roles.cache.some(
r=>cargosStaff.includes(r.id)
);



if(!temCargo){

return interaction.reply({

content:"❌ Você não tem permissão para fechar tickets.",

ephemeral:true

});

}



await interaction.reply({

content:"🔴 Ticket será fechado em 5 segundos..."

});


setTimeout(()=>{

interaction.channel.delete();

},5000);



}



};
