import style from "./register_page.module.css"
function Register(){
    return (
        <div className={style["login-container"]}> {/* Fix class name */}
                    <h2>Sign Up</h2>
                    <form>
                        <input className={style["name-box"]} type="text" placeholder="Username" />
                        <br />
                        <input className={style["password-box"]} type="password" placeholder="Password" />
                    </form>
                    <button>Create Account</button>
                    <p>Already have an account</p>
                    <a href="">Login here</a>
                </div>
    )

}

export default Register;