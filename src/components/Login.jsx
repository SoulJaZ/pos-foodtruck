import React, { useState } from 'react'
import { auth } from "../credenciales";
import { 
    signInWithEmailAndPassword,
     createUserWithEmailAndPassword, 
     signOut, 
     updateProfile
} from 'firebase/auth';



/* LOGICA */
const Login = ({usuario, setUsuario}) => {
    
    // Hooks para manejar  el estado de la data recibida de los inputs.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [estaRegistrado, setEstaRegistrado] = useState(false);
    const [error, setError] = useState(null); // Manejo de errores   
    
    // Función que maneja el envio de la data del formulario del login.
    const manejarEnvio = async(e) =>{
        e.preventDefault();
        try {

            // Variable para credenciales del usuario.
            let credencialesUsario;
            
            // Condición para saber si el usuario ya está registrado. 
            if (estaRegistrado) {
                credencialesUsario = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                credencialesUsario = await signInWithEmailAndPassword(auth, email, password);
            }

            // pasar el valor de la variable credencialesUsuario al parámetro de setUsuario en la función Login.
            setUsuario(credencialesUsario.user)
            setError(null); // Resetear errores si el login es exitoso
        } catch (error) {
            console.error("Error: ", error.message);
        }
    }
    console.log("Usuario actual:", setUsuario);
    const handleLogout = async () => {
        await signOut(auth);
        setUsuario(null);
      };

  return (
    <div className='container-fluid d-flex justify-content-center align-items-center vh-100 animate__animated animate__fadeIn'
    style={{
        backgroundImage: "url('/fondo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className='card p-4 shadow-lg rounded-5 animate__animated animate__fadeInDown' 
      style={{ maxWidth: "400px", width: "100%", background: "rgba(255, 255, 255, 0.9)"}}>
        <h2 className='text-center text-primary fw-bold mb-3'>
            {estaRegistrado ? "Registro" : "Iniciar Sesión"}
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={manejarEnvio}>
            <div className='mb-3'>
                <label className='form-label fw-semibold'>Correo eletrónico </label>
                
                <input
                    type='email'
                    className='form-control my-2'
                    placeholder='Ingresa tu correo'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className='mb-3'>
                <label className="form-label fw-semibold">Contraseña</label>
                <input
                    type='Password'
                    className='form-control my-2'
                    placeholder='Contraseña'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />                
            </div>

           

            <button type="submit" className='btn btn-primary w-100 shadow-sm'> 
                {estaRegistrado ? "Registrarse" : "Iniciar Sesión"}
            </button>
        </form>
        <button className='btn btn-link w-100 mt-2 text-decoration-none' onClick={() => setEstaRegistrado(!estaRegistrado)}>
            {estaRegistrado ? "¿Ya tienes una cuenta? Iniciar Sesión." : "¿No tienes cuenta? Resgistrarse"}
        </button>
        {usuario && (
            <button className="btn btn-danger w-100 mt-2" onClick={handleLogout}>
                Cerrar Sesión
            </button>
        )

        }
      </div>
    </div>
  )
}

export default Login
