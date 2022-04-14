import { useState } from "react";
import CerrarModal from "../img/cerrar.svg";

const Modal = ({ setModal, animarModal, setAnimarModal }) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleCerrarModal = () => {
    setAnimarModal(false);

    setTimeout(() => {
      console.log("cerrandomodal");
      setModal(false);
    }, 700);
  };
  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarModal} alt="Cerrar Modal" onClick={handleCerrarModal} />
      </div>
      <form className={`formulario  ${animarModal ? "animar" : "cerrar"}`}>
        <legend>Nuevo Gasto</legend>

        <div className="campo">
          <label htmlFor="">Nombre Gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre Gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Monto del gasto"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Tipo de gasto</label>
          <select
            name=""
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">--Seleccione--</option>
            <option value="ahorro">Ahorro</option>
            <option value="casa">Casa</option>
            <option value="comida">Comida</option>
            <option value="gastos">Varios</option>
            <option value="salud">Salud</option>
            <option value="ocio">Ocio</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input type="submit" value="Añadir Gasto" />
      </form>
    </div>
  );
};

export default Modal;
