let userName, sandName, pushdata, data, messages, textMessage, users, newCheckmarkContact
let to = "Todos"
let type = "message"
let contactOptions = document.querySelector('.contact-options')
let shadow = document.querySelector('.shadow')

function JoinTheChat() {
    if (userName !== null && userName !== undefined) {
        userNameObject = {
            name: userName
        }

        sandName = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', userNameObject)
        sandName.catch(error)
        sandName.then(success)
    }
    else {
        alert('Esse nome é inválido, escolha outro')
    }

}

function sandTheName() {
    sandName = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', userNameObject)
}

function error() {
    alert('Esse nome já está sendo usado, escolha outro')
}

function success() {
    let loginPage = document.querySelector('.form')
    loginPage.classList.add('dont-show-reservad-mesage')
    console.log(loginPage)
    loadMessage()
    loadUsers()
    setInterval(sandTheName, 5000)
    setInterval(loadMessage, 3000)
    setInterval(loadUsers, 1000)
}

function loadMessage() {
    pushdata = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    pushdata.then(showMessage)
    function showMessage(dataAxios) {
        data = dataAxios.data
        messages = document.querySelector(".messages")
        messages.innerHTML = ''
        for (let i = 0; i < data.length; i++) {
            let information = {
                from: data[i].from,
                to: data[i].to,
                text: data[i].text,
                type: data[i].type,
                time: data[i].time
            }
            if (information.type === "status") {
                messages.innerHTML += `
                <div class="messageline">
                <p><span class="time">${information.time}</span><strong class="name">${information.from}</strong><p>${information.text}</p></p>
                </div>`
            } else if (information.type === "message") {
                messages.innerHTML += `
                <div class="messageline public">
                <p class="complete-message"></p><span class="time">${information.time}</span><strong class="name">${information.from}</strong>para<strong class="name">${information.to}:</strong> <p class="text-message">${information.text}</p></p>
                </div>`
            } else if (information.type === "private_message" && (information.from == userName || information.to == userName)) {
                messages.innerHTML += `
                <div class="messageline reservad">
                <p class="complete-message"></p><span class="time">${information.time}</span><strong class="name">${information.from}</strong>para<strong class="name">${information.to}:</strong> <p class="text-message">${information.text}</p></p>
                </div>`
            }
        }
        let checker = contactOptions.classList.contains('show')
        if(!checker) {
            let visibleElement = document.querySelector('.space')
            visibleElement.scrollIntoView()
        }

    }
}

function loadUsers(){
    pushUsers = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')
    pushUsers.then(showUsers)

    function showUsers(usersAxios) {
        users = usersAxios.data
        let usersHTML = document.querySelector(".contact")
        if(to == 'Todos') {
            usersHTML.innerHTML = `
        <li onclick="choiceContact(this)" class="Todos">
            <div class="contact-name">
                <ion-icon name="people"></ion-icon>
                <p>Todos</p>
            </div>
            <ion-icon id="Todos" class="checkmark-contact selected-contact" name="checkmark-circle"></ion-icon>
        </li>`
        } else {
            usersHTML.innerHTML = `
        <li onclick="choiceContact(this)" class="Todos">
            <div class="contact-name">
                <ion-icon name="people"></ion-icon>
                <p>Todos</p>
            </div>
            <ion-icon id="Todos" class="checkmark-contact" name="checkmark-circle"></ion-icon>
        </li>`
        }
        
        for (let i = 0; i < users.length; i++) {
            let information = {
                name: users[i].name,
            }
            if(to == information.name) {
                usersHTML.innerHTML += `
                <li onclick="choiceContact(this)" class="${information.name}">
                    <div class="contact-name">
                        <ion-icon name="person-circle"></ion-icon>
                        <p>${information.name}</p>
                    </div>
                    <ion-icon id="${information.name}" class="checkmark-contact selected-contact" name="checkmark-circle"></ion-icon>
                </li>
                `
            } else {
                usersHTML.innerHTML += `
                <li onclick="choiceContact(this)" class="${information.name}">
                    <div class="contact-name">
                        <ion-icon name="person-circle"></ion-icon>
                        <p>${information.name}</p>
                    </div>
                    <ion-icon id="${information.name}" class="checkmark-contact" name="checkmark-circle"></ion-icon>
                </li>
                `
            }

        }
    }
}

function sendMessage() {
 textMessage = document.querySelector('#message-text')
 let objectTextMessage = {
	from: userName,
	to: to,
	text: textMessage.value,
	type: type
}
console.log(objectTextMessage)
 let sandMessageText = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', objectTextMessage)
 sandMessageText.then(deleteTextAreaValue)
}

function deleteTextAreaValue() {
    document.querySelector('#message-text').value = ''
}

function showContactOptions(){
    contactOptions.classList.toggle('show')
    shadow.classList.toggle('show')
    console.log('não ta rolando')
}

function choiceContact(element) {
    to = element.classList[0]
}

function choiceVisibility(element) {
    let checkmarkVisibility = document.querySelector('.checkmark-visibily')
    checkmarkVisibility.classList.remove('checkmark-visibily')
    let newCheckmarkVisibility = element.querySelector('.checkmark')
    newCheckmarkVisibility.classList.add('checkmark-visibily')
    type = element.classList[0]
    console.log(type)
}

function selectUserName (){
    userName = document.querySelector('.user-name').value
    console.log(userName)
    JoinTheChat()
}