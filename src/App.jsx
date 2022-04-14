import { useState } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";

import { idGenerator } from "./helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState([]);

  const handleNuevoGasto = () => {
    setModal(true);

    setTimeout(() => {
      console.log("animando modal");
      setAnimarModal(true);
    }, 600);
  };

  const agregarGasto = (gasto) => {
    gasto.id = idGenerator();
    setGastos([...gastos, gasto]);
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 700);
  };

  return (
    <div>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <div className="nuevo-gasto">
          <img
            src={IconoNuevoGasto}
            alt="nuevo gasto"
            onClick={handleNuevoGasto}
          />
        </div>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          agregarGasto={agregarGasto}
        />
      )}
    </div>
  );
}

export default App;
