"use client";
import { ActionContainer, ActionIcon, Button, Container, Form, FormContainer, FormGroup, Input, Table, TableCell, TableContainer, TableHeader, TableRow } from './styles';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { MdDelete, MdEdit } from "react-icons/md";
import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';

interface Agendamento {
  _id?: string;
  name: string;
  date: string;
  location: string;
}

const SchedulingForm: React.FC = () => {
  const [agendamento, setAgendamento] = useState<Agendamento>({
    _id: '',
    name: '',
    date: '',
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

  const handleChangeUpdate = (value: Agendamento) => {
    setAgendamento(value);
    console.log(value)
  };

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setAgendamento((prevAgendamento) => ({
      ...prevAgendamento,
      location: e.target.value
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
      body: JSON.stringify(agendamento)
    }).then(() => { handleGetItems() });
    enqueueSnackbar('Agendamento atualizado!', { variant: 'success' });
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
        setDataSource(() => data);
      })
      .catch((error) => {
        enqueueSnackbar(`Erro ao buscar os dados: ${error}`, { variant: 'error' });
      });
  };

  interface DataType {
    _id: string;
    name: string;
    date: string;
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
        setDataSource(() => data);
      })
      .catch((error) => {
        console.log("Erro ao buscar os dados:", error);
      });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(agendamento)
    if (agendamento._id) {
      handlePut(agendamento._id)
    } else if (agendamento.name && agendamento.date && agendamento.location) {
      try {
        const response = await fetch("http://localhost:5001/appointments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(agendamento),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erro ao criar agendamento');
        }

        handleGetItems();
        setAgendamento({
          name: '', date: '', location: '',
        });

        enqueueSnackbar('Agendamento feito com sucesso!', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar(`${error.message}`, { variant: 'error' });
      }
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
              type="datetime-local"
              name="date"
              value={dayjs(agendamento.date).format("YYYY-MM-DDTHH:mm")}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Local: </label>
            <select value={agendamento.location} required onChange={handleChangeSelect} name="location" id='city'>
              <option></option>
              <option value="Guarulhos">Guarulhos</option>
              <option value="São paulo">São paulo</option>
              <option value="Arujá">Arujá</option>
              <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
            </select>
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
              <TableHeader>Local</TableHeader>
              <TableHeader />
            </tr>
          </thead>
          <tbody>
            {dataSource.map((agendamento, index) => (
              <TableRow key={index}>
                <TableCell>{agendamento.name}</TableCell>
                <TableCell>{dayjs(agendamento.date).format("DD/MM/YYYY - HH:mm")}</TableCell>
                <TableCell>{agendamento.location}</TableCell>
                <TableCell>
                  <ActionContainer>
                    <ActionIcon onClick={() => { handleDelete(agendamento._id) }}>
                      <MdDelete />
                    </ActionIcon>
                    <ActionIcon onClick={() => { handleChangeUpdate(agendamento) }}>
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
