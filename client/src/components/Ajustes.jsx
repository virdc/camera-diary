import React, { useEffect, useId, useRef, useState } from 'react';

/* ============================================================
   DATOS (ESTUDIO + EXTERIORES)
   ============================================================ */

export const LUGARES = [
  { id: 'estudio', nombre: 'Estudio', icono: '🏢', ayuda: 'Luz controlada en estudio: flash o luces continuas.' },
  { id: 'exterior', nombre: 'Exteriores', icono: '🌳', ayuda: 'Luz natural: mandan el sol, las nubes y la hora del día. El flash sólo como relleno.' },
];

// crop = factor de recorte respecto de full frame (null = no aplica)
export const TIPOS_CAMARA = [
  { id: 'smartphone_raw', nombre: 'Smartphone RAW', crop: 1, nota: 'Disparar en RAW/DNG y bloquear exposición y foco (toque largo) evita sorpresas entre fotos.' },
  { id: 'dslr_aps_c', nombre: 'DSLR (réflex) APS-C', crop: 1.5, nota: 'DSLR APS-C: visor óptico, mucha autonomía de batería y más profundidad de campo que full frame con el mismo encuadre.' },
  { id: 'mirrorless_aps_c', nombre: 'Mirrorless (sin espejo) APS-C', crop: 1.5, nota: 'Mirrorless APS-C: visor electrónico que muestra la exposición en vivo, AF al ojo y más profundidad de campo que full frame. Cuidá la batería.' },
  { id: 'full_frame', nombre: 'DSLR (réflex) Full Frame', crop: 1, nota: 'DSLR full frame: visor óptico, mejor rendimiento en ISO alto y más desenfoque de fondo.' },
  { id: 'mirrorless_full_frame', nombre: 'Mirrorless (sin espejo) Full Frame', crop: 1, nota: 'Mirrorless full frame: visor electrónico con exposición en vivo, mejor ISO alto, más desenfoque de fondo y AF por detección de sujeto.' },
  { id: 'micro_4_3', nombre: 'Mirrorless Micro Cuatro Tercios', crop: 2, nota: 'Sensor 4/3: mucha profundidad de campo; cuidá el ISO alto.' },
  { id: 'formato_medio', nombre: 'Formato Medio', crop: 0.79, nota: 'Formato medio: profundidad de campo muy corta; cerrá un paso más para tener nitidez en todo el sujeto.' },
  { id: 'compacta_bridge', nombre: 'Compacta / Bridge', crop: null, nota: 'Sensor chico: gran profundidad de campo. Para desenfocar, alejá el fondo y usá el zoom.' },
  { id: 'analogica_film', nombre: 'Analógica / Film', crop: 1, nota: 'Película: no hay revisión inmediata. En negativo color conviene sobreexponer ~1 paso.' },
];

const L = (id, nombre, focal, focalMax, cats) => ({ id, nombre, focal, focalMax, cats });

export const LENTES_COMUNES = [
  L('14_24', 'Gran angular 14-24mm', 14, 24, ['ancho']),
  L('24mm_fijo', '24mm fijo', 24, 24, ['ancho']),
  L('35mm_fijo', '35mm fijo', 35, 35, ['normal']),
  L('50mm_fijo', '50mm fijo', 50, 50, ['normal', 'retrato']),
  L('55mm_fijo', '55mm fijo', 55, 55, ['normal', 'retrato']),
  L('85mm_fijo', '85mm fijo (retrato)', 85, 85, ['retrato']),
  L('macro_100', 'Macro 90-105mm', 100, 100, ['macro', 'retrato']),
  L('lente_kit', 'Lente del kit (18-55mm)', 18, 55, ['ancho', 'normal']),
  L('zoom_24_70', 'Zoom 24-70mm', 24, 70, ['ancho', 'normal', 'retrato']),
  L('tele_70_200', 'Tele 70-200mm', 70, 200, ['retrato', 'tele']),
  L('tele_70_300', '70-300mm (Tele)', 70, 300, ['tele']),
  L('super_tele', 'Super tele 150-600mm', 150, 600, ['tele']),
];

// En smartphone las focales son equivalentes a full frame
export const LENTES_SMARTPHONE = [
  { id: 'sin_lente_agregado', nombre: 'Sin lente agregado (cámara nativa del celular)', focal: 24, focalMax: 24, cats: ['normal', 'ancho'], aperturaFija: 'Nativa del celular (f/1.7 - f/2.2)' },
  { id: 'ultra_angular_0_5x', nombre: 'Ultra gran angular nativo (0.5x)', focal: 13, focalMax: 13, cats: ['ancho'], aperturaFija: 'Nativa del celular (f/1.8 - f/2.4)' },
  { id: 'tele_3x', nombre: 'Teleobjetivo nativo (3x)', focal: 77, focalMax: 77, cats: ['retrato', 'tele'], aperturaFija: 'Nativa del celular (f/2.4 - f/3.4)' },
  { id: 'tele_5x', nombre: 'Teleobjetivo nativo (5x)', focal: 120, focalMax: 120, cats: ['tele', 'retrato'], aperturaFija: 'Nativa del celular (f/2.8 - f/3.4)' },
  { id: 'con_lente_agregado', nombre: 'Con lente agregado (gran angular / macro / tele)', focal: null, focalMax: null, cats: ['ancho', 'macro', 'tele'] },
  { id: '35mm_fijo', nombre: '35mm fijo (equivalente)', focal: 35, focalMax: 35, cats: ['normal'] },
  { id: '55mm_fijo', nombre: '55mm fijo (equivalente)', focal: 55, focalMax: 55, cats: ['normal', 'retrato'] },
  { id: 'lente_kit', nombre: 'Lente del kit / modo zoom estándar', focal: 24, focalMax: 70, cats: ['ancho', 'normal', 'retrato'] },
  { id: 'tele_70_300', nombre: '70-300mm (equivalente / tele acoplado)', focal: 70, focalMax: 300, cats: ['tele'] },
];

const LENTES_COMPACTA = [
  { id: 'zoom_integrado', nombre: 'Zoom integrado de la cámara', focal: null, focalMax: null, cats: ['ancho', 'normal', 'retrato', 'tele', 'macro'] },
];

export const LENTES_POR_CAMARA = {
  smartphone_raw: LENTES_SMARTPHONE,
  dslr_aps_c: LENTES_COMUNES,
  mirrorless_aps_c: LENTES_COMUNES,
  full_frame: LENTES_COMUNES,
  mirrorless_full_frame: LENTES_COMUNES,
  micro_4_3: LENTES_COMUNES,
  formato_medio: LENTES_COMUNES,
  compacta_bridge: LENTES_COMPACTA,
  analogica_film: LENTES_COMUNES,
};

export const FORMAS_SMARTPHONE = [
  {
    id: 'sin_lente',
    titulo: 'Sin lente agregado (cámara nativa)',
    formasSacar: [
      'Cámara principal 1x en RAW/DNG: encuadre natural, mayor rango dinámico y mejor detalle en luz media/baja.',
      'Modo retrato / 2x con distancia media: separá el sujeto del fondo alejándote un poco y evitando pegar la cara a la lente.',
      'Trípode + temporizador o disparador: clave en tomas de detalle sin trepidación.',
    ],
    config: {
      apertura: 'f/1.7 - f/2.2 (fija del sensor nativo)',
      obturacion: '1/125s - 1/500s (1/60s+ en trípode)',
      iso: 'ISO 50 - 200 (evitar ISO alto en RAW)',
      enfoque: 'AF-S puntual / toque en el sujeto o MF',
      medicion: 'Puntual / Matricial en luces altas',
      wb: '5200K - 5600K o Flash 5500K',
      flash: 'Luz continua suave o flash externo rebotado/difundido (evitar flash directo duro)',
    },
  },
  {
    id: 'con_lente',
    titulo: 'Con lente agregado (clip / rosca / adaptador)',
    formasSacar: [
      'Gran angular / 35mm acoplado: espacios reducidos, escenas completas o encuadres ambientales controlando bordes.',
      '55mm / Tele 70-300mm acoplado: retratos más comprimidos y detalles a distancia cuidando el apoyo.',
      'Lente macro acoplado: acercamiento cercano con foco manual o distancia fija sin forzar el zoom digital.',
    ],
    config: {
      apertura: 'f/2 - f/4 (según óptica acoplada)',
      obturacion: '1/200s - 1/500s (más rápido en tele para evitar trepidación)',
      iso: 'ISO 50 - 400',
      enfoque: 'MF / AF puntual al centro (evitar bordes si hay curvatura)',
      medicion: 'Puntual / Ponderada al centro',
      wb: '5200K - 5600K o Flash 5500K',
      flash: 'Flash externo / LED lateral (evitar que el lente o el aro hagan sombra)',
    },
  },
];

export const TIPOS_LUZ = [
  { id: 'flash_estudio', nombre: 'Flash de estudio (Strobe)', wbRef: '5500K', nota: 'La potencia del flash controla la exposición; la apertura controla la profundidad de campo.' },
  { id: 'luz_continua_estudio', nombre: 'Luz continua de estudio (LED)', wbRef: '5200K - 5600K', nota: 'Lo que ves es lo que sacás: compensá con ISO y velocidad de obturación.' },
  { id: 'flash_camara', nombre: 'Flash en cámara / Speedlight', wbRef: '5500K', nota: 'Rebotá el flash en techo o pared, o usá difusor, para evitar sombras duras.' },
  { id: 'luz_mixta_estudio', nombre: 'Luz mixta en estudio', wbRef: '4500K - 5500K', nota: 'Mezclar fuentes de distinta temperatura da tonos raros: igualalas o corregí con geles CTO/CTB.' },
  { id: 'luz_ventana', nombre: 'Luz de ventana (natural en interior)', wbRef: '5500K - 6500K', nota: 'Ubicá al sujeto a 1-2 m de la ventana y un reflector del lado opuesto.' },
];

export const TIPOS_LUZ_EXTERIOR = [
  { id: 'sol_directo', nombre: 'Sol directo (mediodía)', wbRef: '5200K - 5600K', nota: 'Sombras duras: buscá sombra abierta, usá un difusor o un reflector/flash de relleno. Regla "Sunny 16": f/16 y 1/ISO.' },
  { id: 'nublado_sombra', nombre: 'Nublado / sombra abierta', wbRef: '6000K - 7000K', nota: 'Luz suave y pareja, ideal para pieles. Subí un poco la temperatura de WB si las fotos salen frías.' },
  { id: 'hora_dorada', nombre: 'Hora dorada (amanecer / atardecer)', wbRef: '3500K - 4500K', nota: 'Luz cálida y rasante: probá contraluz con reflector. No corrijas de más el WB o perdés el clima.' },
  { id: 'hora_azul', nombre: 'Hora azul / crepúsculo', wbRef: '4000K - 5000K', nota: 'Luz baja y azulada: ventana corta de 20-30 min. Trípode y ISO bajo para cuidar el ruido.' },
  { id: 'noche_luna', nombre: 'Noche / cielo despejado', wbRef: '3800K - 4500K', nota: 'Alejate de luces de ciudad y usá trípode. Revisá el histograma, no la pantalla.' },
  { id: 'luz_artificial_noche', nombre: 'Luces de ciudad (nocturna)', wbRef: '3200K - 4000K', nota: 'Mezcla de fuentes (sodio, LED, neón): disparar en RAW para corregir el WB después.' },
];

const LUCES_POR_LUGAR = { estudio: TIPOS_LUZ, exterior: TIPOS_LUZ_EXTERIOR };

export const CONFIGS_TIPO_FOTO = [
  {
    id: 'retrato', nombre: 'Retrato', icono: '👤', lugares: ['estudio', 'exterior'], rec: ['retrato'],
    apertura: 'f/2.8 - f/5.6', obturacion: '1/125s - 1/200s', iso: '100 - 400',
    enfoque: 'AF-C al ojo / AF-S puntual', medicion: 'Matricial / Puntual',
    tip: 'Foco en el ojo más cercano y modificador suave para piel.',
    exterior: {
      apertura: 'f/1.8 - f/4', obturacion: '1/250s - 1/1000s', iso: '100 - 200',
      tip: 'Sombra abierta o contraluz con reflector; foco en el ojo más cercano.',
    },
  },
  {
    id: 'moda', nombre: 'Moda / Editorial', icono: '👗', lugares: ['estudio', 'exterior'], rec: ['retrato'],
    apertura: 'f/5.6 - f/8', obturacion: '1/125s - 1/200s', iso: '100 - 200',
    enfoque: 'AF-C al ojo', medicion: 'Matricial / Puntual',
    tip: 'Luz principal a 45° con relleno suave; disparo en ráfaga para captar micro-movimientos.',
    exterior: {
      apertura: 'f/2.8 - f/5.6', obturacion: '1/250s - 1/500s',
      tip: 'Hora dorada o sombra abierta; reflector para llenar el rostro y ráfaga para captar el movimiento.',
    },
  },
  {
    id: 'paisaje', nombre: 'Paisaje', icono: '🏞️', lugares: ['exterior'], rec: ['ancho'],
    apertura: 'f/8 - f/11', obturacion: '1/125s - 1/500s (trípode si bajás de 1/60s)', iso: '100 - 200',
    enfoque: 'AF-S puntual / MF (distancia hiperfocal)', medicion: 'Matricial / Evaluativa',
    tip: 'Enfocá a 1/3 de la escena, cuidá el horizonte y bracketeá la exposición si el cielo quema.',
  },
  {
    id: 'luna', nombre: 'Luna', icono: '🌕', lugares: ['exterior'], rec: ['tele'], sinMinima: true,
    apertura: 'f/8 - f/11', obturacion: '1/125s - 1/250s (luna llena)', iso: '100 - 200',
    enfoque: 'MF en infinito + Live View ampliado', medicion: 'Puntual sobre la luna (-1 EV)',
    wbManda: true, wb: '4300K - 5500K',
    tip: 'Trípode, disparador remoto o temporizador de 2 s. La luna llena es tan brillante como un día de sol: regla "Looney 11" (f/11 y velocidad = 1/ISO). Con luna creciente o menguante abrí 1 paso o bajá la velocidad. Disparo en RAW y subexponé para no quemar el relieve.',
  },
  {
    id: 'producto', nombre: 'Producto', icono: '📦', lugares: ['estudio'], rec: ['macro', 'retrato'],
    apertura: 'f/8 - f/16', obturacion: '1/125s - 1/200s', iso: '64 - 100',
    enfoque: 'MF / AF-S puntual', medicion: 'Puntual / Matricial',
    tip: 'Controlá reflejos y brillos con difusores o banderas.',
  },
  {
    id: 'comida', nombre: 'Comida', icono: '🍽️', lugares: ['estudio'], rec: ['macro', 'normal'],
    apertura: 'f/4 - f/8', obturacion: '1/125s - 1/200s', iso: '100 - 200',
    enfoque: 'AF-S puntual / MF', medicion: 'Matricial',
    tip: 'Luz lateral o contraluz suave con reflector; probá encuadre cenital o a 45°.',
  },
  {
    id: 'macro', nombre: 'Macro / Detalle', icono: '🔍', lugares: ['estudio', 'exterior'], rec: ['macro'],
    apertura: 'f/8 - f/16', obturacion: '1/125s - 1/200s', iso: '100 - 400',
    enfoque: 'MF / AF puntual', medicion: 'Puntual',
    tip: 'Cerrá diafragma para ganar zona nítida en detalles chicos.',
    exterior: {
      apertura: 'f/5.6 - f/11', obturacion: '1/250s - 1/1000s', iso: '100 - 800',
      tip: 'Con viento subí la velocidad; un difusor corta el sol duro y un reflector abre las sombras.',
    },
  },
  {
    id: 'deporte', nombre: 'Acción / Movimiento', icono: '⚡', lugares: ['estudio', 'exterior'], rec: ['tele'], sinMinima: true,
    apertura: 'f/4 - f/8', obturacion: '1/1000s o más', obturacionFlash: '1/200s (sincronización)', iso: '200 - 1600',
    enfoque: 'AF-C seguimiento continuo', medicion: 'Matricial',
    tip: 'Con flash en estudio respetá la velocidad máxima de sincronización: el flash es el que congela el movimiento.',
    exterior: {
      apertura: 'f/2.8 - f/6.3', iso: '100 - 800', obturacionFlash: '1/250s o HSS',
      tip: 'Priorizá velocidad (1/1000s o más), AF-C con seguimiento y ráfaga alta. Con flash de relleno usá HSS.',
    },
  },
  {
    id: 'barrido', nombre: 'Barrido (Panning)', icono: '🏎️', lugares: ['estudio', 'exterior'], rec: ['normal', 'tele'], sinMinima: true,
    apertura: 'f/8 - f/16', obturacion: '1/15s - 1/60s', iso: '64 - 200',
    enfoque: 'AF-C / Seguimiento continuo', medicion: 'Matricial / Evaluativa',
    tip: 'Seguí el movimiento parejo del sujeto y usá 2ª cortina si sumás flash.',
    exterior: {
      obturacion: '1/30s - 1/125s',
      tip: 'Girá desde la cintura siguiendo al sujeto. A pleno sol quizás necesites filtro ND o ISO mínimo para bajar la velocidad.',
    },
  },
];

const APERTURA_RETRATO_POR_LENTE = {
  '85mm_fijo': 'f/2 - f/4',
  '55mm_fijo': 'f/2.8 - f/4',
  '50mm_fijo': 'f/2.8 - f/4',
  '35mm_fijo': 'f/2.8 - f/5.6',
  lente_kit: 'f/4 - f/5.6',
  zoom_24_70: 'f/2.8 - f/5.6',
  tele_70_200: 'f/2.8 - f/5.6',
  tele_70_300: 'f/4 - f/5.6',
  macro_100: 'f/4 - f/8',
};

const MODIFICADOR_ESTUDIO = {
  retrato: 'Octabox / beauty dish',
  moda: 'Octabox / beauty dish',
  producto: 'Softbox + difusores y banderas',
  comida: 'Softbox lateral + reflector',
  macro: 'Softbox chico o flash anular',
  deporte: 'Octabox / reflector estándar',
  barrido: 'Softbox / reflector estándar',
};

const CAMPOS_TOMA = ['apertura', 'obturacion', 'iso', 'wb', 'enfoque', 'medicion'];
const ES_DSLR = ['dslr_aps_c', 'full_frame'];
const ES_MIRRORLESS = ['mirrorless_aps_c', 'mirrorless_full_frame', 'micro_4_3'];

/* ============================================================
   HELPERS
   ============================================================ */

const presetsDeLugar = (lugar) => CONFIGS_TIPO_FOTO.filter((p) => p.lugares.includes(lugar));
const presetEnLugar = (preset, lugar) => ({ ...preset, ...(preset[lugar] || {}) });
const getCamara = (id) => TIPOS_CAMARA.find((c) => c.id === id) || TIPOS_CAMARA[1];
const getLente = (camaraId, lenteId) => {
  const lista = LENTES_POR_CAMARA[camaraId] || LENTES_COMUNES;
  return lista.find((l) => l.id === lenteId) || lista[0];
};
const familiaCamara = (id) => (id === 'smartphone_raw' ? 'phone' : id === 'compacta_bridge' ? 'compacta' : 'ilc');
const lentePorDefecto = (camaraId) =>
  camaraId === 'smartphone_raw' ? 'sin_lente_agregado' : camaraId === 'compacta_bridge' ? 'zoom_integrado' : '35mm_fijo';

function normalizarContexto(ctx) {
  const lugar = LUGARES.some((l) => l.id === ctx.lugar) ? ctx.lugar : 'estudio';
  const camara = TIPOS_CAMARA.some((c) => c.id === ctx.camara) ? ctx.camara : 'dslr_aps_c';
  const lentes = LENTES_POR_CAMARA[camara];
  const lente = lentes.some((l) => l.id === ctx.lente) ? ctx.lente : lentePorDefecto(camara);
  const luces = LUCES_POR_LUGAR[lugar];
  const tipoLuz = luces.some((l) => l.id === ctx.tipoLuz) ? ctx.tipoLuz : luces[0].id;
  const presets = presetsDeLugar(lugar);
  const tipoFoto = presets.some((p) => p.id === ctx.tipoFoto) ? ctx.tipoFoto : presets[0].id;
  const usaFlash = tipoFoto === 'luna' ? false : Boolean(ctx.usaFlash);
  return { lugar, camara, lente, tipoLuz, tipoFoto, usaFlash };
}

function resolver(ctx) {
  const luces = LUCES_POR_LUGAR[ctx.lugar] || TIPOS_LUZ;
  return {
    lugarInfo: LUGARES.find((l) => l.id === ctx.lugar) || LUGARES[0],
    cam: getCamara(ctx.camara),
    len: getLente(ctx.camara, ctx.lente),
    preset: CONFIGS_TIPO_FOTO.find((p) => p.id === ctx.tipoFoto) || CONFIGS_TIPO_FOTO[0],
    luz: luces.find((l) => l.id === ctx.tipoLuz) || luces[0],
  };
}

function velocidadMinima(focalEq) {
  const pasos = [30, 60, 125, 250, 500, 1000, 2000, 4000];
  return `1/${pasos.find((p) => p >= focalEq) ?? 4000}s`;
}

function textoEquivalencia(cam, len) {
  if (!len.focal || !cam.crop || cam.crop === 1) return '';
  const a = Math.round(len.focal * cam.crop);
  const b = Math.round(len.focalMax * cam.crop);
  return a === b ? `≈ ${a}mm en full frame` : `≈ ${a}-${b}mm en full frame`;
}

function calcularFlash({ lugar, esSmartphone, len, preset, luz, usaFlash }) {
  const cats = len.cats || [];
  const esTele = cats.includes('tele');
  const esAncho = cats.includes('ancho');
  const nativo = Boolean(len.aperturaFija);
  const exterior = lugar === 'exterior';

  if (preset.id === 'luna') {
    return {
      estado: 'Sin flash (Luna)',
      modo: 'Luz natural: la luna está a ~384.000 km',
      potencia: 'No aplica',
      modificador: 'No aplica',
      nota: 'El flash no llega: usá trípode y disparador remoto o temporizador de 2 s.',
    };
  }

  if (!usaFlash) {
    if (exterior) {
      return {
        estado: 'Sin flash (Exteriores)',
        modo: 'Luz natural',
        potencia: 'Ajustar con exposición, ISO y velocidad',
        modificador: 'Reflector plegable / difusor',
        nota: 'Sin flash en exteriores, ubicá al sujeto según la dirección de la luz y rellená sombras con un reflector.',
      };
    }
    return {
      estado: 'Sin flash (Estudio)',
      modo: luz.id === 'luz_continua_estudio' ? 'Luz continua LED' : 'Luz disponible de estudio',
      potencia: 'Ajustar intensidad de la luz + ISO/velocidad',
      modificador: esAncho ? 'Panel LED / softbox amplio' : 'Softbox / octabox dirigido',
      nota: 'Sin flash en estudio, controlá el movimiento con la velocidad de obturación y usá trípode si la bajás.',
    };
  }

  if (esSmartphone) {
    return {
      estado: 'Con flash / luz de apoyo (Smartphone RAW)',
      modo: nativo ? 'Luz continua o flash externo difuso' : 'Flash externo / LED lateral (sin tapar lente)',
      potencia: nativo ? 'Suave / baja (-1 a -1.5 EV)' : 'Baja a media (evitar sombras del clip)',
      modificador: 'Difusor / softbox chico',
      nota: nativo
        ? 'Sin lente agregado: evitá el flash directo duro del celular y priorizá luz continua o difusa.'
        : 'Con lente agregado: verificá que el accesorio acoplado no genere sombra sobre el encuadre.',
    };
  }

  if (exterior) {
    return {
      estado: `Con flash de relleno (${luz.nombre})`,
      modo: 'TTL con compensación negativa o Manual; HSS si superás la sincronización',
      potencia: '1/16 - 1/4 (relleno: -1 a -2 EV bajo la luz ambiente)',
      modificador: esTele ? 'Fresnel / sin difusor (más alcance)' : 'Difusor chico o rebote en reflector',
      nota: 'A pleno sol el flash rellena sombras duras. Si la velocidad pasa la sincronización (1/160s - 1/250s) activá HSS.',
    };
  }

  return {
    estado: `Con flash (${luz.nombre})`,
    modo: preset.id === 'barrido' ? 'Manual (M) + 2ª cortina' : 'Manual (M) o TTL de estudio',
    potencia: esTele
      ? '1/4 - 1/1 (mayor distancia con tele)'
      : preset.id === 'macro'
      ? '1/32 - 1/8 (distancia corta)'
      : '1/8 - 1/2 según distancia y apertura',
    modificador: esTele ? 'Reflector / snoot / octabox concentrado' : MODIFICADOR_ESTUDIO[preset.id] || 'Softbox / octabox',
    nota: 'Mantené la velocidad dentro de la sincronización del flash (normalmente 1/160s - 1/250s).',
  };
}

function calcularConfig(ctx) {
  const { cam, len, preset, luz } = resolver(ctx);
  const { lugar, usaFlash } = ctx;
  const esSmartphone = ctx.camara === 'smartphone_raw';
  const esLuna = preset.id === 'luna';
  const base = presetEnLugar(preset, lugar);

  let apertura = base.apertura;
  if (preset.id === 'retrato' && lugar === 'estudio' && APERTURA_RETRATO_POR_LENTE[len.id]) {
    apertura = APERTURA_RETRATO_POR_LENTE[len.id];
  }
  if (esSmartphone) apertura = len.aperturaFija || 'Óptica acoplada (f/2 - f/5.6)';

  let obturacion = base.obturacion;
  if (usaFlash && !esSmartphone && base.obturacionFlash) obturacion = base.obturacionFlash;

  const iso = cam.id === 'analogica_film' ? 'Según el rollo (ISO 100 - 400)' : base.iso;
  const wb = base.wbManda ? base.wb : luz.wbRef;

  const flash = calcularFlash({ lugar, esSmartphone, len, preset, luz, usaFlash });

  const consejos = [base.tip];
  if (luz.nota && !base.wbManda) consejos.push(luz.nota);
  if (cam.nota) consejos.push(cam.nota);

  const focalEqMax = len.focalMax ? len.focalMax * (cam.crop ?? 1) : null;
  const flashDomina = usaFlash && lugar === 'estudio';

  if (!preset.sinMinima && focalEqMax && !flashDomina) {
    consejos.push(`A mano alzada no bajes de ${velocidadMinima(focalEqMax)} con este lente, o activá la estabilización.`);
  }

  if (esLuna) {
    if (focalEqMax) {
      const pct = Math.max(1, Math.round((focalEqMax * 0.0087 * 100) / 24));
      consejos.push(
        pct < 10
          ? `Con este lente la luna ocupa sólo ~${pct}% del alto del cuadro. Para llenarlo necesitás 400mm+ equivalentes, o recortá en postproducción.`
          : `Con este lente la luna ocupa ~${pct}% del alto del cuadro.`
      );
    }
    if (esSmartphone) {
      consejos.push('En celular: usá el modo Pro/manual, el tele más largo, -2 EV de exposición y trípode; el modo noche automático suele quemar la luna.');
    }
    if (ES_DSLR.includes(ctx.camara)) {
      consejos.push('En DSLR activá el bloqueo de espejo (o Live View) para evitar la vibración del espejo con teles largos.');
    } else if (ES_MIRRORLESS.includes(ctx.camara)) {
      consejos.push('En mirrorless usá el obturador electrónico de primera cortina o silencioso y ampliá el foco en el visor para enfocar la luna.');
    }
  } else if (esSmartphone && lugar === 'exterior') {
    consejos.push('En exteriores, tocá y mantené el sujeto para bloquear foco y bajá la exposición si el cielo se quema.');
  }

  if (esSmartphone && usaFlash && lugar === 'estudio') {
    consejos.push('Con flash de estudio, el celular puede mostrar bandas por el obturador electrónico: probá antes o preferí luz continua.');
  }
  if (usaFlash && ES_MIRRORLESS.includes(ctx.camara)) {
    consejos.push('En mirrorless el obturador electrónico completo puede no sincronizar con flash: usá el obturador mecánico o la primera cortina electrónica.');
  }
  consejos.push(flash.nota);

  return { valores: { apertura, obturacion, iso, wb, enfoque: base.enfoque, medicion: base.medicion }, flash, consejos };
}

const flashATexto = (f) => `${f.estado}: ${f.modo} · ${f.potencia} · ${f.modificador}`;

function useControlado(valor, setter, inicial) {
  const [local, setLocal] = useState(valor ?? inicial);
  const controlado = typeof setter === 'function';

  useEffect(() => {
    if (controlado && valor !== undefined && valor !== local) {
      setLocal(valor);
    }
  }, [controlado, valor, local]);

  const actual = controlado ? valor ?? inicial : local;
  const cambiar = (nuevo) => {
    setLocal(nuevo);
    if (controlado) setter(nuevo);
  };
  return [actual, cambiar];
}

function Campo({ id, label, valor, sugerido, onChange }) {
  const editado = valor !== sugerido;
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label}
        {editado && <span className="aj-badge">editado</span>}
      </label>
      <input
        id={id}
        type="text"
        className="modern-input"
        value={valor}
        placeholder={sugerido}
        title={`Sugerido: ${sugerido}`}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

const ESTILOS = `
.aj-badge{display:inline-block;margin-left:.5rem;padding:.05rem .5rem;border-radius:999px;font-size:.72rem;background:rgba(127,127,127,.22)}
.aj-resumen-bar{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:.75rem;padding:.75rem 1rem;border-radius:12px;border:1px solid rgba(127,127,127,.28);background:rgba(127,127,127,.07);margin-bottom:1rem}
.aj-resumen-chips{display:flex;flex-wrap:wrap;gap:.45rem;font-size:.86rem}
.aj-chip{padding:.25rem .6rem;border-radius:999px;background:rgba(127,127,127,.14)}
.aj-lista{margin:.5rem 0 0;padding-left:1.15rem;display:grid;gap:.35rem}
.aj-acciones{display:flex;flex-wrap:wrap;gap:.6rem;align-items:center;margin-top:1rem}
.aj-nota{margin-top:.85rem}
.aj-btn-sec{padding:.58rem .95rem;border-radius:10px;border:1px solid rgba(127,127,127,.45);background:transparent;color:inherit;cursor:pointer;font:inherit}
.aj-btn-sec:hover{background:rgba(127,127,127,.14)}
.aj-btn-sec:focus-visible,.btn-toggle:focus-visible,.btn-save:focus-visible{outline:2px solid currentColor;outline-offset:2px}
.btn-toggle:disabled{opacity:.45;cursor:not-allowed}
.aj-aviso{font-size:.9rem;font-weight:500}
.aj-contador{font-size:.82rem;opacity:.85}
.aj-details{margin-top:.75rem;border:1px solid rgba(127,127,127,.3);border-radius:10px;padding:.5rem .9rem}
.aj-details summary{cursor:pointer;font-weight:600;padding:.25rem 0}
`;

/* ============================================================
   COMPONENTE
   ============================================================ */

export default function Ajustes(props) {
  const { t = {}, onAplicarPreset, onGuardar, onIrBitacora } = props;
  const uid = useId();
  const idDe = (nombre) => `${uid}-${nombre}`;

  const [lugar, setLugar] = useControlado(props.lugar, props.setLugar, 'estudio');
  const [camara, setCamara] = useControlado(props.camara, props.setCamara, 'dslr_aps_c');
  const [lente, setLente] = useControlado(props.lente, props.setLente, '35mm_fijo');
  const [tipoFoto, setTipoFoto] = useControlado(props.tipoFoto, props.setTipoFoto, 'retrato');
  const [tipoLuz, setTipoLuz] = useControlado(props.tipoLuz, props.setTipoLuz, 'flash_estudio');
  const [usaFlashRaw, setUsaFlash] = useControlado(props.usaFlash, props.setUsaFlash, true);
  const [overrides, setOverrides] = useControlado(props.configToma, props.setConfigToma, {});

  const [etiquetaToma, setEtiquetaToma] = useState('');
  const [nota, setNota] = useState('');
  const [aviso, setAviso] = useState('');
  const [tomasRegistradas, setTomasRegistradas] = useState(0);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const ctx = normalizarContexto({ lugar, camara, lente, tipoFoto, tipoLuz, usaFlash: usaFlashRaw });
  const { lugarInfo, cam, len, preset, luz } = resolver(ctx);
  const presetVista = presetEnLugar(preset, ctx.lugar);
  const sugerencia = calcularConfig(ctx);

  const valores = {};
  CAMPOS_TOMA.forEach((k) => {
    valores[k] = overrides?.[k] ?? sugerencia.valores[k];
  });
  const hayEditados = CAMPOS_TOMA.some((k) => valores[k] !== sugerencia.valores[k]);

  const aplicarCambios = (cambios) => {
    const extra = {};
    if (cambios.camara && familiaCamara(cambios.camara) !== familiaCamara(ctx.camara)) {
      extra.lente = lentePorDefecto(cambios.camara);
    }
    if (cambios.lugar && cambios.lugar !== ctx.lugar) {
      extra.usaFlash = cambios.lugar === 'estudio';
    }
    if (cambios.tipoFoto === 'luna' && !cambios.tipoLuz) {
      extra.tipoLuz = 'noche_luna';
    }
    const nuevo = normalizarContexto({ ...ctx, ...extra, ...cambios });
    setLugar(nuevo.lugar);
    setCamara(nuevo.camara);
    setLente(nuevo.lente);
    setTipoFoto(nuevo.tipoFoto);
    setTipoLuz(nuevo.tipoLuz);
    setUsaFlash(nuevo.usaFlash);
    setOverrides(calcularConfig(nuevo).valores);
    if (cambios.tipoFoto) {
      onAplicarPreset?.(presetEnLugar(CONFIGS_TIPO_FOTO.find((p) => p.id === nuevo.tipoFoto), nuevo.lugar));
    }
  };

  const cambiarCampo = (campo, valor) => setOverrides({ ...valores, [campo]: valor });
  const restablecer = () => setOverrides({ ...sugerencia.valores });

  const mostrarAviso = (texto) => {
    setAviso(texto);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAviso(''), 2800);
  };

  const recomendado = (item) => item.cats?.some((c) => preset.rec?.includes(c));
  const equivalencia = textoEquivalencia(cam, len);
  const presetsDisponibles = presetsDeLugar(ctx.lugar);
  const lentesDisponibles = LENTES_POR_CAMARA[ctx.camara];
  const luces = LUCES_POR_LUGAR[ctx.lugar] || TIPOS_LUZ;
  const esSmartphone = ctx.camara === 'smartphone_raw';
  const esLuna = preset.id === 'luna';
  const bloqueActivo = len.aperturaFija ? 'sin_lente' : 'con_lente';

  const nombreTecnica = etiquetaToma.trim()
    ? `${preset.nombre} (${etiquetaToma.trim()}) · ${lugarInfo.nombre}`
    : `${preset.nombre} · ${lugarInfo.nombre}`;

  const resumenTexto = [
    `${lugarInfo.nombre} · ${cam.nombre} · ${len.nombre}`,
    `Toma: ${nombreTecnica}`,
    `Luz: ${luz.nombre}${ctx.usaFlash ? ' + flash' : ''}`,
    `Apertura: ${valores.apertura}`,
    `Obturación: ${valores.obturacion}`,
    `ISO: ${valores.iso}`,
    `WB: ${valores.wb}`,
    `Enfoque: ${valores.enfoque}`,
    `Medición: ${valores.medicion}`,
    flashATexto(sugerencia.flash),
  ].join('\n');

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(resumenTexto);
      mostrarAviso('Resumen copiado al portapapeles');
    } catch {
      mostrarAviso('No se pudo copiar');
    }
  };

  // Crea el registro exacto que espera <Bitacora />
  const construirRegistro = () => {
    const ahora = new Date();
    return {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      tecnica: nombreTecnica,
      luz: `${luz.nombre}${ctx.usaFlash ? ' + flash' : ''}`,
      fecha: ahora.toLocaleDateString('es-AR'),
      hora: ahora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
      camara: cam.nombre,
      lente: len.nombre,
      parametros: [
        `Apertura ${valores.apertura}`,
        `Obturación ${valores.obturacion}`,
        `ISO ${valores.iso}`,
        `WB ${valores.wb}`,
        `Enfoque ${valores.enfoque}`,
        `Medición ${valores.medicion}`,
      ].join(' · '),
      flash: flashATexto(sugerencia.flash),
      tomas: sugerencia.consejos.slice(0, 2).join(' '),
      nota: nota.trim(),
      // Datos estructurados por si otro módulo los reutiliza
      lugar: ctx.lugar,
      camaraId: ctx.camara,
      lenteId: ctx.lente,
      tipoFoto: ctx.tipoFoto,
      tipoLuz: ctx.tipoLuz,
      usaFlash: ctx.usaFlash,
      config: { ...valores },
      flashDetalle: sugerencia.flash,
    };
  };

  const guardarToma = ({ irABitacora = false } = {}) => {
    const registro = construirRegistro();
    onGuardar?.(registro);
    const nuevoConteo = tomasRegistradas + 1;
    setTomasRegistradas(nuevoConteo);
    setNota('');
    mostrarAviso(`Toma #${nuevoConteo} guardada en la bitácora`);
    if (irABitacora) {
      onIrBitacora?.(registro);
    }
  };

  return (
    <div className="tab-pane animate-fade-in">
      <style>{ESTILOS}</style>

      <div className="glass-card">
        <div className="bitacora-header">
          <h2 className="section-title">⚙️ {t.ajustesTitulo || 'Ajustes y registro de tomas'}</h2>
          <span className="aj-contador">
            {tomasRegistradas > 0
              ? `📸 ${tomasRegistradas} ${tomasRegistradas === 1 ? 'toma registrada' : 'tomas registradas'} en esta sesión`
              : 'Listo para registrar tomas'}
          </span>
        </div>

        {/* Resumen rápido siempre visible para chequear al instante */}
        <div className="aj-resumen-bar" aria-label="Resumen de toma actual">
          <div className="aj-resumen-chips">
            <span className="aj-chip">{lugarInfo.icono} {lugarInfo.nombre}</span>
            <span className="aj-chip">📷 {cam.nombre}</span>
            <span className="aj-chip">🔍 {len.nombre}</span>
            <span className="aj-chip">{preset.icono} {preset.nombre}</span>
            <span className="aj-chip">⚡ {ctx.usaFlash ? 'Flash ON' : 'Sin flash'}</span>
            <span className="aj-chip">🎛️ {valores.apertura} · {valores.obturacion} · {valores.iso}</span>
          </div>
          <button
            type="button"
            className="btn-save"
            onClick={() => guardarToma({ irABitacora: false })}
          >
            ➕ {t.registrarToma || 'Registrar toma'}
          </button>
        </div>

        <div className="biz-form">
          {/* 1. Lugar y tipo de toma */}
          <div className="form-section">
            <h3 className="subsection-title">1. Lugar y tipo de toma</h3>

            <div className="btn-toggle-group" role="group" aria-label="Lugar">
              {LUGARES.map((l) => {
                const activo = l.id === ctx.lugar;
                return (
                  <button
                    key={l.id}
                    type="button"
                    className={`btn-toggle ${activo ? 'active' : ''}`}
                    aria-pressed={activo}
                    onClick={() => aplicarCambios({ lugar: l.id })}
                  >
                    {l.icono} {l.nombre}
                  </button>
                );
              })}
            </div>
            <small className="hint">{lugarInfo.ayuda}</small>

            <div className="aj-nota">
              <div className="btn-toggle-group" role="group" aria-label="Tipo de toma">
                {presetsDisponibles.map((p) => {
                  const activo = p.id === ctx.tipoFoto;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      className={`btn-toggle ${activo ? 'active' : ''}`}
                      aria-pressed={activo}
                      onClick={() => aplicarCambios({ tipoFoto: p.id })}
                    >
                      {p.icono} {p.nombre}
                    </button>
                  );
                })}
              </div>
              {presetVista.tip && <small className="hint">{presetVista.tip}</small>}
            </div>
          </div>

          <hr className="section-divider" />

          {/* 2. Cámara y lente */}
          <div className="form-section">
            <h3 className="subsection-title">2. Cámara y lente</h3>

            <div className="grid-inputs">
              <div className="form-group">
                <label htmlFor={idDe('camara')}>{t.tipoCamara || 'Tipo de cámara'}</label>
                <select
                  id={idDe('camara')}
                  value={ctx.camara}
                  onChange={(e) => aplicarCambios({ camara: e.target.value })}
                  className="modern-select"
                >
                  {TIPOS_CAMARA.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor={idDe('lente')}>{t.lente || 'Lente'}</label>
                <select
                  id={idDe('lente')}
                  value={ctx.lente}
                  onChange={(e) => aplicarCambios({ lente: e.target.value })}
                  className="modern-select"
                >
                  {lentesDisponibles.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nombre}
                      {recomendado(item) ? ' ★' : ''}
                    </option>
                  ))}
                </select>
                {equivalencia && <small className="hint">{equivalencia}</small>}
              </div>
            </div>

            {esSmartphone && (
              <details className="aj-details" open={bloqueActivo === 'sin_lente'}>
                <summary>
                  Guía rápida para smartphone ({FORMAS_SMARTPHONE.find((f) => f.id === bloqueActivo)?.titulo})
                </summary>
                {FORMAS_SMARTPHONE.map((forma) => (
                  <div key={forma.id} className="aj-nota">
                    <strong>{forma.titulo}</strong>
                    <ul className="aj-lista">
                      {forma.formasSacar.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </details>
            )}
          </div>

          <hr className="section-divider" />

          {/* 3. Luz y flash */}
          <div className="form-section">
            <h3 className="subsection-title">3. Luz y flash</h3>
            <div className="grid-inputs">
              <div className="form-group">
                <label htmlFor={idDe('luz')}>{t.tipoLuz || 'Tipo de luz'}</label>
                <select
                  id={idDe('luz')}
                  value={ctx.tipoLuz}
                  disabled={esLuna}
                  onChange={(e) => aplicarCambios({ tipoLuz: e.target.value })}
                  className="modern-select"
                >
                  {luces.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nombre} ({item.wbRef})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>{t.flash || 'Flash'}</label>
                <button
                  type="button"
                  className={`btn-toggle ${ctx.usaFlash ? 'active' : ''}`}
                  aria-pressed={ctx.usaFlash}
                  disabled={esLuna}
                  onClick={() => aplicarCambios({ usaFlash: !ctx.usaFlash })}
                >
                  {esLuna ? '🚫 No aplica en luna' : ctx.usaFlash ? '⚡ Flash activado' : '☀️ Sin flash'}
                </button>
              </div>
            </div>

            <div className="aj-nota">
              <strong>Flash:</strong> {flashATexto(sugerencia.flash)}
            </div>
          </div>

          <hr className="section-divider" />

          {/* 4. Parámetros de la toma */}
          <div className="form-section">
            <h3 className="subsection-title">4. Parámetros de la toma</h3>
            <div className="grid-inputs">
              <Campo
                id={idDe('apertura')}
                label="Apertura"
                valor={valores.apertura}
                sugerido={sugerencia.valores.apertura}
                onChange={(v) => cambiarCampo('apertura', v)}
              />
              <Campo
                id={idDe('obturacion')}
                label="Obturación"
                valor={valores.obturacion}
                sugerido={sugerencia.valores.obturacion}
                onChange={(v) => cambiarCampo('obturacion', v)}
              />
              <Campo
                id={idDe('iso')}
                label="ISO"
                valor={valores.iso}
                sugerido={sugerencia.valores.iso}
                onChange={(v) => cambiarCampo('iso', v)}
              />
              <Campo
                id={idDe('wb')}
                label="Balance de blancos (WB)"
                valor={valores.wb}
                sugerido={sugerencia.valores.wb}
                onChange={(v) => cambiarCampo('wb', v)}
              />
              <Campo
                id={idDe('enfoque')}
                label="Enfoque"
                valor={valores.enfoque}
                sugerido={sugerencia.valores.enfoque}
                onChange={(v) => cambiarCampo('enfoque', v)}
              />
              <Campo
                id={idDe('medicion')}
                label="Medición"
                valor={valores.medicion}
                sugerido={sugerencia.valores.medicion}
                onChange={(v) => cambiarCampo('medicion', v)}
              />
            </div>
          </div>

          <hr className="section-divider" />

          {/* 5. Consejos clave */}
          <div className="form-section">
            <h3 className="subsection-title">5. Consejos y tomas sugeridas</h3>
            <ul className="aj-lista">
              {sugerencia.consejos.map((c, idx) => (
                <li key={`${idx}-${c.slice(0, 20)}`}>{c}</li>
              ))}
            </ul>
          </div>

          <hr className="section-divider" />

          {/* 6. Registro de la toma hacia Bitácora */}
          <div className="form-section">
            <h3 className="subsection-title">6. Registrar toma en la bitácora</h3>
            <div className="grid-inputs">
              <div className="form-group">
                <label htmlFor={idDe('etiqueta')}>{t.etiquetaToma || 'Variante / toma (opcional)'}</label>
                <input
                  id={idDe('etiqueta')}
                  type="text"
                  className="modern-input"
                  value={etiquetaToma}
                  placeholder="Ej: Toma 1 · Contraluz, Primer plano..."
                  onChange={(e) => setEtiquetaToma(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor={idDe('nota')}>{t.nota || 'Nota de la toma'}</label>
                <input
                  id={idDe('nota')}
                  type="text"
                  className="modern-input"
                  value={nota}
                  placeholder="Ej: sombra abierta a las 17 h, rebote blanco a la izquierda..."
                  onChange={(e) => setNota(e.target.value)}
                />
              </div>
            </div>

            <div className="aj-acciones">
              <button
                type="button"
                className="btn-save"
                onClick={() => guardarToma({ irABitacora: false })}
              >
                💾 {t.guardar || 'Guardar toma en bitácora'}
              </button>

              {typeof onIrBitacora === 'function' && (
                <button
                  type="button"
                  className="aj-btn-sec"
                  onClick={() => guardarToma({ irABitacora: true })}
                >
                  📝 {t.guardarYVerBitacora || 'Guardar y ver bitácora'}
                </button>
              )}

              <button type="button" className="aj-btn-sec" onClick={copiar}>
                📋 {t.copiar || 'Copiar resumen'}
              </button>

              {hayEditados && (
                <button type="button" className="aj-btn-sec" onClick={restablecer}>
                  ↺ {t.restablecer || 'Restablecer sugeridos'}
                </button>
              )}

              {aviso && (
                <span className="aj-aviso" role="status" aria-live="polite">
                  {aviso}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}