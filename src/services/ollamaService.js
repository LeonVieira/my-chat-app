const OLLAMA_URL = 'http://localhost:11434/api/chat';

export async function testOllamaConnection() {
  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'qwen3-vl:8b',
      messages: [
        {
          role: 'user',
          content: 'Reply with exactly: Connection successful!',
        },
      ],
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama returned ${response.status}`);
  }

  const data = await response.json();

  console.log('Full Ollama response:', data);
  console.log('Qwen says:', data.message.content);

  return data;
}