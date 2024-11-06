"use client";
import Head from 'next/head';
import SchedulingForm from '../../components/scheduling';
import { SnackbarProvider } from 'notistack';
import { Header, Main, SubTitle } from '../../components/styles';

const Home: React.FC = () => {
  return (
    <SnackbarProvider>
      <Head>
        <title>Agendamento</title>
        <meta name="description" content="Aplicação de agendamento" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Header>
          <h1>Agendamento</h1>
        </Header>
        <SubTitle>Preencha todos os campos</SubTitle>
        <SchedulingForm />
      </Main>
    </SnackbarProvider>
  );
};

export default Home;
