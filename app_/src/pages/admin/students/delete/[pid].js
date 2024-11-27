import MenuStudents from '@/components/MenuStudents';
import NavAdmin from '@/components/NavAdmin';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function DeleteStudent() {
  const API_URL = "http://localhost:3030/api/students/";

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
  const { pid } = router.query;

  const [message, setMessage] = useState({ message: "", status: "" });

  const optionsStatus = [
    { value: '', text: '-- Selecione um estado --' },
    { value: 'true', text: 'Ativo' },
    { value: 'false', text: 'Inativo' },
  ];

  // useEffect(() => {
  //   const getStudent = async () => {
  //     if (!pid) return;
  //     try {
  //       const response = await Axios.get(API_URL + pid);
  //       setMessage({ message: response.data.message, status: "ok" });
  //       setStudent(response.data.foundedStudent);
  //     } catch (error) {
  //       console.error('Erro ao buscar o estudante:', error);
  //       setMessage({ message: "Erro ao buscar o estudante!", status: "error" });
  //     }
  //   };
  useEffect(() => {
    if (!pid) return; // Evita requisição até que pid esteja disponível

    const getStudent = async () => {
      try {
        const response = await Axios.get(API_URL + pid);
        const fetchedStudent = response.data.foundedStudent;

        // Formata a data para YYYY-MM-DD
        if (fetchedStudent.student_date_of_born) {
          fetchedStudent.student_date_of_born = new Date(fetchedStudent.student_date_of_born).toISOString().split("T")[0];
        }

        setMessage({ message: response.data.message, status: "ok" });
        setStudent(fetchedStudent);
      } catch (error) {
        console.error('Erro ao buscar o estudante:', error);
        setMessage({ message: "Erro ao buscar o estudante!", status: "error" });
      }
    };

    getStudent();
  }, [pid]);

  const handleDeleteStudent = async () => {
    if (!confirm("Tem certeza que deseja deletar este estudante?")) return;
    try {
      const response = await Axios.delete(API_URL + pid);
      setMessage({ message: response.data.message, status: "ok" });
      router.push("/admin/students");
    } catch (error) {
      console.error("Erro ao deletar o estudante:", error);
      setMessage({ message: "Erro ao deletar o estudante!", status: "error" });
    }
  };

  return (
    <>
      <Head>
        <title>APP-BC</title>
        <meta name="description" content="Cadastro de profissionais e alunos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <MenuStudents />
        { 
          message.status === "" ? "" : 
          message.status === "ok" ?
          <div className="alert alert-success" role="alert"> 
                {message.message} <Link className="alert-link" href="/admin/students">Voltar</Link>
              </div> : 
              <div className="alert alert-danger" role="alert"> 
                {message.message} <Link className="alert-link" href="/admin/students">Voltar</Link>
              </div>
        } 
      </div>

      <div >
        <div className="container">
          <div className="row border-bottom">
            <h3>Deletar Estudante</h3>
            <form>
              <div className="form-group">
                <label className="form-label" htmlFor="student_name">Nome</label>
                <input type="text" id="student_name" name="student_name" className="form-control" value={student.student_name} readOnly />
              </div>
              <div className="form-group">
                    <label className="form-label" htmlFor="student_surname">Sobrenome</label>
                    <input type="text" id="student_surname" name="student_surname" className="form-control" value={student.student_surname} readOnly/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_cpf">CPF</label>
                    <input type="number" id="student_cpf" name="student_cpf" className="form-control" value={student.student_cpf} readOnly/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_email">E-mail</label>
                    <input type="text" id="student_email" name="student_email" className="form-control" value={student.student_email} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_date_of_born">Data de Nascimento</label>
                    <input type="date" id="student_date_of_born" name="student_date_of_born" className="form-control" value={student.student_date_of_born} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_phone">Telefone</label>
                    <input type="number" id="student_phone" name="student_phone" className="form-control" value={student.student_phone} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_cep">CEP</label>
                    <input type="number" id="student_cep" name="student_cep" className="form-control" value={student.student_cep} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_logradouro">Logradouro</label>
                    <input type="text" id="student_logradouro" name="student_logradouro" className="form-control" value={student.student_logradouro} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_bairro">Bairro</label>
                    <input type="text" id="student_bairro" name="student_bairro" className="form-control" value={student.student_bairro} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_city">Cidade</label>
                    <input type="text" id="student_city" name="student_city" className="form-control" value={student.student_city} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_UF">Unidade Federativa(Estado)</label>
                    <input type="text" id="student_UF" name="student_UF" className="form-control" value={student.student_UF} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_user">Usuário</label>
                    <input type="text" id="student_user" name="student_user" className="form-control" value={student.student_user} readOnly />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="student_status">Status</label>
                    <select className="form-select" id="student_status" name="student_status" value={student.student_status} readOnly>
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
                <button className="btn btn-outline-danger" type="button" onClick={handleDeleteStudent}>Deletar</button>
                <Link className="btn btn-outline-info" href="/admin/students">Voltar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>  
    </>
  );
}
