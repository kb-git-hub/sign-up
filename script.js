const password = document.querySelector('#password')
const passwordConfirm = document.querySelector('#confirm-password')
const submitBtn = document.querySelector('button')
const passMatch = document.querySelector('#passMatch')

function checkPassword() {
    if (passMatch.style.display = 'none') {
        passMatch.style.display = 'inline-block'
        passMatch.innerText = "Passwords don't match"
        password.value = ''
        passwordConfirm.value = ''


        setTimeout(() => {
            passMatch.style.display = 'none'
        }, 2000);
    }
}

submitBtn.addEventListener('click', (e) => {
    if (password.value || passwordConfirm.value) {
        if (password.value !== passwordConfirm.value) {
            e.preventDefault()
            checkPassword()

        }
    }

})



