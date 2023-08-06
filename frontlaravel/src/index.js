import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../src/components/Common/Layout';
import Home from '../src/components/Common/Home';
import DepartamentosHome from '../src/components/Departamentos/DepartamentosHome'; // Change here
import FuncionariosHome from '../src/components/Funcionarios/FuncionariosHome'; // Change here
import TarefasHome from '../src/components/Tarefas/TarefasHome'; // Change here
import NoPage from '../src/components/Common/NoPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/departamentos" element={<DepartamentosHome />} /> {/* Change here */}
          <Route path="/funcionarios" element={<FuncionariosHome />} /> {/* Change here */}
          <Route path="/tarefas" element={<TarefasHome />} /> {/* Change here */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
