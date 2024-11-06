"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { MdDeleteForever } from "react-icons/md";

interface Agendamento {
  nome: string;
  data: string;
  hora: string;
  local: string;
  icon: React.ReactNode;
}

const SchedulingForm: React.FC = () => {
  const [agendamento, setAgendamento] = useState<Agendamento>({
    nome: '',
    data: '',
    hora: '',
    local: '',
    icon: <MdDeleteForever style={{ cursor: "pointer" }} />
  });

  const [dataSource, setDataSource] = useState<Agendamento[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAgendamento((prevAgendamento) => ({
      ...prevAgendamento,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (agendamento.nome && agendamento.data && agendamento.hora && agendamento.local) {
      try {
        // const response = await fetch("http://localhost:3000", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(agendamento),
        // });

        setDataSource((prevDataSource) => [...prevDataSource, agendamento]);

        setAgendamento({
          nome: '', data: '', hora: '', local: '', icon: "MdDeleteForever"
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
                name="nome"
                value={agendamento.nome}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Data: </label>
              <input
                type="date"
                name="data"
                value={agendamento.data}
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
                name="local"
                value={agendamento.local}
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
                  <td style={tableHeaderStyle}>{agendamento.nome}</td>
                  <td style={tableHeaderStyle}>{agendamento.data}</td>
                  <td style={tableHeaderStyle}>{agendamento.hora}</td>
                  <td style={tableHeaderStyle}>{agendamento.local}</td>
                  <td style={tableHeaderStyle}>{agendamento.icon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
