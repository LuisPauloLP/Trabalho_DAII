import NavAdmin from '@/components/NavAdmin';
import MenuProfessionals from '@/components/MenuProfessionals'; 
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Axios from 'axios';

export default function createprofessional() {

  const API_URL = "http://localhost:3030/api/professionals";

  const [professional, setProfessional] = useState({
    //professional_id: "",
    professional_name: "",
    professional_email: "",
    professional_speciality: "",
    professional_pwd: "",
    professional_level: "",
    professional_phone_number: "",
    professional_status: "",
    //professional_create_date: ""
  });

  const [message, setMessage] = useState({ message: "", status: "" });

  const optionsStatus = [
    { value: '', text: '-- Selecione um estado --' },
    { value: 'true', text: 'Ativo' },
    { value: 'false', text: 'Inativo' },
  ];

  const optionsLevel = [
    {value: '', text: '-- Selecione um nível de acesso --'},
    {value: 'admin', text: 'Administrador'},
    {value: 'teacher', text: 'Professor'},
    {value: 'reader', text: 'Leitor'},
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfessional({
      ...professional,
      [name]: value,
    });
  };

  const handleCreateProfessional = async () => {
    try {
      const response = await Axios.post(API_URL,  { professional } );
      setMessage({ message: response.data.message, status: "ok" });
    } catch (error) {
      console.error('Erro ao criar o profissional:', error);
      setMessage({ message: "Erro ao criar o profissional!", status: "error" });
    }
  };

  return (
    <>
      <Head>
        <title>Cadastro de Profissional</title>
        <meta name="description" content="Cadastro de profissional" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuProfessionals />
        {
          message.status === "" ? "" :
            message.status === "ok" ? <div className='alert alert-success' role='alert'> {message.message} <Link className='alert-link' href='/admin/professionals'>Voltar</Link></div> :
              <div className='alert alert-danger' role='alert'> {message.message} <Link className='alert-link' href='/admin/professionals'>Voltar</Link></div>
        }
      </div>

      <div >
        <div className="container">
          <div className="row border-bottom">
            <h3> Cadastro de Profissional </h3>

            <form method="POST">
                <div className="form-group">
                    <label className="form-label" htmlFor="professional_name">Nome</label>
                    <input type="text" id="professional_name" name="professional_name" className="form-control" value={professional.professional_name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="professional_email">E-mail</label>
                    <input type="text" id="professional_email" name="professional_email" className="form-control" value={professional.professional_email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="professional_speciality">Especialidade</label>
                    <input type="text" id="professional_speciality" name="professional_speciality" className="form-control" value={professional.professional_speciality} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="professional_pwd">Senha</label>
                    <input type="password" id="professional_pwd" name="professional_pwd" className="form-control" value={professional.professional_pwd} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="professional_level">Nível</label>
                    <select className="form-select" id="professional_level" name="professional_level" value={professional.professional_level} onChange={handleChange}>
                        {optionsLevel.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="professional_status">Status</label>
                    <select className="form-select" id="professional_status" name="professional_status" value={professional.professional_status} onChange={handleChange}>
                        {optionsStatus.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="professional_phone_number">Telefone</label>
                    <input type="number" id="professional_phone_number" name="professional_phone_number" className="form-control" value={professional.professional_phone_number} onChange={handleChange} />
                </div>
                {/* <div className="form-group">
                    <label className="form-label" htmlFor="professional_create_date">Data de Criação</label>
                    <input type="date" id="professional_create_date" name="professional_create_date" className="form-control" value={ professional.professional_create_date } onChange={handleChange}/>
                </div> */}
                <div className="form-group p-2">
                    <button className="btn btn-outline-danger" type="button" onClick={handleCreateProfessional}>Salvar</button>
                    <Link className="btn btn-outline-info" href="/admin/professionals">Voltar</Link>
                </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}