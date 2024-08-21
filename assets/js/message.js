const notifications = document.querySelector(".notifications"),
buttons = document.querySelectorAll(".buttons .btn");

// Object containing details for different types of toasts

const removeToast = (toast) => {
    toast.classList.add("hide");
    if(toast.timeoutId) clearTimeout(toast.timeoutId); // Clearing the timeout for the toast
    setTimeout(() => toast.remove(), 500); // Removing the toast after 500ms
}

const createToast = (id) => {
    var waitTime = 3000;
    if(id=="messages"){
        var message = "Mensagem enviada";
    }
    if(id=="loading"){
        var message = "Aguarde, enviando a mensagem...";
        var waitTime = 6000;
    }
    if (id=="error") {
        var message = "Mensagem não enviada, tente novamente!";
    }
    if (id=="errorN") {
        var message = "Subscrição não efetuada, tente novamente!";
    }
    if (id=="news"){
        var message = "Subscrição efetuada.";
    }
    
    // Getting the icon and text for the toast based on the id passed
    const toast = document.createElement("li"); // Creating a new 'li' element for the toast
    toast.className = `toast`; // Setting the classes for the toast
    // Setting the inner HTML for the toast

    toast.innerHTML = `<div class="column">
                         <span>${message}</span>
                      </div>
                      <ion-icon name="close" onclick="removeToast(this.parentElement)"></ion-icon>`;
    notifications.appendChild(toast); // Append the toast to the notification ul
    // Setting a timeout to remove the toast after the specified duration
    toast.timeoutId = setTimeout(() => removeToast(toast), waitTime);
}


document.getElementById('contact-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obtém os valores dos campos do formulário
    const nome = document.getElementById('name').value;
    const phoneIdicative = document.getElementById('phoneIndicative').value;
    const numero = document.getElementById('phone-number').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('message').value;
    console.log("Submetido");

    createToast("loading");
    // Chama a função para enviar os dados
    await enviarsub(nome, phoneIdicative, numero, email, mensagem);
});

const enviarsub = async (nome, phoneIdicative, numero, email, mensagem) => {
    try {
        // Envia a solicitação para o PHP
        const response = await fetch("./assets/php/sendMail.php", {
            method: 'POST',
            body: new URLSearchParams({
                nome: nome,
                phoneId: phoneIdicative,
                numero: numero,
                email: email,
                message: mensagem
            })
        });
        
        const data = await response.json();

        // Cria uma notificação com base na resposta
        if (data.success) {
            createToast("messages");
            console.log(data.message);
            document.getElementById('contact-form').reset();
        } else {
            createToast("error");
            console.log(data.message);
        }
    } catch (error) {
        createToast("error");
        console.log(error.message);
    }
}

document.getElementById('news-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    const email = document.getElementById('email-news').value;

    // Chama a função para enviar os dados
    await enviarMes(email);
});

const enviarMes = async (email) => {
    try {
        // Envia a solicitação para o PHP
        const response = await fetch("./assets/php/newsletter.php", {
            method: 'POST',
            body: new URLSearchParams({
                email: email,
            })
        });
        
        const data = await response.json();

        // Cria uma notificação com base na resposta
        if (data.success) {
            createToast("news");
          //  console.log(data.message);
            document.getElementById('news-form').reset();
        } else {
            createToast("errorN");
          //  console.log(data.message);
        }
    } catch (error) {
        createToast("errorN");
      //  console.log(error.message);
    }
}