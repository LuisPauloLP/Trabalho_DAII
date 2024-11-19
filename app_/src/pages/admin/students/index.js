import Axios from 'axios'
import StudentsAction from '@/components/StudentsAction'
import NavAdmin from '@/components/NavAdmin'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import MenuStudents from '@/components/MenuStudents'


export default function students() {

  const API_URL = "http://localhost:3030/api/students"
  
  const [students, setStudents] = useState([]); 
  
  useEffect(() => {
    const getAllStudents = async () => {
      try {
        const response = await Axios.get(API_URL);
        setStudents(response.data);
      } catch (error) {
        console.error('Erro ao buscar os estudantes:', error);
      }
    };

    getAllStudents();

  }, []);

  return (
    <>
      <Head>
        <title>APP-BC</title>
        <meta name="description" content="Cadastro de profissionais e alunos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuStudents />
      </div>

  
      <div id="tabela">
        <div>
        <div className="row border-bottom">
        <h3> Lista de Estudantes </h3>
        
        <table className="table table-hover">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Sobrenome</th>
            <th scope="col">Ações</th>
            </tr>
        </thead>
        <tbody>

        {students.map( student => (
            <tr key={student._id}>
              <th scope="row">{student._id}</th>
              <td>{student.student_name}</td>
              <td>{student.student_surname}</td>
              <td>
                <StudentsAction pid={ student._id }></StudentsAction>
              </td>
            </tr>
        ))}

        </tbody>
        </table>
        </div>
        </div>
      </div>  
  </>
  )
}


