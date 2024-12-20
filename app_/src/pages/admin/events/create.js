import NavAdmin from '@/components/NavAdmin'
import MenuEvents from '@/components/MenuEvents';
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';
import Axios from 'axios';

export default function createevent() {
  
  const API_URL = "http://localhost:3030/api/events"

  const [event, setEvent] = useState({
    // author_id: "",
    event_title: "",
    event_description: "",
    event_comments: "",
    event_date: "",
    event_location: "",
    event_time: "",
    event_status: "",
  });

  const [message, setMensage] = useState({ message:"", status:""});

  const optionsStatus = [
    {value: '', text: '-- Selecione um estado --'},
    {value: 'true', text: 'Ativo'},
    {value: 'false', text: 'Inativo'},
  ];

  const handleChange = (evento) => {
    const { name, value } = evento.target;
    setEvent({
      ...event,
      [name]: value
    });
  };

  const handleCreateEvent = async () => {
    try {
      const response = await Axios.post(API_URL, { event });
      setMensage( { message: response.data.message , status: "ok"} );      
    } catch (error) {
      console.error('Erro ao criar o Evento:', error);
      setMensage( { message: "Erro ao criar o Evento!", status: "error"} );
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
  
      <div>
        <div className="container">
            <div className="row border-bottom">
                <h3> Cadastro de Evento </h3>
            
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
                    <label className="form-label" htmlFor="event_time">Hora</label>
                    <input type="time" id="event_time" name="event_time" className="form-control" value={event.event_time} onChange={handleChange} />
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
                <div className="form-group p-2">
                    <button className="btn btn-outline-success" type="button" onClick={handleCreateEvent} >Salvar</button>
                    <Link className="btn btn-outline-info" href="/admin/events">Voltar</Link>
                </div>
                </form>
            </div>
        </div>
      </div>  
  </>
  )
}
// import NavAdmin from '@/components/NavAdmin';
// import MenuEvents from '@/components/MenuEvents';
// import Head from 'next/head';
// import Link from 'next/link';
// import { useState } from 'react';
// import Axios from 'axios';

// export default function createevent() {
//   const API_URL = "http://localhost:3030/api/events";

//   const [event, setEvent] = useState({
//     event_title: "",
//     event_description: "",
//     event_comments: "",
//     event_date: "", // Formato: yyyy-MM-dd
//     event_location: "",
//     event_time: "", // Formato: HH:mm
//     event_status: "",
//   });

//   const [message, setMessage] = useState({ message: "", status: "" });

//   const optionsStatus = [
//     { value: '', text: '-- Selecione um estado --' },
//     { value: 'true', text: 'Ativo' },
//     { value: 'false', text: 'Inativo' },
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEvent((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleCreateEvent = async () => {
//     try {
//       // Envie a data como objeto bem estruturado para a API
//       const response = await Axios.post(API_URL, { 
//         ...event, 
//         event_date: new Date(event.event_date).toISOString() 
//       });
//       setMessage({ message: response.data.message, status: "ok" });
//     } catch (error) {
//       console.error("Erro ao criar o Evento:", error);
//       setMessage({ message: "Erro ao criar o Evento!", status: "error" });
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>APP-BC</title>
//         <meta name="description" content="Generated by create next app" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>
//       <div>
//         <NavAdmin />
//         <MenuEvents />
//         {
//           message.status === "" ? "" :
//             message.status === "ok" ?
//               <div className="alert alert-success" role="alert">
//                 {message.message} <Link className="alert-link" href="/admin/events">Voltar</Link>
//               </div> :
//               <div className="alert alert-danger" role="alert">
//                 {message.message} <Link className="alert-link" href="/admin/events">Voltar</Link>
//               </div>
//         }
//       </div>

//       <div className="container">
//         <div className="row border-bottom">
//           <h3> Cadastro de Evento </h3>

//           <form method="POST">
//             <div className="form-group">
//               <label className="form-label" htmlFor="event_title">Título</label>
//               <input type="text" id="event_title" name="event_title" className="form-control" value={event.event_title} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label className="form-label" htmlFor="event_description">Descrição</label>
//               <input type="text" id="event_description" name="event_description" className="form-control" value={event.event_description} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label className="form-label" htmlFor="event_comments">Comentários</label>
//               <input type="text" id="event_comments" name="event_comments" className="form-control" value={event.event_comments} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label className="form-label" htmlFor="event_date">Data</label>
//               <input type="date" id="event_date" name="event_date" className="form-control" value={event.event_date} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label className="form-label" htmlFor="event_location">Localização</label>
//               <input type="text" id="event_location" name="event_location" className="form-control" value={event.event_location} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label className="form-label" htmlFor="event_time">Hora</label>
//               <input type="time" id="event_time" name="event_time" className="form-control" value={event.event_time} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label className="form-label" htmlFor="event_status">Status</label>
//               <select className="form-select" id="event_status" name="event_status" value={event.event_status} onChange={handleChange}>
//                 {optionsStatus.map(option => (
//                   <option key={option.value} value={option.value}>
//                     {option.text}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group p-2">
//               <button className="btn btn-outline-success" type="button" onClick={handleCreateEvent}>Salvar</button>
//               <Link className="btn btn-outline-info" href="/admin/events">Voltar</Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

