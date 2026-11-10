import React from 'react';

export default function Bitacora({ t, registros, borrarRegistro, exportarExcel }) {
  return (
    <div className="tab-pane animate-fade-in">
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 className="section-title" style={{ margin: 0 }}>📝 {t.bitacoraTitulo}</h2>
          <button className="btn-excel" onClick={exportarExcel}>{t.exportarExcel}</button>
        </div>

        <div className="history-list">
          {registros.length === 0 ? (
            <p className="empty-msg">{t.bitacoraVacia}</p>
          ) : (
            registros.map((item) => (
              <div className="history-card" key={item.id}>
                <div style={{ flexGrow: 1 }}>
                  <div className="card-top">
                    <span className="badge">{item.tecnica}</span>
                    <span className="badge-luz">{item.luz}</span>
                    <span className="time">{item.fecha} - {item.hora}</span>
                  </div>
                  <div className="card-equipment">📷 {item.camara} | 🔍 {item.lente}</div>
                  <div className="card-params">{item.parametros}</div>
                  <div className="card-flash">⚡ Flash: {item.flash}</div>
                  <div className="card-tomas">📸 {t.tomasSugeridas} {item.tomas}</div>
                  {item.nota && <div className="card-note">📝 {item.nota}</div>}
                </div>
                <button className="btn-delete" onClick={() => borrarRegistro(item.id)} title="Borrar registro">
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}