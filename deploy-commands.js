const { REST, Routes } = require("discord.js");
const fs = require("fs");
require("dotenv").config();



const commands = [];


// ==========================
// PEGAR TODOS OS COMANDOS
// ==========================

const commandFiles = fs.readdirSync("./commands")
.filter(file => file.endsWith(".js"));



for(const file of commandFiles){


const command = require(`./commands/${file}`);


commands.push(command.data.toJSON());


console.log(`✅ Comando encontrado: ${command.data.name}`);


}





// ==========================
// REGISTRAR NO DISCORD
// ==========================


const rest = new REST({version:"10"})

.setToken(process.env.TOKEN);




(async()=>{


try{


console.log("🔄 Atualizando comandos do Discord...");



await rest.put(


Routes.applicationGuildCommands(

process.env.CLIENT_ID,

process.env.GUILD_ID

),


{

body: commands

}


);



console.log("✅ Comandos registrados com sucesso!");



}catch(error){


console.error("❌ Erro ao registrar comandos:");

console.error(error);


}



})();
