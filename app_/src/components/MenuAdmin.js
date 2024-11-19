import Link from "next/link";

export default function MenuAdmin() {
    return (
    <div className="nav-bar d-flex">
      <div className="d-flex justify-content-start">
        <div className="p-2"><Link className="navbar-brand" href="#">Admin</Link></div>
        <div className="p-2"><Link className="nav-link" href="/admin/users">Usuários</Link></div>
        <div className="p-2"><Link className="nav-link" href="/admin/events">Eventos</Link></div>
        <div className="p-2"><Link className="nav-link" href="/admin/students">Estudantes</Link></div>
        <div className="p-2"><Link className="nav-link" href="/admin/professionals">Profissionais</Link></div>
        <div className="p-2"><Link className="nav-link" href="/admin/teachers">Professores</Link></div>
        <div className="p-2"><Link className="nav-link" href="/admin/appointments">Agendamentos</Link></div>
      </div>
    </div>

    )
}