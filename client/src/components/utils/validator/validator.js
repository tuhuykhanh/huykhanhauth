
export const isEmpty = value => {
    if(!value) return true
    return false
}
export const isEmail = email => {
    return String(email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
export const isLength = password => {
    if(password.length < 6) return true
    return false
}
export const isMatch = (password , confirm_pass) => {
    if(password !== confirm_pass ) return true
    return false
}

