import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";
import { gmailTools } from "../tools/gmail-tool";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { Memory } from "@mastra/memory";
import { foundAudioTools } from "../tools/foundaudio-tool";
import {
  createAnswerRelevancyScorer,
  createToxicityScorer,
} from "@mastra/evals/scorers/llm";

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
           <interests></interests>
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

export const inboxDJAgent = new Agent({
  name: "inboxDJAgent",
  instructions: `You are a Gmail assistant that helps users manage their inbox and recommends foundaudio files based on the content of the most recent email received. If the email reads happy then recommend House music, if the email reads sad then recommend something else.

  You return the 'url' of the audio file when making suggestions.

  If a tool requires authorization, you will receive an authorization URL.
  When that happens, clearly present this URL to the user and ask them to visit it to grant permissions.`,
  model: openai("gpt-4o-mini"),
  tools: { ...gmailTools, ...foundAudioTools },
  memory,
  scorers: {
    // ref: https://mastra.ai/en/docs/scorers/overview#live-evaluations
    relevancy: {
      scorer: createAnswerRelevancyScorer({ model: openai("gpt-4o-mini") }),
      sampling: { type: "ratio", rate: 1 },
    },
    safety: {
      scorer: createToxicityScorer({ model: openai("gpt-4o-mini") }),
      sampling: { type: "ratio", rate: 1 },
    },
  },
});
