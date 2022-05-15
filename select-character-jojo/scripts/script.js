import obj from './jojo.js';



function displayChar(obj)
{
    const container = document.querySelector('.characters-container');
    container.innerHTML = '';
    for(let key in obj)
    {
        const div = document.createElement('div');
         div.innerHTML = `<div class="char" data-name=${obj[key].name}>
                <img src="${obj[key].img}" alt="${obj[key].name}">
            </div>`;
           
            container.appendChild(div);
           
    }
}
displayChar(obj)
const container = document.querySelector('.characters-container');

container.addEventListener('click', (e) =>
{
    const selectedCharContainer = document.querySelector('.selected-char-container');
    if(e.target.dataset.hasOwnProperty('name'))
    {
        selectedCharContainer.innerHTML = '';
        const selectedChar = e.target;
        let dataName = selectedChar.dataset.name.toLowerCase();
        console.log(dataName);
        const div = document.createElement('div');
        div.classList.add('card');
        console.log(selectedChar);
        div.innerHTML = 
        `
         <div class="card__img" id=char-0>
                   <div class="img"></div>
               </div>
               <div class="card__info">
                   <p class="name">${obj[dataName].name}</p>
                   <p>Type: ${obj[dataName].type}</p>
            
               </div>
        `;
        div.style.setProperty('--url', `url(${obj[dataName].img})`);
        selectedCharContainer.appendChild(div);
    
    }
})
