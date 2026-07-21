const {
SlashCommandBuilder,
EmbedBuilder,
ActionRowBuilder,
StringSelectMenuBuilder
} = require("discord.js");


module.exports = {

data: new SlashCommandBuilder()

.setName("painel")

.setDescription("Painel de atendimento"),



async execute(interaction){


await interaction.deferReply({
ephemeral:true
});



const embed = new EmbedBuilder()

.setColor("#E30613")

.setTitle("🔴🔵⚪ Centro de Atendimento")

.setDescription(
`Olá! Bem-vindo(a) ao sistema de tickets.

Para abrir um ticket, clique no botão abaixo e informe o motivo do seu contato.

**Atendimento Via Ticket**

Após enviar o motivo, será criado um canal de texto privado para que possamos ajudá-lo de forma segura e ágil.

Estamos aqui para ajudar!`
)

.setImage(
"https://cdn.discordapp.com/attachments/1525367337023311963/1528978418555813918/LOGO_2026.png"
)

.setFooter({
text:"Terror Tricolor | Sistema de Tickets"
});




const menu = new ActionRowBuilder()

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
id:"1468410896807235831"
}

}

])

);





await interaction.channel.send({

embeds:[embed],

components:[menu]

});



await interaction.editReply({

content:"✅ Painel enviado com sucesso!"

});


}

};
