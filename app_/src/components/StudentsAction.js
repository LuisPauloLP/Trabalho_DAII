import Link from "next/link";

export default function StudentsAction(props) {
    return (
        <>
            <Link className="btn btn-outline-success btn-sm" href={`/admin/students/read/${ props.pid }`}>Visualizar</Link>
            <Link className="btn btn-outline-primary btn-sm" href={`/admin/students/update/${ props.pid }`}>Editar</Link>
            <Link className="btn btn-outline-danger btn-sm" href={`/admin/students/delete/${ props.pid }`}>Deletar</Link>
        </>
    )
}
