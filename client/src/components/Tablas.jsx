import React from 'react';

const FILAS_RECIPROCIDAD = [
  { apertura: 'f/1.4 - f/2.8', velocidad: '1/2000s - 1/1000s', resultado: 'Fondo desenfocado / Retrato' },
  { apertura: 'f/4.0 - f/5.6', velocidad: '1/500s - 1/250s', resultado: 'Desenfoque suave / Grupos' },
  { apertura: 'f/8.0', velocidad: '1/125s', resultado: 'Punto dulce del lente (Nitidez máxima)' },
  { apertura: 'f/11 - f/16', velocidad: '1/60s - 1/30s', resultado: 'Profundidad de campo total / Paisajes' },
];

const FILAS_ND = [
  { filtro: 'ND8', pasos: '3 pasos', velocidadReal: '1/15s', nota: 'Filtro ND8 (3 pasos)' },
  { filtro: 'ND64', pasos: '6 pasos', velocidadReal: '1/2s', etiqueta: '1/2s (Agua suave)', nota: 'Filtro ND64 (6 pasos - Agua suave)' },
  { filtro: 'ND1000', pasos: '10 pasos', velocidadReal: '8s', etiqueta: '8 segundos (Efecto seda total)', nota: 'Filtro ND1000 (10 pasos - Seda)' },
];

export default function Tablas({ t = {}, ctxToma, onAplicarAjuste, onVolverAjustes }) {
  const aplicarFila = (parcial) => {
    if (typeof onAplicarAjuste === 'function') {
      onAplicarAjuste(parcial, true);
    }
  };

  return (
    <div className="tab-pane animate-fade-in">
      <div className="glass-card">
        <div className="bitacora-header">
          <div>
            <h2 className="section-title">🧮 {t.tablasTitulo || 'Tablas de referencia'}</h2>
            {ctxToma && (
              <small className="hint">
                Contexto activo: {ctxToma.lugar === 'estudio' ? 'Estudio' : 'Exteriores'} · {ctxToma.tipoFoto}
              </small>
            )}
          </div>
          {typeof onVolverAjustes === 'function' && (
            <button type="button" className="aj-btn-sec" onClick={onVolverAjustes}>
              🎯 {t.volverAjustes || 'Volver a Ajustes'}
            </button>
          )}
        </div>

        <h3 className="sub-title-blue">{t.tablasReciprocidad || 'Reciprocidad y profundidad'}</h3>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Apertura (f)</th>
                <th>Velocidad (ISO 100)</th>
                <th>{t.resultadoOptico || 'Resultado óptico'}</th>
                {typeof onAplicarAjuste === 'function' && <th>{t.aplicar || 'Ajustes'}</th>}
              </tr>
            </thead>
            <tbody>
              {FILAS_RECIPROCIDAD.map((fila) => (
                <tr key={fila.apertura}>
                  <td>{fila.apertura}</td>
                  <td>{fila.velocidad}</td>
                  <td>{fila.resultado}</td>
                  {typeof onAplicarAjuste === 'function' && (
                    <td>
                      <button
                        type="button"
                        className="aj-btn-sec"
                        onClick={() =>
                          aplicarFila({
                            apertura: fila.apertura,
                            obturacion: fila.velocidad,
                            iso: 'ISO 100',
                          })
                        }
                      >
                        Usar en toma
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="sub-title-blue">{t.tablasND || 'Filtros ND'}</h3>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Filtro ND</th>
                <th>{t.pasosLuz || 'Pasos de luz'}</th>
                <th>{t.velocidadReal || 'Velocidad real'}</th>
                {typeof onAplicarAjuste === 'function' && <th>{t.aplicar || 'Ajustes'}</th>}
              </tr>
            </thead>
            <tbody>
              {FILAS_ND.map((nd) => (
                <tr key={nd.filtro}>
                  <td>{nd.filtro}</td>
                  <td>{nd.pasos}</td>
                  <td>{nd.etiqueta || nd.velocidadReal}</td>
                  {typeof onAplicarAjuste === 'function' && (
                    <td>
                      <button
                        type="button"
                        className="aj-btn-sec"
                        onClick={() => aplicarFila({ obturacion: nd.velocidadReal })}
                      >
                        Aplicar velocidad
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="sub-title-blue">{t.tablasCrop || 'Factor de recorte'}</h3>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>{t.sensor || 'Sensor'}</th>
                <th>{t.multiplicador || 'Multiplicador'}</th>
                <th>{t.equivalente50 || 'Equivalente 50mm'}</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Full Frame (35mm)</td><td>1.0x</td><td>50mm</td></tr>
              <tr><td>APS-C (Canon)</td><td>1.6x</td><td>80mm</td></tr>
              <tr><td>APS-C (Nikon / Sony / Fuji)</td><td>1.5x</td><td>75mm</td></tr>
              <tr><td>Micro Cuatro Tercios (M4/3)</td><td>2.0x</td><td>100mm</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}