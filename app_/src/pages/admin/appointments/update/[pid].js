import NavAdmin from '@/components/NavAdmin'
import MenuAppointments from '@/components/MenuAppointments'; 
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';
import MenuAppointments from '../../../../components/MenuAppointments';

export default function UpdateAppointment() {

  const API_URL = "http://localhost:8080/api/appointments/"

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
  const [pid] = useState(router.query.pid);

  const [message, setMensage] = useState({ message: "", status: "" });

  useEffect(() => {
    const getAppointment = async () => {
      try {
        const response = await Axios.get(API_URL + pid);
        setMensage({ message: response.data.message, status: "ok" });
        setAppointment(response.data.foundedAppointment);
      } catch (error) {
        console.error('Erro ao buscar os agendamentos:', error);
        setMensage({ message: "Erro ao buscar os agendamentos!", status: "error" });
      }
    };

    getAppointment();

  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppointment({
      ...appointment,
      [name]: value
    });
  };

  const handleUpdateAppointment = async () => {
    try {
      const response = await Axios.put(API_URL + pid, { appointment });
      setMensage({ message: response.data.message, status: "ok" });
    } catch (error) {
      console.error('Erro ao alterar o agendamento:', error);
      setMensage({ message: "Erro ao alterar o agendamento!", status: "error" });
    }
  };

  return (
    <>
      <Head>
        <title>APP-BC | Alterar Agendamento</title>
        <meta name="description" content="Página para alterar agendamento" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuAppointments />
        {
          message.status === "" ? "" :
            message.status === "ok" ? <div className='alert alert-success' role='alert'> {message.message} <Link className='alert-link' href='/admin/appointments'>Voltar</Link></div> :
              <div className='alert alert-danger' role='alert'> {message.message} <Link className='alert-link' href='/admin/appointments'>Voltar</Link></div>
        }
      </div>

      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            <h3> Edição do Agendamento </h3>

            <form method="POST">
                <div className="form-group">
                    <label className="form-label" htmlFor="appointment_student_name">Nome do Estudante</label>
                    <input type="text" id="appointment_student_name" name="appointment_student_name" className="form-control" value={appointment.appointment_student_name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="appointment_professional_name">Nome do Profissional</label>
                    <input type="text" id="appointment_professional_name" name="appointment_professional_name" className="form-control" value={appointment.appointment_professional_name} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="appointment_professional_speciality">Especialidade do Profissional</label>
                    <input type="text" id="appointment_professional_speciality" name="appointment_professional_speciality" className="form-control" value={appointment.appointment_professional_speciality} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="appointment_date">Data do Agendamento</label>
                    <input type="date" id="appointment_date" name="appointment_date" className="form-control" value={appointment.appointment_date} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="appointment_comments">Comentários sobre o Agendamento</label>
                    <input type="text" id="appointment_comments" name="appointment_comments" className="form-control" value={appointment.appointment_comments} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="appointment_create_date">Data de Criação</label>
                    <input type="date" id="appointment_create_date" name="appointment_create_date" className="form-control" value={appointment.create_date} onChange={handleChange}/>
                </div>
                <div className="form-group p-2">
                    <button className="btn btn-outline-success" type="button" onClick={handleUpdateAppointment}>Salvar</button>
                    <Link className="btn btn-outline-info" href="/admin/appointments">Voltar</Link>
                </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
