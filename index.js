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



await interaction.reply({

content:`🔒 Ticket fechado por ${interaction.user}. Apagando canal em 5 segundos...`

});



setTimeout(()=>{

interaction.channel.delete().catch(()=>{});

},5000);



return;

}


}
