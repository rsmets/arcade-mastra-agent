import { Arcade } from "@arcadeai/arcadejs";
import {
  executeOrAuthorizeZodTool,
  toZodToolSet,
} from "@arcadeai/arcadejs/lib";

// Initialize Arcade
const arcade = new Arcade();

// Get Gmail tools
const gmailToolkit = await arcade.tools.list({ toolkit: "gmail", limit: 30 });
export const gmailTool = toZodToolSet({
  tools: gmailToolkit.items,
  client: arcade,
  userId: "me1001", // Your app's internal ID for the user (an email, UUID, etc). It's used internally to identify your user in Arcade
  executeFactory: executeOrAuthorizeZodTool, // Checks if tool is authorized and executes it, or returns authorization URL if needed
});
