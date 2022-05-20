let name = "";
let contactMessage = "Todos";
let visibility = "message";
let time = "";
let errorMessage = "";
let lastMessage = "";
let chatS = "";
let privateMessage = "";

function logInScreen(){
    const screen = document.querySelector(".screen");
    screen.innerHTML = `
    <div class="logInPage">
        <img class="logInImg" src="./img/logo2.png">
        <p>${errorMessage}</p>
        <div class="name">
            <input type="text" placeHolder="Digite seu nome" class="input">
        </div>
        <div class="logIn" onclick="logIn()">Entrar</div>
    </div>
    `;
} 

function logIn(){
    name = document.querySelector(".input").value;
    const nameUser = { name: name };
    const requisition = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', nameUser);

    requisition.then(logInSuccess);
    requisition.catch(logInError);
    
}

function logInSuccess(success){
    getMessages();
    chatScreen();
}

function logInError(error){
    errorMessage = "Este nome já está sendo utilizado. Por favor, escolha outro.";
    logInScreen();
}

function stillLogged(){
    const nameUser = { name: name };
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', nameUser);
}

function chatScreen(){
    setInterval(stillLogged, 5000);
    setInterval(getMessages, 3000);
    setInterval(getContactOptions, 10000); 

    const screen = document.querySelector(".screen");
    screen.innerHTML = `
    <div class="messagePage">
        <div class="header">
            <img src="./img/logo1.png">
            <ion-icon name="people" onclick="openMenu()"></ion-icon>
        </div>
        
        <div class="chat">
              ${chatS}  
        </div>

        <div class="sendMessage">
            <div class="input">
                <input type="text" placeHolder="Escreva aqui..." class="messageSent">
                <div class="privateMessage">${privateMessage}</div>
            </div>
            <ion-icon name="paper-plane-outline" onclick="sendMessage()"></ion-icon>
        </div>
    </div>
    `;
}

function getMessages(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    promise.then(createMessage);
}

function createMessage(message){
    if(lastMessage != "" && lastMessage.time !== message.data[message.data.length - 1].time){
        let j = 0;
        for(let i = 0; i < message.data.length; i++){
            if(lastMessage.time == message.data[i].time && lastMessage.name == message.data[i].name){
                j = i + 1; 
            }
        }
        
        for(let i = j; i < message.data.length; i++){
            console.log(message.data[i]); 
            const chat = document.querySelector(".chat"); 
            chat.innerHTML += `
            <div class="chatMessage ${message.data[i].type}">
            <p class="time">(${message.data[i].time})</p>
            <p class="name">${message.data[i].from}</p>
            <p>para</p>
            <p class="name">${message.data[i].to}:</p>
            <p>${message.data[i].text}</p>
            </div>
            `; 
            chatS = chat.innerHTML;
        } 
        
        lastMessage = message.data[message.data.length - 1];
    }else if (lastMessage == ""){
        for(let i = 0; i < message.data.length; i++){
            const chat = document.querySelector(".chat"); 
            chat.innerHTML += `
                <div class="chatMessage ${message.data[i].type}">
                    <p class="time">(${message.data[i].time})</p>
                    <p class="name">${message.data[i].from}</p>
                    <p>para</p>
                    <p class="name">${message.data[i].to}:</p>
                    <p class="text">${message.data[i].text}</p>
                </div>
                `; 
            chatS = chat.innerHTML;
        }

        lastMessage = message.data[message.data.length - 1];
    }
    updateScroll();
}

function updateScroll(){
    var element = document.querySelector(".chat");
    element.scrollTop = element.scrollHeight;
}

function sendMessage(){
    message = document.querySelector(".messageSent").value;
    const messageSent = { 
        from: name,
        to: contactMessage,
        text: message,
        type: visibility
    };
    const requisition = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', messageSent);
    document.querySelector(".messageSent").value = "";
    getMessages();
}


function openMenu(){
    getContactOptions();
    const screen = document.querySelector(".screen");
    screen.innerHTML = `
    <div class="menuScreen">
        <div class="messages">
            <div class="header">
                <img src="./img/logo1.png">
                <ion-icon name="people" onclick="openMenu()"></ion-icon>
            </div>
            
            <div class="chat">  
                ${chatS} 
            </div>

            <div class="sendMessage">
                <div class="input">
                    <input type="text" placeHolder="Escreva aqui..." class="messageSent">
                    <div class="privateMessage">${privateMessage}</div>
                </div>
                <ion-icon name="paper-plane-outline" onclick="sendMessage()"></ion-icon>
            </div>
        </div>
        <div class="black" onclick="chatScreen()"></div>
        <div class="menu">
            <div class="contacts">
                <h1>Escolha um contato <br>para enviar mensagem:</h1>
                <div class="all selectedContact" onclick="selectContact(this)">
                    <div class="allContacts">
                        <ion-icon name="people"></ion-icon>
                        <p>Todos</p>
                    </div>
                    <img src="./img/Vector.png">
                </div>
                
            </div>
            <div class="visibility">
                <h1>Escolha a visibilidade:</h1>
                <div class="public selectedVisibility" onclick="selectVisibility(this)">
                    <div class="visibilityChat">
                        <ion-icon name="lock-open"></ion-icon>
                        <p>Público</p>
                    </div>
                    <div class="img">
                        <img src="./img/Vector.png">
                    </div>
                </div>
                <div class="private" onclick="selectVisibility(this)">
                    <div class="visibilityChat">
                        <ion-icon name="lock-closed"></ion-icon>
                        <p>Reservadamente</p>
                    </div>
                    <div class="img hidden">
                        <img src="./img/Vector.png" >
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function getContactOptions(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/uol/participants');
    promise.then(createParticipants);
}

function createParticipants(response){
    const participants = response.data; 
    let contacts = document.querySelector(".contacts");
    
    if(contacts !== null){
        if(contactMessage == "Todos"){
            contacts.innerHTML = `
            <h1>Escolha um contato <br>para enviar mensagem:</h1>
                    <div class="all selectedContact" onclick="selectContact(this)">
                        <div class="allContacts">
                            <ion-icon name="people"></ion-icon>
                            <p>Todos</p>
                        </div>
                        <img src="./img/Vector.png">
                    </div>
            `;
    
            for(let i = 0; i < participants.length; i++){
                if(participants[i].name !== name){
                    contacts.innerHTML += `
                        <div class="contact" onclick="selectContact(this)">
                            <div class="contactName">
                                <ion-icon name="person-circle"></ion-icon>
                                <p>${participants[i].name}</p>
                            </div> 
                            <div class="img hidden">
                                <img src="./img/Vector.png">
                            </div>
                        </div>
                        
                    `;
                }
            }
        }else {
            contacts.innerHTML = `
            <h1>Escolha um contato <br>para enviar mensagem:</h1>
                    <div class="all" onclick="selectContact(this)">
                        <div class="allContacts">
                            <ion-icon name="people"></ion-icon>
                            <p>Todos</p>
                        </div>
                        <img src="./img/Vector.png" class="hidden">
                    </div>
            `;
    
            for(let i = 0; i < participants.length; i++){
                if(participants[i].name !== name){
                    if(participants[i].name == contactMessage){
                        contacts.innerHTML += `
                        <div class="contact selectedContact" onclick="selectContact(this)">
                            <div class="contactName">
                                <ion-icon name="person-circle"></ion-icon>
                                <p>${participants[i].name}</p>
                            </div> 
                            <div class="img">
                                <img src="./img/Vector.png"> 
                            </div>
                        </div>
                        
                    `;
                    }else {
                        contacts.innerHTML += `
                            <div class="contact" onclick="selectContact(this)">
                                <div class="contactName">
                                    <ion-icon name="person-circle"></ion-icon>
                                    <p>${participants[i].name}</p>
                                </div> 
                                <div class="img hidden">
                                    <img src="./img/Vector.png">
                                </div>
                            </div>
                            
                        `;
                    }
                }
            }
        }    
    }
}

function selectContact(contactSelected){
    const selected = document.querySelector(".selectedContact");
    console.log(selected);
    if(selected !== null){
        console.log(selected.children);
        selected.children[1].classList.add("hidden");
        selected.classList.remove("selectedContact");
    }
    contactSelected.classList.add("selectedContact");
    contactSelected.children[1].classList.remove("hidden");

    contactMessage = contactSelected.children[0].children[1].innerHTML; 
    console.log(contactMessage);
    if(contactMessage != "Todos" && visibility == "private_message"){
        privateMessage = "Enviando para " + contactMessage + "(reservadamente)";
    }else {
        privateMessage = "";
    }
}

function selectVisibility(visibilitySelected){
    const selected = document.querySelector(".selectedVisibility");
    if(selected !== null){
        selected.children[1].classList.add("hidden");
        selected.classList.remove("selectedVisibility");
    }
    visibilitySelected.classList.add("selectedVisibility");
    visibilitySelected.children[1].classList.remove("hidden");

    if(visibilitySelected.innerHTML === "Público"){
        visibility = "message";
    }else {
        visibility = "private_message";
    }
}







logInScreen();
