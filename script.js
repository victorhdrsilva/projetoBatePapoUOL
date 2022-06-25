let userName = 'bcfddgs'
let sandName, pushdata, data, messages

function JoinTheChat() {
    if (userName !== null && userName !== undefined) {
        userName = {
            name: userName
        }

        sandName = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', userName)
        sandName.catch(error)
        sandName.then(success)
    }
    else {
        userName = prompt('Esse nome é inválido, escolha outro')
        JoinTheChat()
    }

}

function sandTheName() {
    sandName = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', userName)
}

function error() {
    userName = "lkjdhf"
    JoinTheChat()
}

function success() {
    loadMensage()
    setInterval(sandTheName, 5000)
    setInterval(loadMensage, 3000)
}

function loadMensage() {
    pushdata = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    pushdata.then(showMessage)
    function showMessage(dataAxios) {
        data = dataAxios.data
        messages = document.querySelector(".messages")
        messages.innerHTML = ''
       // console.log('entrou')
        for (let i = 0; i < data.length; i++) {
            let information = {
                from: data[i].from,
                to: data[i].to,
                text: data[i].text,
                type: data[i].type,
                time: data[i].time
            }
            if (information.type === "status") {
               // console.log('entrou status')
                messages.innerHTML += `
                <div class="mensage">
                <p><span class="time">${information.time}</span><strong class="name">${information.from}</strong><p>${information.text}</p></p>
                </div>`
            } else if (information.type === "message") {
                //console.log('entrou mensagem')
                messages.innerHTML += `
                <div class="mensage public">
                <p class="complete-mensage"></p><span class="time">${information.time}</span><strong class="name">${information.from}</strong>para<strong class="name">${information.to}:</strong> <p class="text-mensage">${information.text}</p></p>
                </div>`
            } else if (information.type === "private_message") {
                messages.innerHTML += `
                <div class="mensage reservad">
                <p class="complete-mensage"></p><span class="time">${information.time}</span><strong class="name">${information.from}</strong>para<strong class="name">${information.to}:</strong> <p class="text-mensage">${information.text}</p></p>
                </div>`
            }
        }
        let visibleElement = document.querySelector('.space')
        visibleElement.scrollIntoView()
    }
}

JoinTheChat()