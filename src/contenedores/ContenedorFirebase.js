import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";


class ContenedorFirebase {

    constructor(configPrivi, collection){
        this.configPrivi = configPrivi;
        this.collection = collection;
    }

    inicializar = async () =>{
        //inicializo app
        admin.initializeApp({
            credential: admin.credential.cert(this.configPrivi),
        })
    }

    referenciaDB = () =>{
        const db = getFirestore();
        return db;
    }

    // save = async (objeto) =>{
    //     await this.inicializar();
    //     const db = getFirestore();
    //     // await db.collection(this.collection).doc().set(objeto);
    //     // console.log("ghola")
    //     console.log(db)
    // }



}

export default ContenedorFirebase;