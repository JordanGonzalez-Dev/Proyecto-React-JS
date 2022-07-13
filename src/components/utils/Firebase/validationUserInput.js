import Swal from 'sweetalert2';

export const validationUserInput = (userInput) => {
    
    if (userInput.nombre.length < 4) {
        Swal.fire({
            icon: 'error',
            title: 'Nombre invalido'
        })

        return false
    }

    if (userInput.apellido.length < 4) {
        Swal.fire({
            icon: 'error',
            title: 'Apellido invalido'
        })

        return false
    }

    if (userInput.email.length < 7) {
        Swal.fire({
            icon: 'error',
            title: 'Email invalido'
        })

        return false
    }

    return true
}