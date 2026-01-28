import { useState } from 'react'
import './login.css'
import logo from '../assets/logoColegio.png'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return 'El correo electrónico es obligatorio';
        }
        if (!emailRegex.test(email)) {
            return 'Por favor ingrese un correo electrónico válido';
        }
        return '';
    };

    const validatePassword = (password) => {
        if (!password) {
            return 'La contraseña es obligatoria';
        }
        if (password.length < 6) {
            return 'La contraseña debe tener al menos 6 caracteres';
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validate on change if field has been touched
        if (touched[name]) {
            if (name === 'email') {
                setErrors(prev => ({
                    ...prev,
                    email: validateEmail(value)
                }));
            } else if (name === 'password') {
                setErrors(prev => ({
                    ...prev,
                    password: validatePassword(value)
                }));
            }
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        // Validate on blur
        if (name === 'email') {
            setErrors(prev => ({
                ...prev,
                email: validateEmail(value)
            }));
        } else if (name === 'password') {
            setErrors(prev => ({
                ...prev,
                password: validatePassword(value)
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        setErrors({
            email: emailError,
            password: passwordError
        });

        setTouched({
            email: true,
            password: true
        });

        // If no errors, submit the form
        if (!emailError && !passwordError) {
            console.log('Form submitted:', formData);
            // Here you would typically handle login logic
            alert('Inicio de sesión exitoso!');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="logo-container">
                    <img className="logo" src={logo} alt="logo" />
                </div>

                <div className="login-header">
                    <h1 className="login-title">Bienvenido</h1>
                    <p className="login-subtitle">Inicia sesión en tu cuenta</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Correo Electrónico
                        </label>
                        <div className="input-wrapper">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="ejemplo@correo.com"
                                className={`form-input ${errors.email && touched.email ? 'input-error' : ''} ${formData.email && !errors.email ? 'input-success' : ''}`}
                                required
                            />
                            <span className="input-icon">📧</span>
                        </div>
                        {errors.email && touched.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Contraseña
                        </label>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="••••••••"
                                className={`form-input ${errors.password && touched.password ? 'input-error' : ''} ${formData.password && !errors.password ? 'input-success' : ''}`}
                                required
                            />
                            <span className="input-icon">🔒</span>
                        </div>
                        {errors.password && touched.password && (
                            <span className="error-message">{errors.password}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={!formData.email || !formData.password}
                    >
                        Iniciar Sesión
                    </button>

                    <div className="login-footer">
                        <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login
