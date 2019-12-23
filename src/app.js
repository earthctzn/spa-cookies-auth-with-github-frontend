class App{


    constructor(container){
        this.container = container
        this.baseURL = 'http://localhost:3000'
        this.initBindingsAndEventListeners()
        this.authSetup()
        this.csrf = null
    }

    get headers(){
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': this.csrf
        }
    }

    async authSetup(){
        const res = await fetch(`${this.baseURL}/auth-check`,{
            credentials: 'include'
        })
        const body = await res.json()
        this.csrf = body.csrf_auth_token
    }

    initBindingsAndEventListeners(){
        this.loginBtn = document.querySelector('#login')
        this.logoutBtn = document.querySelector('#logout')
        this.signupBtn = document.querySelector('#signup')
        this.emailField = document.querySelector('#email')
        this.passwordField = document.querySelector('#password')
        this.loginBtn.addEventListener('click', this.login.bind(this))
        this.logoutBtn.addEventListener('click', this.logout.bind(this))
        this.signupBtn.addEventListener('click', this.signup.bind(this))
        this.getContentBtn = document.querySelector('#getContent')
        this.getContentBtn.addEventListener('click', this.getContent.bind(this))
    }


    async login(){
        const res = await fetch(`${this.baseURL}/login`, {
            method: "POST",
            headers: this.headers,
            credentials: 'include',
            body: JSON.stringify({
                user: {
                    email: this.emailField.value,
                    password: this.passwordField.value
                }
            })
        })

        const body = await res.json()
        this.container.innerHTML = JSON.stringify(body)
        this.emailField.innerHTML = ''
        this.passwordField.innerHTML = ''
    }
    

    async signup(){
        const res = await fetch(`${this.baseURL}/signup`, {
            method: "POST",
            headers: this.headers,
            credentials: 'include',
            body: JSON.stringify({
                user: {
                    email: this.emailField.value,
                    password: this.passwordField.value
                }
            })
        })

        const body = await res.json()
        this.container.innerHTML = JSON.stringify(body)
        this.emailField.innerHTML = ''
        this.passwordField.innerHTML = ''
    }

    async logout(){
        const res = await fetch(`${this.baseURL}/logout`, {
            method: "DELETE",
            headers: this.headers,
            credentials: 'include'
        })
        this.authSetup()
    }

    async getContent(){
        const res = await fetch(this.baseURL, {
            headers: this.headers,
            credentials: 'include'
        })
        const data = await res.json()
        this.container.innerHTML = JSON.stringify(data)
    }

    checkStatus(res){
        if(res.status < 200 || res.status > 299){
            throw { errer: res.status}
        }
    }

}