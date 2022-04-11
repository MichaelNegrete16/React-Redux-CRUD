import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


//Redux
import { useDispatch } from 'react-redux'
import { borrarProductoAction, optenerProductoEditar } from '../actions/productoActions'



const Producto = ({producto}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate() // Habilitar history ara redireccion

    const {nombre,precio,id} = producto

    // Confirmar si desea eliminar
    const confirmarEliminarProducto = id => {

        //Preguntar al usuario
        Swal.fire({
            title: 'Estas Seguro 🧐?',
            text: "No prodras revertir los cambios 🤨!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {

            if (result.isConfirmed) {

              //Pasar al action
              dispatch(borrarProductoAction(id))

            }

          })

    }

    //Funcion que redirige de forma programada
    const redireccionarEdicion = producto => {
        dispatch(optenerProductoEditar(producto))
        navigate(`/productos/editar/${producto.id}`)
    }



    return (
        <tr>
            <td>{nombre}</td>
            <td> <span className='font-weight-bold'> $ {precio} </span></td>
            <td className='acciones'>
                <button type='button' onClick={() => redireccionarEdicion(producto)} className='btn btn-primary mr-2'>Editar</button>
                <button type='button' className='btn btn-danger' onClick={() => confirmarEliminarProducto(id)}>Eliminar</button>
            </td>
        </tr>
    )
}

export default Producto