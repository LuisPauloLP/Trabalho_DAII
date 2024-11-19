import Link from "next/link";

export default function NavAdmin() {
    return (

        <nav id="nav">
           
            <Link id="nav-title" href="#"><h2>Gerenciamento de Ensino Especial</h2></Link>
            <div id="login">
                    <Link id="nav-login" href="/">Logout</Link>
            </div>   

        </nav>
    )
}
