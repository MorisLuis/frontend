import Image from "next/image"
import Link from "next/link"
import { useContext, useState } from "react"
import { AuthContext } from "../context/auth"
import { UIContext } from "../context/ui"
import styles from "../styles/components/NavBar.module.scss"

export const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false)
    const openMenu = () => setIsOpen(!isOpen);

    const { user } = useContext(AuthContext)

    const { setSearchVisible, setVisible, setModalType } = useContext(UIContext)

    return (

        <>
            <div className={styles.navbar}>
                <div className={styles.navbar__logo}>
                    <Link href='/'>
                        <Image
                            style={{
                                objectFit: 'contain'
                            }}
                            src='/4orium-logo.png' width={150} height={150}
                            alt='4orium logo'
                        />
                    </Link>
                </div>

                <div
                    className={styles.navbar__menu}
                    onClick={openMenu}
                >
                    Menu
                </div>
            </div>

            <div className={!isOpen ? styles.menu + ' ' + styles.close : styles.menu}>
                <div
                    className={styles.menu__close}
                    onClick={openMenu}
                >
                    <p>X</p>
                </div>

                <div className={styles.menu__navbar}>
                    {
                        user.token ?
                            <div className={styles.section}>
                                <p className={styles.section__title}>Perfil</p>
                                <Link href={"/account?tab=orders"} className={styles.section__link}>
                                    Mis boletos
                                </Link>

                                <Link href={"/account"} className={styles.section__link}>
                                    Mi cuenta
                                </Link>
                            </div> :
                            <div className={styles.section}>
                                <p className={styles.section__title}>Perfil</p>
                                <div onClick={() => {
                                    setVisible(true)
                                    setModalType('login')
                                    setIsOpen(false)
                                }} className={styles.section__link}>
                                    Iniciar sesión
                                </div>

                                <div onClick={() => {
                                    setVisible(true)
                                    setModalType('sign-up')
                                    setIsOpen(false)
                                }} className={styles.section__link}>
                                    Regístrate
                                </div>
                            </div>
                    }

                    <div className={styles.section}>
                        <p className={styles.section__title}>4orium</p>
                        <Link href={"/"} className={styles.section__link}>
                            Eventos
                        </Link>

                        {/* <Link href={"#"} className={styles.section__link}>
                            Como llegar
                        </Link> */}
                    </div>
                </div>

                <div className={styles.banner}>
                    <Image
                        alt="" width={100} height={100} src='/grid.png' style={{
                            objectFit: 'cover',
                            display: 'block'
                        }} />
                </div>
            </div>
        </>

    )

}