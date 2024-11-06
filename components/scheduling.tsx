"use client";
import { useSnackbar } from 'notistack';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { MdDelete, MdEdit } from "react-icons/md";
import { ActionContainer, ActionIcon, Button, Container, Form, FormContainer, FormGroup, Input, Table, TableCell, TableContainer, TableHeader, TableRow } from './styles';

interface Agendamento {
  _id?: string;
  name: string;
  date: string;
  time?: string;
  location: string;
}

const SchedulingForm: React.FC = () => {
  const [agendamento, setAgendamento] = useState<Agendamento>({
    _id: '',
    name: '',
    date: '',
    time: "14:00",
    location: '',
  });

  const { enqueueSnackbar } = useSnackbar();
  const [dataSource, setDataSource] = useState<Agendamento[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAgendamento((prevAgendamento) => ({
      ...prevAgendamento,
      [name]: value,
    }));
  };

  const handleDelete = (id: string) => {
    fetch(`http://localhost:5001/appointments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => { handleGetItems() });
    enqueueSnackbar('Agendamento deletado!', { variant: 'error' });
  };

  const handlePut = (id: string) => {
    fetch(`http://localhost:5001/appointments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => { handleGetItems() });
    enqueueSnackbar('Agendamento atualizado!', { variant: 'error' });
  };

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
        enqueueSnackbar(`Erro ao buscar os dados: ${error}`, { variant: 'error' });
      });
  };

  interface DataType {
    _id: string;
    name: string;
    date: string;
    time: string;
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

    if (agendamento.name && agendamento.date && agendamento.time && agendamento.location) {
      try {
        await fetch("http://localhost:5001/appointments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(agendamento),
        });
        handleGetItems();
        setAgendamento({
          name: '', date: '', time: '', location: '',
        });
        console.log(agendamento)
        enqueueSnackbar('Agendamento feito com sucesso!', { variant: 'success' });
      } catch (error) {
        console.error("Erro:", error);
      }
    } else {
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  return (
    <Container>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Nome: </label>
            <Input
              type="text"
              name="name"
              value={agendamento.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Data: </label>
            <Input
              type="date"
              name="date"
              value={agendamento.date}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Hora: </label>
            <Input
              type="time"
              name="time"
              value={agendamento.time}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Local: </label>
            <Input
              type="text"
              name="location"
              value={agendamento.location}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <Button type="submit">Agendar</Button>
        </Form>
      </FormContainer>
      <TableContainer>
        <h3>Agendamentos</h3>
        <Table>
          <thead>
            <tr>
              <TableHeader>Nome</TableHeader>
              <TableHeader>Data</TableHeader>
              <TableHeader>Hora</TableHeader>
              <TableHeader>Local</TableHeader>
              <TableHeader />
            </tr>
          </thead>
          <tbody>
            {dataSource.map((agendamento, index) => (
              <TableRow key={index}>
                <TableCell>{agendamento.name}</TableCell>
                <TableCell>{agendamento.date}</TableCell>
                <TableCell>{agendamento.time}</TableCell>
                <TableCell>{agendamento.location}</TableCell>
                <TableCell>
                  <ActionContainer>
                    <ActionIcon onClick={() => { handleDelete(agendamento._id) }}>
                      <MdDelete />
                    </ActionIcon>
                    <ActionIcon onClick={() => { handlePut(agendamento._id) }}>
                      <MdEdit />
                    </ActionIcon>
                  </ActionContainer>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SchedulingForm;
