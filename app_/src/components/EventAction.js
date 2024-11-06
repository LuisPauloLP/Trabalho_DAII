import Link from "next/link";

export default function EventAction(props) {
    return (
        <>
            <Link className="btn btn-outline-success btn-sm" href={`/admin/events/read/${ props.pid }`}>Visualizar</Link>
            <Link className="btn btn-outline-primary btn-sm" href={`/admin/events/update/${ props.pid }`}>Editar</Link>
            <Link className="btn btn-outline-danger btn-sm" href={`/admin/events/delete/${ props.pid }`}>Deletar</Link>
        </>
    )
}