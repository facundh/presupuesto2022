import { useEffect, useState } from "react";
import {CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({ presupuesto, gastos }) => {
  

  const [porcentaje, setPorcentaje] = useState(0);
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

    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);

    setDisponible(totalDisponible);
    setGastado(totalGastos);

    setTimeout(() => {
        setPorcentaje(nuevoPorcentaje);
    }, 1000);
   
  }, [gastos]);
  
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar 
          styles={buildStyles({
            pathColor:porcentaje > 100 ? '#A74242' : 'palegreen',
            trailColor:'#E7D9D9',
            textColor:porcentaje > 100 ? '#A74242' : 'palegreen',
            text:{porcentaje},

          })}
          value={porcentaje}
          text={`${porcentaje}%`}
         
          
        />
      </div>

      <div className="contenido-presupuesto">
        <p>
          <span> Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible <  0 ? 'negativo' : ''}`}>
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
