import React from 'react';

// Tasas generales vigentes. Son editables en pantalla por si el caso es especial.
export const PAISES = {
  AR: { nombre: 'Argentina', moneda: 'ARS', iva: 21, impuesto: 'IVA' },
  MX: { nombre: 'México', moneda: 'MXN', iva: 16, impuesto: 'IVA' },
  CL: { nombre: 'Chile', moneda: 'CLP', iva: 19, impuesto: 'IVA' },
  CO: { nombre: 'Colombia', moneda: 'COP', iva: 19, impuesto: 'IVA' },
  PE: { nombre: 'Perú', moneda: 'PEN', iva: 18, impuesto: 'IGV' },
  UY: { nombre: 'Uruguay', moneda: 'UYU', iva: 22, impuesto: 'IVA' },
  ES: { nombre: 'España', moneda: 'EUR', iva: 21, impuesto: 'IVA' },
  PT: { nombre: 'Portugal', moneda: 'EUR', iva: 23, impuesto: 'IVA' },
  FR: { nombre: 'Francia', moneda: 'EUR', iva: 20, impuesto: 'TVA' },
  DE: { nombre: 'Alemania', moneda: 'EUR', iva: 19, impuesto: 'MwSt' },
  IT: { nombre: 'Italia', moneda: 'EUR', iva: 22, impuesto: 'IVA' },
  US: { nombre: 'Estados Unidos', moneda: 'USD', iva: 0, impuesto: 'Sales Tax' },
  OTRO: { nombre: 'Otro país', moneda: 'USD', iva: 0, impuesto: 'IVA' },
};

const num = (v) => parseFloat(v) || 0;
const redondear = (n) => Math.round(n * 100) / 100;

// Se usa tanto en este componente como en App.js (para el PDF)
export function calcularPresupuesto({
  precioHora,
  horasEstimadas,
  gastosViaticos,
  ubicacion,
  recargoEstudio = 40,
  modoIVA,
  tasaIVA,
}) {
  const recargo = ubicacion === 'estudio' ? num(recargoEstudio) : 0;
  const base = num(precioHora) * num(horasEstimadas) + num(gastosViaticos) + recargo;
  const tasa = modoIVA === 'sin' ? 0 : num(tasaIVA) / 100;

  let subtotal, iva, total;
  if (modoIVA === 'incluido') {
    total = base;
    subtotal = base / (1 + tasa);
    iva = total - subtotal;
  } else {
    subtotal = base;
    iva = base * tasa;
    total = subtotal + iva;
  }
  return {
    subtotal: redondear(subtotal),
    iva: redondear(iva),
    total: redondear(total),
    recargo,
  };
}

export function formatearMoneda(valor, moneda) {
  try {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: moneda,
      maximumFractionDigits: moneda === 'CLP' || moneda === 'COP' ? 0 : 2,
    }).format(valor);
  } catch {
    return `${valor} ${moneda}`;
  }
}

export default function Presupuesto({
  t,
  pais, setPais,
  moneda, setMoneda,
  modoIVA, setModoIVA,        // 'sin' | 'agregar' | 'incluido'
  tasaIVA, setTasaIVA,
  ubicacion, setUbicacion,
  recargoEstudio = 40, setRecargoEstudio,
  cliente, setCliente,
  precioHora, setPrecioHora,
  horasEstimadas, setHorasEstimadas,
  fotosEntregadas, setFotosEntregadas,
  gastosViaticos, setGastosViaticos,
  imprimirPresupuestoPDF,
}) {
  const infoPais = PAISES[pais] || PAISES.OTRO;
  const nombreImpuesto = infoPais.impuesto;

  const { subtotal, iva, total, recargo } = calcularPresupuesto({
    precioHora, horasEstimadas, gastosViaticos, ubicacion, recargoEstudio, modoIVA, tasaIVA,
  });

  const handlePais = (codigo) => {
    const p = PAISES[codigo];
    setPais(codigo);
    setMoneda(p.moneda);
    setTasaIVA(p.iva);
    if (p.iva === 0) setModoIVA('sin');
    else if (modoIVA === 'sin') setModoIVA('agregar');
  };

  return (
    <div className="tab-pane animate-fade-in">
      <div className="glass-card">
        <h2 className="section-title">💼 {t.presupuestoTitulo}</h2>

        <div className="biz-form">
          {/* Bloque 1: País, moneda y cliente */}
          <div className="form-section">
            <h3 className="subsection-title">{t.datosGenerales || '1. País, moneda y cliente'}</h3>
            <div className="grid-inputs">
              <div className="form-group">
                <label>{t.pais || 'País'}</label>
                <select
                  value={pais}
                  onChange={(e) => handlePais(e.target.value)}
                  className="modern-select"
                >
                  {Object.entries(PAISES).map(([codigo, p]) => (
                    <option key={codigo} value={codigo}>{p.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>{t.moneda}</label>
                <select
                  value={moneda}
                  onChange={(e) => setMoneda(e.target.value)}
                  className="modern-select"
                >
                  {['USD', 'EUR', 'ARS', 'MXN', 'CLP', 'COP', 'PEN', 'UYU'].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>{t.clienteProyecto}</label>
              <input
                type="text"
                className="modern-input"
                placeholder={t.clientePlaceholder}
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
              />
            </div>
          </div>

          <hr className="section-divider" />

          {/* Bloque 2: Locación y valor de estudio */}
          <div className="form-section">
            <h3 className="subsection-title">{t.locacionTitulo || '2. Locación'}</h3>
            <div className={ubicacion === 'estudio' ? 'grid-inputs' : 'form-group'}>
              <div className="form-group">
                <label>{t.locacion}</label>
                <select
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  className="modern-select"
                >
                  <option value="exteriores">{t.exteriores}</option>
                  <option value="estudio">{t.estudioPro}</option>
                </select>
              </div>

              {ubicacion === 'estudio' && (
                <div className="form-group">
                  <label>{t.valorEstudio || 'Valor estudio'} ({moneda}):</label>
                  <input
                    type="number"
                    min="0"
                    inputMode="decimal"
                    className="modern-input"
                    value={recargoEstudio}
                    onChange={(e) => setRecargoEstudio?.(e.target.value)}
                  />
                </div>
              )}
            </div>
            <small className="hint">
              {ubicacion === 'estudio'
                ? (t.ayudaEstudio || 'Se suma el valor indicado para el uso de estudio.')
                : (t.ayudaExteriores || 'En exteriores no se aplica recargo adicional de estudio.')}
            </small>
          </div>

          <hr className="section-divider" />

          {/* Bloque 3: Tiempo, entrega y extras */}
          <div className="form-section">
            <h3 className="subsection-title">{t.detalleTrabajo || '3. Tarifa, horas y extras'}</h3>
            <div className="grid-inputs">
              <div className="form-group">
                <label>{t.tarifaHora} ({moneda}):</label>
                <input
                  type="number"
                  min="0"
                  inputMode="decimal"
                  className="modern-input"
                  value={precioHora}
                  onChange={(e) => setPrecioHora(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>{t.horasCobertura}</label>
                <input
                  type="number"
                  min="0"
                  inputMode="decimal"
                  className="modern-input"
                  value={horasEstimadas}
                  onChange={(e) => setHorasEstimadas(e.target.value)}
                />
              </div>
            </div>

            <div className="grid-inputs">
              <div className="form-group">
                <label>{t.fotosEntregadas}</label>
                <input
                  type="number"
                  min="0"
                  inputMode="numeric"
                  className="modern-input"
                  value={fotosEntregadas}
                  onChange={(e) => setFotosEntregadas(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>{t.viaticosExtras} ({moneda}):</label>
                <input
                  type="number"
                  min="0"
                  inputMode="decimal"
                  className="modern-input"
                  value={gastosViaticos}
                  onChange={(e) => setGastosViaticos(e.target.value)}
                />
              </div>
            </div>
          </div>

          <hr className="section-divider" />

          {/* Bloque 4: Impuestos */}
          <div className="form-section">
            <h3 className="subsection-title">{nombreImpuesto}</h3>
            <div className="grid-inputs">
              <div className="form-group">
                <label>{t.modoImpuesto || `Aplicación de ${nombreImpuesto}`}</label>
                <select
                  value={modoIVA}
                  onChange={(e) => setModoIVA(e.target.value)}
                  className="modern-select"
                >
                  <option value="sin">{t.sinIVA || `Sin ${nombreImpuesto}`}</option>
                  <option value="agregar">{t.agregarIVA || `Agregar ${nombreImpuesto} al precio`}</option>
                  <option value="incluido">{t.ivaIncluido || `${nombreImpuesto} ya incluido en el precio`}</option>
                </select>
              </div>

              <div className="form-group">
                <label>{t.tasa || 'Tasa'} (%)</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  inputMode="decimal"
                  className="modern-input"
                  value={tasaIVA}
                  disabled={modoIVA === 'sin'}
                  onChange={(e) => setTasaIVA(e.target.value)}
                />
              </div>
            </div>

            {pais === 'US' && (
              <small className="hint">
                {t.notaUS || 'EE. UU. no tiene IVA federal; el sales tax depende del estado y los servicios suelen estar exentos. Ajustá la tasa si corresponde.'}
              </small>
            )}
          </div>

          {/* Desglose — ✅ SIN estilos inline */}
          <div className="total-box">
            {ubicacion === 'estudio' && recargo > 0 && (
              <div className="desglose-row">
                <span>{t.valorEstudio || 'Valor estudio'}</span>
                <span>{formatearMoneda(recargo, moneda)}</span>
              </div>
            )}

            {modoIVA !== 'sin' && (
              <>
                <div className="desglose-row">
                  <span>{t.subtotal || 'Subtotal'}</span>
                  <span>{formatearMoneda(subtotal, moneda)}</span>
                </div>
                <div className="desglose-row">
                  <span>{nombreImpuesto} ({num(tasaIVA)}%)</span>
                  <span>{formatearMoneda(iva, moneda)}</span>
                </div>
                <div className="desglose-divider" aria-hidden="true" />
              </>
            )}

            <div className="desglose-row desglose-total">
              <span>{t.presupuestoFinal}</span>
              <span className="price">{formatearMoneda(total, moneda)}</span>
            </div>
          </div>

          {/* Acciones */}
          <div className="actions-bar">
            <button type="button" className="btn-pdf" onClick={imprimirPresupuestoPDF}>
              📄 {t.generarPDF}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}