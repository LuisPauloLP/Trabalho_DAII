import NavAdmin from '@/components/NavAdmin'
import MenuAppointments from '@/components/MenuAppointments'; 
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function UpdateAppointment() {

  const API_URL = "http://localhost:3030/api/appointments/"

  const [appointment, setAppointment] = useState({
    appointment_id: "",
    appointment_student_name: "",
    appointment_student_surmane: "",
    appointment_professional_name: "",
    appointment_professional_surname: "",
    appointment_professional_speciality: "",
    appointment_date: "",
    appointment_time: "",
    appointment_comments: "",
    appointment_create_date: ""
  });

  const router = useRouter();
  const [pid] = useState(router.query.pid);

  const [message, setMensage] = useState({ message: "", status: "" });

  useEffect(() => {
    const getAppointment = async () => {
      try {
        const response = await Axios.get(API_URL + pid);
        const fetchedAppointment = response.data.foundedAppointment;

        if (fetchedAppointment.appointment_date) {
          fetchedAppointment.appointment_date = new Date(fetchedAppointment.appointment_date).toISOString().split("T")[0];
        }

        setMensage({ message: response.data.message, status: "ok" });
        setAppointment(response.data.foundedAppointment);
      } catch (error) {
        console.error('Erro ao buscar os agendamentos:', error);
        setMensage({ message: "Erro ao buscar os agendamentos!", status: "error" });
      }
    };

    getAppointment();

  }, []);

  const handleChange = (evento) => {
    const { name, value } = evento.target;
    setAppointment({
      ...appointment,
      [name]: value
    });
  };

  const handleUpdateAppointment = async () => {
    try {

      const appointmentData = {
        appointment_id: appointment.appointment_id,
        appointment_student_name: appointment.appointment_student_name,
        appointment_student_surmane: appointment.appointment_student_surmane,
        appointment_professional_name: appointment.appointment_professional_name,
        appointment_professional_surname: appointment.appointment_professional_surname,
        appointment_professional_speciality: appointment.appointment_professional_speciality,
        appointment_date: appointment.appointment_date,
        appointment_time: appointment.appointment_time,
        appointment_comments: appointment.appointment_comments,
        appointment_create_date: appointment.appointment_create_date
      };

      const response = await Axios.put(API_URL + pid, { appointment: appointmentData });
      setMensage({ message: response.data.message, status: "ok" });
    } catch (error) {
      console.error('Erro ao alterar o agendamento:', error);
      setMensage({ message: "Erro ao alterar o agendamento!", status: "error" });
    }
  };

  return (
    <>
      <Head>
        <title>Alterar Agendamento</title>
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

      <div >
        <div className="container">
          <div className="row border-bottom">
            <h3> Edição do Agendamento </h3>

            <form method="POST">
                <div className="form-group">
                    <label className="form-label" htmlFor="appointment_student_name">Nome do Estudante</label>
                    <input type="text" id="appointment_student_name" name="appointment_student_name" className="form-control" value={appointment.appointment_student_name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="appointment_student_surmane">Sobrenome do Estudante</label>
                    <input type="text" id="appointment_student_surmane" name="appointment_student_surmane" className="form-control" value={appointment.appointment_student_surmane} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="appointment_professional_name">Nome do Profissional</label>
                    <input type="text" id="appointment_professional_name" name="appointment_professional_name" className="form-control" value={appointment.appointment_professional_name} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="appointment_professional_surname">Sobrenome do Profissional</label>
                    <input type="text" id="appointment_professional_surname" name="appointment_professional_surname" className="form-control" value={appointment.appointment_professional_surname} onChange={handleChange}/>
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
                    <label className="form-label" htmlFor="appointment_time">Hora</label>
                    <input type="time" id="appointment_time" name="appointment_time" className="form-control" value={appointment.appointment_time} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="appointment_comments">Comentários sobre o Agendamento</label>
                    <input type="text" id="appointment_comments" name="appointment_comments" className="form-control" value={appointment.appointment_comments} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="appointment_create_date">Data de Criação</label>
                    <input type="text" id="appointment_create_date" name="appointment_create_date" className="form-control" value={appointment.appointment_create_date} onChange={handleChange}/>
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