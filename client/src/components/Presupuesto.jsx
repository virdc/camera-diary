import React from 'react';

export default function Presupuesto({
  t,
  moneda, setMoneda,
  ubicacion, setUbicacion,
  cliente, setCliente,
  servicio, setServicio,
  precioHora, setPrecioHora,
  horasEstimadas, setHorasEstimadas,
  fotosEntregadas, setFotosEntregadas,
  gastosViaticos, setGastosViaticos,
  presupuestoTotal,
  imprimirPresupuestoPDF
}) {
  return (
    <div className="tab-pane animate-fade-in">
      <div className="glass-card">
        <h2 className="section-title">💼 {t.presupuestoTitulo}</h2>
        <div className="biz-form">
          <div className="grid-inputs">
            <div className="form-group">
              <label>{t.moneda}</label>
              <select value={moneda} onChange={(e) => setMoneda(e.target.value)} className="modern-select">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="ARS">ARS ($)</option>
                <option value="MXN">MXN ($)</option>
                <option value="CLP">CLP ($)</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t.locacion}</label>
              <select value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} className="modern-select">
                <option value="exteriores">{t.exteriores}</option>
                <option value="estudio">{t.estudioPro}</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>{t.clienteProyecto}</label>
            <input type="text" className="modern-input" placeholder={t.clientePlaceholder} value={cliente} onChange={(e) => setCliente(e.target.value)} />
          </div>

          <div className="grid-inputs">
            <div className="form-group">
              <label>{t.tarifaHora} ({moneda}):</label>
              <input type="number" className="modern-input" value={precioHora} onChange={(e) => setPrecioHora(e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t.horasCobertura}</label>
              <input type="number" className="modern-input" value={horasEstimadas} onChange={(e) => setHorasEstimadas(e.target.value)} />
            </div>
          </div>

          <div className="grid-inputs">
            <div className="form-group">
              <label>{t.fotosEntregadas}</label>
              <input type="number" className="modern-input" value={fotosEntregadas} onChange={(e) => setFotosEntregadas(e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t.viaticosExtras} ({moneda}):</label>
              <input type="number" className="modern-input" value={gastosViaticos} onChange={(e) => setGastosViaticos(e.target.value)} />
            </div>
          </div>

          <div className="total-box">
            <span>{t.presupuestoFinal}</span>
            <span className="price">{presupuestoTotal} {moneda}</span>
          </div>

          <button className="btn-pdf" onClick={imprimirPresupuestoPDF}>
            {t.generarPDF}
          </button>
        </div>
      </div>
    </div>
  );
}