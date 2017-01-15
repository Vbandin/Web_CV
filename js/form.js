var form = document.getElementById("form-contact");

var otherInput = document.getElementsByName("howYouKnowMe_3");

var inputOther = document.createElement("textarea");
inputOther.setAttribute("id", "message");
inputOther.setAttribute("name", "message");
inputOther.setAttribute("placeholder", "¿De que nos conocemos?");
inputOther.setAttribute("required", "");

for (var i = 0; i < otherInput.length; i++) {
	otherInput[i].addEventListener('click', function(event){
		if (this.value == "Otro") {
			this.parentNode.appendChild(inputOther);	
		} else {
			if(document.getElementById("howYouKnowMe_3")) {
				this.parentNode.removeChild(inputOther);
			}
		}
	});
}

form.addEventListener("submit", function(event){
	var inputNombre = document.getElementById("nombre");
	var apellidosRadioInput = {
		"apellidos_si": document.getElementById("apellidos_si"),
		"apellidos_no": document.getElementById("apellidos_no")
	};
	var emailInput = document.getElementById("email");

	var misionesRadioInput = {
		"mision1": document.getElementById("tipo_mision_1"),
		"mision2": document.getElementById("tipo_mision_2"),
		"mision3": document.getElementById("tipo_mision_3"),
		"mision4": document.getElementById("tipo_mision_4"),
	};

	var estasSeguroRadioInput = {
		"seguro_si": document.getElementById("seguro_si"),
		"seguro_no": document.getElementById("seguro_no")
	};

	var fechaInput = document.getElementById("fecha");
	var submitInput = document.getElementById("enviar");

	if(inputNombre.checkValidity() == false) {
		alert("Escribe tu nombre");
		inputNombre.focus();
		event.preventDefault();
		return false;
	}

	if(apellidosRadioInput.apellidos_si.checkValidity() == false) {
		alert("Selecciona si tienes apellidos");
		event.preventDefault();
		return false;
	}

	if(document.getElementById("apellidos")) {
		if(document.getElementById("apellidos").checkValidity() == false){
			alert("Escribe tus apellidos");
			document.getElementById("apellidos").focus();
			event.preventDefault();
			return false;
		}
	}

	if(email.checkValidity() == false) {
		alert("Escribe un email correcto");
		email.focus();
		event.preventDefault();
		return false;
	}

	if(misionesRadioInput.mision1.checkValidity() == false) {
		alert("Introduce el tipo de mision");
		event.preventDefault();
		return false;
	}

	if(tooManyEnemies.style.display === 'block') {
		if(estasSeguroRadioInput.seguro_si.checkValidity() == false){
			alert("Confirmanos que estás seguro");
			event.preventDefault();
			return false;
		}
	}

	if (fechaInput.checkValidity() == false) {
		alert("Introduce la fecha de la mision");
		fecha.focus();
		event.preventDefault();
		return false;
	}

	event.preventDefault();

	setTimeout(function(){
		sendNotification("Formulario recibido", "En breve tendrás respuesta");
	})
});



