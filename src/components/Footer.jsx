import React from 'react'

const Footer = () => {
  return (
      <footer className="bg-dark p-3 mt-5">
        <p className="text-center text-white m-0">
        © {new Date().getFullYear() + " "}
         todos los derechos reservados.
        </p>
      </footer>
  )
}

export default Footer
