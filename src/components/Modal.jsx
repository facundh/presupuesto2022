import { useState } from "react";
import Mensaje from './Mensaje';
import CerrarModal from "../img/cerrar.svg";

const Modal = ({ setModal, animarModal, setAnimarModal, agregarGasto }) => {

  const [mensaje, setMensaje] = useState('');
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if([nombre, cantidad ,categoria].includes('')){
      setMensaje('Todos los campos son obligatorios');

      setTimeout(() => {
        setMensaje('');
      }, 700);
      return;
    }

    agregarGasto({nombre, cantidad, categoria});

  }


  const handleCerrarModal = () => {
    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 700);
  };
  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarModal} alt="Cerrar Modal" onClick={handleCerrarModal} />
      </div>
      <form onSubmit={handleSubmit} className={`formulario  ${animarModal ? "animar" : "cerrar"}`}>
        <legend>Nuevo Gasto</legend>
        {mensaje && <Mensaje tipo='warnign'>{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
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
