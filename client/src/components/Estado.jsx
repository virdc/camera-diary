import React from 'react';
import { formatearMoneda } from './Presupuesto';

export default function Estado({
  t = {},
  registros = [],
  estadoServidor = '—',
  ctxToma,
  resumenPresupuesto,
  onNavegar,
  onLimpiarBitacora,
}) {
  const lista = Array.isArray(registros) ? registros : [];

  return (
    <div className="tab-pane animate-fade-in">
      <div className="glass-card">
        <h2 className="section-title">📊 {t.estadoTitulo || 'Estado general'}</h2>

        <div className="stats-grid">
          <div className="stat-card">
            <h4>{t.tomasRegistradas || 'Tomas registradas'}</h4>
            <p className="stat-val">{lista.length}</p>
          </div>
          <div className="stat-card">
            <h4>{t.backendApi || 'API / Backend'}</h4>
            <p className="stat-val">{estadoServidor}</p>
          </div>
          {resumenPresupuesto && (
            <div className="stat-card">
              <h4>{t.presupuestoFinal || 'Presupuesto actual'}</h4>
              <p className="stat-val">
                {formatearMoneda(resumenPresupuesto.total || 0, resumenPresupuesto.moneda || 'ARS')}
              </p>
            </div>
          )}
        </div>

        {ctxToma && (
          <p className="hint" style={{ marginTop: '1rem' }}>
            Toma activa: {ctxToma.lugar === 'estudio' ? 'Estudio' : 'Exteriores'} · {ctxToma.tipoFoto} ·{' '}
            {ctxToma.usaFlash ? 'Flash ON' : 'Sin flash'}
          </p>
        )}

        {typeof onNavegar === 'function' && (
          <div className="aj-acciones">
            <button type="button" className="aj-btn-sec" onClick={() => onNavegar('ajustar')}>
              🎯 {t.ajustes || 'Ajustes'}
            </button>
            <button type="button" className="aj-btn-sec" onClick={() => onNavegar('calculos')}>
              🧮 {t.tablas || 'Tablas'}
            </button>
            <button type="button" className="aj-btn-sec" onClick={() => onNavegar('registro')}>
              📝 {t.bitacora || 'Bitácora'}
            </button>
            <button type="button" className="aj-btn-sec" onClick={() => onNavegar('negocio')}>
              💼 {t.presupuesto || 'Presupuesto'}
            </button>
            {lista.length > 0 && typeof onLimpiarBitacora === 'function' && (
              <button type="button" className="aj-btn-sec" onClick={onLimpiarBitacora}>
                🗑️ {t.limpiarBitacora || 'Limpiar bitácora'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}