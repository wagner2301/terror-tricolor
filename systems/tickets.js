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

name:`ticket-${interaction.user.username}`,

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

.setColor("#E30613")

.setTitle("🔴🔵⚪ Terror Tricolor | Atendimento")

.setDescription(`

Olá ${interaction.user}

Seu atendimento foi criado.

**Motivo:**
${motivo}


Aguarde um membro da equipe.

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
`${interaction.user} ${cargosStaff.map(x=>`<@&${x}>`).join(" ")}`,

embeds:[embed],

components:[botoes]

});


await interaction.reply({

content:`✅ Ticket criado: ${canal}`,

ephemeral:true

});


}

};
