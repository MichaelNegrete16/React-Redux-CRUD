import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//Actions de redux
import {crearNuevoProductoAction} from '../actions/productoActions'
import { mostrarAlerta,ocultarAlertaAction } from '../actions/alertaAction'

const NuevoProducto = () => {

    const navigate = useNavigate()

    //State del componente
    const [nombre, guardarNombre] = useState('')
    const [precio, guardarPrecio] = useState(0)

    // Utilizar use dispatch y te crea una function
    const dispatch = useDispatch()

    //Aceder al state del store
    const cargando = useSelector(state => state.productos.loading)
    const error = useSelector(state => state.productos.error)
    const alerta = useSelector(state => state.alerta.alerta)

    //Mandar a llamar el action de producto
    const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto))



    //Cuando el usuario haga submit
    const submitNuevoProducto = e =>{
        e.preventDefault()

        // Validar producto
        if(nombre.trim() === '' || precio <=0){

            const alerta = {
                msg:'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center p3 text-uppercase'
            }

            dispatch(mostrarAlerta(alerta))


            return
        }

        // Validar Que no hay errores
        dispatch(ocultarAlertaAction())

        // Crear el nuevo producto
        agregarProducto({nombre, precio})


        //Redireccionar
        navigate('/')
    }

    return (
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>Agregar Nuevo Producto</h2>

                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}

                        <form onSubmit={submitNuevoProducto}>

                            <div className='form-group'>
                                <label>Nombre Producto</label>
                                <input type='text' className='form-control' placeholder='Nombre Producto' name='nombre' value={nombre} onChange={e => guardarNombre(e.target.value)} />
                            </div>

                            <div className='form-group'>
                                <label>Precio Del Producto</label>
                                <input type='number' className='form-control' placeholder='Precio Del Producto' name='precio' value={precio} onChange={e => guardarPrecio(Number(e.target.value))}/>
                            </div>

                            <button type='submit' className='btn btn-primary text-uppercase font-weight-bold d-block w-100'>Agregar</button>

                        </form>

                        {cargando ? <p>Cargando..</p> : null}
                        {error ? <p className='alert alert-danger p2 mt-4 text-center'>Hubo un error</p> : null}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NuevoProducto