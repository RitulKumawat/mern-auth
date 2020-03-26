import axios from 'axios'

// Headers
const config = {
    headers : {
        'Content-Type' : 'application/json'
    }
}

// Login the user in

export const login = (data, callback) => {
    
    const { email, password, token } = data;
    
    // Request body
    const body = JSON.stringify({ email, password, token})

    axios
        .post('/api/auth', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback === "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

// Register new User

export const register = (user, callback) => {

    const {email, name , password} = user;

    //Request body
    const body = JSON.stringify({email, name, password})

    axios
        .post('/api/users', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}