
import NavAdmin from '@/components/NavAdmin';
import MenuEvents from '@/components/MenuEvents';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function readEvent() {
  const API_URL = "http://localhost:3030/api/events/";

  const [event, setEvent] = useState({
    event_id: "",
    event_title: "",
    event_description: "",
    event_comments: "",
    event_date: "",
    event_location: "",
    event_time: "",
    event_status: "",
    event_create_date: ""
  });

  const router = useRouter();
  const { pid } = router.query;

  const [message, setMessage] = useState({ message: "", status: "" });

  const optionsStatus = [
    { value: '', text: '-- Selecione um estado --' },
    { value: 'true', text: 'Ativo' },
    { value: 'false', text: 'Inativo' },
  ];

  useEffect(() => {
    if (!pid) return; // Aguarda até que o pid esteja definido

    const getEvent = async () => {
      try {
        const response = await Axios.get(API_URL + pid);
        const fetchedEvent = response.data.foundedEvent;

        // Formatar a data para YYYY-MM-DD
        if (fetchedEvent.event_date) {
          fetchedEvent.event_date = new Date(fetchedEvent.event_date).toISOString().split("T")[0];
        }

        setMessage({ message: response.data.message, status: "ok" });
        setEvent(fetchedEvent);
      } catch (error) {
        console.error('Erro ao buscar os eventos:', error);
        setMessage({ message: "Erro ao buscar o evento!", status: "error" });
      }
    };

    getEvent();
  }, [pid]);

  return (
    <>
      <Head>
        <title>APP-BC</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuEvents />
        {
          message.status === "" ? "" :
            message.status === "ok" ? "" :
              <div className="alert alert-danger" role="alert">
                {message.message} <Link className="alert-link" href="/admin/events">Voltar</Link>
              </div>
        }
      </div>

      <div>
        <div className="container">
          <div className="row border-bottom">
            <h3> Detalhes do Evento </h3>

            <form>
              <div className="form-group">
                <label className="form-label" htmlFor="event_title">Título</label>
                <input type="text" id="event_title" name="event_title" className="form-control" value={event.event_title} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="event_description">Descrição</label>
                <input type="text" id="event_description" name="event_description" className="form-control" value={event.event_description} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="event_comments">Comentários</label>
                <input type="text" id="event_comments" name="event_comments" className="form-control" value={event.event_comments} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="event_date">Data</label>
                <input type="date" id="event_date" name="event_date" className="form-control" value={event.event_date} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="event_location">Localização</label>
                <input type="text" id="event_location" name="event_location" className="form-control" value={event.event_location} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="event_time">Hora</label>
                <input type="time" id="event_time" name="event_time" className="form-control" value={event.event_time} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="event_status">Status</label>
                <select className="form-select" id="event_status" name="event_status" value={event.event_status} readOnly>
                  {optionsStatus.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="event_create_date">Data de Criação</label>
                <input type="text" id="event_create_date" name="event_create_date" className="form-control" value={event.event_create_date} readOnly />
              </div>
              <div className="form-group p-2">
                <Link className="btn btn-outline-info" href="/admin/events">Voltar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

