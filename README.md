# Arcade Mastra Agent - Technical Assessment

This repository demonstrates professional software development practices while leveraging the custom **Arcade AI toolkit** as [requested](ArcadeEngineeringInterviewProject.pdf). The Found Audio custom toolkit is defined in the [found-audio-toolkit](https://github.com/rsmets/arcade-foundaudio-toolkit) repo.

## 🎯 Purpose

This project serves as a technical assessment showcase, demonstrating:

- **Modern TypeScript Development**: Clean, type-safe code with proper project structure
- **AI Agent Architecture**: Implementation of intelligent agents using Mastra framework with tool calling, workflow and memory capabilities
- **Professional Workflows**: Industry-standard development practices (CI, linting) and tooling (GH actions, Trunk, pnpm)

## Goal

Leverage the custom Found Audio [toolkit](https://github.com/rsmets/arcade-foundaudio-toolkit) along with another Arcade [integration](https://docs.arcade.dev/toolkits) within a natural language interface that maintains memory. The aim was to have an agent that will suggest audio files to listen to based on the content of recently received emails.

### Achieved

Still having issues getting the Arcade toolkit to operate successfully as a Mastra tool. So the Found Audio agent can not interface with the Arcade toolkit. If it was functional then the agent could make Found Audio suggestions based on the weather. The aim of having the gmail inbox contents also steer the selection is a no-op with a separate [issue](https://github.com/rsmets/arcade-mastra-agent/issues/7).

## 🛠️ Tech Stack

- **Runtime**: Node.js (>=20.9.0)
- **Language**: TypeScript with ESM modules
- **AI Framework**: [Mastra](https://mastra.ai/) - Modern AI application framework
- **AI Toolkit**: [Arcade AI](https://arcade-ai.com/) - Professional AI tool integration
- **Package Manager**: pnpm
- **Development Tools**:
  - Trunk for linting and code quality
  - GitHub Actions for CI/CD

## 🏗️ Project Structure

```text
src/
├── mastra/
│   ├── agents/          # AI agents (Weather, FoundAudio)
│   ├── tools/           # Tool integrations (Arcade toolkit, Weather API)
│   ├── workflows/       # Complex multi-step workflows
│   └── index.ts         # Main Mastra configuration
```

## 🚀 Key Features

### Intelligent Agents

- **Weather Agent**: Provides weather information and forecasts
- **FoundAudio Agent**: Leverages Arcade's demo-worker toolkit for audio file operations
- **Gmail Agent**: Leverages Arcade's gmailtoolkit to allow the user to grant OAuth scopes for inbox management.

### Professional Tooling

- **Type Safety**: Full TypeScript implementation with proper type definitions
- **Code Quality**: Automated "metalinting" and formatting with Trunk (locally in CI)

## 🔧 Getting Started

### Prerequisites

- Node.js >= 20.9.0
- pnpm package manager

#### Why pnpm?

This project uses **pnpm** instead of npm as the package manager for several advantages:

- **Faster installations**: pnpm uses a content-addressable store, making installations significantly faster
- **Disk space efficiency**: Shared dependencies across projects save disk space through hard linking
- **Strict dependency resolution**: Prevents phantom dependencies and ensures reproducible builds
- **Better monorepo support**: Superior handling of workspaces and linked packages
- **Drop-in replacement**: Uses the same `package.json` format and most npm commands work identically

To install pnpm: `npm install -g pnpm`

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd arcade-mastra-agent

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev
```

## 🎪 Arcade Toolkit Integration

This project showcases professional integration with the Arcade AI toolkit:

- **Tool Discovery**: Dynamic tool listing from Arcade's demo-worker toolkit
- **Authorization Flow**: Proper handling of tool authorization requirements
- **Type Safety**: Converting Arcade tools to Zod-based type-safe interfaces
- **Error Handling**: Graceful handling of authorization and execution errors

### Example Usage

```typescript
const foundAudioToolkit = await arcade.tools.list({
  toolkit: "demo-worker",
  limit: 30,
});

export const foundAudioTool = toZodToolSet({
  tools: foundAudioToolkit.items,
  client: arcade,
  userId: "me1001",
  executeFactory: executeOrAuthorizeZodTool,
});
```

## 📋 Technical Assessment Highlights

This repository demonstrates:

1. **AI Integration**: Practical implementation of AI agents and workflows
2. **Tool Ecosystem**: Professional use of third-party AI toolkits (in progress...)
3. **Development Workflow**: Proper CI/CD, linting, and code quality practices
4. **Documentation**: Clear, comprehensive documentation and code comments
