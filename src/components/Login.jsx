/* 
    form
    username, password, submit button
    onSubmit => get JWT and store it in local storage
*/

function Login() {
    return (
        <form className="form--main">
            <input 
                type="text" 
                placeholder="Username" 
                id="username"
                value={uname}
                onChange={}
            />
            <input 
                type="text" 
                placeholder="Password" 
                id="password"
            />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login