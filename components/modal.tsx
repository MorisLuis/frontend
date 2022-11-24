import { CSSProperties, useEffect } from 'react'
import styles from '../styles/components/Modal.module.scss'

interface Props {
    visible: boolean,
    setPage: any,
    children: JSX.Element,
    bodyStyle?: CSSProperties,
}

export const Modal = ({children, setPage, visible} : Props ) => {

    const nextPage = () => {
        setPage((currPage : any) => currPage + 1 )
    }

    const backPage = () => {
        setPage((currPage : any) => currPage - 1 )
    }

    useEffect(() => {
        if (visible) {
            document.body.style.position = 'fixed'
        } else {
            document.body.style.position = ''
        }
    }, [visible])

    return visible ?
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
                </div>
            </div>
    : null
}