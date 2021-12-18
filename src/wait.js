exports.wait = (sec) => {
    return new Promise((resolve) => {
        setTimeout(resolve, sec)
    })
}
