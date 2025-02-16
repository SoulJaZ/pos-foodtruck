import React from 'react'

const ListaProductos = ({data, addToCart}) => {
  return (
    
    <div className='row row-cols-1 row-cols-md-3 mt-8 g-3 border-4 rounded-4' style={{background: "#F3F4F6"}}>
      {data.products.map((product) => (
        <div key={product.id} className='col bg-light'>
            <div className='card shadow-sm border-0 rounded-4 '>
                <img src={product.image} 
                alt={product.name}
                className='card-img-top border-4 rounded-3' 
                style={{ height: "250px", objectFit: "cover" }}
                />
            </div>
          <div className='card-body text-center'>
            <h5 className='card-tittle text-dark fw-bold'>{product.name}</h5>
            <p className='card-text text-success fw-bold'>
            {product.precio}$
            </p>
          </div>
          <button 
          className="btn btn-primary w-100 rounded-3" 
          onClick={() => addToCart(product.id)}>
            <i className='bi bi-cart-plus'></i>Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  )
}
export default ListaProductos;