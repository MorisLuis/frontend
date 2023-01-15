import Link from 'next/link'
import React from 'react'

export const OrderConfirmationModal = () => {
  return (
    <div className="backdrop">
      <div className='empty confirmation'>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <h2>¡Pago exitoso!</h2>
          <span>En breve recibiras un correo con la confirmación y detalles de tu compra. Si no ves el correo recuerda revisar tu spam</span>
          <br />
        </div>
        <Link className='btn btn-red' replace href='/'>
          Volver a inicio
        </Link>
      </div>
    </div>
  )
}
