const password = document.querySelector('#password')
const passwordConfirm = document.querySelector('#confirm-password')
const submitBtn = document.querySelector('button')

function checkPassword(event) {
    e.preventDefault()
    if (password.value || passwordConfirm.value !== undefined) {
        if (password.value !== confirm.passwordConfirm.value) {
            alert('Passwords do NOT match!')
            password.value = ''
            passwordConfirm.value = ''
        }
    } return

}

submitBtn.addEventListener('click', (e) =>{
    if (password.value || passwordConfirm.value) {
        if (password.value !== passwordConfirm.value) {
            e.preventDefault()
            alert('Passwords do NOT match!')
            password.value = ''
            passwordConfirm.value = ''
        }
    } 
    
})



