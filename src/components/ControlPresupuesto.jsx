import { useEffect, useState } from "react";

const ControlPresupuesto = ({ presupuesto, gastos }) => {

  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

    const formatearCantidad = (cantidad) => {
             return cantidad.toLocaleString('de-DE', {
                style: 'currency', currency: 'EUR'
            })
    }
  useEffect(() => {

    const totalGastos = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
    const totalDisponible = presupuesto - totalGastos;

    setDisponible(totalDisponible);
    setGastado(totalGastos);
   
  }, [gastos]);
  
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <p>Grafico aqui</p>
      </div>

      <div className="contenido-presupuesto">
        <p>
          <span> Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p>
          <span> Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span> Gastos: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
