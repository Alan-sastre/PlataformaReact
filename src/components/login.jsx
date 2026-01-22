import './login.css'
import logo from '../assets/logoColegio.png'

function Login() {
    return (
        <>
            {/* <h1 className="title">Login</h1> */}
            <img className="logo" src={logo} alt="logo" />
            <form className="form">
                <input type="text" placeholder="Usuario" className="input" />
                <input type="password" placeholder="Contraseña" className="input" />
                <button type="submit" className="button">Iniciar sesión</button>
            </form>
        </>
    );
}

export default Login