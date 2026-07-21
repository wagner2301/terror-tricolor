const {
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle,
StringSelectMenuBuilder
} = require("discord.js");


const embed = new EmbedBuilder()

.setColor("#E30613") // vermelho Terror Tricolor

.setTitle("🔴🔵⚪ TERROR TRICOLOR")

.setDescription(`

Bem-vindo ao sistema oficial de atendimento do **Terror Tricolor**.

Selecione abaixo o motivo do seu contato:

🔴 **Recrutamento TUTT**
> Abra um ticket para ser recrutado.

🔵 **Suporte**
> Problemas ou dúvidas.

⚪ **Denúncias**
> Envie uma denúncia.

❓ **Dúvidas**
> Tire suas dúvidas.

**Terror Tricolor | Sistema de Tickets**

`)

.setImage("https://cdn.discordapp.com/attachments/1493905634360295504/1524518701116952677/ChatGPT_Image_8_07_2026_17_52_15.png?ex=6a5fdc2e&is=6a5e8aae&hm=fb8fdca70aeb0edf9bbd2dc04218a9b2f18d57028261c2216d5f04cffa5aad0b&");


// MENU IGUAL O PRINT

const menu = new ActionRowBuilder()
.addComponents(

new StringSelectMenuBuilder()

.setCustomId("ticket_menu")

.setPlaceholder("Escolha uma opção.")

.addOptions([

{
label:"Recrutamento TUTT",
description:"Abra para ser recrutado",
value:"recrutamento",
emoji:"🔴"
},

{
label:"Suporte",
description:"Ajuda com problemas",
value:"suporte",
emoji:"🔵"
},

{
label:"Denúncias",
description:"Faça uma denúncia",
value:"denuncia",
emoji:"⚪"
},

{
label:"Dúvidas",
description:"Tire suas dúvidas",
value:"duvidas",
emoji:"❓"
}

])

);


await channel.send({

embeds:[embed],

components:[menu]

});
