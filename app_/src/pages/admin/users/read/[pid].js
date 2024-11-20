import NavAdmin from '@/components/NavAdmin';
import MenuUsers from '@/components/MenuUsers';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function readuser() {
  
  const API_URL = "http://localhost:3030/api/users/"

  const [user, setUser] = useState({
    author_id: "",
    author_name: "",
    author_email: "",
    author_user: "",
    author_pwd: "",
    author_level: "",
    author_status: "",
    author_create_date: ""
  });

  const router = useRouter();
  const { pid } = router.query;

  const [message, setMessage] = useState({ message: "", status: "" });

  const optionsLevel = [
    { value: 'admin', text: 'Administrador' },
    { value: 'user', text: 'Usuário' },
    { value: 'viewer', text: 'Leitor' },
  ];

  const optionsStatus = [
    { value: 'active', text: 'Ativo' },
    { value: 'inactive', text: 'Inativo' },
  ];

  useEffect(() => {
    if (pid) {
      const getUser = async () => {
        try {
          const response = await Axios.get(API_URL + pid);
          setUser(response.data.user);
          setMessage({ message: response.data.message, status: "ok" });
        } catch (error) {
          console.error('Erro ao buscar o usuário:', error);
          setMessage({ message: "Erro ao buscar o usuário!", status: "error" });
        }
      };
      getUser();
    }
  }, [pid]);

  return (
    <>
      <Head>
        <title>Detalhes do Usuário</title>
        <meta name="description" content="Exibe os detalhes de um usuário" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuUsers />
        {
          message.status === "" ? "" :
            message.status === "ok" ? "" :
              <div className='alert alert-danger' role='alert'> {message.message} <Link className='alert-link' href='/admin/users'>Voltar</Link></div>
        }
      </div>
  
      <div >
        <div className="container">
          <div className="row border-bottom">
            <h3> Detalhes do Usuário </h3>

            <form>
              <div className="form-group">
                <label className="form-label" htmlFor="author_name">Nome</label>
                <input type="text" id="author_name" name="author_name" className="form-control" value={user.author_name} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="author_email">E-mail</label>
                <input type="text" id="author_email" name="author_email" className="form-control" value={user.author_email} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="author_user">Usuário</label>
                <input type="text" id="author_user" name="author_user" className="form-control" value={user.author_user} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="author_pwd">Senha</label>
                <input type="password" id="author_pwd" name="author_pwd" className="form-control" value={user.author_pwd} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="author_level">Nível</label>
                <select className="form-select" id="author_level" name="author_level" value={user.author_level} readOnly>
                  {optionsLevel.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="author_status">Status</label>
                <select className="form-select" id="author_status" name="author_status" value={user.author_status} readOnly>
                  {optionsStatus.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="author_create_date">Data de Criação</label>
                <input type="text" id="author_create_date" name="author_create_date" className="form-control" value={user.author_create_date} readOnly />
              </div>
              <div className="form-group p-2">
                <Link className="btn btn-outline-info" href="/admin/users">Voltar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
