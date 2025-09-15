import { Arcade } from "@arcadeai/arcadejs";
import {
  executeOrAuthorizeZodTool,
  toZodToolSet,
} from "@arcadeai/arcadejs/lib";

// Initialize Arcade
const arcade = new Arcade();

// Get Found Audio Files tool
const foundAudioToolkit = await arcade.tools.list({
  toolkit: "foundaudio",
  limit: 30,
});

export const foundAudioTools = toZodToolSet({
  tools: foundAudioToolkit.items,
  client: arcade,
  userId: "rayjsmets@gmail.com", // Your app's internal ID for the user (an email, UUID, etc). It's used internally to identify your user in Arcade
  executeFactory: executeOrAuthorizeZodTool, // Checks if tool is authorized and executes it, or returns authorization URL if needed
});
