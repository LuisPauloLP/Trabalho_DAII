import NavAdmin from '@/components/NavAdmin'
import MenuEvents from '@/components/MenuEvents';
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function updateEvent() {
  
  const API_URL = "http://localhost:8080/events/"

  const [event, setEvent] = useState({
    event_id: "",
    event_title: "",
    event_description: "",
    event_comments: "",
    event_date: "",
    event_location: "",
    event_status: "",
    event_create_date: ""
  });

  const router = useRouter();
  const [pid] = useState(router.query.pid);

  const [message, setMensage] = useState({ message:"", status:""});

  const optionsLevel = [
    {value: '', text: '-- Selecione um nível de acesso --'},
    {value: 'admin', text: 'Administrador'},
    {value: 'user', text: 'Usuário'},
    {value: 'reader', text: 'Leitor'},
  ];

  const optionsStatus = [
    {value: '', text: '-- Selecione um estado --'},
    {value: 'true', text: 'Ativo'},
    {value: 'false', text: 'Inativo'},
  ];


     useEffect(() => {
        const getEvent = async () => {
          try {
            const response = await Axios.get(API_URL + pid);
            setMensage( { message: response.data.message , status: "ok"} ); 
            setEvent( response.data.foundedEvent );
          } catch (error) {
            console.error('Erro ao buscar os eventos:', error);
            setMensage( { message: "Erro ao buscar os Eventos!", status: "error"} );
          }
        };
    
        getEvent();
    
      }, []);
      
      const handleChange = (evento) => {
        const { name, value } = evento.target;
        setUser({
          ...event,
          [name]: value
        });
      };

      const handleUpdateEvent = async () => {
        try {
          const response = await Axios.put(API_URL + pid, { event });
          setMensage( { message: response.data.message , status: "ok"} );      
        } catch (error) {
          console.error('Erro ao alterar o Evento:', error);
          setMensage( { message: "Erro ao alterar o Evento!", status: "error"} );
        }
      };



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
          message.status==="" ? "" : 
          message.status==="ok" ? <div className='alert alert-success' role='alert'> { message.message } <Link className='alert-link' href='/admin/events'>Voltar</Link></div> : 
          <div className='alert alert-danger' role='alert'> { message.message } <Link className='alert-link' href='/admin/events'>Voltar</Link></div>
        }
      </div>
  
      <div className="d-flex justify-content-center p-2">
        <div className="container">
            <div className="row border-bottom">
                <h3> Edição de Evento </h3>
            
                <form method="POST">
                <div className="form-group">
                    <label className="form-label" htmlFor="event_title">Título</label>
                    <input type="text" id="event_title" name="event_title" className="form-control" value={event.event_title} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="event_description">Descrição</label>
                    <input type="text" id="event_description" name="event_description" className="form-control" value={event.event_description} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="event_comments">Comentários</label>
                    <input type="text" id="event_comments" name="event_comments" className="form-control" value={event.event_comments} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="event_date">Data</label>
                    <input type="date" id="event_date" name="event_date" className="form-control" value={event.event_date} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="event_location">Localização</label>
                    <input type="text" id="event_location" name="event_location" className="form-control" value={event.event_location} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="event_status">Status</label>
                    <select className="form-select" id="event_status" name="event_status" value={event.event_status} onChange={handleChange}>
                      {optionsStatus.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="event_create_date">Data de Criação</label>
                    <input type="text" id="event_create_date" name="event_create_date" className="form-control" value={ event.event_create_date } readOnly/>
                </div>
                <div className="form-group p-2">
                    <button className="btn btn-outline-success" type="button" onClick={handleUpdateEvent} >Salvar</button>
                    <Link className="btn btn-outline-info" href="/admin/events">Voltar</Link>
                </div>
                </form>
            </div>
        </div>
      </div>  
  </>
  )
}

