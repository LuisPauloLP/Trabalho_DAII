import Link from "next/link";

export default function UserAction(props) {
    return (
        <>
            <Link className="btn btn-outline-success btn-sm" href={`/admin/users/read/${ props.pid }`}>Visualizar</Link>
            <Link className="btn btn-outline-primary btn-sm" href={`/admin/users/update/${ props.pid }`}>Editar</Link>
            <Link className="btn btn-outline-danger btn-sm" href={`/admin/users/delete/${ props.pid }`}>Deletar</Link>
        </>
    )
}
