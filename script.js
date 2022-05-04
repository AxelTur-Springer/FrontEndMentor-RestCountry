function data123(callback) {
  fetch('https://restcountries.com/v3.1/all')
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    });
}
function SortArray(x, y) {
  if (x.name.common < y.name.common) { return -1; }
  if (x.name.common > y.name.common) { return 1; }
  return 0;
}
// main creator of divs
function RetrieveCountryData(countryObj) {
  deleteChild();
  const sortedObj = countryObj.sort(SortArray);
  if(modRegionObj.length !== 0){
      for (num in modRegionObj) {
      createDivs(
        modRegionObj[num].flags.svg,
        modRegionObj[num].name.common,
        modRegionObj[num].population,
        modRegionObj[num].region,
        modRegionObj[num].capital
      );
    }
  }else{
    for (num in sortedObj) {
      createDivs(
        sortedObj[num].flags.svg,
        sortedObj[num].name.common,
        sortedObj[num].population,
        sortedObj[num].region,
        sortedObj[num].capital
      );
    }
  }
  addingevent()


}
function createDivs(image, name, populacion, region, capital) {
  // creating elements
  const containerDiv = document.createElement('div');
  const containerImg = document.createElement('div');
  const img = document.createElement('img');
  const containerTextStuff = document.createElement('div');
  const containerCountryName = document.createElement('div');
  const countryName = document.createElement('p');
  const listDetailsContainer = document.createElement('div');
  const span1 = document.createElement('span');
  const span2 = document.createElement('span');
  const span3 = document.createElement('span');
  const popu1 = document.createElement('p');
  const region2 = document.createElement('p');
  const capital3 = document.createElement('p');
  const listDetailsUl = document.createElement('ul');
  const listDetailsliPopulacion = document.createElement('li');
  const listDetailsliRegion = document.createElement('li');
  const listDetailsliCapital = document.createElement('li');

  // appending

  containerDiv.appendChild(containerImg);
  containerDiv.appendChild(containerTextStuff);
  containerImg.appendChild(img);
  containerCountryName.appendChild(countryName);
  containerTextStuff.appendChild(containerCountryName);
  listDetailsContainer.appendChild(listDetailsUl);
  listDetailsUl.appendChild(listDetailsliPopulacion);
  listDetailsliPopulacion.appendChild(span1);
  listDetailsliPopulacion.appendChild(popu1);
  listDetailsUl.appendChild(listDetailsliRegion);
  listDetailsliRegion.appendChild(span2);
  listDetailsliRegion.appendChild(region2);
  listDetailsUl.appendChild(listDetailsliCapital);
  listDetailsliCapital.appendChild(span3);
  listDetailsliCapital.appendChild(capital3);
  containerTextStuff.appendChild(listDetailsContainer);

  // adding class
  containerDiv.className = className;
  containerImg.className = 'imgContainer';
  containerTextStuff.className = 'textStuff';
  containerCountryName.className = 'name';
  listDetailsContainer.className = 'listDetail';

  // changing values
  img.src = image;
  countryName.innerText = name;
  span1.innerText = 'Population:';
  span2.innerText = 'Region:';
  span3.innerText = 'Capital:';
  listDetailsliPopulacion.children[1].innerText = populacion;
  listDetailsliRegion.children[1].innerText = region;
  listDetailsliCapital.children[1].innerText = capital;

  containerDiv.appendChild(containerTextStuff);
  const body = document.getElementById('countryGridTotal');
  body.appendChild(containerDiv);
}
data123(RetrieveCountryData);

// managing search

const inputValue = document.getElementById('inputCountry');
inputValue.addEventListener('input', (e) => {
  const modObj = [];
  let oriObj;
  //demostracion async
  async function testing() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const obj = await response.json();
    oriObj = obj;
    if (e.target.value.length > 1) {
      deleteChild();
      getCountry();
      addingevent()
    } else {
      data123(RetrieveCountryData);
    }
  }

  function getCountry() {
    if(modRegionObj.length === 0){
      for (num in oriObj) {
        if (oriObj[num].name.common.toLowerCase().includes(e.target.value.toLowerCase())) {
          modObj.push(oriObj[num]);
        }
      }
      for (num in modObj) {
        createDivs(
          modObj[num].flags.svg,
          modObj[num].name.common,
          modObj[num].population,
          modObj[num].region,
          modObj[num].capital
        );
      }
    }else{
      for (num in modRegionObj) {
        if (modRegionObj[num].name.common.toLowerCase().includes(e.target.value.toLowerCase())) {
         modObj.push(modRegionObj[num]);
     
        }
      }
      for (num in modObj) {
        createDivs(
          modObj[num].flags.svg,
          modObj[num].name.common,
          modObj[num].population,
          modObj[num].region,
          modObj[num].capital
        );
      }
    }
    } 
  testing();
});

// deleting divs creted
function deleteChild() {
  const e = document.getElementById('countryGridTotal');
  let child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
}

// managing region filter
const select = document.getElementById('Options');
const regionOb = [];
let modRegionObj = [];

select.addEventListener("change", (e) => {
  let  value  = select.options[select.selectedIndex];
  function order() {
    value = select.options[select.selectedIndex].value;
    if(value==="none"){
        //"do nothing"
   }
    else if (value === 'selector') {
      modRegionObj =[]
      data123(RetrieveCountryData);
    } else if(value !== "none") {
      data123(creatorRegion);
    }
  }
  function creatorRegion(data) {
    modRegionObj = [];
    for (num in data) {
      if (data[num].region === value) {
        modRegionObj.push(data[num]);
      }
    }
    divcreator();
  }

  function divcreator() {
    deleteChild();
    const sortedObjRegion = modRegionObj.sort(SortArray);
    for (num in sortedObjRegion) {
      createDivs(
        sortedObjRegion[num].flags.svg,
        sortedObjRegion[num].name.common,
        sortedObjRegion[num].population,
        sortedObjRegion[num].region,
        sortedObjRegion[num].capital
      );
    }
    addingevent()
  }
  order();
});

// managing darkMode :)
let className = "Countrys"

let DarkOrLight = document.getElementById("DarkOrLight")
DarkOrLight.addEventListener("click",(e)=>{
        const navbar = document.getElementsByClassName("nav")
        const body = document.getElementsByTagName("body")
        const darkModeBtn = document.getElementsByClassName("divDark")
        let divsWhite = document.querySelectorAll(".Countrys")
        let divsDark =document.querySelectorAll(".darkmode")
        const popUpDiv = document.getElementsByClassName("detailCountryInfo")
  
      if(className=== "Countrys"){
            className = "darkmode"
            body[0].style.backgroundColor =" rgb(22, 21, 29)"
            body[0].style.color ="white"
            navbar[0].style.backgroundColor ="rgb(52, 52, 52)"
            navbar[0].style.boxShadow ="none"
            darkModeBtn[0].children[0].style.backgroundColor = "white"
            darkModeBtn[0].children[0].style.color="black"
            darkModeBtn[0].children[0].children[1].innerText = "Light Mode"
            darkModeBtn[0].children[0].style.border =" solid white" 
            darkModeBtn[0].children[0].children[0].src = "/Assets/icons8-sol-16.png"
          //styling pop up 
          popUpDiv[0].style.backgroundColor="black"
          popUpDiv[0].style.color="white"
        for(let i = 0 ; i < divsWhite.length; i++){
            divsWhite[i].className = "darkmode"
        }
        addingevent()

    }else if(className==="darkmode"){
      className = "Countrys"
      body[0].style.backgroundColor =" rgb(22, 21, 29)"
      body[0].style.color ="white"
      navbar[0].style.backgroundColor ="white"
      navbar[0].style.boxShadow ="0px 0px 10px 10px rgb(221, 221, 221)"
      body[0].style.backgroundColor ="white"
      body[0].style.color ="black"
      darkModeBtn[0].children[0].children[1].innerText = "Dark Mode"
      darkModeBtn[0].children[0].style.border =" solid black" 
      darkModeBtn[0].children[0].style.backgroundColor = "white"
      darkModeBtn[0].children[0].style.color="black"
      darkModeBtn[0].children[0].children[0].src ="/Assets/icons8-símbolo-de-la-luna-16.png"
        for(let i = 0 ; i < divsDark.length; i++){
          divsDark[i].className = className
        }
        popUpDiv[0].style.backgroundColor="white"
        popUpDiv[0].style.color="black"
    }
})


// managing pop up 
let countrysToAddEvent = document.getElementById("countryGridTotal");
function addingevent(){
  for(let i = 0 ; i< countrysToAddEvent.children.length;i++){
  countrysToAddEvent.children[i].addEventListener("click",createInfoPop)  
  }
}

let hideShowDivCountry;
function createInfoPop(e){
  let targetCountry = e.target.children[1].children[0].innerText;
  //fixedNav[0].style.position="fixed"
  hideShowDivCountry = e.target

  let countryData;
   (async function bringingContryInfo(){
     const response = await fetch(`https://restcountries.com/v3.1/name/${targetCountry}?fullText=true`)
     const obj = await response.json();
     flagInPopDiv[0].children[0].src = ""
     createPopUp(obj)
    })();
  }


const flagInPopDiv = document.getElementsByClassName("flagSolo")
const popUpFull =  document.getElementsByClassName("detailCountryInfo")

function createPopUp(obj){
  console.log(obj[0])
  popUpFull[0].style.display ="flex"
  const nameDivinPopUp = document.getElementsByClassName("namePopUp")
  const list1 = document.getElementsByClassName("info1");
  const list2 = document.getElementsByClassName("info2");
  //assingning values
  let name = obj[0].name.common
  let nativeName;
  if(Object.keys(obj[0].name).includes("nativeName")){
    nativeName = obj[0].name.nativeName[Object.keys(obj[0].name.nativeName)[0]].common
  }
  else{
    nativeName = name;
  }
  let populacionInPopUp= obj[0].population
  let RegionInPopUp = obj[0].region
  let subRegion= obj[0].subregion
  let capitalInPopUp;
  if(Object.keys(obj[0]).includes("capital")){
    capitalInPopUp= obj[0].capital[0]
  }
  else{
    capitalInPopUp= " "
  }
  let domain= obj[0].tld[0]
  let languages;
  let totalLanguages ="";
  if(Object.keys(obj[0]).includes("languages")){
    languages = Object.values(obj[0].languages)
  }
  else{
    languages= " "
  }
  for(num in languages){
   totalLanguages += languages[num] + " "
  }
  let currencies;
  if(Object.keys(obj[0]).includes("currencies")){
    currencies= Object.values(Object.values(obj[0].currencies)[0])[0];
  }
  else{
    currencies= " "
  }
  (()=>{ // putting together
    flagInPopDiv[0].children[0].src = obj[0].flags.svg
    nameDivinPopUp[0].children[0].innerText = name;
    list1[0].children[0].children[0].innerText = `Native Name: ${nativeName}`
    list1[0].children[0].children[1].innerText = `Populacion: ${populacionInPopUp}`
    list1[0].children[0].children[2].innerText = `Region: ${RegionInPopUp}`
    list1[0].children[0].children[3].innerText = `Sub Region: ${subRegion}`
    list1[0].children[0].children[4].innerText = `Capital: ${capitalInPopUp}`
    list2[0].children[0].children[0].innerText= `Top Level Domain: ${domain}`
    list2[0].children[0].children[1].innerText= `Languages: ${totalLanguages}`
    list2[0].children[0].children[2].innerText= `Currencies: ${currencies}`
    hideShowDivCountry.style.display = "none"
  })()
}

function disappearPopUp(){
  hideShowDivCountry.style.display = "initial"
 popUpFull[0].style.display ="none"
}


