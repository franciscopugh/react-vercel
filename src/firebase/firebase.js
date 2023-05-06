
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, getDoc, getDocs, deleteDoc, updateDoc, collection, doc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "react-2023-797d2.firebaseapp.com",
    projectId: "react-2023-797d2",
    storageBucket: "react-2023-797d2.appspot.com",
    messagingSenderId: "918418942610",
    appId: "1:918418942610:web:6a53f5d5996f9a9b11544b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Consultar BDD
const bdd = getFirestore()

/*
    CREATE --> post
    READ --> get
    UPDATE --> put
    DELETE --> delete
*/

//CRUD PRODUCTOS

export const createProducts = async () => {
    const promise = await fetch('./json/productos.json')
    const productos = await promise.json()
    productos.forEach(async (prod) => {
        await addDoc(collection(bdd, "productos"), { //Si existe la coleccion te agrega nuevos productos a la misma, si no te crea la coleccion y te envia estos productos
            nombre: prod.nombre,
            marca: prod.marca,
            modelo: prod.modelo,
            idCategoria: prod.idCategoria,
            stock: prod.stock,
            precio: prod.precio,
            img: prod.img
        })
    })

}

export const getProducts = async () => {
    const prods = await getDocs(collection(bdd, "productos"))
    const items = prods.docs.map(prod => {
        return { ...prod.data(), id: prod.id }
    })
    return items
}

export const getProduct = async (id) => {
    const prod = await getDoc(doc(bdd, "productos", id))
    const item = { ...prod.data(), id: prod.id }
    return item
}
//1 o 0
//Tanto Update como Delete no devuelven un estado
export const updateProduct = async (id, info) => {
    await updateDoc(doc(bdd, "productos", id), info)
}

export const deleteProduct = async (id) => {
    await deleteDoc(doc(bdd, "productos", id))
}

// CREATE y READ OrdenCompra

export const createOrdenCompra = async (cliente, precioTotal, carrito, fecha) => {
    const ordenCompra = await addDoc(collection(bdd, "ordenCompra"), {
        cliente: cliente,
        items: carrito,
        precioTotal: precioTotal,
        fecha: fecha
    })
    return ordenCompra
}

export const getOrdenCompra = async (id) => {
    const ordenCompra = await getDoc(doc(bdd, "ordenCompra", id))
    const item = { ...ordenCompra.data(), id: ordenCompra.id }
    return item
}

export const deleteOrdenCompra = async (id) => {
    await deleteDoc(doc(bdd, "ordenCompra", id))
}