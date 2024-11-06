"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

interface Agendamento {
  _id?: string;
  name: string;
  date: string;
  hora: string;
  location: string;
}

const SchedulingForm: React.FC = () => {
  const [agendamento, setAgendamento] = useState<Agendamento>({
    _id: '',
    name: '',
    date: '',
    hora: '',
    location: '',
  });

  const [dataSource, setDataSource] = useState<Agendamento[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAgendamento((prevAgendamento) => ({
      ...prevAgendamento,
      [name]: value,
    }));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5001/appointments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => { handleGetItems() })
  }

  const handleGetItems = () => {
    fetch("http://localhost:5001/appointments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: DataType[]) => {
        setDataSource(() => [...data]);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }

  interface DataType {
    _id: string;
    name: string;
    date: string;
    hora: string;
    location: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  useEffect(() => {
    fetch("http://localhost:5001/appointments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: DataType[]) => {
        setDataSource(() => [...data]);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }, []);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (agendamento.name && agendamento.date && agendamento.hora && agendamento.location) {
      try {
        await fetch("http://localhost:5001/appointments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(agendamento),
        });
        handleGetItems()
        setAgendamento({
          name: '', date: '', hora: '', location: '',
        });
      } catch (error) {
        console.error("Erro:", error);
      }
    } else {
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  return (
    <>
      <div>
        <div style={{ display: "flex", marginTop: "20px" }}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              margin: "15px 15px",
            }}
            onSubmit={handleSubmit}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <label>Nome: </label>
              <input
                type="text"
                name="name"
                value={agendamento.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Data: </label>
              <input
                type="date"
                name="date"
                value={agendamento.date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Hora: </label>
              <input
                type="time"
                name="hora"
                value={agendamento.hora}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Local: </label>
              <input
                type="text"
                name="location"
                value={agendamento.location}
                onChange={handleChange}
                required
              />
            </div>
            <button
              style={{
                height: "30px",
                fontWeight: 500,
                borderRadius: "15px",
                cursor: 'pointer',
              }}
              type="submit"
            >
              Agendar
            </button>
          </form>
        </div>
        <div
          style={{
            marginTop: "20px", display: 'flex', flexDirection: 'column', alignItems: 'center', width: "70%", margin: "0 auto"
          }}>
          <h3>Agendamentos</h3>
          <table style={{ width: "100%", borderRight: "2px solid black", textAlign: "left" }}>
            <thead>
              <tr>
                <th style={tableCellStyle}>Nome</th>
                <th style={tableCellStyle}>Data</th>
                <th style={tableCellStyle}>Hora</th>
                <th style={tableCellStyle}>Local</th>
              </tr>
            </thead>
            <tbody>
              {dataSource.map((agendamento, index) => (
                <tr key={index}>
                  <td style={tableHeaderStyle}>{agendamento.name}</td>
                  <td style={tableHeaderStyle}>{agendamento.date}</td>
                  <td style={tableHeaderStyle}>{agendamento.hora}</td>
                  <td style={tableHeaderStyle}>{agendamento.location}</td>
                  <td style={tableHeaderStyle}><button onClick={() => handleDelete(agendamento._id)}>deletar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div >
      </div >
    </>
  );
};

const tableHeaderStyle = {
  padding: "10px",
  backgroundColor: "#acacac",
  borderBottom: "2px solid #000000",
};

const tableCellStyle = {
  background: "#828282",
  color: "#000",
  padding: "8px",
  borderBottom: "1px solid #000000",
};

export default SchedulingForm;
