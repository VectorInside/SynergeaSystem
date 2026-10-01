/**
 * Base de Datos Inicial y Estado del Panel SynerGea
 * Basado fielmente en los datos extraídos de los 18 screenshots
 */

const INITIAL_DATA = {
    currentUser: {
        nombre: "CARLOS RENDON",
        email: "escuchagtr2025@gmail.com",
        grupo: "Grupo Tlah-lee",
        categoria: "Sin categoría",
        miembroDesde: "5 de mayo de 2026",
        activacion: "4 de mayo de 2026",
        expiracion: "4 de mayo de 2029",
        estadoMembresia: "Membresía Activa",
        avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80"
    },

    stats: {
        valorRecibido: 7300.00,
        valorRecibidoValidados: 8,
        valorDado: 0.00,
        valorDadoValidados: 0,
        recomendacionesTotal: 9,
        recomendacionesConcretadas: 0,
        unidadesEducacionTotal: 3,
        unidadesEducacionRegistros: 2,
        graciasDados: 0,
        graciasDadosValidados: 0,
        graciasRecibidos: 8,
        graciasRecibidosValidados: 8
    },

    desgloseEducacion: {
        podcasts: 1,
        presenciales: 0,
        cursosOnline: 1,
        librosLeidos: 1
    },

    publicidades: [
        {
            id: 1,
            titulo: "Choicy",
            autor: "Miembro del grupo",
            tipo: "Imagen",
            imagen: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor tincidunt faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
        },
        {
            id: 2,
            titulo: "Conversando con mi ser",
            autor: "Miriam Veloz",
            categoria: "Terapeuta",
            tipo: "Imagen",
            imagen: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",
            descripcion: "Este miembro compartió material comercial en su perfil.",
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80"
        },
        {
            id: 3,
            titulo: "SIMCEG",
            autor: "Yvonne Diblik",
            categoria: "Franquicia",
            tipo: "Imagen",
            imagen: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80",
            descripcion: "Este miembro compartió material comercial en su perfil.",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
        },
        {
            id: 4,
            titulo: "MBC Films",
            autor: "Miembro del grupo",
            categoria: "Producción Audiovisual",
            tipo: "Video",
            imagen: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
            descripcion: "Servicios profesionales de producción y video comercial.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
        },
        {
            id: 5,
            titulo: "Kit de Seguridad Tigrisco",
            autor: "Grupo Tigrisco",
            categoria: "Seguridad Privada",
            tipo: "Imagen",
            imagen: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80",
            descripcion: "Grupo Tigrisco te apoya con un Kit de Seguridad con equipo de alta tecnología.",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
        },
        {
            id: 6,
            titulo: "ALIANZA Médica",
            autor: "Alianza Salud",
            categoria: "Salud y Bienestar",
            tipo: "Imagen",
            imagen: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80",
            descripcion: "Red de profesionales de la salud con descuentos exclusivos.",
            avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80"
        }
    ],

    actividadReciente: [
        { id: 1, tipo: "Gracias Recibido", autor: "N/A", valor: 400, estado: "Validado", fecha: "22/09/2026" },
        { id: 2, tipo: "Gracias Recibido", autor: "N/A", valor: 1800, estado: "Validado", fecha: "22/09/2026" },
        { id: 3, tipo: "Recomendación Recibida", autor: "Yvonne Diblik", cliente: "Martín Santana", estado: "Contactado", fecha: "21/09/2026" },
        { id: 4, tipo: "Recomendación Recibida", autor: "Yvonne Diblik", cliente: "Adriana Escobedo", estado: "Contactado", fecha: "24/08/2026" },
        { id: 5, tipo: "Recomendación Recibida", autor: "Yvonne Diblik", cliente: "Areli Barra", estado: "Pendiente", fecha: "24/08/2026" },
        { id: 6, tipo: "Gracias Recibido", autor: "N/A", valor: 400, estado: "Validado", fecha: "07/08/2026" },
        { id: 7, tipo: "Gracias Recibido", autor: "N/A", valor: 1250, estado: "Validado", fecha: "07/08/2026" }
    ],

    tpnList: [
        {
            id: 1,
            fecha: "22/09/2026",
            reunionCon: "BEATRIZ ISLAS",
            email: "bettyherreraislas@gmail.com",
            iniciadoPor: "BEATRIZ ISLAS",
            ubicacion: "Zoom",
            notas: "Conocer la nueva rama de Grupo Tigrisco"
        },
        {
            id: 2,
            fecha: "05/08/2026",
            reunionCon: "CLAUDIO DELGADILLO",
            email: "claudio.delgadillodiaz@gmail.com",
            iniciadoPor: "CARLOS RENDON",
            ubicacion: "PRESENCIAL",
            notas: "PROPUETAS COMERCIALES Y AIANZAS"
        },
        {
            id: 3,
            fecha: "15/07/2026",
            reunionCon: "Miriam Veloz",
            email: "miriamveloz@gmail.com",
            iniciadoPor: "Miriam Veloz",
            ubicacion: "Oficinas de Grupo",
            notas: "Me parece interesante la propuesta de valor que ofrecerá"
        }
    ],

    recomendacionesDadas: [
        { id: 1, fecha: "13/07/2026", para: "Miriam Veloz", cliente: "JUAN CARLOS OSORIO", telefono: "7226410679", temp: "Caliente", estado: "Contactado" },
        { id: 2, fecha: "12/06/2026", para: "Miriam Veloz", cliente: "JUAN CARLOS OSORIO", telefono: "7226410679", temp: "Tibio", estado: "Pendiente" },
        { id: 3, fecha: "02/06/2026", para: "Miriam Veloz", cliente: "JUAN CARLOS OSORIO", telefono: "7226410679", temp: "Caliente", estado: "Contactado" }
    ],

    recomendacionesRecibidas: [
        { id: 1, fecha: "21/09/2026", de: "Yvonne Diblik", cliente: "Martín Santana", telefono: "722 555 0937", temp: "Tibio", estado: "Contactado" },
        { id: 2, fecha: "24/08/2026", de: "Yvonne Diblik", cliente: "Adriana Escobedo", telefono: "7223699242", temp: "Caliente", estado: "Contactado" },
        { id: 3, fecha: "24/08/2026", de: "Yvonne Diblik", cliente: "Areli Barra", telefono: "7223685202", temp: "Tibio", estado: "Pendiente" }
    ],

    cursosDisponibles: [
        {
            id: 1,
            titulo: "Nuevo curso 4",
            descripcion: "Lorem Ipsum dolor sit amet consectetur de prueba para formación de miembros.",
            lecciones: 0,
            estado: "Disponible",
            imagen: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: 2,
            titulo: "Nuevo curso 01",
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus, lorem ac aliquet vulputate, nisl...",
            lecciones: 0,
            estado: "Disponible",
            imagen: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80"
        }
    ],

    unidadesEducacionHistorial: [
        { id: 1, fecha: "2026-05-12", podcasts: 1, presenciales: 0, online: 0, libros: 0, total: 1 },
        { id: 2, fecha: "2026-05-12", podcasts: 0, presenciales: 0, online: 1, libros: 1, total: 2 }
    ],

    graciasList: [
        { id: 1, persona: "Miriam Veloz", tipo: "Repetido", referencia: "Interna", valor: 400.00, estado: "Validado" },
        { id: 2, persona: "Miriam Veloz", tipo: "Nuevo", referencia: "Externa", valor: 1800.00, estado: "Validado" }
    ],

    miCapitulo: {
        nombre: "Grupo Tlah-lee",
        sede: "AV. Ignacio Comonfort 105 Santa Ana Tlapatitlan Toluca",
        estado: "Toluca de Lerdo",
        pais: "México",
        idioma: "Español",
        totalMiembros: 13,
        miembros: [
            { id: 1, nombre: "Abril Enriquez", categoria: "Marketing y Publicidad", email: "marielaa0215@gmail.com", capitulo: "Grupo Tlah-lee", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
            { id: 2, nombre: "Astrid Gomez", categoria: "Seguros", email: "gomezarroyoastrid@gmail.com", capitulo: "Grupo Tlah-lee", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
            { id: 3, nombre: "BEATRIZ ISLAS", categoria: "Servicios Integrales", email: "bettyherreraislas@gmail.com", capitulo: "Grupo Tlah-lee", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" },
            { id: 4, nombre: "Yvonne Diblik", categoria: "Franquicia", email: "yvonnediblik@gmail.com", capitulo: "Grupo Tlah-lee", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80" },
            { id: 5, nombre: "Miriam Veloz", categoria: "Terapeuta", email: "miriamveloz@gmail.com", capitulo: "Grupo Tlah-lee", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" }
        ]
    },

    comunidadGlobal: {
        totalCapitulos: 3,
        totalMiembros: 44,
        capitulos: [
            { id: 1, nombre: "Capitulo Fundadores", miembros: 30, ubicacion: "Toluca de Lerdo, restaurante Nizú", idioma: "Español" },
            { id: 2, nombre: "Capitulo Prueba", miembros: 1, ubicacion: "Metepec, restaurante Nizú", idioma: "Inglés" },
            { id: 3, nombre: "Grupo Tlah-lee", miembros: 13, ubicacion: "AV. Ignacio Comonfort 105 Santa Ana Tlapatitlan Toluca", idioma: "Español", esMiCapitulo: true }
        ]
    },

    contactosDestacados: [
        { id: 1, nombre: "Luis Alberto Enriquez", email: "luis.enriquez@synergea.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
        { id: 2, nombre: "Mayeli Garduño", email: "mayeli.garduno@synergea.com", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
        { id: 3, nombre: "Miriam Veloz", email: "miriamveloz@gmail.com", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" },
        { id: 4, nombre: "Yvonne Diblik", email: "yvonnediblik@gmail.com", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80" }
    ]
};

// Cargar o inicializar estado desde LocalStorage
function getStoreData() {
    const saved = localStorage.getItem('synergea_dashboard_db');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error("Error al cargar localStorage, usando datos iniciales", e);
        }
    }
    localStorage.setItem('synergea_dashboard_db', JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
}

function saveStoreData(data) {
    localStorage.setItem('synergea_dashboard_db', JSON.stringify(data));
}
