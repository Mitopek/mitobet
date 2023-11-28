import {DiscordMessageType} from "./enum/DiscordMessageType";
import {IDiscordService} from "./types/IDiscordService";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {IDiscordMessageStrategy} from "./types/IDiscordMessageStrategy.js";
import axios from "axios";
import {
  ActionRowBuilder,
  ButtonBuilder, ButtonStyle,
  Client,
  GatewayIntentBits,
  GatewayIntentsString,
  MessageActionRowComponent,
  TextChannel
} from 'discord.js'
import {IDiscordMessagePayloadMap} from "./types/IDiscordMessagePayloadMap.js";
import {IMailService} from "../MailService/types/IMailService.js";

@injectable()
export class DiscordService implements IDiscordService {
  client: Client
  constructor(
    @inject(InterfaceTypes.services.MailService) private mailService: IMailService,
    @inject(InterfaceTypes.factories.DiscordMessageStrategyFactory) private discordMessageStrategyFactory: (type: DiscordMessageType) => IDiscordMessageStrategy,
  ) {
    this.client = new Client({ intents: [
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildModeration
      ]});
  }

  public async sendMessage(type: DiscordMessageType, payload: IDiscordMessagePayloadMap, isAlert = false): Promise<void> {
    const url = isAlert ? process.env.DISCORD_ALERT_WEBHOOK_URL : process.env.DISCORD_WEBHOOK_URL
    const strategy = this.discordMessageStrategyFactory(type)
    const message = await strategy.getContent()
    if(!message) {
      return
    }
    try {
      await axios.post(url, message)
    } catch (e) {
      console.error(e)
    }
  }

  public async createQuestionInteraction(mail: string, question: string): Promise<void> {
    await this.client.login(process.env.DISCORD_BOT_TOKEN);
    const channelId = process.env.DISCORD_MESSAGE_CHANNEL_ID;

    const channel = await this.client.channels.fetch(channelId) as TextChannel
    if (!channel) {
      console.error('Channel not found.');
      return;
    }
    const confirm = new ButtonBuilder()
      .setCustomId('reply')
      .setLabel('Odpowiedz')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(confirm);

    await channel.send({
      content: `**${mail} ** ${question}}`,
      components: [row],
    });
    let currentUserReply: string = '';
    this.client.on('interactionCreate', async (interaction) => {
      if (!interaction.isButton()) return;
      if (interaction.customId === 'reply') {
        await interaction.reply({
          content: 'Wpisz odpowiedź:',
          components: [],
        });

        const filter = (response: any) => response.author.id === interaction.user.id;
        const collector = channel.createMessageCollector({ filter, time: 60000 });
        collector.on('collect', async (response) => {
          currentUserReply = response.content;
          collector.stop();

          const confirmButton = new ButtonBuilder()
            .setCustomId('send')
            .setLabel('Wyślij')
            .setStyle(ButtonStyle.Primary);

          const cancelButton = new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('Anuluj')
            .setStyle(ButtonStyle.Danger);

          const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(confirmButton, cancelButton);

          await channel.send({
            content: `Odpowiedź: ${currentUserReply}`,
            components: [row],
          });
        });
      } else if (interaction.customId === 'send') {
        try {
          await this.mailService.sendMail(mail, 'Odpowiedź na pytanie' ,currentUserReply)
        } catch (e) {
          console.error(e)
          await interaction.reply({
            content: 'Błąd wysyłania wiadomości.',
            components: [],
          });
        }
        await interaction.reply({
          content: 'Wysłano odpowiedź.',
          components: [],
        });
      } else if (interaction.customId === 'cancel') {
        await interaction.reply({
          content: 'Anulowano.',
          components: [],
        });
      }
    });
  }
}