import Axios from 'axios';
import NavAdmin from '@/components/NavAdmin';
import AppointmentAction from '@/components/AppointmentAction';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import MenuAppointments from '@/components/MenuAppointments'; 

export default function appointments() {
  const API_URL = "http://localhost:8080/api/appointments";

  const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    const getAllAppointments = async () => {
      try {
        const response = await Axios.get(API_URL);
        setAppointment(response.data);
      } catch (error) {
        console.error('Erro ao buscar os agendamentos:', error);
      }
    };

    getAllAppointments();
  }, []);

  return (
    <>
      <Head>
        <title>APP-BC</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuAppointments />
      </div>

      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            <h3> Lista de Agendamentos </h3>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome do Estudante</th>
                  <th scope="col">Nome do profissional</th>
                  <th scope="col">Data do Agendamento</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody>
  {Array.isArray(appointments) && appointments.length > 0 ? (
    appointments.map(appointment => (
      <tr key={appointment._id}>
        <th scope="row">{appointment._id}</th>
        <td>{appointment.appointment_student_name}</td>
      </tr>
    ))
  ) : (
    <tr>
    </tr>
  )}
</tbody>

            </table>
          </div>
        </div>
      </div>
    </>
  );
}
