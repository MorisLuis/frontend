import React, { CSSProperties, useEffect } from 'react'
import styles from '../styles/Modal.module.scss'

interface Props {
    visible: boolean,
    title?: string,
    onClose?: () => void,
    onOk?: () => void,
    onCancel?: () => void,
    children: JSX.Element,
    header?: JSX.Element,
    bodyStyle?: CSSProperties,
    loadingState?: boolean
}

export const Modal = ({ onClose, visible, children, bodyStyle, loadingState }: Props) => {

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }, [visible])


    return visible ?
        <div className="modal-root">
            <div onClick={() => {
                onClose && onClose()
            }} className={styles.modalBackdrop} />
            <div className={styles.modal}>
                <div onClick={() => {
                    if (loadingState) {
                        return
                    }
                    if (onClose) {
                        onClose()
                    }
                }} className={styles.modalClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <div style={{ ...bodyStyle }} className={styles.modalBody}>
                    {children}
                </div>
            </div>
        </div> :
        null
}
