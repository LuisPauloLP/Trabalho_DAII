import Link from "next/link";

export default function MenuAppointments() {
    return (

<div className="nav-bar d-flex">
    <div className="d-flex justify-content-start">
        <div className="p-2"><Link className="navbar-brand" href="/admin">Admin</Link></div>
        <div className="p-2"><Link className="nav-link" href="/admin/appointments">Agendamentos</Link></div>
        <div className="p-2"><Link className="nav-link" href="/admin/appointments/create">Novo Agendamento</Link></div>
    </div>
</div>
    )
}