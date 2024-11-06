"use client"
import Head from 'next/head';
import SchedulingForm from '../../components/scheduling';
import { SnackbarProvider } from 'notistack'


const Home: React.FC = () => {
  return (
    <SnackbarProvider>
      <Head>
        <title>Agendamento</title>
        <meta name="description" content="Aplicação de agendamento" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div style={{
          background: 'linear-gradient( #7c7c7c, #FAFAFA)', width: '100%', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000', marginBottom: '15px'
        }}>
          <h1>Agendamento</h1>
        </div>
        <h3 style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>Preencha todos os campos</h3>
        <SchedulingForm />
      </main>
    </SnackbarProvider >
  );
};

export default Home;
