let name = "";
let contact = "";
let visibility = "";
let time = "";
let errorMessage = "";

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
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', nameUser);

    requisicao.then(logInSuccess);
    requisicao.catch(logInError);
    
}

function logInSuccess(success){
    chatScreen();
}

function logInError(error){
    console.log("Status code: " + error.response.status); 
	console.log("Mensagem de erro: " + error.response.data); 
    errorMessage = "Este nome já está sendo utilizado. Por favor, escolha outro.";
    logInScreen();
}

function chatScreen(){
    const message = "";
    const screen = document.querySelector(".screen");
    screen.innerHTML = `
    <div class="messagePage">
        <div class="header">
            <img src="./img/logo1.png">
            <ion-icon name="people" onclick="openMenu()"></ion-icon>
        </div>
        
        <div class="chat">
        </div>

        <div class="message">
        <input type="text" value="${message}" placeHolder="Escreva aqui...">
        <ion-icon name="paper-plane-outline" onclick="sendMessage()"></ion-icon>
        </div>
    </div>
    `;
}

function sendMessage(){

}

function openMenu(){
    const message = "";
    const screen = document.querySelector(".screen");
    screen.innerHTML = `
    <div class="menuScreen">
        <div class="messages">
            <div class="header">
                <img src="./img/logo1.png">
                <ion-icon name="people" onclick="openMenu()"></ion-icon>
            </div>
            
            <div class="chat">
            </div>

            <div class="message">
            <input type="text" value="${message}" placeHolder="Escreva aqui...">
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
                <div class="contact" onclick="selectContact()">
                </div>
            </div>
            <div class="visibility">
                <h1>Escolha a visibilidade:</h1>
                <div class="public selectedVisibility" onclick="selectVisibility(this)">
                    <div class="visibilityChat">
                        <ion-icon name="lock-open"></ion-icon>
                        <p>Público</p>
                    </div>
                    <img src="./img/Vector.png">
                </div>
                <div class="private" onclick="selectVisibility(this)">
                    <div class="visibilityChat">
                        <ion-icon name="lock-closed"></ion-icon>
                        <p>Reservadamente</p>
                    </div>
                    <img src="./img/Vector.png" class="hidden">
                </div>
            </div>
        </div>
    </div>
    `;
}

function selectContact(contactSelected){
    const selected = document.querySelector(".selectedContact");
    if(selected !== null){
        selected.children[1].classList.add("hidden");
        selected.classList.remove("selectedContact");
    }
    contactSelected.classList.add("selectedContact");
     contactSelected.children[1].classList.remove("hidden");
    
}

function selectVisibility(visibilitySelected){
    const selected = document.querySelector(".selectedVisibility");
    if(selected !== null){
        selected.children[1].classList.add("hidden");
        selected.classList.remove("selectedVisibility");
    }
    visibilitySelected.classList.add("selectedVisibility");
    visibilitySelected.children[1].classList.remove("hidden");
}

function createMessage(){
    const chat = document.querySelector(".chat");
    chat.innerHTML += `
        <div class="chatMessage">
            <p>${time} </p>
            <p>${name} </p>
            <p>para </p>
            <p>${contact}</p>
            <p>: </p>
            <p>${message}</p>
        </div>
    `;
}

function getMessages(){

}



logInScreen();