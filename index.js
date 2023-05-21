const app = document.getElementById('app')
app.classList.add('app')

const history = document.createElement('div')
history.classList.add('history')
app.appendChild(history)

const calculadora = document.createElement('div')
calculadora.classList.add("calculadora")

const containerScreen = document.createElement('div')
containerScreen.classList.add("screen")

const input = document.createElement('input')
//input.setAttribute('id', 'screen')
input.classList.add("input-screen")
containerScreen.appendChild(input)

const del = document.createElement('button')
del.classList.add('delete')
del.textContent = "←"
del.addEventListener('click', deleteLastElement)
containerScreen.appendChild(del)

const containerKeyboard = document.createElement('div')
containerKeyboard.classList.add("keyboard")

const containerSwich = document.createElement('div')
containerSwich.classList.add('container-swich')
const imgSwich = document.createElement('img')
imgSwich.classList.add('img-theme')
imgSwich.setAttribute('alt', 'image-theme')
imgSwich.setAttribute('src', './assets/dark-mode.svg')
containerSwich.appendChild(imgSwich)
const swichDarkMode = document.createElement('label')
swichDarkMode.classList.add('swich')
const checkbox = document.createElement('input')
checkbox.setAttribute('type', 'checkbox')
checkbox.addEventListener('click', changeMode)
swichDarkMode.appendChild(checkbox)
const span = document.createElement('span')
span.classList.add('slider', 'round')
swichDarkMode.appendChild(span)
containerSwich.appendChild(swichDarkMode)

calculadora.appendChild(containerSwich)
calculadora.appendChild(containerScreen)
calculadora.appendChild(containerKeyboard)
app.insertBefore(calculadora, history)

function addKeys(){
    
    let keys = ['AC','(',')','/','7','8','9','*','4','5','6','-','1','2','3','+','0','.','=']
    
    let fragment = document.createDocumentFragment()
    keys.forEach((key) =>{
        let btn = document.createElement('button')
        btn.classList.add("btn")
        btn.textContent = key
        if (btn.textContent == '='){
            btn.classList.add('equal')
            btn.addEventListener('click', resolve)
        }else if(btn.textContent == '+' ||
        btn.textContent == '-' ||
        btn.textContent == '*' ||
        btn.textContent == '/'){
            btn.classList.add('op')
            btn.addEventListener('click', addValue)
        }else if(btn.textContent == 'AC'){
            btn.classList.add('reset')
            btn.addEventListener('click', reset)
        }else{
            btn.addEventListener('click', addValue)
        }
        fragment.appendChild(btn)
    })
    containerKeyboard.appendChild(fragment)
}

addKeys()

//const screen = document.getElementById('screen') 

function addValue(e){
    input.value += e.target.textContent
    console.log(input.value)
}
function reset(){
    input.value = ''
}
function resolve(){
    let exp = input.value
    let result = eval(exp)
    addHistory(exp,result)
    input.value= result
}
function deleteLastElement(){
    newInput=input.value.slice(0,-1)
    input.value=newInput
}

function addHistory(expression,result){
    let calc = document.createElement('p')
    calc.classList.add('calculo')
    calc.textContent = expression
    let res = document.createElement('p')
    res.classList.add('resultado')
    res.textContent = '= '+result
    history.appendChild(calc)
    history.appendChild(res)
}
function changeMode(e){
    app.classList.toggle('light')
    if (app.classList.contains('light')){
        imgSwich.setAttribute('src', './assets/light-mode.svg')
    }else{
        imgSwich.setAttribute('src', './assets/dark-mode.svg')
    }
}