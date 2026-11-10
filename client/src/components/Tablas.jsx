import React from 'react';

export default function Tablas({ t }) {
  return (
    <div className="tab-pane animate-fade-in">
      <div className="glass-card">
        <h2 className="section-title">🧮 {t.tablasTitulo}</h2>
        
        <h3 className="sub-title-blue">{t.tablasReciprocidad}</h3>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr><th>Apertura (f)</th><th>Velocidad (ISO 100)</th><th>{t.resultadoOptico}</th></tr>
            </thead>
            <tbody>
              <tr><td>f/1.4 - f/2.8</td><td>1/2000s - 1/1000s</td><td>Fondo desenfocado / Retrato</td></tr>
              <tr><td>f/4.0 - f/5.6</td><td>1/500s - 1/250s</td><td>Desenfoque suave / Grupos</td></tr>
              <tr><td>f/8.0</td><td>1/125s</td><td>Punto dulce del lente (Nitidez máxima)</td></tr>
              <tr><td>f/11 - f/16</td><td>1/60s - 1/30s</td><td>Profundidad de campo total / Paisajes</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="sub-title-blue">{t.tablasND}</h3>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr><th>Filtro ND</th><th>{t.pasosLuz}</th><th>{t.velocidadReal}</th></tr>
            </thead>
            <tbody>
              <tr><td>ND8</td><td>3 pasos</td><td>1/15s</td></tr>
              <tr><td>ND64</td><td>6 pasos</td><td>1/2s (Agua suave)</td></tr>
              <tr><td>ND1000</td><td>10 pasos</td><td>8 segundos (Efecto seda total)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="sub-title-blue">{t.tablasCrop}</h3>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr><th>{t.sensor}</th><th>{t.multiplicador}</th><th>{t.equivalente50}</th></tr>
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