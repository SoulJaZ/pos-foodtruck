import { useContext, useEffect, useState } from "react";
import "./App.css";
import data from "./data";
import { Store } from "./utils/Store";
import { app, auth } from "./credenciales";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import ListaProductos from "./components/ListaProductos";
import Carrito from "./components/Carrito";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { onAuthStateChanged, signOut } from "firebase/auth";

const db = getFirestore(app);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const noSubscrito = onAuthStateChanged(auth, (usarioActual) => {
      console.log("Usuario detectado:", usarioActual);

      setUser(usarioActual);
    });
    return () => noSubscrito();
  }, []);

  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  // Función para agregar productos al carrito.
  const addToCart = (id) => {
    const product = data.products.find((x) => x.id === id);
    const existItem = state.cart.cartItems.find((x) => x.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
  };

  // Función para eliminar un producto del carrito.
  const delToCart = (id) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: id });
  };

  // Función es para guarda la venta en Firebase
  const saveInfo = async () => {
    if (cartItems.lenght === 0) {
      alert("El carrito está vacío. Agrega productos antes de continuar.");
      return;
    }

    // Validación de cantidad.

    const cantidadInvalida = cartItems.some((item) => item.quantity <= 0);
    if (cantidadInvalida) {
      alert("Uno o más productos tienen una cantidad inválida.");
      return;
    }
    try {
      await addDoc(collection(db, "ventas"), {
        items: cartItems,
        subtotal: Subtotal, // Estandarizar la clave
      });
    } catch (error) {
      alert("Ocurrio un error");
      console.log(error);
    }
    dispatch({ type: "REMOVE_CART" });
    alert("guardado con exito!");
  };
  const Subtotal = cartItems.reduce((a, c) => a + c.quantity * c.precio, 0);

  return (
    <div>
      {user ? (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 bg-light shadow-sm rounded">
                <h3 className="text-primary fw-bold mb-2 mb-md-0">
                  Bienvenido 🎉 
                </h3>
                <button
                  className="btn btn-outline-danger btn-lg fw-bold px-4 py-2 transition"
                  onClick={() => signOut(auth)}
                >
                  Cerrar Sesión
                </button>
              </div>
              <div className="col-12 col-md-8">
                <h1 className="text-center mt-2 mb-5 text-primary fw-bold">
                  Lista de Productos
                </h1>
                {/* esta sección es para la parte de productos. 
            <h1 className="text-center mt-4 mb-5">Lista de productos.</h1>
            <div className="row row-cols-1 row-cols-md-3 g-3">
              {
                data.products.map(product => (
                  <div key={product.id}>
                    <img src={product.image} alt="Imagen del producto" height={250} width="100%" />
                    <h3>{product.name}</h3>
                    <h5>{product.precio}$</h5>
                    <button className="btn btn-primary" onClick={()=> addToCart(product.id)}>Agregar</button>
                  </div>
                ))
              }
            </div>
            */}
                <ListaProductos data={data} addToCart={addToCart} />
              </div>
              <div className="col-12 col-md-4">
                {/* esta sección es para la orden de compra. 
                        <div className="card card-body mt-5">
              <h3 className="text-center">Orden de compra</h3>
              {
                cartItems.map((item) =>(
                  <div key={item.id}>
                    <p>
                      <button className="btn btn-danger" onClick={()=> delToCart(item)}>
                        X
                      </button>
                      <strong>{item.name}</strong>
                      </p>
                    <p>Cantidad: {item.quantity}</p>
                  </div>
                ))
              }
              <div>
                Subtotal: ({cartItems.reduce((a, c) =>a + c.quantity, 0)}): $
                {
                  cartItems.reduce((a, c)=> a + c.quantity * c.precio, 0)
                }
              </div>
              {cartItems.length ? (
                <button className="btn btn-success" onClick={saveInfo}>
                  Guardar Venta
                  </button> ) : (
                    <button className="btn btn-secondary">Guardar Venta</button>
                  )}
            </div>
            */}

                <Carrito
                  user={user}
                  cartItems={cartItems}
                  delToCart={delToCart}
                  saveInfo={saveInfo}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Login setUsuario={setUser} user={user} />
      )}
      <Footer />
    </div>
  );
}

export default App;

// Recomendaciones para escalabilidad:
// - Extraer los componentes en archivos separados para modularidad (ListaProductos, Carrito, Footer)
// - Centralizar la gestión de datos con un servicio API en lugar de manejar `data.js` localmente
// - Agregar autenticación de usuarios para manejar ventas por empleado
// - Implementar validaciones antes de enviar la orden a Firebase
// - Optimizar las imágenes con un sistema de almacenamiento en la nube
