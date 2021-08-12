

import React, { Fragment, useState, useEffect } from 'react'

import Header from './componentes/Header'
import BuscarContactos from './componentes/BuscarContactos'
import BtnContactos from './componentes/BtnContactos'
import AgregarContactos from './componentes/AgregarContactos'
import EditarContacto from './componentes/EditarContacto'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const App = () => {

  const [name, saveName] = useState('')
  const [lastName, saveLastName] = useState('')
  const [phone, savePhone] = useState('')

  const [getId, setId] = useState()

  const [getContactos, setContactos] = useState([])

  const [getBusqueda, setBusqueda] = useState([])


  useEffect(() => {
    setContactos(getBusqueda)
  }, [])

  const eliminar = (contacto) => {
    confirmAlert({
      title: 'Confirmar',
      message: '¿Estás seguro que quieres eliminar este contacto?',
      buttons: [
        {
          label: 'SI',
          onClick: () => {
            let cont = 0;
            let arreglo = getContactos
            arreglo.forEach((registro) => {
              if (contacto.id === registro.id) {
                arreglo.splice(cont, 1);
              }
              cont++;
            });

            let lista = []
            for (let i = 0; i < arreglo.length; i++) {
              lista = Array.from([...arreglo])
            }
            setContactos([...lista])
          }
        },
        {
          label: 'No',
        }
      ]
    });

  }

  const editar = (id) => {
    setId(id)
    let cont = 0;
    let newArrayContactos = getContactos
    newArrayContactos.forEach((registro) => {
      if (id === registro.id) {
        saveName(newArrayContactos[cont].nombre)
        saveLastName(newArrayContactos[cont].apellido)
        savePhone(newArrayContactos[cont].telefono)
      }
      cont++;
    });

  }

  const mostrarContactos = () => {
    let listaContactos = []

    if (getBusqueda.length > 0) {
      listaContactos = getContactos.filter(busqueda => {
        if (busqueda.nombre.toLowerCase() === getBusqueda.toLowerCase()
          || busqueda.apellido.toLowerCase() === getBusqueda.toLowerCase()
          || (busqueda.nombre.toLowerCase() + ' ' + busqueda.apellido.toLowerCase()) === getBusqueda.toLowerCase()
          || busqueda.telefono === getBusqueda
          || busqueda.telefono.replace('+', '') === getBusqueda
          || busqueda.id == getBusqueda) {
          return busqueda
        }
      });

    } else {
      listaContactos = getContactos
    }

    if (getBusqueda.length > 0 && listaContactos.length === 0) {
      return (
        <tr key={0}>
          <td colspan={6} className="busqueda-invalida">¡No se encontró ningun contacto que coincida con su busqueda!</td>
        </tr>
      )
    } else {
      return listaContactos.map(contacto => (
        <tr key={contacto.id}>
          <th scope="row">{contacto.id}</th>
          <td>{contacto.nombre}</td>
          <td>{contacto.apellido}</td>
          <td>{contacto.telefono}</td>
          <td>
            <a href="" className="btn-editar" id="editar" onClick={(e) => {
              e.preventDefault()
              editar(contacto.id)
            }} data-toggle="modal" data-target="#abrir-modal-editar">
              <i className="far fa-edit mr-1"></i>Editar</a>
          </td>
          <td>
            <a href="" className="btn-eliminar" id="eliminar" onClick={(e) => {
              e.preventDefault()
              eliminar(contacto)
            }}>
              <i className="fas fa-trash-alt mr-1"></i>Eliminar</a>
          </td>
        </tr>
      ))
    }
  }

  return (
    <Fragment>
      <Header />
      <section className="container mt-4">
        <div className="row justify-content-between mt-4">
          <BuscarContactos
            setBusqueda={setBusqueda}
          />
          <BtnContactos />
          <div className="col-lg-12 mt-3 mb-3">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {getContactos.length > 0 ? mostrarContactos() :
                  <tr key={0}>
                    <td colspan={6} className="lista-vacia">¡No tienes ningun contacto agregado!</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <AgregarContactos
            name={name}
            saveName={saveName}
            lastName={lastName}
            saveLastName={saveLastName}
            phone={phone}
            savePhone={savePhone}
            getContactos={getContactos}
            setContactos={setContactos}
          />
        </div>
        <EditarContacto
          name={name}
          saveName={saveName}
          lastName={lastName}
          saveLastName={saveLastName}
          phone={phone}
          savePhone={savePhone}
          getContactos={getContactos}
          setContactos={setContactos}
          id={getId}
          setId={setId}
        />
      </section>
    </Fragment>
  );
}

export default App;