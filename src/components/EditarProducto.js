import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editarProductoAction } from '../actions/productoActions'
import { useNavigate } from 'react-router-dom'


const EditarProducto = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    //Nuevo state de producto
    const [producto,guardarProducto] = useState({
        nombre: '',
        precio: ''
    })

    //Producto a editar
    const productoEditar = useSelector(state => state.productos.productoEditar)


    //llenar el state
    useEffect(() => {
        guardarProducto(productoEditar)
    },[productoEditar])

    // Leer datos del formulario
    const onChangeFormulario = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : Number(e.target.value)
        })
    }

    const {nombre,precio} = producto

    const submitEditarProducto = e => {
        e.preventDefault()
        dispatch(editarProductoAction(producto))
        navigate('/')
    }


    return (
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>Editar Producto</h2>

                        <form onSubmit={submitEditarProducto}>

                            <div className='form-group'>
                                <label>Nombre Producto</label>
                                <input type='text' className='form-control' placeholder='Nombre Producto' name='nombre' value={nombre} onChange={onChangeFormulario}/>
                            </div>

                            <div className='form-group'>
                                <label>Precio Del Producto</label>
                                <input type='number' className='form-control' placeholder='Precio Del Producto' name='precio' value={precio} onChange={onChangeFormulario}/>
                            </div>

                            <button type='submit' className='btn btn-primary text-uppercase font-weight-bold d-block w-100'>Guardar Cambios</button>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarProducto