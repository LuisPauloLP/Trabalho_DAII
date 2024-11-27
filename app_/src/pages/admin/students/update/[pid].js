import MenuStudents from '@/components/MenuStudents';
import NavAdmin from '@/components/NavAdmin'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function updatestudent() {
  
  const API_URL = "http://localhost:3030/api/students/"

  const [student, setStudent] = useState({
    student_id: "",
    student_name: "",
    student_surname: "",
    student_cpf: "",
    student_email: "",
    student_date_of_born: "",
    student_phone: "",
    student_cep: "",
    student_logradouro: "",
    student_bairro: "",
    student_city: "",
    student_UF: "",
    student_user: "",
    student_status: "",
    student_create_date: ""
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
        const getStudent = async () => {
          try {
            const response = await Axios.get(API_URL + pid);
            setMensage( { message: response.data.message , status: "ok"} ); 
            setStudent( response.data.foundedStudent );
          } catch (error) {
            console.error('Erro ao buscar os estudantes:', error);
            setMensage( { message: "Erro ao buscar os Estudantes!", status: "error"} );
          }
        };
    
        getStudent();
    
      }, []);
      
      const handleChange = (event) => {
        const { name, value } = event.target;
        setStudent({
          ...student,
          [name]: value
        });
      };

      const handleUpdateStudent = async () => {
        try {
          // Cria um novo objeto contendo apenas os dados que precisam ser enviados
          const studentData = {
            student_id: student.student_id,
            student_name: student.student_name,
            student_surname: student.student_surname,
            student_cpf: student.student_cpf,
            student_email: student.student_email,
            student_date_of_born: student.student_date_of_born,
            student_phone: student.student_phone,
            student_cep: student.student_cep,
            student_logradouro: student.student_logradouro,
            student_bairro: student.student_bairro,
            student_city: student.student_city,
            student_UF: student.student_UF,
            student_user: student.student_user,
            student_status: student.student_status,
            student_create_date: student.student_create_date
          };
      
          // Envia os dados do evento limpos para a API
          const response = await Axios.put(API_URL + pid, { student: studentData });
          setMensage({ message: response.data.message, status: "ok" });
        } catch (error) {
          console.error('Erro ao alterar o Estudante:', error);
          setMensage({ message: "Erro ao alterar o Estudante!", status: "error" });
        }
      };
      // const handleUpdateStudent = async () => {
      //   try {
      //     const response = await Axios.put(API_URL + pid, { student });
      //     setMensage( { message: response.data.message , status: "ok"} );      
      //   } catch (error) {
      //     console.error('Erro ao alterar o Estudante:', error);
      //     setMensage( { message: "Erro ao alterar o Estudante!", status: "error"} );
      //   }
      // };



  return (
    <>
      <Head>
        <title>APP-BC</title>
        <meta name="description" content="Cadastro" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuStudents />
        { 
          message.status==="" ? "" : 
          message.status==="ok" ? <div className='alert alert-success' role='alert'> { message.message } <Link className='alert-link' href='/admin/students'>Voltar</Link></div> : 
          <div className='alert alert-danger' role='alert'> { message.message } <Link className='alert-link' href='/admin/students'>Voltar</Link></div>
        }
      </div>
  
      <div >
        <div className="container">
            <div className="row border-bottom">
                <h3> Edição de Estudante </h3>
            
                <form method="POST">
                <div className="form-group">
                    <label className="form-label" htmlFor="student_name">Nome</label>
                    <input type="text" id="student_name" name="student_name" className="form-control" value={student.student_name} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_surname">Sobrenome</label>
                    <input type="text" id="student_surname" name="student_surname" className="form-control" value={student.student_surname} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_cpf">CPF</label>
                    <input type="number" id="student_cpf" name="student_cpf" className="form-control" value={student.student_cpf} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_email">E-mail</label>
                    <input type="text" id="student_email" name="student_email" className="form-control" value={student.student_email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_date_of_born">Data de Nascimento</label>
                    <input type="date" id="student_date_of_born" name="student_date_of_born" className="form-control" value={student.student_date_of_born} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_phone">Telefone</label>
                    <input type="number" id="student_phone" name="student_phone" className="form-control" value={student.student_phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_cep">CEP</label>
                    <input type="number" id="student_cep" name="student_cep" className="form-control" value={student.student_cep} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_logradouro">Logradouro</label>
                    <input type="text" id="student_logradouro" name="student_logradouro" className="form-control" value={student.student_logradouro} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_bairro">Bairro</label>
                    <input type="text" id="student_bairro" name="student_bairro" className="form-control" value={student.student_bairro} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_city">Cidade</label>
                    <input type="text" id="student_city" name="student_city" className="form-control" value={student.student_city} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_UF">Unidade Federativa(Estado)</label>
                    <input type="text" id="student_UF" name="student_UF" className="form-control" value={student.student_UF} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_user">Usuário</label>
                    <input type="text" id="student_user" name="student_user" className="form-control" value={student.student_user} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_status">Status</label>
                    <select className="form-select" id="student_status" name="student_status" value={student.student_status} onChange={handleChange}>
                      {optionsStatus.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_create_date">Data de Criação</label>
                    <input type="text" id="student_create_date" name="student_create_date" className="form-control" value={ student.student_create_date } readOnly/>
                </div>
                <div className="form-group p-2">
                    <button className="btn btn-outline-success" type="button" onClick={handleUpdateStudent} >Salvar</button>
                    <Link className="btn btn-outline-info" href="/admin/students">Voltar</Link>
                </div>
                </form>
            </div>
        </div>
      </div>  
  </>
  )
}


