import { Link } from "react-router-dom"
import "./HomePage.css"

export const HomePage = () => {
    return (
        <>
            <main>
                <h1 className="title">
                    Bienvenidos a Gameware
                </h1>
                <section className="homeDesc">
                    <h3>
                        GAMEWARE es el sitio de Gaming que estabas buscando. Lo último en
                        Componentes de PC, Juegos, Consolas, Periféricos y Muebles, los
                        encontrás acá, en exclusiva con nuestros Sponsors oficiales.
                    </h3>
                    <Link className="btnProducts" to="/products">
                    Ver Productos
                    </Link>
                </section>
            </main>
        </>
    )
}