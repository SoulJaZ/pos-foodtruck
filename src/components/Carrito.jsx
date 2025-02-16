import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';

const Carrito = ({ cartItems, delToCart, saveInfo }) => {

    const Subtotal = cartItems.reduce((a, c) => a + c.quantity * c.precio, 0);

    return (
        <div className='card card-body mt-1 shadow-lg rounded-8 bg-dark'>
            <h3 className="text-center fw-bold text-primary">🛒 Orden de Compra</h3>
            <ul className='list-group list-group-flush'>
            {cartItems.length === 0 ? (
                <p className="text-center text-muted">El carrito está vacío</p>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id} className='list-group-item bg-dark d-flex justify-content-between align-items-center border-bottom py-2'>
                        <div className="d-flex align-items-center gap-2">
                            <button 
                                className="btn btn-outline-danger btn-sm rounded-circle d-flex align-items-center justify-content-center" 
                                onClick={() => delToCart(item)}
                                style={{ width: "30px", height: "30px" }}>
                                <i className="bi bi-trash"></i>
                            </button>
                            <strong className="text-white">{item.name}</strong>
                        </div>
                        <p className="mb-0 text-white badge">x{item.quantity}</p>
                    </div>
                ))
            )}
            </ul>
            

            <div className='mt-3'>
                <h5 className="text-success text-center fw-bold">
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}): ${Subtotal}
                </h5>
            </div>

            <button 
                className={`btn w-100 mt-3 rounded-3 ${cartItems.length ? "btn-success" : "btn-secondary"}`} 
                onClick={cartItems.length ? saveInfo : null} 
                disabled={!cartItems.length}>
                <i className="bi bi-save"></i> Guardar Venta
            </button>
        </div>
    )
}

export default Carrito;
