const API_BASE_URL =
  "http://localhost/Capstone/WebCook/WebCook/backend/recipes_db.php";

// Function to get recipes
export async function getRecipes() {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes_db.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return [];
  }
}

// Function to post a recipe
export async function postRecipe(recipe) {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes_db.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to post recipe:", error);
    return { error: "Failed to post recipe" };
  }
}
