import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { Memory } from "@mastra/memory";
import { foundAudioTool } from "../tools/foundaudio-tool";

// Enhanced Memory Configuration
const memory = new Memory({
  storage: new LibSQLStore({
    url: "file:../../memory.db",
  }),
  vector: new LibSQLVector({
    connectionUrl: "file:../../memory.db",
  }),
  embedder: openai.embedding("text-embedding-3-small"),
  options: {
    // Keep last 20 messages in context
    lastMessages: 20,
    // Enable semantic search to find relevant past conversations
    semanticRecall: {
      topK: 3,
      messageRange: {
        before: 2,
        after: 1,
      },
      scope: "resource", // Search across all threads for this user
    },
    // Enable working memory to remember user information
    workingMemory: {
      enabled: true,
      scope: "resource", // Memory persists across all user threads
      template: `
        <user>
           <first_name></first_name>
           <username></username>
           <preferences></preferences>
           <conversation_style></conversation_style>
         </user>`,
    },
    threads: {
      generateTitle: {
        model: openai("gpt-4.1-nano"),
        instructions:
          "Generate a concise title for this conversation based on the first user message.",
      },
    },
  },
});

export const foundAudioAgent = new Agent({
  name: "foundAudioAgent",
  instructions: `You are a DJ that helps users pick an ideal set to listen to from the streaming service Found Audio.
  
  If a tool requires authorization, you will receive an authorization URL.
  When that happens, clearly present this URL to the user and ask them to visit it to grant permissions.`,
  model: openai("gpt-4o-mini"),
  tools: foundAudioTool,
  memory,
});
