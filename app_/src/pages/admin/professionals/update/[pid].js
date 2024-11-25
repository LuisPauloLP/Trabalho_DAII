import NavAdmin from '@/components/NavAdmin'
import MenuProfessionals from '@/components/MenuProfessionals'; 
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function UpdateProfessional() {

  const API_URL = "http://localhost:8080/api/professionals/"

  const [professional, setProfessional] = useState({
    professional_id: "",
    professional_name: "",
    professional_email: "",
    professional_speciality: "",
    professional_pwd: "",
    professional_level: "",
    professional_phone_number: "",
    professional_create_date: ""
  });

  const router = useRouter();
  const [pid] = useState(router.query.pid);

  const [message, setMensage] = useState({ message: "", status: "" });

  const optionsLevel = [
    { value: '', text: '-- Selecione um nível de acesso --' },
    { value: 'admin', text: 'Administrador' },
    { value: 'user', text: 'Usuário' },
    { value: 'reader', text: 'Leitor' },
  ];

  useEffect(() => {
    const getProfessional = async () => {
      try {
        const response = await Axios.get(API_URL + pid);
        setMensage({ message: response.data.message, status: "ok" });
        setProfessional(response.data.foundedProfessional);
      } catch (error) {
        console.error('Erro ao buscar os profissionais:', error);
        setMensage({ message: "Erro ao buscar os profissionais!", status: "error" });
      }
    };

    getProfessional();

  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfessional({
      ...professional,
      [name]: value
    });
  };

  const handleUpdateProfessional = async () => {
    try {
      const response = await Axios.put(API_URL + pid, { professional });
      setMensage({ message: response.data.message, status: "ok" });
    } catch (error) {
      console.error('Erro ao alterar o profissional:', error);
      setMensage({ message: "Erro ao alterar o profissional!", status: "error" });
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
        <MenuProfessionals />
        {
          message.status === "" ? "" :
            message.status === "ok" ? <div className='alert alert-success' role='alert'> {message.message} <Link className='alert-link' href='/admin/professionals'>Voltar</Link></div> :
              <div className='alert alert-danger' role='alert'> {message.message} <Link className='alert-link' href='/admin/professionals'>Voltar</Link></div>
        }
      </div>

      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            <h3> Edição do Profissional </h3>

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
                    <select className="form-select" id="professional_level" name="professional_level" value={professional.professional_level} onChange={handleChange} >
                        {optionsLevel.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="professional_status">Status</label>
                    <select className="form-select" id="professional_status" name="professional_status" value={professional.professional_status} onChange={handleChange} >
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
                <div className="form-group">
                    <label className="form-label" htmlFor="professional_create_date">Data de Criação</label>
                    <input type="date" id="professional_create_date" name="professional_create_date" className="form-control" value={ professional.professional_create_date } onChange={handleChange} />
                </div>
                <div className="form-group p-2">
                    <button className="btn btn-outline-danger" type="button" onClick={handleUpdateProfessional}>Salvar</button>
                    <Link className="btn btn-outline-info" href="/admin/professionals">Voltar</Link>
                </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
