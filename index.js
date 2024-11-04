const form = document.getElementById("form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirm-password")

function showError(mesaj, qutu) {
    const formControl = qutu.parentElement
    // formControl.classList.add("error")
    // classList.add("error") //cache
    formControl.className = "form-control error"

    const small = formControl.querySelector("small")
    small.innerText = mesaj 
}

// showError("Emailinizi duzgun daxil edin",email)
// showError("Istifadeci adi boshdur", username)


function showSuccess(box) {
    const formControl = box.parentElement
    formControl.className = "form-control success"
}

// Sahələrin siniflərini təmizləyən funksiya
function resetFormControlClasses() {
    const formControls = form.querySelectorAll(".form-control") //NodeList or HTMLCollection
    //forEachin daxilindeki adlanir: callback
    // forEach ozu adlanir: HOF Higher Order Function
    formControls.forEach(control => {
        control.className = "form-control"
    })
}


// Bu funksiyalar geriye boolean qaytarir start
function checkUsernameLength(istifadeciAdi) {
    if(istifadeciAdi.value.trim().length >=2) {
        showSuccess(istifadeciAdi)
        return true
    }
    else {
        showError("Istifadeci adi minimum 2 simvoldan ibaret olmalidir", istifadeciAdi)
        return false
    }
}

//
function checkEmail(epoct) {
    //.com, .ru
    const regularExpressionForEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    //regexi yeniden yazdir
//regular expressionun yoxlanilmasi metoduru
    if(regularExpressionForEmail.test(epoct.value.trim())) {
        showSuccess(epoct)
        return true
    }
    else {
        showError("Elektron poct standartlara uygun deyil", epoct)
        return false

    }

}


function checkPassword(shifre) {
    const shifreUcunQayda = /^(?=.*[A-Z])(?=.*[@!.])[A-Za-z\d@!.]{5,}$/
    if(shifreUcunQayda.test(shifre.value.trim())) {
        showSuccess(shifre)
        return true
    }
    else {
        showError("Shifrede en az 5 simvol, bir boyuk herf, 1 reqem olmalidir.",shifre)
        return false
    }
}

function comparePasswords(input1, input2) {
    if(input1.value === input2.value) {
        showSuccess(input2)
        return true
    }
    else {
        showError("Shifreler uygun deyil",input2)
        return false
    }
}

// end



// DOM 50-60%



//Form events input blur focus change submit
//Hadiseler
username.addEventListener("input", ()=>{
    if(username.value.trim() === "") {
        showError("Istifadeci adi bosh ola bilmez", username)
    }
    else {
        checkUsernameLength(username)
    }
})

email.addEventListener("input", _=> {
    // === == =
    //x = "10" //false
    if(email.value.trim()=== "") {
        showError("Elektron poct hissesi teleb olunur", email)
    }
    else {
        checkEmail(email)
    }
})

password.addEventListener("input", function(){
    if(password.value.trim() === "") {
        showError("Shifre bosh ola bilmez", password)
    }
    else {
        checkPassword(password)
    }
})


//Bura nezer yetir
confirmPassword.addEventListener("input", function(){
    if(confirmPassword.value.trim() === "") {
        showError("Confirm password bosh ola bilmez", confirmPassword)
    }
    else {
        comparePasswords(password,confirmPassword)
    }
})



form.addEventListener("submit", function(e){
//e.preventDefault()
    e.preventDefault()

    const isUsernameValid = checkUsernameLength(username) 
    const isEmailValid = checkEmail(email)
    const isPasswordValid = checkPassword(password)
    const isConfirmPasswordValid = comparePasswords(password, confirmPassword)

      // Sinifləri sıfırlayırıq
      resetFormControlClasses()


    if(isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        Swal.fire({
            icon: "success",
            title: "Form tesdiqlendi",
            text: "Formunuz tesdiqlendi. Sizinle elaqe saxlanilacaq",
            
          });

          form.reset()

    }

    else {
        Swal.fire({
            icon: "error",
            title: "Form tesdiqlenmedi",
            text: "Butun saheleri duzgun doldurdugunuzdan emin olun",
            
          });
    }



   
    
    

})


// localstorage vs Session storage
//cookienin yaddashi (Cookie nedir)
// Bearer Authentication nedir?
//Identification, Authorization, Authentication 
// JSON.parse() JSON.stringify()
//Closure nedir? (MUTLEQ) - Praktiki numunesi (hec bir yerde olmayan izah)
// Rekursiv funksiyalar : Faktorial
//localStorage.getItem() vs localStorage.setItem()
// prototype - brauzerden interneti sondureceksiniz 
// fake map metodu