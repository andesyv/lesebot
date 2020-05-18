import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
import { Message } from "discord.js";
import dateFormat from "dateformat";

import { Quote } from "../../types";
import { loadMergedQuotes } from "../../modules/quotes";

class QuoteCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "quote",
      aliases: ["dagenssitat"],
      group: "fun",
      memberName: "quote",
      description: "A random quote from our highly intelligent members",
    });
  }

  run = async (message: CommandoMessage): Promise<Message | Message[]> => {
    const quotes = await this.load();
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const date = dateFormat(new Date(quote.date), "fullDate");

    return await message.say(`${quote.quote} -- ${quote.author} (${date})`);
  };

  load = async (): Promise<Quote[]> => {
    return await loadMergedQuotes();
  };
}

export default QuoteCommand;