//ACCESO REGISTRO - cargar datos de localstorage
function validarFormulario() {
	let data = localStorage.getItem("datosGuardados")
		? JSON.parse(localStorage.getItem("datosGuardados"))
		: [];
	let formData = {
		name: document.getElementById("uName").value,
		email: document.getElementById("uEmail").value,
		password: document.getElementById("uPassword").value,
		confirmpassword: document.getElementById("confirmPassword").value,
	};
	data.push(formData);

	if (localStorage) {
		localStorage.setItem("datosGuardados", JSON.stringify(data));
	}
}

//ACCESO REGISTRO - verificar coincidencia de password
function verificarPassword(input) {
	if (input.value != document.getElementById("uPassword").value) {
		input.setCustomValidity("El password no coincide");
	} else {
		input.setCustomValidity("");
	}
}
//ACCESO REGISTRO - verificar usuario ya registrado
function verificarEmail(value) {
	let existemail = JSON.parse(localStorage.getItem("datosGuardados"));

	let emailid = existemail.map((email, i, existemail) => {
		return existemail[i].email;
	});

	let getexistemail = emailid.filter((email) => {
		if (email == value.value) {
			value.setCustomValidity("el usuario ya se encuentra registrado");
		} else {
			value.setCustomValidity("");
		}
	});
}

//ACCESO REGISTRO - manejo de vistas acceso registro
const form = document.getElementById("formularioRegistro");
form.addEventListener("submit", function (e) {
	e.preventDefault();
	form.reset();
	document.getElementById("usuarioRegistrado").style.display = "block";
	form.style.display = "none";
});

function mostrarOcultar(mostrar, ocultar) {
	let mostrarElemento = document.getElementById(mostrar);
	let ocultarElemento = document.getElementById(ocultar);
	mostrarElemento.style.display = "block";
	ocultarElemento.style.display = "none";
}

//ACCESO REGISTRO - login y acceso
function loginUser() {
	let loginEmail = document.getElementById("uemailId").value;
	let loginPass = document.getElementById("ePassword").value;
	let matchEmail = JSON.parse(localStorage.getItem("datosGuardados"));
	let emailArray = [];
	let passArray = [];
	let result = matchEmail.map((email, i, matchEmail) => {
		emailArray.push(matchEmail[i].email);
		passArray.push(matchEmail[i].password);
	});
	if (
		emailArray.indexOf(loginEmail) > -1 &&
		passArray.indexOf(loginPass) > -1
	) {
		window.location.href = "./pages/sistema.html";
	} else {
		alert(
			"Los datos de usuario son incorrectos, por favor verifique los datos o regístrese"
		);
		mostrarOcultar("formularioRegistro", "logIn"); //cambia vista a formulario de registro
	}
}
const loginForm = document.getElementById("logIn");
loginForm.addEventListener("submit", function (e) {
	e.preventDefault();
});
