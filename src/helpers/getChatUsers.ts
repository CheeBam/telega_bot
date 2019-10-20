import { CallbackButton, Markup } from "telegraf";

export default async function(ctx): Promise<CallbackButton[]> {
  try {
    const admins = await ctx.getChatAdministrators();
    admins.push(Markup.callbackButton("Next", "next"));
    console.log("admins", admins);
    return admins;
  } catch (e) {
    console.log("error in getChatAdministrators");
    return [
      Markup.callbackButton("Dimon", "select_1"),
      Markup.callbackButton("Ne Dimon", "select_2"),
      Markup.callbackButton("Next", "next")
    ];
  }
}
