const { REST, Routes } = require("discord.js");
require("dotenv").config();

const commands = [
  {
    name: "painel",
    description: "Abre o painel de tickets do Terror Tricolor"
  }
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {

    console.log("Registrando comandos...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: commands
      }
    );

    console.log("Comandos registrados!");

  } catch (error) {
    console.error(error);
  }
})();
