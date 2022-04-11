import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OPTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_EXITO,
    PRODUCTO_ELIMINAR_ERROR,
    OPTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR,
    COMENZAR_EDICION_PRODUCTO
} from '../types'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'


// CREAR NUEVOS PRODCUTOS
export function crearNuevoProductoAction(producto){
    return async (dispatch) =>{
       dispatch(agregarProducto())

       try {
           //Insertar en la api
            await clienteAxios.post('/productos', producto)
           // Si todo sale bien se hace post a la api
           dispatch( agregarProductoExito(producto) )
           // Mostrar alerta
           Swal.fire(
               'Correcto',
               'El producto se agrego correctamente',
               'success'

           )


       } catch (error) {
           
           console.log(error)
           dispatch( agregarProductoError(true) )

           //Alerta de error
           Swal.fire({
               icon: 'error',
               title: 'Hubo un error',
               text: 'Hubo un error intenta de nuevo!'
           })
       }

    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

// Si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

// Si hubo un error

const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado

})

//funcio que descarga los productos de la base de datos
export function obtenerProductosActio(){
    return async (dispatch) => {
        dispatch(descargarProductos())

        try {
            const respuesta = await clienteAxios('/productos')
            dispatch(descargaProductosExitosa(respuesta.data))
        } catch (error) {
            console.log(error)
            dispatch(descargaProductosError())
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true

})

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})


// Selecicona y eliman el producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(optenerProductoEliminar(id))
        
        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch(eliminarProductoExito())

            //Si se elimina mostrar la alerta
            Swal.fire(
                'Eliminado ☠!',
                'Tu archivo ha sido eliminado con exito 😁.',
                'success'
              )

        } catch (error) {
            console.log(error)
            dispatch(eliminarProductoError())
        }
    }
}

const optenerProductoEliminar = id => ({
    type: OPTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINAR_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINAR_ERROR,
    payload: true
})

//Colocar producto en edicion
export function optenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch(optenerProductoEditarAction(producto))
    }
}

const optenerProductoEditarAction = producto => ({
    type: OPTENER_PRODUCTO_EDITAR,
    payload: producto
})

//Edita un registro en la api y state
export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch(editarProducto(producto))

        try {

            await clienteAxios.put(`/productos/${producto.id}`,producto)
            dispatch(editarProductoExito(producto))  

        } catch (error) {
            console.log(error)
            dispatch(editarProductoError())
        }
    }
}

const editarProducto = () => ({
    type:COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITAR_ERROR,
    payload: true
})