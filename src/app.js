import express from 'express'
import cors from 'cors'

//importar las rutas
import autenticacionRoutes from './routes/autenticacion_routes.js'

//definir móulos de entrada
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//definir permisos
const corsOptions = {
    origin: '*', //se puede poner la dirección del dominio del servidor, en este caso es de cualquiera
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credential: true
}

const app = express();


app.use(cors(corsOptions));
app.use(express.json()); //interpreta objetos json
app.use(express.urlencoded({extended: true})) //receptar formularios
app.use('/uploads', express.static(path.join(__dirname,'../uploads'))) //direccionar donde quiere guardar la info

//indicar para rutas publicas
app.use('/api', autenticacionRoutes);


app.use((req,resp,next) =>{
    resp.status(400).json({
        message: 'Endponit not found'
    })
}
)

export default app;