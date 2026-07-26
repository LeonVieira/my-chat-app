# LocalChat Progress

## Where I left off

The React app can successfully communicate with the local Ollama API.

Current setup:
- Basic LocalChat UI created
- User messages can be entered and displayed
- Ollama API is running locally
- Qwen3-VL 8B is installed
- React can send a prompt to Qwen and receive a response
- Ollama communication is separated into `ollamaService.js`

## Next small goal

Connect the existing Send button to Qwen.

When I type:

> What is 5 + 5?

The goal is:

1. Display my message in the chat
2. Send it to `sendMessageToOllama(message)`
3. Receive Qwen's response
4. Display Qwen's response underneath my message

Don't worry about streaming, screenshots, thinking, history or components yet.

## Eventually

- Separate UI into components
- User + assistant message styling
- Streaming responses
- Loading / generating indicator
- Display thinking when supported
- Screenshot/image uploads
- Model selector
- Sidebar
- Previous chats
- Pinned projects