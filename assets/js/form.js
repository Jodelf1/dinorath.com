document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM completamente carregado e analisado");

    const form = document.getElementById('contact-form');
    const inputs = document.querySelectorAll('.input');
    
    console.log("Inputs selecionados:", inputs);

    inputs.forEach(input => {
        input.addEventListener('input', function () {
            console.log(`Input '${input.id}' alterado`);
            validateInput(input);
        });

        input.addEventListener('blur', function () {
            console.log(`Input '${input.id}' perdeu o foco`);
            validateInput(input);
        });
    });

    function validateInput(input) {
        const value = input.value.trim();
        console.log(`Validando input '${input.id}':`, value);

        if (value === '') {
            console.log(`Campo '${input.id}' está vazio`);
            input.classList.remove('error', 'valid');
            input.style.borderBottomColor = '#353535';
        } else if (!isValid(input)) {
            console.log(`Campo '${input.id}' é inválido`);
            input.classList.add('error');
            input.classList.remove('valid');
        } else {
            console.log(`Campo '${input.id}' é válido`);
            input.classList.add('valid');
            input.classList.remove('error');
        }
    }

    function isValid(input) {
        const value = input.value.trim();
        console.log(`Verificando validade do campo '${input.id}':`, value);

        if (input.id === 'phone-indicative') {
            const regex = /^\+\d{1,4}$/;
            const isValid = regex.test(value);
            console.log(`Validade do telefone indicativo '${value}':`, isValid);
            return isValid;
        }

        if (input.id === 'phone-number') {
            const regex = /^\d{7,15}$/;
            const isValid = regex.test(value);
            console.log(`Validade do número de telefone '${value}':`, isValid);
            return isValid;
        }

        if (input.type === 'email') {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = regex.test(value);
            console.log(`Validade do email '${value}':`, isValid);
            return isValid;
        } else {
            const isValid = value.length > 3;
            console.log(`Validade do texto '${value}':`, isValid);
            return isValid;
        }
    }
    
    form.addEventListener('submit', function (event) {
       // event.preventDefault();
        console.log("Formulário submetido");

        let valid = true;
        inputs.forEach(input => {
            validateInput(input);
            if (input.classList.contains('error')) {
                valid = false;
                console.log(`Campo '${input.id}' contém erro`);
            }
        });

        console.log("Resultado da validação do formulário:", valid);

        if (valid) {
            console.log("Preparando para enviar o email");
            const formData = new FormData(form);

            fetch('../php/sendMail.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                console.log("Resposta do servidor:", response);
                return response.text();
            })
            .then(data => {
                console.log("Resposta do servidor (texto):", data);
                alert('Mensagem enviada com sucesso!');
                form.reset();
            })
            .catch(error => {
                console.error('Erro ao enviar mensagem:', error);
                alert('Ocorreu um erro ao enviar a mensagem.');
            });
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });
});
