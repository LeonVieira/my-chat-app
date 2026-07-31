const OLLAMA_URL = 'http://localhost:11434/api/chat';

export async function sendMessageToOllama(messages) {
  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'qwen3-vl:8b',
      messages: messages,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama returned ${response.status}`);
  }

  const data = await response.json();

  return data;
}