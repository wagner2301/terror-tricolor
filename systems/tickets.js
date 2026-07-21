const {
ChannelType,
PermissionFlagsBits,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle,
StringSelectMenuBuilder
} = require("discord.js");


// CARGOS QUE PODEM ATENDER
const cargosStaff = [
"1493905534376742974",
"1493905535492427836",
"1528241558204317788",
"1493905538566590524",
"1493905541699997726",
"1493905547626287197"
];



module.exports = {


// PAINEL INICIAL

async painel(interaction){


const embed = new EmbedBuilder()

.setColor("#009900")

.setTitle("🎟️ Centro de Atendimento")

.setDescription(`

• Olá! Bem-vindo(a) ao sistema de tickets.

Para abrir um ticket, escolha abaixo o motivo do seu contato.

Estamos aqui para ajudar!


━━━━━━━━━━━━━━


**Atendimento Via Ticket**

• Após enviar o motivo, será criado um canal privado para que nossa equipe possa ajudar você de forma segura e ágil.

`)



.setImage("COLOQUE_O_LINK_DA_IMAGEM");



const menu = new ActionRowBuilder()

.addComponents(

new StringSelectMenuBuilder()

.setCustomId("abrir_ticket")

.setPlaceholder("Escolha uma opção.")

.addOptions([

{

label:"RECRUTAMENTO",

description:"Abra um ticket para ser recrutado",

value:"recrutamento",

emoji:"🟢"

}

])

);



await interaction.channel.send({

embeds:[embed],

components:[menu]

});


await interaction.reply({

content:"✅ Painel criado.",

ephemeral:true

});


},



// CRIAR TICKET


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


.setColor("#009900")


.setTitle("🟢 Terror Tricolor | Atendimento")


.setDescription(`


Olá ${interaction.user}


Seu atendimento foi criado.


**Usuário:**

${interaction.user}


**Horário:**

<t:${Math.floor(Date.now()/1000)}:f>


**Motivo:**

${motivo}


**Staff que assumiu:**

Ticket não assumido.



Aguarde um membro da equipe vir atender.


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


}

};
