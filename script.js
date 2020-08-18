const search = document.getElementById('search'),
submit = document.getElementById('submit'),
random = document.getElementById('random'),
mealsEl = document.getElementById('meals'),
resultHeading = document.getElementById('result-heading'),
single_mealEl = document.getElementById('single-meal');

function searchMeal(e) {
    e.preventDefault();

    single_mealEl.innerHTML = '' ;

    const term = search.value;

    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data=>
            {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
                if(data.meals === null){
                    resultHeading.innerHTML = `<h2> there is no reasult match `
                }else{
                    mealsEl.innerHTML = data.meals.map(meal=>`
                    <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMealThumb}"/>
                    <div class="meal-info" data-mealID=${meal.idMeal}>
                    <h3>${meal.strMeal}</h3>
                    </div>
                    </div>
                    `).join('');
                }
            })
    }

}
 function getMealByID(mealID){
     if(mealID){
         fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
         .then(res => res.json())
         .then(data=>{
            const meal = data.meals[0];
            addMealToDOM(meal);
         })
     }

 }
function addMealToDOM(meal){
   const ingradiant = [];

   for( let i=1 ; i<=20 ; i++){
    if(meal[`strIngredient${i}`]){
        ingradiant.push(`${meal[`strIngredient${i}`]} : ${meal[`strMeasure${i}`]}`)
    }else{
        break;
    }
       }
       single_mealEl.innerHTML = `
       <div class="singel-meal">
       <h2>${meal.strMeal}</h2>
       <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
       <div class="singel-meal-info">
       ${meal.strCategory ? `<p> ${meal.strCategory} </p>` : " " }
       ${meal.strArea ? `<p> ${meal.strArea} </p> `: " " }
       </div>
       <div class="main">
        <p> ${meal.strInstructions} </p>
        <h2>Ingradiant</h2>
        <ul>
        ${ingradiant.map( ing =>` <li> ${ing} </li> ` ).join('')}
        </ul>
       </div>
       </div>
       `

   }

   function getRandoMeal() {
       fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
       .then(res=>res.json())
       .then(data=>{
        const meal = data.meals[0];
            addMealToDOM(meal);
       })



   }


random.addEventListener('click',getRandoMeal)
submit.addEventListener('submit', searchMeal);
mealsEl.addEventListener('click',e=>{
    const mealInfo = e.path.find( item => {
        if(item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    })
    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealID');
        getMealByID(mealID);

    }else {
        return false;
    }
   
})

