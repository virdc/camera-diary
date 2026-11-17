import React from 'react';

export default function Bitacora({ t, registros, borrarRegistro, exportarExcel }) {
  return (
    <div className="tab-pane animate-fade-in">
      <div className="glass-card">

        {/* Header — ✅ sin estilos inline */}
        <div className="bitacora-header">
          <h2 className="section-title">📝 {t.bitacoraTitulo}</h2>
          <button
            className="btn-excel"
            onClick={exportarExcel}
            disabled={registros.length === 0}
            aria-label={t.exportarExcel}
          >
            ⬇️ {t.exportarExcel}
          </button>
        </div>

        {/* Lista */}
        <div className="history-list">
          {registros.length === 0 ? (
            <p className="empty-msg">{t.bitacoraVacia}</p>
          ) : (
            registros.map((item) => (
              <article className="history-card" key={item.id}>
                {/* ✅ minWidth: 0 evita que el contenido empuje el botón fuera */}
                <div className="history-content">
                  <div className="card-top">
                    <span className="badge">{item.tecnica}</span>
                    <span className="badge-luz">{item.luz}</span>
                    <span className="time">{item.fecha} · {item.hora}</span>
                  </div>

                  <div className="card-equipment">
                    📷 {item.camara} <span aria-hidden="true">·</span> 🔍 {item.lente}
                  </div>

                  <div className="card-params">{item.parametros}</div>
                  <div className="card-flash">⚡ Flash: {item.flash}</div>
                  <div className="card-tomas">📸 {t.tomasSugeridas}: {item.tomas}</div>

                  {item.nota && (
                    <div className="card-note">📝 {item.nota}</div>
                  )}
                </div>

                <button
                  className="btn-delete"
                  onClick={() => borrarRegistro(item.id)}
                  title="Borrar registro"
                  aria-label={`Borrar registro del ${item.fecha}`}
                >
                  🗑️
                </button>
              </article>
            ))
          )}
        </div>

      </div>
    </div>
  );
}