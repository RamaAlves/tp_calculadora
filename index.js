const app = document.getElementById('app')
app.classList.add('app')

const containerGeneral = document.createElement('main')
containerGeneral.classList.add('container-general')
app.appendChild(containerGeneral)

const containerCalculadora = document.createElement('div')
containerCalculadora.classList.add('container-calculadora')
containerGeneral.appendChild(containerCalculadora)

const history = document.createElement('div')
history.classList.add('history')
containerCalculadora.appendChild(history)

const calculadora = document.createElement('div')
calculadora.classList.add("calculadora")

const containerScreen = document.createElement('div')
containerScreen.classList.add("screen")

const input = document.createElement('input')
//input.setAttribute('id', 'screen')
input.classList.add("input-screen")
input.addEventListener('keypress', validityKeys)
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
containerGeneral.insertBefore(containerSwich, containerCalculadora)

calculadora.appendChild(containerScreen)
calculadora.appendChild(containerKeyboard)
containerCalculadora.insertBefore(calculadora, history)

const keys = ['AC','(',')','/','7','8','9','*','4','5','6','-','1','2','3','+','0','.','=']

function addKeys(){    
    
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
}
function validityKeys(e){
    e.preventDefault();
    if(e.key == 'Enter'){
        resolve()
    }else if(e.key== 'Backspace'){
        deleteLastElement()
    }else{
        let validKeys = keys.toSpliced(0,1)
        if (validKeys.includes(e.key)){
            input.value += e.key
        }
    }
}
function reset(){
    input.value = ''
}
function resolve(){
    let exp = input.value
    if (exp[0]!='0'||(exp[0]+exp[1])=='0.'){
        try {
            let result = eval(exp)
            if (result==undefined){
                console.error(result)
                input.value= 'Error en la operacion'
            }else{
                addHistory(exp,result)
                input.value= result
            }
        }
        catch{
            console.error(result)
            input.value= 'Error en la operacion'
        }
    }else{
        let expSin0 = exp.slice(1)
        try{
            let result = eval(expSin0)
            if (result==undefined){
                console.error(result)
                input.value= 'Error en la operacion'
            }else{
                addHistory(expSin0,result)
                input.value= result
            }
        }
        catch{
            console.error(exp)
            input.value= 'Error en la operacion'    
        }
    }
}
function deleteLastElement(){
    newInput=input.value.slice(0,-1)
    input.value=newInput
}

function addHistory(expression,result){
    let calc = document.createElement('p')
    calc.classList.add('calculo')
    calc.textContent = expression + ' ='
    let res = document.createElement('p')
    res.classList.add('resultado')
    res.textContent = result
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