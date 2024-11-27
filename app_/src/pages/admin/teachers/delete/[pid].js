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
    author_id: "",
    author_name: "",
    author_email: "",
    author_disciplines: "",
    author_pwd: "",
    author_level: "",
    author_phone_number: "",
    author_create_date: ""
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
        setTeacher(response.data.foundedTeacher);
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
            <h3> Edição de Professor </h3>
            
            <form method="POST">
              <div className="form-group">
                <label className="form-label" htmlFor="author_name">Nome</label>
                <input type="text" id="author_name" name="author_name" className="form-control" value={teacher.author_name} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="author_email">E-mail</label>
                <input type="text" id="author_email" name="author_email" className="form-control" value={teacher.author_email} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="author_disciplines">Disciplinas</label>
                <input type="text" id="author_disciplines" name="author_disciplines" className="form-control" value={teacher.author_disciplines} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="author_pwd">Senha</label>
                <input type="password" id="author_pwd" name="author_pwd" className="form-control" value={teacher.author_pwd} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="author_level">Nível</label>
                <select className="form-select" id="author_level" name="author_level" value={teacher.author_level} readOnly>
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
                <label className="form-label" htmlFor="author_create_date">Data de Criação</label>
                <input type="text" id="author_create_date" name="author_create_date" className="form-control" value={ teacher.author_create_date } readOnly />
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
