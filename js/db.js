
const db = firebase.firestore();

// offline data
db.enablePersistence()
    .catch(error => {
        if (error.code === 'failed-precondition') {
            // probably multiple tabs open at once
            console.log('persistence failed');
        } else if (error.code === 'failed-precondition') {
            // lack of browser support
            console.log('persistence is not available');
        }
    });

// real time listener
let recipes = db.collection('recipes');
recipes.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change => {
        console.log(change.doc.data());
        if (change.type === 'added') {
            renderRecipe(change.doc.id, change.doc.data());
        } else if (change.type === 'removed') {
            removeRecipe(change.doc.id);
        }
    })
});

// Add recipe
const form = document.querySelector('form.add-recipe');
form.addEventListener('submit', event => {
    event.preventDefault();
    let recipe = {
        title: form.title.value,
        ingredients: form.ingredients.value,
    };
    console.log(recipe);

    recipes.add(recipe).catch(error => console.log(error));
    form.reset();
});

// Delete recipe
const recipeContainer2 = document.querySelector('.recipes');
recipeContainer2.addEventListener('click', event => {
    if (event.target.matches('.recipe-delete i')) {
        if (confirm('Dou you really want to delete this recipe ?')) {
            recipes.doc(event.target.getAttribute('data-id')).delete();
        }
    }
});
