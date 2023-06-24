const {log} = console;

const form = document.querySelector(".form");
const resultGrid = document.querySelector(".result");
const btnClose = document.querySelector(".btn__close");
let doesBtnExist = false; // this will prevent from having more than one recipe information tab open

/*

   <article class="card">
         <div class="card__container">
            <div class="card__img">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtVs_pKiby_Dd5LyjO-fVW_r2OGXB1VJmbBQ&usqp=CAU" alt="" class="card__img-img">
            </div>
            <p class="card__name">Empadão</p>
           <a href="#" class="btn">Get Recipe</a>
         </div>
            
    </article>


*/
function createFoodCards(value)
{
    const article = document.createElement("article");
    article.classList.add("card");
    article.dataset.id = value.idMeal;
    article.innerHTML = `
        <div class="card__container">
            <div class="card__img">
                <img src="${value.strMealThumb}" alt="${value.strMeal}">
            </div>
            <p class="card__name">${value.strMeal}</p>
            <button class="btn btn_recipe">Get Recipe</button>
        </div>
    `;
    resultGrid.appendChild(article);
}

async function fetchAllFood(ingredientName)
{
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`;
    try{
        const response = await fetch(url);
        const result = await response.json();
        if(result.meals == undefined)
        {
            const p = document.createElement("p");
            p.classList.add("p_error");
            p.textContent = "Sorry! No Food Found!";
            resultGrid.appendChild(p);
            return;

        }
        result.meals.forEach((meal) => createFoodCards(meal));
    }
    catch(error)
    {
        log(error);
    }
}
async function getFoodRecipe(id, mealCard)
{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    try{
        const response = await fetch(url);
        const result = await response.json()
        const item = result.meals[0];
        const div = document.createElement("div");
        div.setAttribute('id', id);
        div.classList.add("card__meal", "active");
        div.innerHTML = `
            <button class="btn btn__close" id="close-btn"><i class="ri-close-line"></i></button>
            <p class="meal__name">${item.strMeal}</p>
             <span class="meal__category">${item.strCategory}</span>
            <div class="meal__instruction">
            <p class="instruction__title">Instructions:</p>
            <p>
                ${item.strInstructions}
            </p>
            </div>
            <img src="${item.strMealThumb}" alt="${item.strMeal}" class="meal__img">
            <a href="${item.strSource}" target="_blank" class="meal__video">Watch Video</a>
        `;

        log(mealCard);
        mealCard.appendChild(div);
        doesBtnExist = true;
        const btnClose = document.querySelector(".btn__close");
        btnClose.addEventListener("click", function() 
        {
            btnClose.parentElement.classList.remove("active");
            if(doesBtnExist)
            {   
                btnClose.parentElement.remove();
                doesBtnExist = false;
            }
        })
    }
    catch(error)
    {
        log(error);
    }
   
    
}


form.addEventListener("submit", e =>
{
    e.preventDefault();
    let searchValue = e.target.search.value;
    searchValue = searchValue.trim();
    resultGrid.innerHTML = '';
    fetchAllFood(searchValue);
})

resultGrid.addEventListener('click', (e) =>
{
    if(e.target.classList.contains("btn_recipe"))
    {   
        if(doesBtnExist)
        {
            const cardMeal = document.querySelector(".card__meal");
            cardMeal.remove();
        }
        const mealCard = e.target.parentElement.parentElement;
        const mealId = mealCard.dataset.id;
        getFoodRecipe(mealId, mealCard);
    
    }
})

