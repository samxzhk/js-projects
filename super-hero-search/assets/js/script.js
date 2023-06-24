/* afknfaf */
const {log} = console;

class App 
{
    constructor()
    {
        this.fetchedData;
        this.activeTab = 0;
        this.tabs = document.querySelectorAll('button[data-id]');
        this.tabContainer = document.querySelector('.hero__info__tabs');
        this.tabBody = document.querySelectorAll(".tab__body");
        this.form = document.querySelector(".form");
        this.submitButton = document.querySelector(".search-btn");
        this.searchList = document.querySelector(".form__searchlist");
        this.heroImage = document.querySelector(".hero__image-img");
        this.url;
    }
    getCurrentTabBody()
    {
        this.tabs.forEach(tab => tab.classList.remove("active"));
        this.tabBody.forEach(tab => tab.classList.remove("active"));
        this.tabBody[this.activeTab].classList.add("active");
    }
    showSuperHeroOnSearchList(dataResult)
    {
        const searchList = document.querySelector(".form__searchlist");
        searchList.innerHTML = '';
        dataResult.forEach(function(value){
            const div = document.createElement("div");
            div.classList.add("searchlist__item");
            div.dataset.id = value.id;
            div.innerHTML = `
                <img src="${value.image.url}" alt=${value.name} class="searchlist__img">
                <p class="searchlist__name">
                    ${value.name}
                </p>`
            searchList.appendChild(div);
        })
    }
 
     async getSuperHero(searchText)
    { 
        this.url = `https://superheroapi.com/api.php/1322192262017339/search/${searchText}/`;
        try 
        {
            const response = await fetch(this.url);
            this.fetchedData = await response.json();
            if(this.fetchedData.response === "success")
            {
                this.showSuperHeroOnSearchList(this.fetchedData.results);

            }
            else if(this.fetchedData.response == "error")
            {
                this.searchList.innerHTML = "<p>No Character Found</p>";
            }
        }
        catch(error)
        {
            log("Something went wrong!");
            log(error);
        }
    }
    loadPowerStats(selectedHero)
    {
       this.tabBody[0].innerHTML = '';
       for(const [key, value] of Object.entries(selectedHero.powerstats))
       {
            const listItem = document.createElement('li');
            listItem.classList.add("tab__item");
            listItem.innerHTML += `
                <div>
                    <i class="ri-shield-line"></i>
                    <span>${key}</span>
                </div>
                <span>${value}</span>`
            this.tabBody[0].appendChild(listItem);
       }
    }
    loadBiography(selectedHero)
    {

        this.tabBody[1].innerHTML='';
        for(const [key, value] of Object.entries(selectedHero.biography))
        {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${key}:</span>
                <span>${value}</span>
            `;
            this.tabBody[1].appendChild(listItem);
        }
    }
    loadAppearance(selectedHero)
    {
      
       this.tabBody[2].innerHTML = '';
       for(const [key, value] of Object.entries(selectedHero.appearance))
       {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>
                    <i class="ri-star-line"></i>
                    ${key}
                </span>
                <span> ${value} </span>
            `
            this.tabBody[2].appendChild(li);
       }
    }
    loadConnections(selectedHero)
    {
       this.tabBody[3].innerHTML = '';
       for(const[key, value] of Object.entries(selectedHero.connections))
       {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${key}</span>
            <span>${value}</span>
        `
        this.tabBody[3].appendChild(li);
       }
    }
    showSuperHeroInfo(selectedId)
    {
        this.searchList.innerHTML = '';
        const selectedHero = (this.fetchedData.results.filter(item => item.id == selectedId))[0];
        document.querySelector(".section__title").textContent = selectedHero.name;
        this.heroImage.src = selectedHero.image.url;
        this.loadPowerStats(selectedHero);
        this.loadBiography(selectedHero);
        this.loadAppearance(selectedHero);
        this.loadConnections(selectedHero);
    }
}


/* ============= APP INSTANCIATION =============== */
const app = new App();

app.form.addEventListener('submit', function(e)
{
    e.preventDefault();
    const searchValue = e.target.search.value;
    app.getSuperHero(searchValue);
});

app.form.addEventListener('keyup', function(e)
{
    const inputValue = e.target.value;
    if(inputValue.length > 1)
    {
        app.getSuperHero(inputValue);
    }
    else 
    {
        app.searchList.innerHTML = "";
    }
})

app.searchList.addEventListener('click', function(e)
{
    let item = e.target;
    if(item.nodeName == "IMG" || item.nodeName == "P")
    {
        item = item.parentElement;
    }
    const itemId = item.dataset.id;
    if(itemId == undefined) return;
    app.showSuperHeroInfo(itemId);

    
})



/* ============= CHANGING TAB ===================== */
app.tabContainer.addEventListener('click', function(e)
{
    let target = e.target;
    if(target.nodeName != "I" && target.nodeName != "SPAN" && target.nodeName != "BUTTON") return;
    if(target.nodeName == "I" || target.nodeName == "SPAN")
    {
        target = target.parentElement;
        console.log(target);
    }
    
    const tabId = target.dataset.id;
    app.activeTab = tabId;
    app.getCurrentTabBody();
    target.classList.add("active");
})

