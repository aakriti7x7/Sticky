
let links=[]
let input = document.getElementById("in")
let ulli = document.getElementById("ul")
let save = document.getElementById("save")
let tab = document.getElementById("tab");

let linksfronlocalstorage = JSON.parse(localStorage.getItem("links"))

if(linksfronlocalstorage){
    links = linksfronlocalstorage
    printlist(links)
}


save.addEventListener("click", function()
{
    links.push(input.value)
    input.value = ""
    localStorage.setItem("links", JSON.stringify(links))
    printlist(links)
})

tab.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    links.push(tabs[0].url)
    localStorage.setItem("links", JSON.stringify(links))
    printlist(links)
    })
})

function printlist(anything){
    let listitems = ""  //string
    for(let i=0;i<anything.length; i++){
       listitems += "<li><a target = '_blank' href='" + anything[i] + "'>" + anything[i] + "</a></li>"
       //or template string
    }
    ulli.innerHTML = listitems
}
 //del when double clicked

 let doubleclickdel = document.getElementById("del")

 doubleclickdel.addEventListener("dblclick", function(){
    localStorage.clear()
    links = []
    printlist(links)
 })
 
//ENTER KEY FOR SAVING INPUT
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        save.click();
    }
});

//DELETE KEY TO DELETE ALL 
document.addEventListener('keydown', (event) => {
    var name = event.key;
    if(name === "Delete")
    {
        localStorage.clear();
        links = [];
        printlist();
    }

}, false);


//INSERT KEY TO INSERT THE TAB LINK
document.addEventListener('keydown', (event) => {
    var name = event.key;
    if(name === "Insert")
    {
        chrome.tabs.query({active: true, currentWindow: true},function(tabs){
    
            links.push(tabs[0].url);
    
            localStorage.setItem("links" , JSON.stringify(links));
        
            renderleads();
        })
    }

}, false);
