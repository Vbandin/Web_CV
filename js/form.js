var form = document.getElementById("form-contact");

var otherInput = document.getElementsByName("howYouKnowMe");

var inputOther = document.createElement("textarea");
inputOther.setAttribute("id", "messageHowYouKnowMe");
inputOther.setAttribute("name", "messageHowYouKnowMe");
inputOther.setAttribute("rows", "3");
inputOther.setAttribute("cols", "33");
inputOther.setAttribute("placeholder", "¿De que nos conocemos?");
inputOther.setAttribute("required", "");

for (var i = 0; i < otherInput.length; i++) {
	otherInput[i].addEventListener('click', function(event){
		if (this.value == "Otro") {
			this.parentNode.appendChild(inputOther);
			inputOther.style.display = "block"	
		} else {
			if(document.getElementById("howYouKnowMe_3")) {
				this.parentNode.removeChild(inputOther);
			}
		}
	});
}

form.addEventListener("submit", function(event){
	var inputNombre = document.getElementById("nombre");
	
	var inputApellidos = document.getElementById("apellidos");

	var emailInput = document.getElementById("email");

	var inputPhone = document.getElementById("phone");

	var radioInputHowYouKnowMe = {
		"LinkedIn": document.getElementById("howYouKnowMe_1"),
		"Evento": document.getElementById("howYouKnowMe_2"),
		"Otro": document.getElementById("howYouKnowMe_3"),
		};

	var inputMessage = document.getElementById("message");

	var inputMessageHowYouKnowMe = document.getElementById("messageHowYouKnowMe");

	var submitInput = document.getElementById("enviar");

	if(inputNombre.checkValidity() == false) {
		alert("Escribe tu nombre");
		inputNombre.focus();
		event.preventDefault();
		return false;
	}

	if(inputApellidos.checkValidity() == false) {
		alert("Escribe tus apellidos");
		inputNombre.focus();
		event.preventDefault();
		return false;
	}


	if(email.checkValidity() == false) {
		alert("Escribe un email correcto");
		email.focus();
		event.preventDefault();
		return false;
	}

	if(phone.checkValidity() == false) {
		alert("Escribe un télefono correcto");
		email.focus();
		event.preventDefault();
		return false;
	}

	if(radioInputHowYouKnowMe.LinkedIn.checkValidity() == false) {
		alert("Por favor, indica como me has conocido");
		event.preventDefault();
		return false;
	}
	
	if(messageHowYouKnowMe.checkValidity() == false) {
		alert("Por favor, indica como me has conocido");
		event.preventDefault();
		return false;
	}
	
	if(message.checkValidity() == false) {
		alert("Por favor, dime en que puedo ayudarte");
		email.focus();
		event.preventDefault();
		return false;
	}
	event.preventDefault();

	setTimeout(function(){
		sendNotification("Formulario recibido", "En breve tendrás respuesta");
	})
});

$(document).ready(function(){
    $('#message').keyup(function(){
        $(this).val(word_limit($(this).val(),150));
    });
});
function word_limit(text, limit){
    var words = text.split(/\b[\s,\.\-:;]*/,limit);
    text=words.join(" ");
    return text;
}
