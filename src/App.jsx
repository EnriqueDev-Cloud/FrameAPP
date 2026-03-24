import { useState } from 'react'

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="/logo.png" alt="UTZAC" style={{ height: '40px', width: 'auto' }} />
          </a>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><a className="nav-link" href="#">Carreras</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Servicios</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Pre-registro</a></li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="text" placeholder="Buscar..." />
              <button className="btn btn-primary" type="button"><i className="bi bi-search"></i></button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container mt-3">
        <h3>Formulario de preregistro</h3>
        <p>Información de contacto para interesados en la UTZAC</p>
        <form action="http://localhost/action_guardar_datos.php" method="POST" className="was-validated">
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Nombre completo" name="name" pattern="[a-zA-ZÁéíóúñÁÉÍÓÚÑ\s]+" required />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Correo electrónico" name="correo" required />
          </div>
          <div className="mb-3">
            <div className="input-group">
              <select className="form-select" name="lada" style={{ maxWidth: '100px' }} required>
                <option value="+52">+52</option>
                <option value="+1">+1</option>
              </select>
              <input type="tel" className="form-control" placeholder="Número de teléfono" name="movil" pattern="[0-9]{10}" required />
            </div>
          </div>
          <div className="mb-3">
            <select className="form-select" name="escuela_procedencia" required>
              <option value="">Selecciona tu escuela</option>
              <option value="COBAEZ">COBAEZ</option>
              <option value="CECYTEZ">CECYTEZ</option>
              <option value="Preparatoria UAZ">Preparatoria UAZ</option>
            </select>
          </div>
          <div className="mb-3">
            <select className="form-select" name="carrera" required>
              <option value="">Selecciona una carrera</option>
              <option value="TI">Tecnologías de la Información</option>
              <option value="Mecatrónica">Mecatrónica</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Enviar Registro</button>
        </form>
      </div>
    </>
  )
}
export default App;