import Axios from 'axios';
import NavAdmin from '@/components/NavAdmin';
import TeacherAction from '@/components/TeacherAction';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import MenuTeachers from '@/components/MenuTeachers'; 

export default function teachers() {
  const API_URL = "http://localhost:3030/api/teachers";

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const getAllTeachers = async () => {
      try {
        const response = await Axios.get(API_URL);
        setTeachers(response.data);
      } catch (error) {
        console.error('Erro ao buscar os professores:', error);
      }
    };

    getAllTeachers();
  }, []);

  return (
    <>
      <Head>
        <title>APP-BC</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuTeachers />
      </div>

      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            <h3> Lista de Professores </h3>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map(teacher => (
                  <tr key={teacher._id}>
                    <th scope="row">{teacher._id}</th>
                    <td>{teacher.name}</td>
                    <td>{teacher.contact}</td>
                    <td>
                      <TeacherAction pid={teacher._id}></TeacherAction>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

