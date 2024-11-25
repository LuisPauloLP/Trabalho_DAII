import Link from "next/link";

export default function ProfessionalAction(props) {
    return (
        <>
            <Link className="btn btn-outline-success btn-sm" href={`/admin/professionals/read/${props.pid}`}>Visualizar</Link>
            <Link className="btn btn-outline-primary btn-sm" href={`/admin/professionals/update/${props.pid}`}>Editar</Link>
            <Link className="btn btn-outline-danger btn-sm" href={`/admin/professionals/delete/${props.pid}`}>Deletar</Link>
        </>
    );
}