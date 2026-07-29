# LocalChat Progress

> START HERE when returning to the project.

## Where I left off

LocalChat has a working basic chat experience using a locally hosted Qwen3-VL 8B model through Ollama.

Conversation context now works, so Qwen receives the current conversation history rather than only the newest user message.

A basic PostgreSQL backend/database proof-of-concept has also been completed.

---

## Working

### Chat

- Basic LocalChat UI
- Sidebar layout with placeholders for:
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

### Ollama / Qwen

- Ollama API communication is handled through `ollamaService.js`
- Qwen3-VL 8B is installed and working locally
- Qwen3-VL supports:
  - Text
  - Vision
  - Thinking
  - Tools

### Conversation context

Conversation context now works.

React stores messages approximately as:

    {
      role: "user",
      content: "Hello"
    }

and:

    {
      role: "assistant",
      content: "Hello!"
    }

When sending a new message, the existing conversation plus the new user
message is passed to `sendMessageToOllama()`.

Ollama therefore receives the conversation as:

    messages: [
      {
        role: "user",
        content: "My favourite number is 42."
      },
      {
        role: "assistant",
        content: "Got it."
      },
      {
        role: "user",
        content: "What is my favourite number?"
      }
    ]

This was tested successfully.

Qwen correctly remembered that the favourite number was 42 and could refer
to its own previous response.

Conversation history is currently IN MEMORY ONLY.

Refreshing the page loses the conversation.

---

## PostgreSQL experiment

PostgreSQL has been installed locally on Ubuntu.

DBeaver is being used to manage the database.

Database:

    localchat

Development database user:

    localchat_user

A basic table currently exists:

    messages

with approximately:

    id
    role
    content

A test row was inserted:

    user | Hello from PostgreSQL!

### Node database connection

The `pg` package has been installed.

Backend-related code has started under:

    server/
    ├── services/
    │   └── databaseService.js
    └── databaseTest.js

`databaseService.js` contains a basic `getMessages()` function that connects
to PostgreSQL and runs:

    SELECT * FROM messages

`databaseTest.js` calls the service and logs the returned messages.

This was tested successfully and Node returned the PostgreSQL row.

### Database credentials

Database configuration is stored in:

    .env

using variables such as:

    DB_HOST
    DB_PORT
    DB_NAME
    DB_USER
    DB_PASSWORD

`.env` is included in `.gitignore` and was verified using:

    git check-ignore .env

Do NOT move PostgreSQL access into `src/`.

`src/` is the React/browser application.

Database access belongs under `server/` because database credentials and
direct PostgreSQL access should not be exposed to the browser.

Eventually the architecture should become:

    React
      ↓
    Backend API
      ↓
    PostgreSQL

The database work is currently only a proof-of-concept.

React does NOT read or save conversations to PostgreSQL yet.

---

## Current limitations

- Conversations disappear when the page is refreshed
- PostgreSQL is not connected to the React UI
- No backend HTTP API exists yet
- New Chat button is still visual only
- Recent chats are placeholders
- Projects are placeholders
- Qwen responses render as plain text
- Images/screenshots cannot be attached yet
- Responses are not streamed
- Model selector is visual only

Do NOT attempt to solve all of these together.

---

## Next small goal — Image / screenshot experiment

Qwen3-VL supports vision.

Use the existing + button in `ChatInput` to prove that one image can be sent
to Qwen.

Initial goal:

1. Click the + button
2. Select one PNG/JPG screenshot
3. Send the image with a text prompt
4. Pass the image to Qwen3-VL through Ollama
5. Display Qwen's response

Example:

> What is happening in this screenshot?

For the first version, do NOT add:

- Drag-and-drop
- Multiple images
- Persistent images
- Galleries
- Fancy attachment management

A simple image preview is optional.

First prove:

    React
      ↓
    Image + prompt
      ↓
    Ollama
      ↓
    Qwen3-VL
      ↓
    Response

---

## Sensible milestones after vision

Potential small features after the image proof-of-concept:

- Markdown rendering for Qwen responses
- Extract `ChatMessage` component
- New Chat button resets the current in-memory conversation
- Better error display
- Better loading/generation status
- Streaming responses
- Stop generation button

### Persistence later

PostgreSQL can eventually be used for:

    Projects
       ↓
    Chats
       ↓
    Messages

A backend API should sit between React and PostgreSQL.

Do NOT connect React directly to PostgreSQL.

Possible future flow:

    User selects previous chat
            ↓
    React requests chat from backend
            ↓
    Backend loads messages from PostgreSQL
            ↓
    React displays messages
            ↓
    Messages can also be supplied to Ollama as conversation context

Long conversations will eventually require context-window management rather
than sending every stored message to the model forever.

This is a later problem.

---

## Later improvements

- Markdown rendering
- ChatMessage component
- Better loading/generation status
- Display model thinking when supported
- Streaming responses
- Stop generation button
- Image previews
- Drag-and-drop images
- Model selector populated from Ollama
- New chat functionality
- Saved chat history
- Chat titles
- Pinned chats/projects
- Project context
- Settings page
- Better error handling
- Backend API
- PostgreSQL chat persistence
- User/login support if eventually needed

---

## Working style

Keep changes SMALL.

Preferred workflow:

    implement one feature
        ↓
    test it
        ↓
    understand it
        ↓
    commit it
        ↓
    next feature

Do not redesign or rebuild working parts of the application unnecessarily.

The next session should build on the current code rather than replacing it
with a more sophisticated architecture.