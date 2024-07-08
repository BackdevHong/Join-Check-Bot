const {
  Client,
  GatewayIntentBits,
  Events,
  Partials,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.on(Events.ClientReady, async (client) => {
  console.log("Client ready");
});

client.on(Events.GuildMemberAdd, async (member) => {
  const memberName = member.displayName;

  const guild = await client.guilds.fetch(process.env.GUILD_ID);

  guild.channels
    .create({
      name: `입국심사-${memberName}`,
      permissionOverwrites: [
        {
          id: guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: member.id,
          allow: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: "1259787447315988522",
          allow: [PermissionsBitField.Flags.ViewChannel],
        },
      ],
    })
    .then((v) => {
      const embed = new EmbedBuilder()
        .setTitle("입국심사 안내")
        .setDescription(
          `<@${member.id}>님! 음지분들의 모임방에 오신 것을 환영합니다.\n\n이 방에선 사칭인지 아닌지 확인하기 위해 본인인증 좀 받겠습니다 [유튜브, 트위터 등등]\n\n혹시 견학하러 오신 분이여도 본인인증 부탁드립니다 [유튜브, 트위터 등등]`
        );
      v.send({
        embeds: [embed],
      });
    });
});

client.login(process.env.TOKEN);
