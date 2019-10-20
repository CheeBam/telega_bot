import { CallbackButton, Composer, Markup } from "telegraf";
import WizardScene from "telegraf/scenes/wizard";
import getChatUsers from "../helpers/getChatUsers";

const stepHandler = new Composer();
stepHandler.action("next", ctx => {
  ctx.reply("Step 2. Via inline button");
  return ctx.wizard.next();
});
stepHandler.command("next", ctx => {
  ctx.reply("Step 2. Via command");
  return ctx.wizard.next();
});
stepHandler.use(ctx =>
  ctx.replyWithMarkdown("Press `Next` button or type /next")
);

let chatUsers: CallbackButton[] = [];
const selectedUsers: string[] = [];

export const Wizard = new WizardScene(
  "super-wizard",
  async ctx => {
    ctx.reply("Enter sum");
    chatUsers = await getChatUsers(ctx);
    return ctx.wizard.next();
  },
  ctx => {
    ctx.reply(
      "Enter variant",
      Markup.inlineKeyboard([
        Markup.callbackButton("🔍 Get fixed from all", "1"),
        Markup.callbackButton("📞 Get fixed from some people", "2"),
        Markup.callbackButton("📢 Get from everyone", "3")
      ])
        .resize()
        .extra()
    );
    return ctx.wizard.next();
  },
  ctx => {
    const entered = ctx.update.callback_query.data;
    if (entered === "next") {
      return ctx.wizard.next();
    }
    selectedUsers.push(entered);
    ctx.reply(
      "Select people",
      Markup.inlineKeyboard(
        chatUsers.filter(el => !selectedUsers.includes(el.callback_data))
      )
        .resize()
        .extra()
    );
  },
  stepHandler,
  ctx => {
    ctx.reply("Done");
    return ctx.scene.leave();
  }
);
