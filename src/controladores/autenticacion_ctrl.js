import { conmysql } from "../bd.js";

export const login = async (req, res) => {
  const { usr_usuario, usr_clave } = req.body;
  if (!usr_usuario || !usr_clave) {
    return res.status(400).json({ message: 'Faltan credenciales' });
  }
  try {
    //Obtener Usuario
    const [user] = await conmysql.query(
      'SELECT u.id_usuario, u.usuario, ru.id_rol, r.descripcion AS rol FROM usuario u JOIN rol_usuario ru ON ru.id_usuario = u.id_usuario JOIN rol r ON r.id_rol = ru.id_rol WHERE u.usuario = ? AND u.password = ? AND ru.estado = 1',
      [usr_usuario, usr_clave]
    );
    if (user.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    //Obtener menú de ese rol
    const [menu] = await conmysql.query(
      'SELECT m.descripcion, m.url, m.icono FROM rol_menu rm JOIN menu m ON m.id_opcion = rm.id_opcion WHERE rm.id_rol = ? AND rm.estado = 1', 
      [user.id_rol]
    );

    //Retornar datos del usuario + menú
    res.json({
        usuario: user.usuario,
        rol: user.rol,
        menu
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }

};