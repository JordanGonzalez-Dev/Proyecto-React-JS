const customFetch = (time, task) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (task) {
                resolve(task)
            } else {reject("Hubo un problema")}
        }, time)
    })
}

export default customFetch;