import Link from "next/link";

export default function NavHome() {
    return (
        <div>
            <nav id="nav">
            <Link id="nav-title" href="#">
                <h2>Gerenciamento de Ensino Especial</h2>
            </Link>
            <div id="login">
                <Link id="nav-login" href="/login">Login</Link>
            </div>
        </nav>
        </div>
    );
}
