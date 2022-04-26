
  function data123(callback){
    fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data=>{
        callback(data)
     })
  }

  function RetrieveFlags(countryObj){
   for(num in countryObj){
    createDivs(countryObj[num].flags.svg,countryObj[num].name.common,countryObj[num].population,
        countryObj[num].region)

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
    span1.innerText ="Population: " + populacion
    span2.innerText ="Region: " + region
    span3.innerText = "Capital: " + capital


containerDiv.appendChild(containerTextStuff)


let body = document.getElementById("countryGridTotal")
body.appendChild(containerDiv)
  }

data123(RetrieveFlags)

   
