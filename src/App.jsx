import { useState } from 'react'

function App() {
  const [seccion, setSeccion] = useState('inicio')

  const Navbar = () => (
    <nav className="navbar navbar-expand navbar-dark bg-dark sticky-top p-0" style={{ height: '56px' }}>
      <div className="container-fluid px-3">
        <a className="navbar-brand d-flex align-items-center" href="#" onClick={() => setSeccion('inicio')}>
          <img src="/logo.png" alt="UTZAC" style={{ height: '35px', width: 'auto' }} className="me-2" />
        </a>
        <div className="navbar-nav me-auto">
          <button className="nav-link btn border-0 px-2 text-white-50" onClick={() => setSeccion('inicio')}>Carreras</button>
          <button className="nav-link btn border-0 px-2 text-white-50" onClick={() => setSeccion('inicio')}>Servicios</button>
          <button className={`nav-link btn border-0 px-2 ${seccion === 'registro' ? 'text-white' : 'text-white-50'}`} onClick={() => setSeccion('registro')}>Pre-registro</button>
          <button className={`nav-link btn border-0 px-2 ${seccion === 'recorrido' ? 'text-white' : 'text-white-50'}`} onClick={() => setSeccion('recorrido')}>Recorrido</button>
        </div>
        <form className="d-flex align-items-center">
          <input className="form-control form-control-sm me-0 rounded-0 rounded-start" type="search" placeholder="Buscar..." style={{ width: '180px', height: '31px' }} />
          <button className="btn btn-primary btn-sm rounded-0 rounded-end px-3" type="button" style={{ height: '31px' }}>
            <i className="bi bi-search text-white"></i>
          </button>
        </form>
      </div>
    </nav>
  )

  const Inicio = () => (
    <div className="py-4">
      <div className="position-relative overflow-hidden text-center bg-dark text-white rounded-3 shadow-sm mb-4" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/fondo.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container py-5">
          <h1 className="display-4 fw-bold">UTZAC</h1>
          <p className="lead mb-4">Universidad Tecnológica del Estado de Zacatecas. Formación profesional de calidad.</p>
          <button className="btn btn-primary px-4 shadow" onClick={() => setSeccion('registro')}>Empezar registro</button>
        </div>
      </div>
      <div className="row g-3 text-center">
        <div className="col-md-4">
          <div className="p-4 border rounded bg-white h-100 shadow-sm">
            <h5>Misión</h5>
            <p className="text-muted small mb-0">Formar profesionales competentes mediante programas educativos de calidad.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 border rounded bg-white h-100 shadow-sm">
            <h5>Visión</h5>
            <p className="text-muted small mb-0">Ser una institución reconocida por su excelencia académica.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 border rounded bg-white h-100 shadow-sm">
            <h5>Valores</h5>
            <p className="text-muted small mb-0">Honestidad, respeto y responsabilidad social.</p>
          </div>
        </div>
      </div>
    </div>
  )

  const Registro = () => (
    <div className="py-4">
      <div className="mb-4">
        <h2 className="fw-bold m-0" style={{ fontSize: '28px' }}>Formulario de preregistro</h2>
        <p className="text-muted small mt-1">Información de contacto para interesados en la UTZAC</p>
      </div>
      <form action="http://localhost/action_guardar_datos.php" method="POST" className="was-validated bg-white p-4 border rounded shadow-sm">
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Nombre completo" name="name" pattern="[a-zA-ZÁéíóúñÁÉÍÓÚÑ\s]+" required />
        </div>
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Correo electrónico" name="correo" required />
        </div>
        <div className="mb-3">
          <div className="input-group">
            <select className="form-select" name="lada" style={{ maxWidth: '80px' }} required>
              <option value="+52">+52</option>
              <option value="+1">+1</option>
            </select>
            <input type="tel" className="form-control" placeholder="Número de teléfono" name="movil" pattern="[0-9]{10}" required />
          </div>
        </div>
        <div className="mb-3">
          <select className="form-select" name="escuela" required>
            <option value="">Selecciona tu escuela</option>
            <option value="COBAEZ">COBAEZ</option>
            <option value="CECYTEZ">CECYTEZ</option>
            <option value="CONALEP">CONALEP</option>
            <option value="UAZ">Preparatoria UAZ</option>
          </select>
        </div>
        <div className="mb-4">
          <select className="form-select" name="carrera" required>
            <option value="">Selecciona una carrera</option>
            <option value="TI">Tecnologías de la Información</option>
            <option value="MEC">Mecatrónica</option>
            <option value="GAS">Gastronomía</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100 py-2 fw-bold shadow-sm">Enviar Registro</button>
      </form>
    </div>
  )

  const Recorrido = () => (
    <div className="py-5 text-center">
      <div className="bg-dark text-white p-5 rounded shadow-lg border border-primary border-2">
        <h2 className="display-5 fw-bold mb-3">Recorrido Virtual</h2>
        <p className="lead mb-4 text-white-50">Explora nuestras instalaciones desde tu computadora.</p>
        <a href="https://www.utzac.edu.mx" target="_blank" rel="noreferrer" className="btn btn-primary btn-lg px-5 shadow">Ir al sitio oficial</a>
      </div>
    </div>
  )

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f0fff4' }}>
      <Navbar />
      <main className="container pb-5">
        {seccion === 'inicio' && <Inicio />}
        {seccion === 'registro' && <Registro />}
        {seccion === 'recorrido' && <Recorrido />}
      </main>
      <footer className="bg-dark text-white py-4 mt-auto">
        <div className="container text-center">
          <p className="mb-0 small text-white-50">© 2026 Universidad Tecnológica del Estado de Zacatecas</p>
          <small className="text-white-50">Emanuel Enrique Medina Galvan | TI</small>
        </div>
      </footer>
    </div>
  )
}

export default App