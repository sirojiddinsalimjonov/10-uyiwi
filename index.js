const JSON = 'https://restcountries.com/v3.1/'
const flagList = document.querySelector(".hero-section__list")
const template = document.querySelector(".template").content
const elFormSearch = document.querySelector(".hero-section__filter-input")
const elFormBtn = document.querySelector(".hero-section__btn")
const elFormFilter = document.querySelector(".hero-section__select")
const elBtn = document.querySelector(".header-section__btn")


function mekeRequest(url, successFn, erorFn){
    flagList.innerHTML = '<p style="font-size: 123px; font-weight: bold; color: red; text-align: center; ">Loading...</p>'
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if(data.length > 0) successFn(data)
        else erorFn()
    })
}


function renderCountries (countries){
    
    flagList.innerHTML =  ""
    
    const frgament = document.createDocumentFragment()
    for (const json of countries) {
        const newElement = template.cloneNode(true)
        newElement.querySelector(".hero-section__item-img").src = json.flags.svg
        newElement.querySelector(".hero-section__item-title").textContent = json.name.common + ' ' + json .fifa
        newElement.querySelector("#population").textContent = 'Population: '+ json.population
        newElement.querySelector("#region").textContent = 'Region: ' + json.region
        newElement.querySelector("#capital").textContent = 'capital: ' + json.capital
        newElement.querySelector("#borders").textContent = json.borders
        frgament.append(newElement)
    }
    flagList.append(frgament)
}

function empty (){
    flagList.innerHTML = ""
}

function getAllCountries(){
    mekeRequest(JSON + '/all',renderCountries, empty)
}
getAllCountries()

if(elFormSearch){
    elFormSearch.addEventListener('input', () =>{
        if(elFormSearch.value.trim()){
            mekeRequest(JSON + '/name/' + elFormSearch.value, renderCountries, empty)
        } else{
            mekeRequest(JSON + '/all/', renderCountries, empty)
        }
    })
}


elFormBtn.addEventListener("click", (e) => {
    e.preventDefault()
    mekeRequest(JSON + '/region/' + elFormFilter.value, renderCountries, empty)
    if(elFormFilter.value === 'All'){
        getAllCountries()
    }
})

elBtn.addEventListener('click', () => {
    document.querySelector('.body').classList.toggle("white-mode")
    if(elBtn.textContent ==='Dark mode'){
        elBtn.textContent = 'Light Mode'
    } else{
        elBtn.textContent = 'Dark mode'
    }
})
