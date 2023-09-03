// variables
let navbar=document.querySelector(".nav-bar");
let navbarWidth=$(".nav-bar").outerWidth(true);
let openIcon=document.querySelector(".nav-bar-close-open .open-close .fa-bars");
let closeIcon=document.querySelector(".nav-bar-close-open .open-close .fa-close");
let navLinks=document.querySelectorAll(".nav-links");
let navlists=document.querySelectorAll(".nav-list");
let mainRowElement=document.querySelector(".home-meals");
let mealsArr;
let pages=document.querySelectorAll(".nav-list-item");
let navLists=document.querySelectorAll(".nav-list a");
let allCategories=document.querySelector(".all-categories");
let allArea=document.querySelector(".all-area");
let allIngrediants=document.querySelector(".all-ingred");
let searchedMeals=document.querySelector(".searched-meals")
// inputs variables
let userName=document.getElementById("userName");
let userEmail=document.getElementById("userMail");
let userPhone=document.getElementById("userPhone");
let userAge=document.getElementById("age");
let userPass=document.getElementById("userPass");
let userRePass=document.getElementById("userRePass");
let inputsArr=[userName,userEmail,userPhone,userAge,userPass,userRePass];
let submitBtn=document.querySelector(".form-button");
let flag=0;
let flag1=0;
console.log(inputsArr)
console.log(navLists);
// https://www.themealdb.com/api/json/v1/1/search.php?s=

// self invoked fn to display home page


$(document).ready(()=>{
    $(".sk-circle").fadeOut(2500 , ()=>{
        $(".loading-page").fadeOut(2500 , ()=>{
            $("body").css("overflow","auto")
        })
    })

});

( function(){
    displayHomeMeals()
})();

Array.from(navLists).forEach((e)=>{
    e.addEventListener("click",(e)=>{
     if(navbar.style.left==="0px"){
        $(navbar).animate({left:-navbarWidth},1000);
        $(closeIcon).toggle();
        $(openIcon).toggle();
     } 
      switch (e.target.innerHTML) {
        case 'Search':
            // display whole page
            displaySelectedPage(e);
            // fetch and display searched meals
            document.getElementById("search-by-name").addEventListener("input",async (e)=>{
              let res=  await searchApi(e.target.value);
              document.querySelector(".searched-meals").innerHTML='';
              displaySearchedMealsInSearchPage(res); 

              Array.from(document.querySelectorAll(".searched-meal-cont")).forEach((e)=>{
                e.addEventListener("click",async (e)=>{
                    console.log(e.currentTarget.children[0].children[0].innerHTML)
                let res=await getHomeMeals(e.currentTarget.children[0].children[0].innerHTML); 
                console.log(res) 
                displaySelectedMealFromUserSearch(res[0]);
                    })
              })
            })
            
            document.getElementById("search-by-fName").addEventListener("input",async (e)=>{
                // restrict user from writting more than one letter
                if(e.target.value.length>1){
                    e.target.value=e.target.value.charAt(0); 
                }
             
                let res=  await searchApiOneLetter(e.target.value);
              document.querySelector(".searched-meals").innerHTML='';
              displaySearchedMealsInSearchPage(res); 
                // display each searched meal by one letter in details

                Array.from(document.querySelectorAll(".searched-meal-cont")).forEach((e)=>{
                    e.addEventListener("click",async (e)=>{
                        console.log(e.currentTarget.children[0].children[0].innerHTML)
                    let res=await getHomeMeals(e.currentTarget.children[0].children[0].innerHTML); 
                    console.log(res) 
                    displaySelectedMealFromUserSearch(res[0]);
                        })
                  })

            })

            
            break;
        case "Categories":
            // display category main page
            displaySelectedPage(e);
            // fetch api and display list of categories
            (async()=>{
                let res=await searchCatApi();
                displayCategories(res);
                // loop on all categories if category clicked fetch it and display its meals
                Array.from(document.querySelectorAll(".category-cont")).forEach((e)=>{
                    e.addEventListener("click",async (e)=>{
                    let res=await searchMealInEachCategory(e.currentTarget.children[0].children[0].innerHTML);
                    displayMealsInEachCategory(res); 
                // loop on all meals of same category if meal clicked fetch it and display its details   
                Array.from(document.querySelectorAll(".category-cont")).forEach((e)=>{
                    e.addEventListener("click",async (e)=>{
                    let res=await getHomeMeals(e.currentTarget.children[0].children[0].innerHTML);  
                    displaySelectedMealForSameCategory(res[0]);
                        })
                    })

                    })
            })
        }
            )();
         
            break;
        case "Area":
            displaySelectedPage(e);

            (async()=>{
                let res=await searchAreaApi();
                dispalyAllAreas(res);
                // loop on all areas if area clicked fetch it and display its meals
                Array.from(document.querySelectorAll(".area-cont")).forEach((e)=>{
                    e.addEventListener("click",async (e)=>{
                        // fetch api by name of country to get all meals in this area 
                    let res=await searchMealsInEachArea(e.currentTarget.children[1].innerHTML);
                    // display all meals in this area
                    displayMealsInEachArea(res);


                        console.log(document.querySelectorAll(".area-cont"))
                    Array.from(document.querySelectorAll(".area-cont")).forEach((e)=>{
                        e.addEventListener("click",async (e)=>{
                            console.log(e.currentTarget.children[0].children[0].innerHTML)
                        let res=await getHomeMeals(e.currentTarget.children[0].children[0].innerHTML); 
                        console.log(res) 
                        displaySelectedMealForSameArea(res[0]);
                            })
                        })


                                        })
                                    })
            })();

          
            break;
        case "Ingrediants":
            displaySelectedPage(e);
            (
                async ()=>{
                  let res=await searchIngrediantApi();
                  dispalyAllIngrediants(res);



                  Array.from(document.querySelectorAll(".ingrediant-cont")).forEach((e)=>{
                    e.addEventListener("click",async (e)=>{
                        // fetch api by name of country to get all meals in this area 
                    let res=await searchMealsInEachIngrediant(e.currentTarget.children[1].innerHTML);
                    // display all meals in this area
                    displayMealsInEachIngrediant(res);

                        console.log(document.querySelectorAll(".ingrediant-cont"))
                    Array.from(document.querySelectorAll(".ingrediant-cont")).forEach((e)=>{
                        e.addEventListener("click",async (e)=>{
                            console.log(e.currentTarget.children[0].children[0].innerHTML)
                        let res=await getHomeMeals(e.currentTarget.children[0].children[0].innerHTML); 
                        console.log(res) 
                        displaySelectedMealForSameIngrediant(res[0]);
                            })
                        })
                                        })
                                    })
                }
            )();
            break;
        case 'Contact Us':
            displaySelectedPage(e);
            distributeValidationFns();

            inputsArr.forEach((e)=>
            {
                e.addEventListener("blur",()=>
                {
                    inputsArr.forEach((e)=>{e.value===''? flag1=1:flag1=0; });

                    Array.from(document.querySelectorAll(".warning-msg")).forEach((e)=>{
                    if(!e.classList.contains("d-none"))
                    {flag=1}
                else
                {flag=0}
});
               flag1===0 &&   flag===0  ? submitBtn.removeAttribute("disabled"):submitBtn.setAttribute("disabled","true");
                })
            })
          
            break;
      
        default:
            break;
      }
    })
})

// start navbar- jquery
$(navbar).animate({left:-navbarWidth});
$(closeIcon).hide();
$(navlists).animate({top:"300px"})

$(openIcon).click((e)=>{
    $(navbar).animate({left:"0"},1000,()=>{
        $(navlists).animate({top:"0"},500)
    })
    $(e.target).hide();
    $(closeIcon).show();
})
$(closeIcon).click((e)=>{
    $(navbar).animate({left:-navbarWidth},1000,()=>{
        $(navlists).animate({top:"300px"},500)
    })
    $(e.target).hide();
    $(openIcon).show();
})
// end navbar- jquery


// getting api data for hom page
async function getHomeMeals(mealName=''){
    const apiLink=`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    let res= await fetch(apiLink);
    res=await res.json();
    res=res.meals;
   return res;
}
// display fn for home page meals
async function displayHomeMeals(){
     mealsArr=await getHomeMeals();
   
    console.log(mealsArr)
    for (let i=0 ; i<mealsArr.length;i++){
        mainRowElement.innerHTML+=` <div class=" col-12 col-lg-3">
        <div class="image-container rounded-3 overflow-hidden position-relative">
            <img class="w-100" src=${mealsArr[i].strMealThumb} alt="meal">
            <div class="overlay position-absolute w-100 h-100  d-flex align-items-center"><h2>${mealsArr[i].strMeal}</h2></div>
        </div>
     </div>`
    }
    let meal=document.querySelectorAll(".image-container")

    meal.forEach((e)=>{
        e.addEventListener("click",(e)=>{
        
            diplaySelectedMeal(e.currentTarget.children[1].children[0].innerHTML,e.currentTarget.children[0].getAttribute("src"));
        })
    })

}

// searchhhhh
function diplaySelectedMeal(targetName,src){
    console.log(targetName)
    let area;
    let instructions;
    let category;
    let tags;
    let source;
    let youtube;
    let ingrediantArr=[];
    let measurmentArr=[];
// loop on mealsArr with targetname to get info about this selected meal

for (const [index,eachMeal] of mealsArr.entries()) {
    if(targetName===eachMeal.strMeal){
        instructions=eachMeal.strInstructions;
        area= eachMeal.strArea;
        category=eachMeal.strCategory;
        tags=eachMeal.strTags;
        source=eachMeal.strSource;
        youtube=eachMeal.strYoutube;
        for (let i=0;i<20;i++){
            if(eachMeal[`strIngredient${i+1}`]===""){
                break;
            }

      ingrediantArr.push(eachMeal[`strIngredient${i+1}`]);
          
      measurmentArr.push(eachMeal[`strMeasure${i+1}`]);
   
        }
         
    }
}

    let mealDetails=document.querySelector(".meal-details");
    mealDetails.classList.remove("d-none");
    mainRowElement.classList.add("d-none");
    mealDetails.innerHTML=` 
    <div class="col-12 col-md-5 text-white">
    <div class="selectedImage">
    <img class="w-100" src=${src}>
    </div>
    <h3>${targetName}</h3>
    </div>
    <div class="col-12 col-md-7 text-white">
    <h3>Instructions</h3>
    <p>${instructions}</p>
    <h4>Area:${area}</h4>
    <h5>Category:${category}</h5>
    <h5>Recipes :</h5>
    <div class="recips p-2">
    <ul class="d-flex flex-wrap justify-content-around align-items-center list-unstyled">${ingrediantArr.map((e,index)=>{
        return `<li class="bg-info p-2 my-3 rounded-4 text-center">${measurmentArr[index]}${e}</li>`
    }).join("")}
    </ul>
    </div>
    <h5>tags:${tags ? tags : ""}</h5>
    <button class="btn btn-primary"><a class="text-decoration-none text-white" href=${source}>source</a></button>
    <button class="btn btn-danger"><a class="text-decoration-none text-white" href=${youtube}>youtube</a></button>
    </div>
    `

}

 function displaySelectedPage(e){
    pages.forEach((e)=>{e.classList.add("d-none");})
    document.getElementById(e.target.getAttribute("data-custom")).classList.remove("d-none");
}

async function searchApi(name){
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        res=await res.json();
    return res;
}

async function searchApiOneLetter(letter){
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    
        res=await res.json();
    return res;

        
}
function displaySearchedMealsInSearchPage(res){
    searchedMeals.innerHTML='';
res.meals.forEach((e)=>{
    searchedMeals.innerHTML+=
  `
  <div class="col-12 col-md-3">
        <div class="searched-meal-cont overflow-hidden position-relative rounded-3">
            <div class="overlay position-absolute d-flex align-items-center justify-content-center">
            <h3 class="text-black">${e.strMeal}</h3>
            </div>
            <img class="w-100" src=${e.strMealThumb}>
        </div>
    </div>
  
  `  
})

}

function displaySelectedMealFromUserSearch(res){


    let src=res.strMealThumb;
    let targetName=res.strMeal;
    let instructions=res.strInstructions;
    let area=res.strArea;
    let category=res.strCategory;
    let ingrediantArr=[];
    let measurmentArr=[];
    let tags=res.strTags;
    let source=res.strSource;
    let youtube=res.strYoutube;
    
    
    // adding all ingrediants in an array
    for (let i=0;i<20;i++){
        if(res[`strIngredient${i+1}`]===""){break;}
    ingrediantArr.push(res[`strIngredient${i+1}`]);
    }
    for (let i=0;i<20;i++){
        if(res[`strMeasure${i+1}`]===""){break;}
        measurmentArr.push(res[`strMeasure${i+1}`]);
    }
    
    
     searchedMeals.innerHTML=
    `
    <div class="col-12 col-md-5 text-white">
        <div class="selectedImage">
        <img class="w-100" src=${src}>
        </div>
        <h3>${targetName}</h3>
        </div>
        <div class="col-12 col-md-7 text-white">
        <h3>Instructions</h3>
        <p>${instructions}</p>
        <h4>Area:${area}</h4>
        <h5>Category:${category}</h5>
        <h5>Recipes :</h5>
        <div class="recips p-2">
        <ul class="d-flex flex-wrap justify-content-around align-items-center list-unstyled">${ingrediantArr.map((e,index)=>{
            return `<li class="bg-info p-2 my-3 rounded-4 text-center">${measurmentArr[index]}${e}</li>`
        }).join("")}
        </ul>
        </div>
        <h5 class="p-3 ">tags:${tags ? tags : ""}</h5>
        <button class="btn btn-primary"><a class="text-decoration-none text-white" href=${source}>source</a></button>
        <button class="btn btn-danger"><a class="text-decoration-none text-white" href=${youtube}>youtube</a></button>
        </div>
    
    `


}

// category
async function searchCatApi(){
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        res=await res.json();
    return res;
}
function displayCategories(res){
allCategories.innerHTML='';
res.categories.forEach((e)=>{
allCategories.innerHTML+=`
<div class="col-12 col-md-3">
<div class="category-cont position-relative overflow-hidden rounded-3">
<div class="overlay">
<h3 class="text-black mb-2">${e.strCategory}</h3>
<p class="text-black text-center">${e.strCategoryDescription}</p>
</div>
<img class="w-100 h-100" src=${e.strCategoryThumb}>
</div>
</div>
`
})
}

async function searchMealInEachCategory(catName){
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`);
        res=await res.json();
        return res;
}
function displayMealsInEachCategory(res){
    allCategories.innerHTML="";
    for(let i=0;i<res.meals.length;i++){

    if(i===20){
        break;
    }
        
allCategories.innerHTML+=`
<div class="col-12 col-md-3">
<div class="category-cont position-relative overflow-hidden rounded-3">
<div class="overlay">
<h3 class="text-black mb-2">${res.meals[i].strMeal}</h3>
</div>
<img class="w-100 h-100" src=${res.meals[i].strMealThumb}>
</div>
</div>
`
        }
    }
function displaySelectedMealForSameCategory(res){

let src=res.strMealThumb;
let targetName=res.strMeal;
let instructions=res.strInstructions;
let area=res.strArea;
let category=res.strCategory;
let ingrediantArr=[];
let measurmentArr=[];
let tags=res.strTags;
let source=res.strSource;
let youtube=res.strYoutube;


// adding all ingrediants in an array
for (let i=0;i<20;i++){
    if(res[`strIngredient${i+1}`]===""){break;}
ingrediantArr.push(res[`strIngredient${i+1}`]);
}
for (let i=0;i<20;i++){
    if(res[`strMeasure${i+1}`]===""){break;}
    measurmentArr.push(res[`strMeasure${i+1}`]);
}


    allCategories.innerHTML=
`
<div class="col-12 col-md-5 text-white">
    <div class="selectedImage">
    <img class="w-100" src=${src}>
    </div>
    <h3>${targetName}</h3>
    </div>
    <div class="col-12 col-md-7 text-white">
    <h3>Instructions</h3>
    <p>${instructions}</p>
    <h4>Area:${area}</h4>
    <h5>Category:${category}</h5>
    <h5>Recipes :</h5>
    <div class="recips p-2">
    <ul class="d-flex flex-wrap justify-content-around align-items-center list-unstyled">${ingrediantArr.map((e,index)=>{
        return `<li class="bg-info p-2 my-3 rounded-4 text-center">${measurmentArr[index]}${e}</li>`
    }).join("")}
    </ul>
    </div>
    <h5>tags:${tags ? tags : ""}</h5>
    <button class="btn btn-primary"><a class="text-decoration-none text-white" href=${source}>source</a></button>
    <button class="btn btn-danger"><a class="text-decoration-none text-white" href=${youtube}>youtube</a></button>
    </div>

`
}
// category
// start area
async function searchAreaApi(){
let res=await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
res=await res.json();
console.log(res.meals)
return res.meals;
}
function dispalyAllAreas(res){
    allArea.innerHTML='';
    res.forEach((e)=>{
        allArea.innerHTML+=`
<div class="col-12 col-md-3 flex-column">
<div class="area-cont">
<div class="area-image text-center">
<i class="fa-solid fa-house-laptop fa-2x"></i>
</div>
<h3 class="text-center">${e.strArea}</h3>
</div>
</div>
`
    })

}
async function searchMealsInEachArea(areaName){
let res=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
res=await res.json();
console.log(res)
return res;
}
function displayMealsInEachArea(res){
    allArea.innerHTML="";
    for(let i=0;i<res.meals.length;i++){

    if(i===20){
        break;
    }
        
allArea.innerHTML+=`
<div class="col-12 col-md-3">
<div class="area-cont position-relative overflow-hidden rounded-3">
<div class="overlay">
<h3 class="text-black mb-2">${res.meals[i].strMeal}</h3>
</div>
<img class="w-100 h-100" src=${res.meals[i].strMealThumb}>
</div>
</div>
`
        }
    }
function displaySelectedMealForSameArea(res){

    let src=res.strMealThumb;
    let targetName=res.strMeal;
    let instructions=res.strInstructions;
    let area=res.strArea;
    let category=res.strCategory;
    let ingrediantArr=[];
    let measurmentArr=[];
    let tags=res.strTags;
    let source=res.strSource;
    let youtube=res.strYoutube;
    
    
    // adding all ingrediants in an array
    for (let i=0;i<20;i++){
        if(res[`strIngredient${i+1}`]===""){break;}
    ingrediantArr.push(res[`strIngredient${i+1}`]);
    }
    for (let i=0;i<20;i++){
        if(res[`strMeasure${i+1}`]===""){break;}
        measurmentArr.push(res[`strMeasure${i+1}`]);
    }
    
        allArea.innerHTML=
    `
    <div class="col-12 col-md-5 text-white">
        <div class="selectedImage">
        <img class="w-100" src=${src}>
        </div>
        <h3>${targetName}</h3>
        </div>
        <div class="col-12 col-md-7 text-white">
        <h3>Instructions</h3>
        <p>${instructions}</p>
        <h4>Area:${area}</h4>
        <h5>Category:${category}</h5>
        <h5>Recipes :</h5>
        <div class="recips p-2 ">
        <ul class="d-flex flex-wrap justify-content-around align-items-center list-unstyled">${ingrediantArr.map((e,index)=>{
                 
            return `<li class="bg-info p-2 my-3 rounded-4 text-center">${measurmentArr[index]}${e}</li>`
        }).join("")}
        </ul>
        </div>
        <h5>tags:${tags ? tags : ""}</h5>
        <button class="btn btn-primary"><a class="text-decoration-none text-white" href=${source}>source</a></button>
        <button class="btn btn-danger"><a class="text-decoration-none text-white" href=${youtube}>youtube</a></button>
        </div>
    
    `
    }
// end area
// start ingrediants
async function searchIngrediantApi(){
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    res=await res.json();
    console.log(res.meals);
    return res.meals;
    }
    function dispalyAllIngrediants(res){
        allIngrediants.innerHTML='';
        for(let i=0;i<20;i++){
      
                allIngrediants.innerHTML+=`
        <div class="col-12 col-md-3 flex-column">
        <div class="ingrediant-cont">
        <div class="ingrediant-image text-center">
        <i class="fa-solid fa-drumstick-bite fa-2x"></i>
        </div>
        <h4 class="text-center">${res[i].strIngredient}</h4>
        <P style="overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;" class="text-center">${res[i].strDescription}</P>
        </div>
        </div>
        `
        }

       
        
    }
async function searchMealsInEachIngrediant(ingrediantName){
    let res=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediantName}`);
    res=await res.json();
    console.log(res)
    return res;
    }
    function displayMealsInEachIngrediant(res){
        allIngrediants.innerHTML="";
        for(let i=0;i<res.meals.length;i++){
    
        if(i===20){
            break;
        }
            
    allIngrediants.innerHTML+=`
    <div class="col-12 col-md-3">
    <div class="ingrediant-cont position-relative overflow-hidden rounded-3">
    <div class="overlay">
    <h3 class="text-black mb-2">${res.meals[i].strMeal}</h3>
    </div>
    <img class="w-100 h-100" src=${res.meals[i].strMealThumb}>
    </div>
    </div>
    `
            }
        }

    function displaySelectedMealForSameIngrediant(res){

            let src=res.strMealThumb;
            let targetName=res.strMeal;
            let instructions=res.strInstructions;
            let area=res.strArea;
            let category=res.strCategory;
            let ingrediantArr=[];
            let measurmentArr=[];
            let tags=res.strTags;
            let source=res.strSource;
            let youtube=res.strYoutube;
            
            
            // adding all ingrediants in an array
            for (let i=0;i<20;i++){
                if(res[`strIngredient${i+1}`]===""){break;}
            ingrediantArr.push(res[`strIngredient${i+1}`]);
            }
            
            for (let i=0;i<20;i++){
                if(res[`strMeasure${i+1}`]===""){break;}
                measurmentArr.push(res[`strMeasure${i+1}`]);
            }
                allIngrediants.innerHTML=
            `
            <div class="col-12 col-md-5 text-white p-5">
                <div class="selectedImage">
                <img class="w-100" src=${src}>
                </div>
                <h3>${targetName}</h3>
                </div>
                <div class="col-12 col-md-7 p-5 text-white">
                <h3>Instructions</h3>
                <p>${instructions}</p>
                <h4>Area:${area}</h4>
                <h5>Category:${category}</h5>
                <h5>Recipes :</h5>
                <div class="recips p-2">
                <ul class="d-flex flex-wrap justify-content-around align-items-center list-unstyled">${ingrediantArr.map((e,index)=>{
                 
                    return `<li class="bg-info p-2 my-3 rounded-4 text-center">${measurmentArr[index]}${e}</li>`
                }).join("")}
                </ul>
                </div>
                <h5>tags:${tags ? tags : ""}</h5>
                <button class="btn btn-primary"><a class="text-decoration-none text-white" href=${source}>source</a></button>
                <button class="btn btn-danger"><a class="text-decoration-none text-white" href=${youtube}>youtube</a></button>
                </div>
            
            `
            } 
// end ingrediants

// validation functions

function distributeValidationFns(){

    inputsArr.forEach((e)=>{
    e.addEventListener("input",(e)=>{
    console.log(e.target.getAttribute("id"))

        switch (e.target.getAttribute("id")) {
            case 'userName':
                userName.addEventListener("input",(e)=>{
                let errorMsgEle=e.target.nextElementSibling;
                errorMsgEle.classList.remove("d-none");
                console.log(userNameValidation())
                userNameValidation()===true ? errorMsgEle.classList.add("d-none") : '';
                })  
                break;
            case "userMail":
                userEmail.addEventListener("input",(e)=>{
                    let errorMsgEle=e.target.nextElementSibling;
                    errorMsgEle.classList.remove("d-none");
                    console.log(userEmailValidation())
                    userEmailValidation()===true ? errorMsgEle.classList.add("d-none") : '';
                    })  
                break;
            case "userPhone":
                userPhone.addEventListener("input",(e)=>{
                    let errorMsgEle=e.target.nextElementSibling;
                    errorMsgEle.classList.remove("d-none");
                    console.log(userPhoneValidation())
                    userPhoneValidation()===true ? errorMsgEle.classList.add("d-none") : '';
                    })  
                break;
            case 'age':
                userAge.addEventListener("input",(e)=>{
                    let errorMsgEle=e.target.nextElementSibling;
                    errorMsgEle.classList.remove("d-none");
                    console.log(userAgeValidation())
                    userAgeValidation()===true ? errorMsgEle.classList.add("d-none") : '';
                    })  
                break;
            case 'userPass':
                userPass.addEventListener("input",(e)=>{
                    let errorMsgEle=e.target.nextElementSibling;
                    errorMsgEle.classList.remove("d-none");
                    console.log(userPassValidation())
                    userPassValidation()===true ? errorMsgEle.classList.add("d-none") : '';
                    })  
                break;
            case 'userRePass':
                userRePass.addEventListener("input",(e)=>{
                    let errorMsgEle=e.target.nextElementSibling;
                    errorMsgEle.classList.remove("d-none");
                    console.log(userRePassValidation())
                    userRePassValidation()===true ? errorMsgEle.classList.add("d-none") : '';
                    })  
                break;
        
            default:
                break;
        }
        })
    })
   
}

function userNameValidation(){
    let userNameRe=/^[a-zA-Z]+$/;
    return userNameRe.test(userName.value);
}
function userEmailValidation(){
    let userEmailRe=/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    
    return userEmailRe.test(userEmail.value);
}
function userPhoneValidation(){
    let userPhoneRe=/^\+?\d{9,12}$/;
    
    return userPhoneRe.test(userPhone.value);
}
function userAgeValidation(){
    let userAgeRe=/^(?!0)\d{1,3}$/;
    
    return userAgeRe.test(userAge.value);
}
function userPassValidation(){
    let userPassRe=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    
    return userPassRe.test(userPass.value);
}
function userRePassValidation(){
    return  userRePass.value===userPass.value;
}



