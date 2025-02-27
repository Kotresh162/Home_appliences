import style from "./login_page.module.css";

export default function Login() {
    return (
        <div className={style["login-container"]}> {/* Fix class name */}
            <h2>Sign In</h2>
            <form>
                <input className={style["name-box"]} type="text" placeholder="Username" />
                <br />
                <input className={style["password-box"]} type="password" placeholder="Password" />
            </form>
            <button>Log In</button>
            <p>Don't have account</p>
            <a href="">Register here</a>
        </div>
    );
}
