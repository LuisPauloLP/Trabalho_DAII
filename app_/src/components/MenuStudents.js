import Link from "next/link";

export default function MenuStudents() {
    return (

<div className="nav-bar d-flex">
    <div className="d-flex justify-content-start">
        <div className="p-2"><Link className="navbar-brand" href="/admin">Admin</Link></div>
        <div className="p-2"><Link className="nav-link" href="/admin/students">Estudantes</Link></div>
        <div className="p-2"><Link className="nav-link" href="/admin/students/create">Novo Estudante</Link></div>
    </div>
</div>
    )
}