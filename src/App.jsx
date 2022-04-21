import { useState, useEffect } from "react";
import Filtros from "./components/Filtros";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";

import { idGenerator } from "./helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  const [gastos, setGastos] = useState(
   localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem("gastos")) :[]
  );
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  const [editarGasto, setEditarGasto] = useState({});

  useEffect(() => {
    if (Object.keys(editarGasto).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 600);
    }
  }, [editarGasto]);

  const handleNuevoGasto = () => {
    setModal(true);
    setEditarGasto({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 600);
  };

  const gastoEditar = (gasto) => {
    if (gasto.id) {
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
      setEditarGasto({});
    } else {
      gasto.id = idGenerator();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 700);
  };

  const eliminarGasto = (id) => {
    const gastoEliminado = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastoEliminado);
  };
  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos)) ?? [];
  }, [gastos]);

  useEffect(() => {
    if(filtro){

      const gastoFiltrado = gastos.filter(gasto => gasto.categoria === filtro);

      setGastosFiltrados(gastoFiltrado);
    }
    
  },[filtro])

  useEffect(() => {
    const presupuestoLS = localStorage.getItem("presupuesto") ?? 0;
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);


  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
            filtro={filtro}
            setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setEditarGasto={setEditarGasto}
              eliminarGasto={eliminarGasto}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
            />
          </main>

          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          gastoEditar={gastoEditar}
          setEditarGasto={setEditarGasto}
          editarGasto={editarGasto}
        />
      )}
    </div>
  );
}

export default App;
