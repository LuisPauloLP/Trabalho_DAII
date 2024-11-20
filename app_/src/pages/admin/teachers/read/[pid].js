import NavAdmin from '@/components/NavAdmin';
import MenuTeachers from '@/components/MenuTeachers';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function ReadTeacher() {
  const API_URL = "http://localhost:8080/api/teachers/";

  const [teacher, setTeacher] = useState({
    id: "",
    name: "",
    email: "",
    disciplines: "",
    password: "",
    level: "",
    phone_number: "",
    create_date: "",
    status: "",
  });

  const router = useRouter();
  const { pid } = router.query;

  const [message, setMessage] = useState({ message: "", status: "" });

  const optionsLevel = [
    { value: 'admin', text: 'Administrador' },
    { value: 'teacher', text: 'Professor' },
    { value: 'reader', text: 'Leitor' },
  ];

  const optionsStatus = [
    { value: 'on', text: 'Ativo' },
    { value: 'off', text: 'Inativo' },
  ];

  useEffect(() => {
    if (pid) {
      const getTeacher = async () => {
        try {
          const response = await Axios.get(API_URL + pid);
          setTeacher(response.data.teacher);
          setMessage({ message: response.data.message, status: "ok" });
        } catch (error) {
          console.error('Erro ao buscar o professor:', error);
          setMessage({ message: "Erro ao buscar o professor!", status: "error" });
        }
      };
      getTeacher();
    }
  }, [pid]);

  return (
    <>
      <Head>
        <title>Detalhes do Professor</title>
        <meta name="description" content="Detalhes do professor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuTeachers />
        {
          message.status === "" ? "" :
            message.status === "ok" ? "" :
              <div className='alert alert-danger' role='alert'> {message.message} <Link className='alert-link' href='/admin/teachers'>Voltar</Link></div>
        }
      </div>

      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            <h3>Detalhes do Professor</h3>

            <form>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" className="form-control" value={teacher.name} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">E-mail</label>
                <input type="text" id="email" name="email" className="form-control" value={teacher.email} readOnly />
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
                <label className="form-label" htmlFor="status">Status</label>
                <select className="form-select" id="status" name="status" value={teacher.status} readOnly>
                  {optionsStatus.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone_number">Telefone</label>
                <input type="text" id="phone_number" name="phone_number" className="form-control" value={teacher.phone_number} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="create_date">Data de Criação</label>
                <input type="text" id="create_date" name="create_date" className="form-control" value={teacher.create_date} readOnly />
              </div>
              <div className="form-group p-2">
                <Link className="btn btn-outline-info" href="/admin/teachers">Voltar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
