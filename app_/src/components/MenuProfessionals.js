import Link from "next/link";

export default function MenuProfessionals() {
    return (
        <div className="d-flex justify-content-start">
            <div className="p-2"><Link className="navbar-brand" href="/admin">Admin</Link></div>
            <div className="p-2"><Link className="nav-link" href="/admin/professionals">Profissionais</Link></div>
            <div className="p-2"><Link className="nav-link" href="/admin/professionals/create">Novo</Link></div>
        </div>
    );
}