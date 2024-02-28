import { recipe as recipeIcon } from "../assets";

export const postImage = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_OPENAI_API_URL}`,
    {
      method: "POST",
      body: image,
    }
  );
  const data = await response.json();
  return data.content;
};

export const splitMarkdownToDict = (markdown) => {
  const recipeRegex = /# (.*?)\n([\s\S]*?)(?=\n# |$)/g;
  let match;
  let idCounter = 1;
  const recipes = [];

  while ((match = recipeRegex.exec(markdown)) !== null) {
    const title = match[1].trim().replace(/Recipe \d+: /, "");
    const recipe = {
      key: idCounter,
      id: idCounter.toString(),
      icon: recipeIcon,
      title: title,
      content: match[2].trim(),
    };
    recipes.push(recipe);
    idCounter++;
  }
  return recipes;
};

export const base64ToArrayBuffer = (base64) => {
  const base64WithoutPrefix = base64.split(',')[1]; // Remove the prefix
  const binaryString = window.atob(base64WithoutPrefix); // Base64 decode
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer; // Return ArrayBuffer
}
