import Link from "next/link";

export default function MenuEvents() {
    return (

    <div className="d-flex justify-content-start">
        <div className="p-2"><Link className="navbar-brand" href="/admin">Admin</Link></div>
        <div className="p-2"><Link className="nav-link" href="/admin/users">Eventos</Link></div>
        <div className="p-2"><Link className="nav-link" href="/admin/users/create">Novo</Link></div>
    </div>

    )
}