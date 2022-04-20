import { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import CerrarModal from "../img/cerrar.svg";

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  gastoEditar,
  editarGasto,
  setEditarGasto,
}) => {
  const [mensaje, setMensaje] = useState("");
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [id, setId] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    if (Object.keys(editarGasto).length > 0) {
      setNombre(editarGasto.nombre);
      setCantidad(editarGasto.cantidad);
      setCategoria(editarGasto.categoria);
      setId(editarGasto.id)
      setFecha(editarGasto.fecha)
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");

      setTimeout(() => {
        setMensaje("");
      }, 700);
      return;
    }

    gastoEditar({ nombre, cantidad, categoria, id, fecha });
  };

  const handleCerrarModal = () => {
    setAnimarModal(false);
    setEditarGasto({})

    setTimeout(() => {
      setModal(false);
    }, 700);
  };
  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarModal} alt="Cerrar Modal" onClick={handleCerrarModal} />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`formulario  ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>{editarGasto.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
        {mensaje && <Mensaje tipo="warnign">{mensaje}</Mensaje>}
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

        <input type="submit" value={editarGasto.nombre ? 'Actualizar Gasto' : 'Añadir Gasto'} />
      </form>
    </div>
  );
};

export default Modal;
