import NavAdmin from '@/components/NavAdmin'
import MenuTeachers from '@/components/MenuTeachers'; 
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function deleteTeacher() {
  
  const API_URL = "http://localhost:3030/api/teachers/" 

  const [teacher, setTeacher] = useState({
    id: "",
    name: "",
    contact: "",
    disciplines: "",
    password: "",
    level: "",
    phone_number: "",
    created_at: "",
    status: "",
  });

  const router = useRouter();
  const [pid] = useState(router.query.pid);

  const [message, setMessage] = useState({ message: "", status: "" });

  const optionsLevel = [
    { value: '', text: '-- Selecione um nível de acesso --' },
    { value: 'admin', text: 'Administrador' },
    { value: 'teacher', text: 'Professor' },
    { value: 'reader', text: 'Leitor' },
  ];

  const optionsStatus = [
    { value: '', text: '-- Selecione um estado --' },
    { value: 'true', text: 'Ativo' },
    { value: 'false', text: 'Inativo' },
  ];

  useEffect(() => {
    const getTeacher = async () => {
      try {
        const response = await Axios.get(API_URL + pid);
        setMessage({ message: response.data.message, status: "ok" });
        setTeacher(response.data);
      } catch (error) {
        console.error('Erro ao buscar os professores:', error);
        setMessage({ message: "Erro ao buscar o professor!", status: "error" });
      }
    };

    getTeacher();
  }, []);

  const handleDeleteTeacher = async () => {
    try {
      const response = await Axios.delete(API_URL + pid);
      setMessage({ message: response.data.message, status: "ok" });
    } catch (error) {
      console.error('Erro ao deletar o professor:', error);
      setMessage({ message: "Erro ao deletar o professor!", status: "error" });
    }
  };

  return (
    <>
      <Head>
        <title>APP-BC | Deletar Professor</title>
        <meta name="description" content="Página para deletar professores" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuTeachers /> {/* Alterado para MenuTeachers */}
        { 
          message.status === "" ? "" :
          message.status === "ok" ? <div className='alert alert-success' role='alert'> { message.message } <Link className='alert-link' href='/admin/teachers'>Voltar</Link></div> :
          <div className='alert alert-danger' role='alert'> { message.message } <Link className='alert-link' href='/admin/teachers'>Voltar</Link></div>
        }
      </div>

      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            <h3>Deseja deletar este Professor? </h3>
            
            <form method="POST">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" className="form-control" value={teacher.name} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact">E-mail</label>
                <input type="text" id="contact" name="contact" className="form-control" value={teacher.contact} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="disciplines">Disciplinas</label>
                <input type="text" id="disciplines" name="disciplines" className="form-control" value={teacher.disciplines} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="password">Senha</label>
                <input type="password" id="password" name="password" className="form-control" value={teacher.password} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="level">Nível</label>
                <select className="form-select" id="level" name="level" value={teacher.level} readOnly>
                  {optionsLevel.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="author_status">Status</label>
                <select className="form-select" id="author_status" name="author_status" value={teacher.author_status} readOnly>
                  {optionsStatus.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="created_at">Data de Criação</label>
                <input type="text" id="created_at" name="created_at" className="form-control" value={ teacher.created_at } readOnly />
              </div>
              <div className="form-group p-2">
                <button className="btn btn-outline-danger" type="button" onClick={handleDeleteTeacher}>Deletar</button>
                <Link className="btn btn-outline-info" href="/admin/teachers">Voltar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>  
    </>
  )
}
