// Save quiz results
export function saveResults(results) {
  localStorage.setItem("results", JSON.stringify(results));
}

// Get all quiz results
export function getResults() {
  return JSON.parse(localStorage.getItem("results")) || [];
}

// Save admin password
export function saveAdminPassword(password) {
  localStorage.setItem("adminPassword", password);
}

// Get admin password
export function getAdminPassword() {
  return localStorage.getItem("adminPassword");
}

// Save quiz questions
export function saveQuestions(questions) {
  localStorage.setItem("questions", JSON.stringify(questions));
}

// Get quiz questions
export function getQuestions() {
  return JSON.parse(localStorage.getItem("questions")) || [];
}

// Clear all app data
export function clearStorage() {
  localStorage.clear();
}

const CATEGORY_KEY = "mindsprint_categories";


export function getCategories(){

    return JSON.parse(
        localStorage.getItem(CATEGORY_KEY)
    ) || [];

}



export function saveCategories(categories){

    localStorage.setItem(
        CATEGORY_KEY,
        JSON.stringify(categories)
    );

}