import Head from 'next/head';
import SchedulingForm from '../../components/scheduling';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Agendamento</title>
        <meta name="description" content="Aplicação de agendamento" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div style={{ background: "#acacac", width: "100%", height: "60px", display: 'flex', justifyContent: "center", alignItems: "center" }} >
          <h1>Agendamento</h1>
        </div >
        <SchedulingForm />
      </main>
    </>
  );
};

export default Home;
