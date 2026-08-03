const OLLAMA_URL = "http://localhost:11434/api/chat";

async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      resolve(base64);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

export async function sendMessageToOllama(messages, image) {

  let ollamaMessages = [...messages];

  if (image) {

    const base64Image = await fileToBase64(image);

    ollamaMessages[ollamaMessages.length - 1] = {
      ...ollamaMessages[ollamaMessages.length - 1],
      images: [base64Image],
    };

  }

  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "qwen3-vl:8b",
      messages: ollamaMessages,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama returned ${response.status}`);
  }

  return await response.json();
}