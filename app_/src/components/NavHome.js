import Link from "next/link";

export default function NavHome() {
    return (

        <nav className="navbar navbar-light bg-warning justify-content-between p-2">
           
            <Link className="navbar-brand" href="#"><h2>Base de Conhecimentos</h2></Link>
            <div className="form-group">
                    <Link className="btn btn-success" href="/login">Login</Link>
            </div>   

        </nav>
    )
}