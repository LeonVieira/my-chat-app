# LocalChat Progress

> START HERE when returning to the project.

## Where I left off

LocalChat now has a working basic chat experience using a locally hosted Qwen3-VL 8B model through Ollama.

### Working

- Basic LocalChat UI
- Sidebar layout with placeholder:
  - New chat
  - Projects
  - Recent chats
  - Settings
- Chat input extracted into its own component
- User can send messages using the Send button
- Pressing Enter also sends the message
- User messages appear on the right
- Qwen responses appear on the left
- Loading / "thinking" indicator while waiting for Qwen
- Chat area scrolls independently for long conversations
- Header, sidebar and input remain in place while scrolling
- Ollama API communication is handled through `ollamaService.js`
- Qwen3-VL 8B is installed and working locally
- Qwen3-VL supports:
  - Text
  - Vision
  - Thinking
  - Tools

## Current limitation

Qwen currently receives only the newest user message.

For example:

User:
> Explain React state.

Qwen:
> ...

User:
> Explain that in fewer sentences.

Qwen does not know what "that" refers to because the previous conversation is not being sent back to Ollama.

The React `messages` array already contains the conversation, but `sendMessageToOllama()` currently sends only the newest message.

## Next small goal — Conversation context

Send the existing conversation history to Ollama with each request.

Instead of sending:

    messages: [
      {
        role: "user",
        content: message
      }
    ]

send the conversation as:

    messages: [
      {
        role: "user",
        content: "Explain React state."
      },
      {
        role: "assistant",
        content: "React state is..."
      },
      {
        role: "user",
        content: "Explain that in fewer sentences."
      }
    ]

### Test

Ask Qwen:

> My favourite number is 42.

Then:

> What is my favourite number?

Qwen should answer:

> 42

This history only needs to exist in React memory for now.

Do NOT implement saved chats or persistence yet.

## After that — Image / screenshot experiment

Qwen3-VL supports vision.

Add a basic image attachment to `ChatInput`.

Initial goal:

1. Click the + button
2. Select a PNG/JPG screenshot
3. Send the image with a text prompt
4. Pass the image to Qwen3-VL through Ollama
5. Display Qwen's response

Example:

> What is happening in this screenshot?

For the first version, image preview, drag-and-drop and saved attachments are NOT required.

Just prove:

    React → Image → Ollama → Qwen3-VL → Response

## Later improvements

- Markdown rendering for Qwen responses
- Extract `ChatMessage` component
- Better loading/generation status
- Display model thinking when supported
- Streaming responses
- Stop generation button
- Image previews
- Drag-and-drop images
- Model selector populated from Ollama
- New chat functionality
- Previous chat persistence
- Chat titles
- Pinned chats/projects
- Project context
- Settings page
- Error handling