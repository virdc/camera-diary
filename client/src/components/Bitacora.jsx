import React from 'react';

export default function Bitacora({
  t = {},
  registros = [],
  borrarRegistro,
  exportarExcel,
  onVolverAjustes,
}) {
  const lista = Array.isArray(registros) ? registros : [];

  return (
    <div className="tab-pane animate-fade-in">
      <div className="glass-card">

        {/* Header — sin estilos inline */}
        <div className="bitacora-header">
          <div>
            <h2 className="section-title">
              📝 {t.bitacoraTitulo || 'Bitácora de tomas'}
            </h2>
            {lista.length > 0 && (
              <small className="hint">
                {lista.length} {lista.length === 1 ? 'toma registrada' : 'tomas registradas'}
              </small>
            )}
          </div>

          <div className="aj-acciones">
            {typeof onVolverAjustes === 'function' && (
              <button
                type="button"
                className="aj-btn-sec"
                onClick={onVolverAjustes}
              >
                ➕ {t.nuevaToma || 'Nueva toma'}
              </button>
            )}
            <button
              type="button"
              className="btn-excel"
              onClick={exportarExcel}
              disabled={lista.length === 0 || typeof exportarExcel !== 'function'}
              aria-label={t.exportarExcel || 'Exportar a Excel'}
            >
              ⬇️ {t.exportarExcel || 'Exportar Excel'}
            </button>
          </div>
        </div>

        {/* Lista */}
        <div className="history-list">
          {lista.length === 0 ? (
            <p className="empty-msg">
              {t.bitacoraVacia || 'Todavía no hay tomas registradas en la bitácora.'}
            </p>
          ) : (
            lista.map((item, index) => {
              const numeroToma = lista.length - index;
              return (
                <article className="history-card" key={item.id ?? `${item.fecha}-${item.hora}-${index}`}>
                  {/* minWidth: 0 evita que el contenido empuje el botón fuera */}
                  <div className="history-content">
                    <div className="card-top">
                      <span className="badge">#{numeroToma} · {item.tecnica}</span>
                      {item.luz && <span className="badge-luz">{item.luz}</span>}
                      <span className="time">
                        {item.fecha}
                        {item.hora ? ` · ${item.hora}` : ''}
                      </span>
                    </div>

                    <div className="card-equipment">
                      📷 {item.camara}
                      {item.lente ? (
                        <>
                          <span aria-hidden="true"> · </span>
                          🔍 {item.lente}
                        </>
                      ) : null}
                    </div>

                    {item.parametros && (
                      <div className="card-params">{item.parametros}</div>
                    )}

                    {item.flash && (
                      <div className="card-flash">⚡ Flash: {item.flash}</div>
                    )}

                    {item.tomas && (
                      <div className="card-tomas">
                        📸 {t.tomasSugeridas || 'Tomas sugeridas'}: {item.tomas}
                      </div>
                    )}

                    {item.nota && (
                      <div className="card-note">📝 {item.nota}</div>
                    )}
                  </div>

                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => borrarRegistro?.(item.id)}
                    title={t.borrarRegistro || 'Borrar registro'}
                    aria-label={`Borrar registro del ${item.fecha || index + 1}`}
                  >
                    🗑️
                  </button>
                </article>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}