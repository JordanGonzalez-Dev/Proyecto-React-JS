const elFetch = (time, task) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve ? resolve(task) : reject("Hubo un problema")
        }, time)
    })
}

export default elFetch;