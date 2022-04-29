function data123(callback){
    fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data=>{
        callback(data)
     })
  }
  function SortArray(x, y){
    if (x.name.common < y.name.common) {return -1;}
    if (x.name.common > y.name.common) {return 1;}
    return 0;
}
  function RetrieveCountryData(countryObj){
    deleteChild()


let sortedObj = countryObj.sort(SortArray);

     for(num in sortedObj){
    createDivs(sortedObj[num].flags.svg,sortedObj[num].name.common,sortedObj[num].population,
        sortedObj[num].region)

    }
  }
 function createDivs(image,name,populacion,region,capital){
    //creating elements
    const containerDiv = document.createElement("div");
    const containerImg = document.createElement("div");
    const img = document.createElement("img"); 
    const containerTextStuff = document.createElement("div")
    const containerCountryName = document.createElement("div")
    const countryName = document.createElement("p");
    const listDetailsContainer = document.createElement("div")
    const span1= document.createElement("span")
    const span2= document.createElement("span")
    const span3= document.createElement("span")
    const popu1= document.createElement("p")
    const region2= document.createElement("p")
    const capital3= document.createElement("p")
    const listDetailsUl = document.createElement("ul")
    const listDetailsliPopulacion= document.createElement("li")
    const listDetailsliRegion= document.createElement("li")
    const listDetailsliCapital= document.createElement("li")

    


    //appending 
    
    containerDiv.appendChild(containerImg)
    containerDiv.appendChild(containerTextStuff)
    containerImg.appendChild(img);
    containerCountryName.appendChild(countryName);
    containerTextStuff.appendChild(containerCountryName)
    listDetailsContainer.appendChild(listDetailsUl)
        listDetailsUl.appendChild(listDetailsliPopulacion)
            listDetailsliPopulacion.appendChild(span1)
                listDetailsliPopulacion.appendChild(popu1)
        listDetailsUl.appendChild(listDetailsliRegion)    
            listDetailsliRegion.appendChild(span2)
                listDetailsliRegion.appendChild(region2)
        listDetailsUl.appendChild(listDetailsliCapital)
            listDetailsliCapital.appendChild(span3)
                listDetailsliCapital.appendChild(capital3)
    containerTextStuff.appendChild(listDetailsContainer)
    
    //adding class
    containerDiv.className = "Countrys";
    containerImg.className ="imgContainer";
    containerTextStuff.className ="textStuff"
    containerCountryName.className = "name" 
    listDetailsContainer.className ="listDetail" 
        
    
    //changing values
    img.src = image; 
    countryName.innerText = name
    span1.innerText ="Population:"
    span2.innerText ="Region:" 
    span3.innerText = "Capital:" 
    listDetailsliPopulacion.children[1].innerText = populacion;
    listDetailsliRegion.children[1].innerText = region;
    listDetailsliCapital.children[1].innerText = capital


containerDiv.appendChild(containerTextStuff)

let body = document.getElementById("countryGridTotal")
body.appendChild(containerDiv)
  }
data123(RetrieveCountryData)

const inputValue = document.getElementById("inputCountry")
inputValue.addEventListener("input",function(e){
    let modObj=[];
    let oriObj;
    async function testing() {
        const response = await fetch("https://restcountries.com/v3.1/all")
        const obj = await response.json();
        oriObj = obj
        console.log(oriObj)
        if(e.target.value.length > 1){
            deleteChild()
            getCountry()
        }else{
            data123(RetrieveCountryData)

        }
    }

    function getCountry(){ //function que hace todo
        for(num in oriObj){
            if(oriObj[num].name.common.toLowerCase().includes(e.target.value)){
                modObj.push(oriObj[num])
            }
        }
        for(num in modObj){
            createDivs(modObj[num].flags.svg,modObj[num].name.common,modObj[num].population,
            modObj[num].region)
            }
    }
testing()
})

function deleteChild() {
    let e  = document.getElementById("countryGridTotal")
    //e.firstElementChild can be used.
   let child = e.lastElementChild; 
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}

const select = document.getElementById('Options');
    let regionOb =[];
    let modRegionObj =[];

select.addEventListener("click",(e)=>{
    let value = select.options[select.selectedIndex].value;
    
        function order(){
            value = select.options[select.selectedIndex].value
            if(value !== "selector"){
                data123(creatorRegion)

            }else{
                data123(RetrieveCountryData)

             }

        }
 
 
 function creatorRegion(data){
    modRegionObj =[];
        for(num in data){
            if(data[num].region === value){
                modRegionObj.push(data[num])
             }
        }
    console.log(modRegionObj)
    divcreator()
    value = select.options[select.selectedIndex].value = "selector"

 }


function divcreator(){
    deleteChild()
    let sortedObjRegion = modRegionObj.sort(SortArray);

    for(num in sortedObjRegion){
        createDivs(sortedObjRegion[num].flags.svg,sortedObjRegion[num].name.common,sortedObjRegion[num].population,
            sortedObjRegion[num].region)
        }
}
    order()
    
}
)