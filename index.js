// ==========================
// BOTÕES DO TICKET
// ==========================

if(interaction.isButton()){



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





// ==========================
// ASSUMIR TICKET
// ==========================


if(interaction.customId === "assumir"){



if(!autorizado){

return interaction.reply({

content:"❌ Você não tem permissão para assumir tickets.",

ephemeral:true

});

}



const mensagem = await interaction.channel.messages.fetch({

limit:10

});



const msgBot = mensagem.find(

m => m.author.id === interaction.client.user.id && m.embeds.length

);



if(msgBot){


const embed = EmbedBuilder.from(

msgBot.embeds[0]

);



let descricao = embed.data.description;



descricao = descricao.replace(

"Ticket não assumido.",

`${interaction.user}`

);



descricao = descricao.replace(

"Aguardando atendimento.",

"🟢 Em atendimento."

);



embed.setDescription(descricao);



await msgBot.edit({

embeds:[embed]

});


}





await interaction.reply({

content:`🛠️ Ticket assumido por ${interaction.user}`

});


return;


}






// ==========================
// FECHAR TICKET
// ==========================


if(interaction.customId === "fechar"){



if(!autorizado){

return interaction.reply({

content:"❌ Você não tem permissão para fechar tickets.",

ephemeral:true

});

}



const confirmar = new ActionRowBuilder()

.addComponents(


new ButtonBuilder()

.setCustomId("confirmar_fechar")

.setLabel("Confirmar fechamento")

.setEmoji("✅")

.setStyle(ButtonStyle.Danger),



new ButtonBuilder()

.setCustomId("cancelar_fechar")

.setLabel("Cancelar")

.setEmoji("❌")

.setStyle(ButtonStyle.Secondary)


);



return interaction.reply({

content:"🔒 Tem certeza que deseja fechar este ticket?",

components:[confirmar],

ephemeral:true

});

}





// ==========================
// CONFIRMAR FECHAMENTO
// ==========================


if(interaction.customId === "confirmar_fechar"){



await interaction.update({

content:`🔒 Ticket fechado por ${interaction.user}. Apagando canal...`,

components:[]

});



setTimeout(()=>{


interaction.channel.delete().catch(()=>{});


},5000);


}






// ==========================
// CANCELAR FECHAMENTO
// ==========================


if(interaction.customId === "cancelar_fechar"){



return interaction.update({

content:"❌ Fechamento cancelado.",

components:[]

});


}



}
