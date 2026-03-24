import { useState, useMemo } from 'react'

function App() {
  const [seccion, setSeccion] = useState('inicio')
  const [pais, setPais] = useState({ name: 'Mexico', code: '+52', flag: 'https://flagcdn.com/w20/mx.png' })
  const [query, setQuery] = useState('')
  const [detalle, setDetalle] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const [status, setStatus] = useState(null)

  const careers = [
    { 
      n: "TI e Innovación Digital", 
      d: "Desarrollo de software multiplataforma y ciberseguridad.",
      plan: "Metodologías de desarrollo, bases de datos, redes, ciberseguridad, IoT e IA.",
      egreso: "Especialista en soluciones digitales y gestión de infraestructura crítica.",
      color: "primary"
    },
    { 
      n: "Mecatrónica", 
      d: "Automatización y sistemas industriales inteligentes.",
      plan: "Sistemas de control, robótica industrial, PLC, electrónica digital y manufactura avanzada.",
      egreso: "Ingeniero experto en integración de sistemas automatizados y robótica.",
      color: "primary"
    },
    { 
      n: "Mantenimiento Industrial", 
      d: "Gestión de sistemas productivos de alta tecnología.",
      plan: "Mecánica de fluidos, termodinámica, gestión de la energía y seguridad industrial.",
      egreso: "Líder en confiabilidad operativa y eficiencia energética de plantas industriales.",
      color: "primary"
    },
    { 
      n: "Gastronomía", 
      d: "Artes culinarias internacionales y administración de servicios.",
      plan: "Bases de cocina francesa, panadería, vitivinicultura y gestión de restaurantes.",
      egreso: "Chef profesional capacitado para dirigir cocinas de estándares internacionales.",
      color: "primary"
    },
    { 
      n: "Terapia Física", 
      d: "Rehabilitación física integral y salud humana.",
      plan: "Anatomía, kinesiología, fisiología del ejercicio y rehabilitación neurológica.",
      egreso: "Terapeuta con competencias científicas para la recuperación de la movilidad.",
      color: "primary"
    },
    { 
      n: "Desarrollo de Negocios", 
      d: "Mercadotecnia y gestión comercial estratégica.",
      plan: "Investigación de mercados, branding, logística y comercio exterior.",
      egreso: "Especialista en expansión de mercados y estrategias comerciales disruptivas.",
      color: "primary"
    }
  ]

  const services = [
    { 
      n: "Becas Estratégicas", 
      d: "Apoyos económicos para permanencia académica.",
      beneficios: "Apoyo alimenticio, beca de transporte estatal y condonaciones por promedio.",
      detalles: "El 80% de los estudiantes cuentan con algún estímulo económico.",
      color: "success"
    },
    { 
      n: "Movilidad Internacional", 
      d: "Intercambios con Francia, Canadá y España.",
      beneficios: "Programa MEXPROTEC para licencias profesionales en el extranjero.",
      detalles: "Opciones de titulación con todo pagado.",
      color: "success"
    },
    { 
      n: "Vinculación Empresarial", 
      d: "Prácticas profesionales y bolsa de trabajo.",
      beneficios: "Estadías profesionales remuneradas en empresas líderes.",
      detalles: "Convenios directos con el sector productivo.",
      color: "success"
    }
  ]

  const paises = [
    { name: 'Mexico', code: '+52', flag: 'https://flagcdn.com/w20/mx.png' },
    { name: 'USA', code: '+1', flag: 'https://flagcdn.com/w20/us.png' },
    { name: 'España', code: '+34', flag: 'https://flagcdn.com/w20/es.png' },
    { name: 'Canada', code: '+1', flag: 'https://flagcdn.com/w20/ca.png' },
    { name: 'Colombia', code: '+57', flag: 'https://flagcdn.com/w20/co.png' }
  ]

  const filtered = useMemo(() => {
    if (!query) return []
    const q = query.toLowerCase()
    return [...careers, ...services].filter(i => i.n.toLowerCase().includes(q) || i.d.toLowerCase().includes(q))
  }, [query])

  const onSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    setStatus(null)
    const fd = new FormData(e.target)
    const data = {
      name: fd.get('name'),
      correo: fd.get('correo'),
      movil: pais.code + fd.get('movil'),
      escuela: fd.get('escuela'),
      carrera: fd.get('carrera')
    }
    try {
      const s = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (s.ok) {
        setStatus('ok')
        e.target.reset()
        setTimeout(() => { setStatus(null); setSeccion('inicio'); }, 2500)
      } else setStatus('error')
    } catch { setStatus('error') }
    finally { setEnviando(false) }
  }

  const Navbar = () => (
    <nav className="navbar navbar-expand navbar-dark bg-dark sticky-top p-0 shadow-lg" style={{ height: '65px' }}>
      <div className="container-fluid px-4">
        <a className="navbar-brand d-flex align-items-center" href="#" onClick={() => setSeccion('inicio')}>
          <img src="/logo.png" alt="UTZAC" style={{ height: '40px' }} className="me-3" />
        </a>
        <div className="navbar-nav me-auto">
          {['carreras', 'servicios', 'registro', 'recorrido', 'calendario'].map(s => (
            <button key={s} className={`nav-link btn border-0 px-3 fw-bold text-capitalize ${seccion === s ? 'text-white active-dot' : 'text-secondary'}`} onClick={() => setSeccion(s)}>{s}</button>
          ))}
        </div>
        <form className="d-flex align-items-center position-relative">
          <input className="form-control border-0 shadow-none px-3" type="search" placeholder="Buscar..." style={{ width: '220px', height: '35px', borderRadius: '5px 0 0 5px' }} value={query} onChange={(e) => {setQuery(e.target.value); if(e.target.value) setSeccion('buscar');}} />
          <button className="btn btn-primary border-0 px-3" type="button" style={{ height: '35px', borderRadius: '0 5px 5px 0' }}><i className="bi bi-search"></i></button>
        </form>
      </div>
    </nav>
  )

  const Modal = () => (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center z-modal animate-fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
      <div className="bg-white p-5 rounded-5 shadow-2xl animate-scale-in border border-primary border-2" style={{ maxWidth: '650px', width: '90%' }}>
        <h2 className={`fw-black text-${detalle.color} mb-3`}>{detalle.n}</h2>
        <p className="text-dark fw-bold mb-4">{detalle.d}</p>
        <div className="mb-4">
          <h6 className="fw-black border-bottom pb-2 text-uppercase small tracking-widest">Información Académica</h6>
          <p className="text-muted mb-2">{detalle.plan || detalle.beneficios}</p>
          {detalle.egreso && <p className="text-muted small"><strong>Egreso:</strong> {detalle.egreso}</p>}
          {detalle.detalles && <p className="text-muted small"><strong>Detalles:</strong> {detalle.detalles}</p>}
        </div>
        <button className="btn btn-dark w-100 py-3 rounded-4 fw-bold uppercase tracking-widest" onClick={() => setDetalle(null)}>Cerrar</button>
      </div>
    </div>
  )

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#e8fcf0' }}>
      <Navbar />
      <main className="container flex-grow-1 py-5">
        {seccion === 'inicio' && (
          <div className="animate-fade-in">
            <div className="position-relative text-center bg-dark text-white rounded-5 shadow-lg mb-5 overflow-hidden animate-slide-up" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url("/fondo.png")', backgroundSize: 'cover', backgroundPosition: 'center', height: '480px', display: 'flex', alignItems: 'center' }}>
              <div className="container">
                <h1 className="display-2 fw-black mb-3 tracking-tighter">UTZAC</h1>
                <p className="lead mb-5 opacity-90 fs-3">Universidad Tecnológica del Estado de Zacatecas.</p>
                <button className="btn btn-primary btn-lg px-5 py-3 fw-bold rounded-pill shadow-lg transition-up" onClick={() => setSeccion('registro')}>Empezar registro</button>
              </div>
            </div>
            <div className="row g-4 text-center">
              {['Misión', 'Visión', 'Valores'].map((t, i) => (
                <div key={i} className={`col-md-4 animate-delay-${i}`}>
                  <div className="p-5 bg-white rounded-4 shadow-sm border-bottom border-primary border-8 h-100 transition-up">
                    <h4 className="fw-black text-dark mb-3 uppercase tracking-widest">{t}</h4>
                    <p className="text-muted small mb-0 lh-lg">Excelencia académica vinculada al desarrollo tecnológico y compromiso social del estado de Zacatecas.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {seccion === 'carreras' && (
          <div className="animate-fade-in">
            <h2 className="fw-black text-center mb-5 display-5 uppercase tracking-tighter">Oferta Académica</h2>
            <div className="row g-4">
              {careers.map((c, i) => (
                <div key={i} className={`col-md-4 animate-delay-${i % 3}`}>
                  <div className="card h-100 border-0 shadow-sm p-5 rounded-5 transition-up cursor-pointer bg-white text-center" onClick={() => setDetalle(c)}>
                    <h5 className="fw-black text-primary mb-4">{c.n}</h5>
                    <p className="text-muted mb-4">{c.d}</p>
                    <div className="mt-auto pt-3 border-top text-primary small fw-black uppercase">Ver plan de estudios</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {seccion === 'servicios' && (
          <div className="animate-fade-in">
            <h2 className="fw-black text-center mb-5 display-5 uppercase tracking-tighter">Beneficios Estudiantiles</h2>
            <div className="row g-4">
              {services.map((s, i) => (
                <div key={i} className={`col-md-4 animate-delay-${i % 3}`}>
                  <div className="card h-100 border-0 shadow-sm p-5 rounded-5 transition-up cursor-pointer bg-white text-center" onClick={() => setDetalle(s)}>
                    <h5 className="fw-black text-success mb-4">{s.n}</h5>
                    <p className="text-muted mb-4">{s.d}</p>
                    <div className="mt-auto pt-3 border-top text-success small fw-black uppercase">Ver beneficios</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {seccion === 'registro' && (
          <div className="animate-fade-in max-w-registro mx-auto">
            <h2 className="fw-black text-center mb-4 display-5">Formulario de registro</h2>
            {status === 'ok' && <div className="alert alert-success rounded-4 text-center fw-bold mb-4">Registro guardado con éxito Coyote.</div>}
            {status === 'error' && <div className="alert alert-danger rounded-4 text-center fw-bold mb-4">Error en la base de datos. Intenta de nuevo.</div>}
            <div className="card border-0 shadow-2xl p-5 rounded-5 bg-white animate-slide-up">
              <form className="was-validated" onSubmit={onSubmit}>
                <div className="mb-4 position-relative">
                  <input type="text" name="name" className="form-control border-danger-subtle py-3 ps-4 pe-5 rounded-4 shadow-none bg-light-subtle" placeholder="Nombre completo" required />
                  <span className="position-absolute top-50 end-0 translate-middle-y me-4 text-danger fw-black fs-4">!</span>
                </div>
                <div className="mb-4 position-relative">
                  <input type="email" name="correo" className="form-control border-danger-subtle py-3 ps-4 pe-5 rounded-4 shadow-none bg-light-subtle" placeholder="Correo electrónico" required />
                  <span className="position-absolute top-50 end-0 translate-middle-y me-4 text-danger fw-black fs-4">!</span>
                </div>
                <div className="mb-4 d-flex rounded-4 overflow-hidden border border-danger-subtle" style={{ minHeight: '62px' }}>
                  <div className="bg-white d-flex align-items-center px-3 border-end border-danger-subtle" style={{ minWidth: '170px' }}>
                    <img src={pais.flag} alt="flag" className="me-2 rounded-1" style={{ width: '24px' }} />
                    <span className="text-success fw-bold me-2">✓</span>
                    <select className="form-select border-0 p-0 fw-bold bg-transparent shadow-none" value={pais.name} onChange={(e) => setPais(paises.find(p => p.name === e.target.value))}>
                      {paises.map(p => <option key={p.name} value={p.name}>{p.code}</option>)}
                    </select>
                  </div>
                  <div className="position-relative flex-grow-1">
                    <input type="tel" name="movil" className="form-control border-0 py-3 ps-4 pe-5 shadow-none bg-transparent" placeholder="Número de teléfono" required />
                    <span className="position-absolute top-50 end-0 translate-middle-y me-4 text-danger fw-black fs-4">!</span>
                  </div>
                </div>
                <div className="mb-4 position-relative">
                  <select name="escuela" className="form-select border-danger-subtle py-3 ps-4 pe-5 rounded-4 shadow-none bg-light-subtle text-secondary" required>
                    <option value="">Escuela de procedencia</option>
                    <option>COBAEZ</option><option>CECYTEZ</option><option>UAZ</option><option>CONALEP</option>
                  </select>
                  <span className="position-absolute top-50 end-0 translate-middle-y me-5 pe-3 text-danger fw-black fs-4">!</span>
                </div>
                <div className="mb-5 position-relative">
                  <select name="carrera" className="form-select border-danger-subtle py-3 ps-4 pe-5 rounded-4 shadow-none bg-light-subtle text-secondary" required>
                    <option value="">Carrera de interés</option>
                    {careers.map(c => <option key={c.n} value={c.n}>{c.n}</option>)}
                  </select>
                  <span className="position-absolute top-50 end-0 translate-middle-y me-5 pe-3 text-danger fw-black fs-4">!</span>
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100 py-3 fw-black uppercase shadow-xl rounded-4 tracking-widest transition-up border-0" disabled={enviando}>
                  {enviando ? 'Guardando...' : 'Enviar Datos'}
                </button>
              </form>
            </div>
          </div>
        )}

        {seccion === 'buscar' && (
          <div className="animate-fade-in">
            <h2 className="fw-black mb-5">Resultados: <span className="text-primary">{query}</span></h2>
            {filtered.length > 0 ? (
              <div className="row g-4">
                {filtered.map((r, i) => (
                  <div key={i} className="col-md-6" onClick={() => setDetalle(r)}>
                    <div className="card p-5 border-0 shadow-sm rounded-5 cursor-pointer transition-up bg-white">
                      <h5 className={`fw-black text-${r.color}`}>{r.n}</h5>
                      <p className="text-muted small mb-0">{r.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <p className="fs-3 text-muted fw-bold">Sin resultados encontrados.</p>
                <button className="btn btn-outline-primary mt-3 rounded-pill px-5 py-2 fw-bold" onClick={() => {setSeccion('inicio'); setQuery('');}}>Reiniciar</button>
              </div>
            )}
          </div>
        )}

        {seccion === 'calendario' && (
          <div className="container py-5 text-center animate-fade-in">
            <h2 className="fw-black mb-5 text-dark display-5 uppercase tracking-tighter">Calendario Académico</h2>
            <div className="bg-white p-5 rounded-5 shadow-lg inline-block w-100 max-w-5xl animate-scale-in">
              <img src="/calendario.png" className="img-fluid rounded-4 shadow-sm mx-auto" alt="Calendario" onError={(e) => {e.target.style.display='none'; e.target.parentNode.innerHTML='<div class="py-5 text-muted fw-bold fs-4">Archivo calendario.png no encontrado.</div>'}} />
            </div>
          </div>
        )}

        {seccion === 'recorrido' && (
          <div className="animate-fade-in text-center py-5 bg-dark text-white rounded-5 shadow-2xl border border-primary border-5 overflow-hidden animate-scale-in" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("/fondo.png")', backgroundSize: 'cover', minHeight: '520px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 className="display-1 fw-black mb-4 tracking-tighter">Recorrido 360°</h2>
            <p className="lead mb-5 opacity-75 fs-2 px-5 max-w-4xl mx-auto fw-light">Explora nuestras instalaciones tecnológicas de primer nivel desde cualquier dispositivo.</p>
            <a href="https://www.utzac.edu.mx" target="_blank" rel="noreferrer" className="btn btn-primary btn-lg px-5 shadow-lg py-4 fw-black rounded-pill border-0 transition-up uppercase tracking-widest mx-auto fs-5">Iniciar experiencia</a>
          </div>
        )}
      </main>

      {detalle && <Modal />}

      <footer className="bg-dark text-white py-5 shadow-lg mt-auto border-top border-secondary border-opacity-25">
        <div className="container text-center">
          <p className="mb-2 small opacity-40 uppercase tracking-[0.5em]">© 2026 Universidad Tecnológica del Estado de Zacatecas</p>
          <p className="mb-0 fw-black fs-6 text-white-50 uppercase tracking-tight">Emanuel Enrique Medina Galvan | TI e Innovación Digital</p>
        </div>
      </footer>

      <style>{`
        .fw-black { font-weight: 900; }
        .max-w-registro { max-width: 850px; }
        .transition-up { transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1); }
        .transition-up:hover { transform: translateY(-15px) scale(1.02); box-shadow: 0 35px 70px rgba(0,0,0,0.1) !important; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
        .animate-slide-up { animation: slideUp 0.9s cubic-bezier(0.19, 1, 0.22, 1); }
        .animate-scale-in { animation: scaleIn 0.8s cubic-bezier(0.19, 1, 0.22, 1); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        .active-dot { position: relative; }
        .active-dot::after { content: ''; position: absolute; bottom: -8px; left: 50%; width: 6px; height: 6px; background: #0d6efd; border-radius: 50%; transform: translateX(-50%); }
        .z-modal { z-index: 2100; }
        .bg-light-subtle { background-color: #fafcfb !important; }
        .was-validated .form-control:invalid, .was-validated .form-select:invalid { border-color: #e3342f !important; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #e8fcf0; }
        ::-webkit-scrollbar-thumb { background: #212529; border-radius: 10px; }
      `}</style>
    </div>
  )
}

export default App