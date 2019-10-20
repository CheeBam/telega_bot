import dotenv from "dotenv";
import Telegraf, { session } from "telegraf";
import Stage from "telegraf/stage";
import { Wizard } from "./controllers/WizardSceneController";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN || "");

// const stage = new Stage([greeterScene, echoScene], { ttl: 10 })
// bot.use(session())
// bot.use(stage.middleware())
// bot.command('greeter', enter('greeter'))
// bot.command('echo', enter('echo'))
// bot.on('message', (ctx) => ctx.reply('Try /echo or /greeter'))

const stage = new Stage([Wizard]);
const { enter } = Stage;

bot.use(session());
bot.use(stage.middleware());
bot.command("/start_test", enter("super-wizard"));
bot.launch();
