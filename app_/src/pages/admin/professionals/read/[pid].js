import NavAdmin from '@/components/NavAdmin';
import MenuProfessionals from '@/components/MenuProfessionals'; 
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function readprofessional() {
  const API_URL = "http://localhost:3030/api/professionals/";

  const [professional, setProfessional] = useState({
    professional_id: "",
    professional_name: "",
    professional_email: "",
    professional_speciality: "",
    professional_pwd: "",
    professional_level: "",
    professional_status: "",
    professional_phone_number: "",
    professional_create_date: ""
  });

  const router = useRouter();
  const { pid } = router.query;

  const [message, setMessage] = useState({ message: "", status: "" });

  const optionsLevel = [
    {value: '', text: '-- Selecione um nível de acesso --'},
    { value: 'admin', text: 'Administrador' },
    { value: 'teacher', text: 'Professor' },
    { value: 'reader', text: 'Leitor' },
  ];

  const optionsStatus = [
    {value: '', text: '-- Selecione um estado --'},
    { value: 'true', text: 'Ativo' },
    { value: 'false', text: 'Inativo' },
  ];

  useEffect(() => {
      const getProfessional = async () => {
        try {
          const response = await Axios.get(API_URL + pid);
          setMessage({ message: response.data.message, status: "ok" });
          setProfessional(response.data.foundedProfessional);
        } catch (error) {
          console.error('Erro ao buscar o profissional:', error);
          setMessage({ message: "Erro ao buscar o profissional!", status: "error" });
        }
      };
      getProfessional();
    }, []);

  return (
    <>
      <Head>
        <title>Detalhes do Profissional</title>
        <meta name="description" content="Detalhes do profissional" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuProfessionals />
        {
          message.status === "" ? "" :
            message.status === "ok" ? "" :
              <div className='alert alert-danger' role='alert'> {message.message} <Link className='alert-link' href='/admin/professionals'>Voltar</Link></div>
        }
      </div>

      <div>
        <div className="container">
          <div className="row border-bottom">
            <h3>Detalhes do Profissional</h3>

            <form>
                <div className="form-group">
                    <label className="form-label" htmlFor="professional_name">Nome</label>
                    <input type="text" id="professional_name" name="professional_name" className="form-control" value={professional.professional_name} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="professional_email">E-mail</label>
                    <input type="text" id="professional_email" name="professional_email" className="form-control" value={professional.professional_email} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="professional_speciality">Especialidade</label>
                    <input type="text" id="professional_speciality" name="professional_speciality" className="form-control" value={professional.professional_speciality} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="professional_pwd">Senha</label>
                    <input type="password" id="professional_pwd" name="professional_pwd" className="form-control" value={professional.professional_pwd} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="professional_level">Nível</label>
                    <select className="form-select" id="professional_level" name="professional_level" value={professional.professional_level} readOnly>
                        {optionsLevel.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                <label className="form-label" htmlFor="professional_status">Status</label>
                <select className="form-select" id="professional_status" name="professional_status" value={professional.professional_status} readOnly>
                  {optionsStatus.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="professional_phone_number">Telefone</label>
                <input type="number" id="professional_phone_number" name="professional_phone_number" className="form-control" value={professional.professional_phone_number} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="professional_create_date">Data de Criação</label>
                <input type="text" id="professional_create_date" name="professional_create_date" className="form-control" value={ professional.professional_create_date } readOnly />
              </div>
              <div className="form-group p-2">
                <Link className="btn btn-outline-info" href="/admin/professionals">Voltar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}