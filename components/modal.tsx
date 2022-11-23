import { Children } from 'react'
import styles from '../styles/components/Modal.module.scss'

export const Modal = ({children, setPage} : any ) => {

    const nextPage = () => {
        setPage((currPage : any) => currPage + 1 )
    }

    const backPage = () => {
        setPage((currPage : any) => currPage - 1 )
    }

    return(
        <>
            <div className={styles.modal}>
                <div className={styles.modal__background}>
                </div>

                <div className={styles.modal__container}>
                    <div className={styles.top}>
                        <div className={styles.top__secured}>
                            Seguro
                        </div>

                        <div className={styles.top__close}>
                            X
                        </div>
                    </div>
                    {children}

                    <div className={styles.buttons}>
                        <button onClick={backPage}>Atras</button>
                        <button onClick={nextPage}>Siguiente</button>
                    </div>
                </div>


            </div>
        </>
    )
}