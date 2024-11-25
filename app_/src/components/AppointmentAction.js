import Link from "next/link";

export default function AppointmentAction(props) {
    return (
        <>
            <Link className="btn btn-outline-success btn-sm" href={`/admin/appointments/read/${props.pid}`}>Visualizar</Link>
            <Link className="btn btn-outline-primary btn-sm" href={`/admin/appointments/update/${props.pid}`}>Editar</Link>
            <Link className="btn btn-outline-danger btn-sm" href={`/admin/appointments/delete/${props.pid}`}>Deletar</Link>
        </>
    );
}