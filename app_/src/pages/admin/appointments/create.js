import NavAdmin from '@/components/NavAdmin';
import MenuAppointments from '@/components/MenuAppointments';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Axios from 'axios';

export default function CreateAppointment() {

  const API_URL = "http://localhost:3030/api/appointments";

  const [appointment, setAppointment] = useState({
    appointment_student_name: " ",
    appointment_student_surmane: " ",
    appointment_professional_name: " ",
    appointment_professional_surname: " ",
    appointment_professional_speciality: "",
    appointment_date: " ",
    appointment_comments: " ",
    appointment_create_date: " "
  });

  const [message, setMessage] = useState({ message: "", status: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppointment({
      ...appointment,
      [name]: value,
    });
  };

  const handleCreateAppointment = async () => {
    try {
      const response = await Axios.post(API_URL, { appointment });
      setMessage({ message: response.data.message, status: "ok" });
    } catch (error) {
      console.error('Erro ao criar o agendamento:', error);
      setMessage({ message: "Erro ao criar o agendamento!", status: "error" });
    }
  };

  return (
    <>
      <Head>
        <title>Cadastro de Agendamento</title>
        <meta name="description" content="Cadastro de agendamentos" />
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
            <h3> Cadastro de Agendamento </h3>

            <form method="POST">
                <div className="form-group">
                    <label className="form-label" htmlFor="student_name">Nome do Estudante</label>
                    <input type="text" id="student_name" name="student_name" className="form-control" value={appointment.appointment_student_name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_surname">Sobrenome do Estudante</label>
                    <input type="text" id="student_surname" name="student_surname" className="form-control" value={appointment.appointment_student_surmane} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="appointment_professional_name">Nome do Profissional</label>
                    <input type="text" id="appointment_professional_name" name="appointment_professional_name" className="form-control" value={appointment.appointment_professional_name} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="professional_surname">Sobrenome do Profissional</label>
                    <input type="text" id="professional_surname" name="professional_surname" className="form-control" value={appointment.appointment_professional_surname} onChange={handleChange}/>
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
                    <button className="btn btn-outline-success" type="button" onClick={handleCreateAppointment}>Salvar</button>
                    <Link className="btn btn-outline-info" href="/admin/appointments">Voltar</Link>
                </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}