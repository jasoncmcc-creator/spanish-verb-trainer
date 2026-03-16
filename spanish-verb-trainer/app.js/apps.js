const subjects=["yo","tú","él/ella","nosotros","vosotros","ellos"]

const tenses=[
"present",
"preterite",
"imperfect",
"future",
"conditional"
]

let current

const tenseList=document.getElementById("tenseList")

tenses.forEach(t=>{
tenseList.innerHTML+=`<label><input type="checkbox" class="tense" value="${t}" checked>${t}</label><br>`
})

document.getElementById("allTenses").onchange=function(){
document.querySelectorAll(".tense").forEach(t=>t.checked=this.checked)
}

function getTenses(){
return [...document.querySelectorAll(".tense:checked")].map(x=>x.value)
}

function random(arr){
return arr[Math.floor(Math.random()*arr.length)]
}

function startPractice(){
document.getElementById("practice").style.display="block"
nextQuestion()
}

function nextQuestion(){

const tense=random(getTenses())
const verb=random(Object.keys(verbs))
const subjectIndex=Math.floor(Math.random()*6)

const correct=verbs[verb][tense][subjectIndex]

current={verb,tense,subjectIndex,correct}

document.getElementById("question").innerHTML=
subjects[subjectIndex].toUpperCase()+" — "+verb+"<br><span class='small'>"+tense+"</span>"

const mode=document.querySelector("input[name=mode]:checked").value

const answers=document.getElementById("answers")
answers.innerHTML=""

document.getElementById("feedback").innerHTML=""

if(mode==="mc"){

let options=[correct]

while(options.length<3){

let v=random(Object.keys(verbs))
let opt=verbs[v][tense][subjectIndex]

if(!options.includes(opt)) options.push(opt)

}

options.sort(()=>Math.random()-0.5)

options.forEach(o=>{

let btn=document.createElement("button")
btn.className="answer"
btn.innerText=o

btn.onclick=()=>checkAnswer(o,btn)

answers.appendChild(btn)

})

document.getElementById("writeBox").style.display="none"
document.getElementById("submitBtn").style.display="none"

}else{

document.getElementById("writeBox").value=""
document.getElementById("writeBox").style.display="block"
document.getElementById("submitBtn").style.display="block"

document.getElementById("submitBtn").onclick=()=>{
checkAnswer(document.getElementById("writeBox").value)
}

}

}

function checkAnswer(answer,btn){

if(answer===current.correct){

document.getElementById("feedback").innerHTML="✅ Correct"

if(btn) btn.classList.add("correct")

}else{

document.getElementById("feedback").innerHTML="❌ "+current.correct

if(btn) btn.classList.add("wrong")

saveMistake()

}

}

function saveMistake(){

let m=JSON.parse(localStorage.getItem("mistakes")||"[]")

m.push(current)

localStorage.setItem("mistakes",JSON.stringify(m))

}

function practiceMistakes(){

let m=JSON.parse(localStorage.getItem("mistakes")||"[]")

if(m.length===0){
alert("No mistakes saved")
return
}

current=random(m)

document.getElementById("practice").style.display="block"

document.getElementById("question").innerHTML=
subjects[current.subjectIndex].toUpperCase()+" — "+current.verb+"<br>"+current.tense

}