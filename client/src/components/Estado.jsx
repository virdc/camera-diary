import React from 'react';

export default function Estado({ t, registros, estadoServidor }) {
  return (
    <div className="tab-pane animate-fade-in">
      <div className="glass-card">
        <h2 className="section-title">📊 {t.estadoTitulo}</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h4>{t.tomasRegistradas}</h4>
            <p className="stat-val">{registros.length}</p>
          </div>
          <div className="stat-card">
            <h4>{t.backendApi}</h4>
            <p className="stat-val">{estadoServidor}</p>
          </div>
        </div>
      </div>
    </div>
  );
}