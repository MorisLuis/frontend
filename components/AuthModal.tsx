import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { api } from '../api/api'
import { AuthContext } from '../context/auth'
import styles from '../styles/AuthModal.module.scss'
import Input from './Input'

interface Props {
  visible?: boolean,
  onClose?: () => void,
  type?: string
}

const AuthModal = ({ visible, onClose, type }: Props) => {

  const { register, handleSubmit, control, formState: { errors } } = useForm();

  const [modalType, setModalType] = useState(type)

  const { setUser } = useContext(AuthContext)

  const [resetPassword, setResetPassword] = useState(false)

  const [email, setEmail] = useState('')

  useEffect(() => {
    setModalType(type)
  }, [type])

  const [current, setCurrent] = useState(0)

  const signUp = async (data: any) => {
    if (current === 2) {
      const user = {
        ...data,
        name: `${data.firstName} ${data.lastName}`,
      }
      try {
        await api.post('/api/auth/sign-up', user)
        toast.success('Cuenta creada')
        setModalType('login')
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    } else {
      setCurrent(current + 1)
    }
  }

  const login = (data: any) => {
    api.post('/api/auth/login', data).then(({ data }) => {
      toast.success('Te damos la bienvenida')
      setUser(data)
      onClose && onClose()
      localStorage.setItem('token', data.token)
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
  }

  const handleResetPassword = async () => {
    try {
      await api.post('/api/auth/recover', { email })
      toast.success('Te hemos enviado un correo con las instrucciones para recuperar tu contraseña.')
      setResetPassword(false)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  return (
    visible ? <>
      {
        modalType === 'sign-up' ? <div className={styles.modalWrapper}>
          <div className={styles.backdrop}>
          </div>
          <div className={styles.modal}>
            <div className={styles.header}>
              <div className={styles.lines}>
                {
                  [0, 1, 2].map(line => (
                    <div key={line} className={
                      current >= line ? `${styles.line} ${styles.completed}` : styles.line
                    }></div>
                  ))
                }
              </div>
              <div
                onClick={onClose} className={styles.close}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <div className={styles.content}>
              <Image width={150} height={60} style={{
                objectFit: 'contain'
              }} src="/4orium-logo.png" alt="" />
              {
                current === 0 &&
                <>
                  <h2>¿Cuál es tu nombre?</h2>
                  <div className={styles.form}>
                    <div className="group">
                      <Input
                        required
                        name='firstName'
                        placeholder='Nombre(s)'
                        register={register}
                        errors={errors}
                      />
                    </div>
                    <div className="group">
                      <Input
                        required
                        name='lastName'
                        placeholder='Apellido(s)'
                        register={register}
                        errors={errors}
                      />
                    </div>
                  </div>
                </>
              }
              {
                current === 1 &&
                <>
                  <h2>¿Cuál es tu correo?</h2>
                  <div className={styles.form}>
                    <div className="group">
                      <Input
                        required
                        type='email'
                        name='email'
                        placeholder='Correo electrónico'
                        register={register}
                        errors={errors}
                      />
                    </div>

                  </div>
                </>
              }
              {
                current === 2 &&
                <>
                  <h2>Crea una contraseña</h2>
                  <div className={styles.form}>
                    <div className="group">
                      <Input
                        required
                        type='password'
                        name='password'
                        placeholder='Contraseña'
                        register={register}
                        errors={errors}
                      />
                    </div>

                  </div>
                </>
              }
              <button onClick={handleSubmit(signUp)} className='btn btn-red btn-block'>
                {
                  current === 2 ? 'Crear cuenta' : 'Siguiente'
                }
              </button>
              {
                current >= 1 &&
                <button onClick={() => {
                  setCurrent(current - 1)
                }} className='btn btn-link btn-block'>Regresar</button>
              }
              <span
                onClick={() => {
                  setModalType('login')
                }}
              >¿Ya tienes una cuenta? <span className={styles.pink}>Inicia sesión</span></span>
            </div>
          </div>
        </div> :
          <div className={styles.modalWrapper}>
            <div className={styles.backdrop}>
            </div>
            <div className={styles.modal}>
              <div className={styles.header}>
                <div
                  onClick={onClose} className={styles.close}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <div className={styles.content}>
                <Image width={150} height={60} style={{
                  objectFit: 'contain'
                }} src="/4orium-logo.png" alt="" />
                {
                  resetPassword ?

                    <><h2>Recuperar contraseña</h2>
                      <div className="reset-password">
                        <label>Escribe el correo que utilizaste cuando te registraste. Te enviaremos las instrucciones para recuperar tu contraseña. (Si no ves el correo revisa tu SPAM).</label>
                        <input
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                          }}
                          type="email" className="input block" />
                        <button

                          onClick={handleResetPassword}
                          className='btn btn-link btn-block'>Envíar</button>
                        <span
                          className='reset-password-back'
                          onClick={() => {
                            setResetPassword(false)
                          }}
                        >Regresar</span>
                      </div>
                    </>
                    :

                    <>
                      <h2>Inicia sesion en tu cuenta</h2>
                      <div className={styles.form}>
                        <div className="group">
                          <Input
                            required
                            type='email'
                            name='email'
                            placeholder='Correo eléctronico'
                            register={register}
                            errors={errors}
                          />
                        </div>
                        <div className="group">
                          <Input
                            type='password'
                            required
                            name='password'
                            placeholder='Contraseña'
                            register={register}
                            errors={errors}
                          />
                        </div>
                      </div>
                      <button onClick={handleSubmit(login)} className='btn btn-red btn-block'>Iniciar sesión</button>
                      <span
                        onClick={() => {
                          setModalType('sign-up')
                        }}
                      >¿No tienes cuenta? <span className={styles.pink}>Crea una ahora</span></span>
                      <span
                        onClick={() => {
                          setResetPassword(true)
                        }}
                      >¿Olvidaste tu contraseña?</span>
                    </>
                }
              </div>
            </div>
          </div>
      }
    </> : null
  )
}

export default AuthModal
