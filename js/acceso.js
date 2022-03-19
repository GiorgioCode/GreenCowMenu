//cargar datos de localstorage
function validateForm(){

    let data=localStorage.getItem('datosGuardados') ? JSON.parse(localStorage.getItem('datosGuardados')) : [];;
    let formData ={
            "name":document.getElementById("uName").value,
            "email":document.getElementById("uEmail").value,
            "password":document.getElementById("uPassword").value,
            "confirmpassword":document.getElementById("confirmPassword").value
        }
        data.push(formData);

        if(localStorage){
            localStorage.setItem("datosGuardados", JSON.stringify(data));
        } 
}

//verificar coincidencia de password
function verifyPassword(input){
    if(input.value != document.getElementById("uPassword").value){
        input.setCustomValidity("El password no coincide");
    }else{
        input.setCustomValidity("");
    }
}
//verificar usuario ya registrado
function emailExist(value){
    let existemail = JSON.parse(localStorage.getItem("datosGuardados"));
    
    let emailid = existemail.map((email,i,existemail) =>{
        return existemail[i].email;
    });

     let getexistemail = emailid.filter((email)=>{
        if(email == value.value){
            value.setCustomValidity('el usuario ya se encuentra registrado');
            
        }else{
            value.setCustomValidity("");
        }
    });
}
//manejo de vistas
    const form = document.getElementById("registerForm");
    form.addEventListener("submit", function(e){
        e.preventDefault();
        form.reset();
        document.getElementById("thankYou").style.display="block";
        form.style.display="none";
    });

    function showHide(show, hide){
        let showEle = document.getElementById(show);
        let hideEle = document.getElementById(hide);
        showEle.style.display="block";
        hideEle.style.display="none";
    }

    //login y acceso
    function loginUser(){
        
        let loginEmail = document.getElementById("uemailId").value;
        let loginPass =  document.getElementById("ePassword").value;
        let matchEmail = JSON.parse(localStorage.getItem("datosGuardados"));
        let emailArray =[];
        let passArray=[];
        let result = matchEmail.map((email, i, matchEmail) =>{
        
           emailArray.push(matchEmail[i].email);
           passArray.push(matchEmail[i].password);
        });
        if(emailArray.indexOf(loginEmail) > -1 && passArray.indexOf(loginPass) > -1){
            window.location.href = './pages/inicio.html'
        }else{
            alert("usuario no registrado")
        }
      
    }
    const loginForm = document.getElementById("logIn");
    loginForm.addEventListener("submit", function(e){
        e.preventDefault();
    });