document.addEventListener("DOMContentLoaded", function(){

const subjects=["yo","tú","él/ella","nosotros","vosotros","ellos"]

const tenses=[
"present",
"preterite",
"imperfect",
"future",
"conditional"
]

const verbsData = verbs

const tenseList = document.getElementById("tenseList");

if(tenseList){
tenses.forEach(t=>{
tenseList.innerHTML += `<label><input type="checkbox" class="tense" value="${t}" checked> ${t}</label><br>`
});
}

tenses.forEach(t=>{
tenseList.innerHTML+=`<label><input type="checkbox" class="tense" value="${t}" checked> ${t}</label><br>`
})

document.getElementById("allTenses").onchange=function(){
document.querySelectorAll(".tense").forEach(t=>t.checked=this.checked)
}

})
