
const { getFirestore } = require("firebase-admin/firestore")

class ContenedorFirebase {

    constructor(configPrivi, collection){
        this.configPrivi = configPrivi;
        this.collection = collection;
    }

    inicializar = async () =>{
        const admin = await require('firebase-admin');
        const serverAccount = await require(this.configPrivi);
        //inicializo app
        admin.initializeApp({
            credential: await admin.credential.cert(serverAccount),
        })
    }

    save = async (objeto) =>{
        await this.inicializar();
        const db = getFirestore();
        await db.collection(this.collection).doc().set(objeto);
    }

    getAll = async () =>{
        await this.inicializar();
        const db = getFirestore();
        const res = await db.collection(this.collection).get()
        let arrayRes = res.docs.map((item)=>{
            return {id: item.id, ...item.data()}
        })
        return arrayRes;
    }

    getById = async (id) =>{
        const db = getFirestore();
        const res = await db.collection(this.collection).doc(id);
        console.log(res);
    }


}

module.exports = ContenedorFirebase;