let cont = document.querySelector('.container')
let form = document.forms.todo
let form2 = document.forms.fcreate
let done = document.querySelector('.done')
let isdone = document.querySelector('.isdone')
let inputs = form.querySelectorAll('input')
let theinp = document.querySelector('.theinp')
let btn = document.querySelector('.btn')
let btncreate = document.querySelector('.btn_create')
let modal = document.querySelector('.modal')
let overlay = document.querySelector('.overlay')
let tasks = [
    {
        id: Math.random(),
        task: 'Сделать ДЗ ...',
        time: "0:30",
        isChecked: false
    },
    {
        id: Math.random(),
        task: 'Играть...',
        time: "22:00",
        isChecked: false
    },
    {
        id: Math.random(),
        task: 'Спать',
        time: "06:30",
        isChecked: false
    },{
        id: Math.random(),
        task: 'Сделать ТЗ ....',
        time: "1:30",
        isChecked: false
    },
    {
        id: Math.random(),
        task: 'Lorem ipsum :)',
        time: "16:00",
        isChecked: false
    }
]
let donee = [
    {
        id: Math.random(),
        task: 'Урок...',
        time: "20:00",
        isChecked: true
    },
    {
        id: Math.random(),
        task: 'Lorem...',
        time: "15:00",
        isChecked: true
    },
    {
        id: Math.random(),
        task: 'Ipsum...',
        time: "16:00",
        isChecked: true
    },
    {
        id: Math.random(),
        task: 'Dolor...',
        time: "20:00",
        isChecked: true
    },
    {
        id: Math.random(),
        task: 'Qwerty',
        time: "21:00",
        isChecked: true
    },
    {
        id: Math.random(),
        task: 'Play game...',
        time: "20:00",
        isChecked: true
    },
    {
        id: Math.random(),
        task: 'Test 123',
        time: "00:00",
        isChecked: true
    }
]

btncreate.onclick = (e) => {
    e.preventDefault()
    modal.style.display = 'flex'
}
overlay.onclick = () => {
    modal.style.display = 'none'
}
form2.onsubmit = (e) => {
    e.preventDefault()
    submit()
}

function submit() {
    let user = {
        id: Math.random()
    }

    let fm = new FormData(form2)

    fm.forEach((value, key) => {
        user[key] = value
    })

    let sltwo = document.getElementById('selecttwo')
    let selectedval = sltwo.options[sltwo.selectedIndex].value
    if(selectedval == '1'){
        donee.push(user);
        reload(tasks,donee)
        localStorage.donee = JSON.stringify(donee)
    }else if(selectedval == '2'){
        tasks.push(user)
        reload(tasks)
        localStorage.tasks = JSON.stringify(tasks) 
    }
}

reload(tasks)


function reload(arr) {
    cont.innerHTML = ""
    for(let item of arr) {
        let not = document.querySelector('.not')
        let div = document.createElement('div')
        let left = document.createElement('div')
        let right = document.createElement('div')
        let h3 = document.createElement('h3')
        let br = document.createElement('br')
        let i = document.createElement('i')
        let img = document.createElement('img')
        let check = document.createElement('input')
        let edit = document.createElement('button')
        let divch = document.createElement('div')
        let span = document.createElement('span')
        let hr = document.createElement('hr')

        not.innerHTML = 'Is not done: ' + arr.length
        not.classList.add('not')
        div.classList.add('item')
        div.setAttribute('id', item.id)
        h3.innerHTML = item.task
        i.innerHTML = item.time
        img.setAttribute('src', './img/remove.png')
        check.classList.add('check')
        check.setAttribute('type', 'checkbox')
        edit.innerHTML = 'Edit'
        span.innerHTML = 'not done!'
        span.style.color = 'red'
        divch.style.display = 'flex'
        divch.style.alignItems = 'center'
        hr.classList.add('hr')

        divch.append(check,span)
        div.append(left)
        left.append(h3, i, divch)
        cont.append(div,done)
        
        // donee 
        restart(donee)

        function restart(donee) {
            isdone.innerHTML = ""
            for(let elem of donee){
                let thedone = document.querySelector('.thedone')
                let div = document.createElement('div')
                let left = document.createElement('div')
                let h3 = document.createElement('h3')
                let i = document.createElement('i')
                let check = document.createElement('input')
                let divch = document.createElement('div')
                let span = document.createElement('span')
                
                thedone.innerHTML = 'Is Done: ' + donee.length
                div.classList.add('item')
                div.setAttribute('id', elem.id)
                h3.innerHTML = elem.task
                i.innerHTML = elem.time
                img.setAttribute('src', './img/remove.png')
                check.classList.add('check')
                check.setAttribute('checked', 'checked')
                check.setAttribute('type', 'checkbox')
                span.innerHTML = 'Done!'
                span.style.color = 'green'
                divch.style.display = 'flex'
                divch.style.alignItems = 'center'
        
                divch.append(check,span)
                div.append(left)
                left.append(h3, i,divch)
                isdone.append(div)
                check.onclick = (e) => {
                    thedone.innerHTML = 'Is Done: ' + donee.length--
                    tasks.push(elem)
                    reload(tasks)
                    restart(donee)
                }
            }
        }
        check.onclick = (e) => {
            donee.push(item)
            // delete tot item )
            let id = e.target.parentNode.id
            let idx = tasks.findIndex(elem => elem.id == item.id)
            tasks.splice(idx, 1)
            reload(tasks)
            not.innerHTML = "Is not done: " + tasks.length
            restart(donee)
        }
    }
}


let not1 = document.querySelector('.not')
let done1 = document.querySelector('.thedone')
let isdone1 = document.querySelector('.isdone')
// select option :)
function changeFunc() {
    let selectbox = document.getElementById('selectbox')
    let selectedvalue = selectbox.options[selectbox.selectedIndex].value
    if(selectedvalue == '2'){
        reload(tasks)
        isdone.innerHTML = ''
        done1.innerHTML = ''
        cont.classList.remove('none')
        not1.classList.remove('none')
        // thedone.innerHTML = ''
    }else if(selectedvalue == '1') {
        cont.classList.remove('none')
        not1.classList.remove('none')
        done1.style.marginLeft = '720px'
        reload(tasks)
    }
    if(selectedvalue == '3'){
        done1.style.marginLeft = '34px'
        cont.classList.add('none')
        not1.classList.add('none')
        isdone1.style.padding = '20px 0 0 30px'
        reload(tasks)
    }
}

// search
let inpsearch = document.querySelector('#search')
inpsearch.onkeyup = () => {
    let filter = tasks.filter(itemm => itemm.task.includes(inpsearch.value))
    reload(filter)
}

// localStorage )
let temp = JSON.parse(localStorage.getItem('tasks'))
tasks = temp

function reltemp() {
    if(temp.length > 0){
        reload(temp)
    }
}

reltemp()
