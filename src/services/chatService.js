const API_URL = "http://localhost:3001/api";

export async function getMessages() {
  const response = await fetch(`${API_URL}/messages`);

  if (!response.ok) {
    throw new Error(`Server returned ${response.status}`);
  }

  const data = await response.json();

  return data;
}