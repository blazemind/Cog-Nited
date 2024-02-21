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
    const title = match[1].trim().replace(/Recipe \d+: /, '');
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
}
