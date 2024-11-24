import NavAdmin from '@/components/NavAdmin';
import MenuAppointments from '@/components/MenuAppointments';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';
import MenuAppointments from '../../../../components/MenuAppointments';

export default function ReadAppointments() {
  const API_URL = "http://localhost:8080/api/appointments/";

  const [appointment, setAppointment] = useState({
    appointment_id: "",
    appointment_student_name: " ",
    appointment_professional_name: " ",
    appointment_professional_speciality: "",
    appointment_date: " ",
    appointment_comments: " ",
    appointment_create_date: " "
  });

  const router = useRouter();
  const { pid } = router.query;

  const [message, setMessage] = useState({ message: "", status: "" });

  useEffect(() => {
    if (pid) {
      const getAppointment = async () => {
        try {
          const response = await Axios.get(API_URL + pid);
          setAppointment(response.data.foundedAppointment);
          setMessage({ message: response.data.message, status: "ok" });
        } catch (error) {
          console.error('Erro ao buscar o agendamento:', error);
          setMessage({ message: "Erro ao buscar o agendamento!", status: "error" });
        }
      };
      getAppointment();
    }
  }, [pid]);

  return (
    <>
      <Head>
        <title>Detalhes do Agendamento</title>
        <meta name="description" content="Detalhes do Agendamento" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuAppointments />
        {
          message.status === "" ? "" :
            message.status === "ok" ? "" :
              <div className='alert alert-danger' role='alert'> {message.message} <Link className='alert-link' href='/admin/appointments'>Voltar</Link></div>
        }
      </div>

      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            <h3>Detalhes do Agendamento</h3>

            <form>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_name">Nome do Estudante</label>
                    <input type="text" id="student_name" name="student_name" className="form-control" value={appointment.appointment_student_name} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="appointment_professional_name">Nome do Profissional</label>
                    <input type="text" id="appointment_professional_name" name="appointment_professional_name" className="form-control" value={appointment.appointment_professional_name} readOnly/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="appointment_professional_speciality">Especialidade do Profissional</label>
                    <input type="text" id="appointment_professional_speciality" name="appointment_professional_speciality" className="form-control" value={appointment.appointment_professional_speciality} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="appointment_date">Data do Agendamento</label>
                    <input type="date" id="appointment_date" name="appointment_date" className="form-control" value={appointment.appointment_date} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="appointment_comments">Comentários sobre o Agendamento</label>
                    <input type="text" id="appointment_comments" name="appointment_comments" className="form-control" value={appointment.appointment_comments} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="appointment_create_date">Data de Criação</label>
                    <input type="date" id="appointment_create_date" name="appointment_create_date" className="form-control" value={appointment.create_date} readOnly />
                </div>
                <div className="form-group p-2">
                    <Link className="btn btn-outline-info" href="/admin/appointments">Voltar</Link>
                </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}