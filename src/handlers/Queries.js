import { gql } from 'apollo-boost';

const loginUsernameQuery =
  gql`
  mutation($identifier: String!, $password: String!){
    tokenAuth(input: {
      username: $identifier,
      password: $password
    }){
      success,
      errors,
      unarchiving,
      token,
      refreshToken,
      user {
        id,
        username,
        profesional {
          id
        }
        paciente{
          id
        }
      }
    }
  }
  `;

const loginEmailQuery =
  gql`
  mutation($identifier: String!, $password: String!){
    tokenAuth(input: {
      email: $identifier,
      password: $password
    }){
      success,
      errors,
      unarchiving,
      token,
      refreshToken,
      user {
        id,
        username,
        profesional {
          id
        }
        paciente{
          id
        }
      }
    }
  }
  `;

const getAllUbicationsQuery = gql`
  {
    allUbicaciones {
      edges {
        node {
          id
          direccion
          latitud
          longitud
          institucion {
            nombre
          }
        }
      }
    }
  }
`;

const getMembersList = (id) => {
  return(
    gql`
    {
      ubicacion(id: "${id}")
      {
        id
        institucion
        {
          id
          nombre
          miembros
          {
            edges
            {
              node
              {
                id
                nombre
                apellido
                email
                fechaNacimiento
                sexo
                fotoPerfil {
                  url
                  nombre
                }
                tipoProfesionalSet
                {
                  edges
                  {
                    node{
                      id
                      nombre
                    }
                  }
                }
                especialidadesSet
                {
                  edges
                  {
                    node
                    {
                      id
                      nombre
                    }
                  }
                }
                estudiosSet
                {
                  edges
                  {
                    node
                    {
                      id
                      grado
                      descripcion
                      universidad
                      {
                        id
                        nombre
                      }
                    }
                  }
                }
                institucionesSet
                {
                  edges
                  {
                    node
                    {
                      id
                      nombre
                      ubicacionSet
                      {
                        edges
                        {
                          node
                          {
                            id
                          }
                        }
                      }
                    }
                  }
                }
                consultasSet
                {
                  edges
                  {
                    node
                    {
                      id
                      tipoAtencion
                      precioMinimo
                      precioMaximo
                      diaSemana
                      {
                        id
                        nombre
                      }
                      horaFin
                      horaInicio
                      ubicacion
                      {
                        id
                        institucion
                        {
                          id
                          nombre
                        }
                      }
                      prevision
                      {
                        id
                        nombre
                      }
                      modalidades
                      {
                        edges
                        {
                          node
                          {
                            id
                            nombre
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `
  )
};

const getConsultationsList = (id) => {
  return(
    gql`
    {
      ubicacion(id: "${id}")
      {
        id
        institucion
        {
          id
          nombre
        }
        consultaSet
        {
          edges
          {
            node
            {
              id
              horaInicio
              horaFin
              precioMinimo
              precioMaximo
              prevision
              {
                id
                nombre
              }
              profesional
              {
                id
                nombre
                apellido
                especialidadesSet
                {
                  edges
                  {
                    node
                    {
                      id
                      nombre
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `
  )
};

const getProfesionalConsultationsList = (id) => {
  return(
    gql`
    {
      profesional(id: "${id}")
      {
        id
        nombre
        apellido
        consultasSet
        {
          edges
          {
            node
            {
              id
              precioMinimo
              precioMaximo
              horaInicio
              horaFin
              privada
              tipoAtencion
              profesional
              {
                id
                nombre
                apellido
              }
              diaSemana
              {
                id
                nombre
              }
              ubicacion
              {
                id
              }
              prevision
              {
                id
                nombre
              }
              modalidades
              {
                edges
                {
                  node
                  {
                    id
                    nombre
                  }
                }
              }
            }
          }
        }
      }
    }
    `
  )
};

const getConsultationQuery = (id) => {
  return(
    gql`
    {
      consulta (id: "${id}")
      {
        id
        horaInicio
        horaFin
        precioMinimo
        precioMaximo
        privada
        tipoAtencion
        ubicacion
        {
          id
          institucion
          {
            id
            nombre
          }
        }
        diaSemana
        {
          id
          nombre
        }
        profesional
        {
          id
          nombre
          apellido
          fotoPerfil
          {
            url
            nombre
          }
          especialidadesSet
          {
            edges
            {
              node
              {
                nombre
                id
              }
            }
          }
        }
        prevision
        {
          id
          nombre
        }
        modalidades
        {
          edges
          {
            node
            {
              id
              nombre
            }
          }
        }
      }
    }
    `
  )
};


const getInstitutionQuery = (id) => {
  return(
    gql`
    {
      ubicacion(id: "${id}")
      {
        id
        direccion
        ciudad {
          id
          nombre
        }
        institucion
        {
          id
          nombre
          descripcion
        }
      }
    }
    `
  )
};

const getInstitutionWithInstitutionId = (id) => {
  return(
    gql`
    {
      institucion(id: "${id}")
      {
        id
        nombre
        solicitudintegrarinstitucionSet
        {
          edges
          {
            node
            {
              id
              estado
              profesional
              {
                id
                nombre
                apellido
              }
            }
          }
        }
      }
    }
    `
  )
};

const getAllInstitutionsQuery = 
  gql`
  {
    allInstituciones{
      edges {
        node {
          id
          nombre
          descripcion
          valida
        }
      }
    }
  }
  `
;

const getProfesionalProfileQuery = (id) => {
  return (
    gql`
    {
      user(id: "${id}")
      {
        id
        email
        profesional{
          id
          apellido
          nombre
          fechaNacimiento
          sexo
          valido
          tipoProfesionalSet
          {
            edges
            {
              node{
                id
                nombre
              }
            }
          }
          fotoPerfil {
            url
            nombre
          }
          estudiosSet
          {
            edges
            {
              node
              {
                descripcion
                id
                grado
                universidad {
                  id
                  nombre
                }
              }
            }
          }
          especialidadesSet
          {
            edges
            {
              node
              {
                nombre
                id
              }
            }
          }
          institucionesSet
          {
            edges
            {
              node
              {
                id
                nombre
                descripcion
              }
            }
          }
          institucionesAdministradasSet
          {
            edges
            {
              node
              {
                id
                nombre
                descripcion
              }
            }
          }
          solicitudIntegrarInstitucionSet
          {
            edges
            {
              node
              {
                id
                estado
                institucion
                {
                  id
                  nombre
                }
              }
            }
          }
        }
      }
    }
    `
    )
  };

const getUniversitiesAndSpecialtiesQuery = gql`
{
    allEspecialidades
    {
    edges
    {
        node {
        id
        nombre
        }
    }
    }
    allTiposProfesionales
    {
    edges
    {
        node {
        id
        nombre
        }
    }
    }
    allUniversidades
    {
    edges
    {
        node {
        id
        nombre
        }
    }
    }
}
`;



const registerProfesional =
  gql`
    mutation($username: String!, $password: String!, $email: String!, $nombre: String!, $apellido: String!, 
            $rut: String!, $genero: sexo!, $fechaNacimiento: String!, $estudiosSet: [EstudioInput], $tipoProfesionalesSet: [ID], 
            $especialidadesSet: [EspecialidadProfesionalInput], $archivos: [ArchivoInput], $photo: Upload)
      {
        createSolicitudNewProfesional(
          input:
          {
            archivos: $archivos
            solicitud: 
            {
              profesional: 
              {
                username: $username,
                email: $email,
                password: $password,
                nombre: $nombre,
                apellido: $apellido,
                rut: $rut,
                sexo: $genero,
                fechaNacimiento: $fechaNacimiento,
                fotoPerfil: $photo
                especialidadesSet: $especialidadesSet,
                estudiosSet: $estudiosSet,
                tipoProfesionalSet: $tipoProfesionalesSet,
              }
            }
          }
        ) 
        {
          errors
          profesional 
          {
            nombre
          }
        }
      }
  `;

  const joinInstitution =
  gql`
  mutation($institutionId: ID!, $profesionalId: ID!){
    createSolicitudJoinInstitution(input: {
      institucionId: $institutionId,
      profesionalId: $profesionalId
    }){
      solicitud {
        id
      }
      errors
      clientMutationId
    }
  }
  `; 

const newSolicitudInstitucionWithUbication = gql`
mutation($name: String!, $description: String!, $address: String!, $latitude: Float!, $longitude: Float!, $region: ID!, $city: ID!, $professional: ID!,
  $archivos: [ArchivoInput]!)
{
	createSolicitudNewInstitucion (
    input: {
      archivos: $archivos
      institucion: {
        nombre: $name,
        descripcion: $description,
        latitud: $latitude,
        longitud: $longitude,
        region: $region,
        ciudad: $city,
        direccion: $address,
        profesional: $professional,
      }
    }
  )
  {
    solicitud {
      institucion {
        id
        valida
        nombre
      }
    }
  }
}
`;

const newSolicitudInstitucionWithoutUbication = gql`
mutation($name: String!, $description: String!, $professional: ID!, $archivos: [ArchivoInput]!)
{
	createSolicitudNewInstitucion (
    input: {
      archivos: $archivos
      institucion: {
        nombre: $name,
        descripcion: $description,
        profesional: $professional,
      }
    }
  )
  {
    solicitud {
      institucion {
        id
        valida
        nombre
      }
    }
  }
}
`;

// Mi idea era obtener primero las regiones y en base a la seleccion las ciudades, pero no me funciono la query por lo que por mientras lo dejo asi
const getRegionsAndCities = gql`
{
  allRegiones {
    edges {
      node {
        nombre
        id
        ciudadSet {
          edges {
            node {
              id
              nombre
            }
          }
        }
      }
    }
  }
}`;

const getConsultationFields = (id) => {
  return(
    gql `
    { 
      ubicacion(id: "${id}")
      {
        id
        institucion
        {
          id
          miembros {
            edges {
              node {
                id
                nombre
                apellido
              }
            }
          }
        }
      }

      allDias
      {    
        edges 
        {      
          node 
          {        
            id       
            nombre      
                
          }    
        }  
      }  
      
      allPrevisiones
      {    
        edges 
        {      
          node 
          {        
            id       
            nombre      
                
          }    
        }  
      }

      allModalidades
      {    
        edges 
        {      
          node 
          {        
            id       
            nombre      
                
          }    
        }  
      }      
    }`
  ) 
};


const createConsultation = gql`
mutation ($min_price: Int, $max_price: Int, $private: Boolean, $start_hour: Time, $final_hour: Time, $day: ID!, $atencion: tipo_atencion!, $modalidades: [ID],
          $profesional: ID!, $prevision: ID!, $ubicacion: ID!)
{
  createConsulta(input:{
    consulta:{
      precioMinimo: $min_price 
      precioMaximo: $max_price
      privada: $private
      horaInicio: $start_hour
   		horaFin: $final_hour
      diaSemanaId: $day
      tipoAtencion: $atencion
      modalidadesSet: $modalidades
      previsionId: $prevision
      ubicacionId: $ubicacion
      profesionalId: $profesional
    }
  }){
    consulta{
      id
      profesional{
        nombre
      }
      ubicacion{
        direccion
        institucion{
          nombre
        }
      }
    }
  }
}
`;

const editConsultation = gql`
mutation ($min_price: Int, $max_price: Int, $private: Boolean, $start_hour: Time, $final_hour: Time, $day: ID, $atencion: tipo_atention, $modalidades: [ID],
  $prevision: ID, $ubicacionId: ID, $consultaId: ID!)
{
  editConsulta(input:
    {
    consulta:
      {
        precioMinimo: $min_price 
        precioMaximo: $max_price
        privada: $private
        horaInicio: $start_hour
        horaFin: $final_hour
        diaSemanaId: $day
        tipoAtencion: $atencion
        modalidadesSet: $modalidades
        previsionId: $prevision
        ubicacionId: $ubicacionId
        consultaId: $consultaId
      }
    }
  )
  {
    consulta
    {
      id
    }
  }
}
`;


const deleteConsultation = gql`
mutation ($profesional: ID!, $consultaId: ID!)
{
  deleteConsulta(input:{
    consultaId: $consultaId
    profesionalId: $profesional
  }){
    respuesta
  }
}
`;



const getAllMembersInstitution = (id) => {
  return(
    gql`
    {
      ubicacion(id: "${id}")
      {
        id
        institucion
        {
          id
          miembros {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
    `
  )
}


const acceptJoinRequest = gql`
mutation($requestId: ID!, $userId: ID!)
{
	acceptSolicitudJoinInstitucion (input:{
    solicitudId: $requestId
    usuarioId: $userId
  }){
    institucion
    {
      id
      nombre
    }
  }
}`;

const rejectJoinRequest = gql`
mutation($requestId: ID!, $userId: ID!)
{
	rejectSolicitudJoinInstitucion (input:{
    solicitudId: $requestId
    usuarioId: $userId
  }){
    institucion
    {
      id
      nombre
    }
  }
}`;

const getAdvancedSearchInfo = gql`
{
  allRegiones
  {
    edges
    {
      node
      {
        id
        nombre
        ciudadSet
        {
          edges
          {
            node
            {
              id
              nombre
            }
          }
        }
      }
    }
  }
  allPatologias
  {
    edges
    {
      node
      {
        id
        descripcionPacientes
        descripcionProfesionales
      }
    }
  }
  allTiposProfesionales
  {
    edges
    {
      node
      {
        id
        nombre
      }
    }
  }
  allModalidades
  {
    edges
    {
      node
      {
        id
        nombre
      }
    }
  }
  allPrevisiones
  {
    edges
    {
      node
      {
        id
        nombre
      }
    }
  }
}`;

const getGuidedSearchInfo = gql`
{
  allRegiones
  {
    edges
    {
      node
      {
        id
        nombre
        ciudadSet
        {
          edges
          {
            node
            {
              id
              nombre
            }
          }
        }
      }
    }
  }
  allEspecialidades
  {
    edges
    {
      node
      {
        id
        nombre
      }
    }
  }
  allTiposProfesionales
  {
    edges
    {
      node
      {
        id
        nombre
      }
    }
  }
  allModalidades
  {
    edges
    {
      node
      {
        id
        nombre
      }
    }
  }
  allPrevisiones
  {
    edges
    {
      node
      {
        id
        nombre
      }
    }
  }
  allPatologias {
    edges {
      node {
        id
        descripcionPacientes
      }
    }
  }
}`;

const advancedSearch = gql`
mutation(
  $regions:[ID]!,
  $cities:[ID],
  $ageRange:Int!,
  $atentionType: tipos_atencion!,
  $professionalType: [ID]!,
  $modalities: [ID]!,
  $gender: generos!,
  $maxPrice: Int!,
  $minPrice: Int!,
  $pathologies: [ID]!,
  $socialWelfare: ID!,
  $orderBy: order_by!
)
{
  advancedSearch(input:{
    orderBy: $orderBy,
    filters:{
      regiones: $regions
      ciudades: $cities
      patologias: $pathologies
      rangoEtario: $ageRange
      tipoProfesional: $professionalType
      tipoAtencion: $atentionType
      modalidades: $modalities
      precioMaximo: $maxPrice
      precioMinimo: $minPrice
      prevision: $socialWelfare
      genero: $gender
    }
  }){
    consultas
    {
      id
    }
    profesionales
    {
      id
      nombre
      apellido
      fotoPerfil
      {
        url
        nombre
      }
      especialidadesSet {
        edges
        {
          node
          {
            id
            nombre
          }
        }
      }
    }
    ubicaciones
    {
      id
    }
  }
}`;

const guidedSearch = gql`
mutation(
  $regions:[ID]!, 
  $cities:[ID],
  $ageRange:Int!,
  $atentionType: tipos!,
  $professionalType: [ID]!,
  $modalities: [ID]!,
  $gender: generes!,
  $maxPrice: Int!,
  $pathologies: [ID]!,
  $socialWelfare: ID!
){
  guidedSearch(input:{
    filters:{
      prevision: $socialWelfare
      regiones: $regions
      ciudades: $cities
      rangoEtario: $ageRange
      tipoAtencion: $atentionType
      patologias: $pathologies
      tipoProfesional: $professionalType
      modalidades: $modalities
      precioMaximo: $maxPrice
      genero: $gender
    }
  }){
    consultas{
      id
    }
    profesionales{
      id
      nombre
      apellido
      fotoPerfil
      {
        nombre
        url
      }
      especialidadesSet {
        edges {
          node {
            id
            nombre
          }
        }
      }
    }
    ubicaciones
    {
      id
    }
  }
}
`;

const registerPacient =
  gql`
    mutation($username: String!, $password: String!, $email: String!, $nombre: String!, $apellido: String!, 
            $rut: String!, $genero: genero!, $fechaNacimiento: String!, $photo: Upload)

    
      {
        createPacientUser(input:{
          paciente:{
            username: $username,
            email: $email,
            password: $password,
            nombre: $nombre,
            apellido: $apellido,
            rut: $rut,
            genero: $genero,
            fechaNacimiento: $fechaNacimiento,
            fotoPerfil: $photo
      
          }
        }){
          errors
          paciente{
            id
            nombre
          }
        }
      }
  `;


const getPacientProfileQuery = (id) => {
  return (
    gql`
      {
        user(id: "${id}")
        {
          id
          email
          paciente
          {
            id
            nombre
            apellido
            fechaNacimiento
            genero
            fotoPerfil {
              url
              nombre
            }
          }
        }
      }`
    )
  }


const allPacientes = 
  gql`
  {
    allPacients
    {
      edges
      {
        node
        {
          id
          nombre
          apellido
          email
          fechaNacimiento
          genero
          fotoPerfil
          {
            url
            nombre
          }
        }
      }
    }
  }`

const getAllProfesionals = gql`
{
  allProfesionales
  {
    edges
    {
      node{
        id
        nombre
        apellido
        fotoPerfil
        {
          url
          nombre
        }
        especialidadesSet
        {
          edges
          {
            node
            {
              id
              nombre
            }
          }
        }
      }
    }
  }
}`;


const createSolicitudHandshake =
  gql`
    mutation($pacienteId: ID!, $profesionalId: ID!, $solicitante: ID!)
    {
      createSolicitudNewHandshake(input:
        {
          pacienteId: $pacienteId
          profesionalId: $profesionalId
          solicitante: $solicitante 
        }
      ){
        solicitud
        {
          id
          profesional
          {
            nombre
          }
          paciente
          {
            nombre
          }
        }
      }
    }
  `;

const getAllHandshakePacientProfesional = (pacienteId, profesionalId, validate) => {
  return(
    gql`
    {
      allSolicitudHandshake(paciente: "${pacienteId}", profesional:"${profesionalId}") 
      {
        edges 
        {
          node 
          {
            id
            estado
            paciente 
            {
              id
              nombre
              apellido
            }
            profesional 
            {
              id
              nombre
              apellido
            }
            usuarioSolicitante 
            {
              id
              username
            }
          }
        }
      }

      allHandshakes(paciente: "${pacienteId}", profesional:"${profesionalId}" valido: ${validate}) {
        edges {
          node {
            id
          }
        }
      }
    }
    `
  )
}


const getAllHandshakePacient = (id) => {
  return(
    gql`
    {
      allSolicitudHandshake(paciente: "${id}") 
      {
        edges 
        {
          node 
          {
            id
            estado
            paciente 
            {
              id
              nombre
              apellido
              user 
              {
                id
                username
              }
            }
            profesional 
            {
              id
              nombre
              apellido
              user 
              {
                id
                username
              }
            }
            usuarioSolicitante 
            {
              id
              username
            }
            procesadoPor 
            {
              id
              username
            }
          }
        }
      }
    }
    `
  )
}


const getAllHandshakeProfesional = (id) => {
  return(
    gql`
    {
      allSolicitudHandshake(profesional: "${id}") 
      {
        edges 
        {
          node 
          {
            id
            estado
            paciente 
            {
              id
              nombre
              apellido
              user 
              {
                id
                username
              }
            }
            profesional 
            {
              id
              nombre
              apellido
              user 
              {
                id
                username
              }
            }
            usuarioSolicitante 
            {
              id
              username
            }
            procesadoPor 
            {
              id
              username
            }
          }
        }
      }
    }
    `
  )
}


const acceptSolicitudHandshake =
  gql`
    mutation($solicitudId: ID!, $solicitante: procesa!)
    {
      acceptSolicitudNewHandshake(input:
        {
          solicitudId: $solicitudId
          procesante: $solicitante
        }
      ){
        handshake
        {
          profesional
          {
            nombre
          }
          paciente
          {
            nombre
          }
        }
      }
    }
  `;

  const rejectSolicitudHandshake =
    gql`
      mutation($solicitudId: ID!, $solicitante: proc!)
      {
        rejectSolicitudNewHandshake(input:
          {
            solicitudId: $solicitudId
            procesante: $solicitante
          }
        )
        {
          solicitud
          {
            estado
          }
        }
      }
    `;

const endHandshake = 
  gql`
  mutation($handshakeId: ID!)
  {
    endHandshake(input:{
      handshakeId: $handshakeId
    }){
      errors
    }
  }`;

const profesionalHandshakes = (id) => {
  return gql`
  {
    allHandshakes(profesional: "${id}", valido: true) 
    {
      edges 
      {
        node 
        {
          id
          chat
          {
            id
          }
          paciente 
          {
            id
            nombre
            apellido
            fotoPerfil
            {
            	nombre
              url
            }
            user 
            {
              id
              username
            }
          }
          profesional 
          {
            id
            nombre
            apellido
            user 
            {
              id
              username
            }
          }
        }
      }
    }
  }
  `
};

const getAllInstitutionInfo = (id) => (gql`
{
  institucion(id: "${id}") {
    id
    nombre
    descripcion
    valida
    miembros{
      edges {
        node {
          id
          nombre
          apellido
          rut
        }
      }
    }
    administradores {
      edges{
        node{
          id
        }
      }
    }
    ubicacionSet{
      edges{
        node{
          id
          direccion
          region{
            id
            nombre
          }
          ciudad{
            id
            nombre
          }
          latitud
          longitud
        }
      }
    }
  }
}
`);

const pacientHandshakes = (id) => {
  return gql`
  {
    allHandshakes(paciente: "${id}", valido: true) 
    {
      edges 
      {
        node 
        {
          id
          chat
          {
            id
          }
          paciente 
          {
            id
            nombre
            apellido
            user 
            {
              id
              username
            }
          }
          profesional 
          {
            id
            nombre
            apellido
            fotoPerfil
            {
            	nombre
              url
            }
            user 
            {
              id
              username
            }
          }
        }
      }
    }
  }
`};          


const addUbication = gql`
mutation($address: String!, $latitude: Float!, $longitude: Float!, $region: ID!, $city: ID!, $professional: ID!, $institution: ID!)
{
  createUbicacion(
    input:{
      ubicacion:{
        direccion: $address
        latitud: $latitude
        longitud: $longitude
        regionId: $region
        ciudadId: $city
        institucionId: $institution
        profesionalId: $professional
      }
    }
  ) {
    errors
    clientMutationId
  }
}
`;

const getRequestsJoinInstitution = (id) => (gql`
query{
  allSolicitudJoinInstitucion(institucion: "${id}"){
    edges {
      node {
        id
        estado
        fechaRecepcion
        profesional{
          id
          nombre
          apellido
          rut
        }
      }
    }
  }
}
`)


const allRequerimientosArchivosSolicitud = (type) => {
  return (
    gql`
    {
      allRequerimientosArchivosSolicitud(tipoSolicitud: "${type}")
      {
        edges 
        {
          node 
          {
            id
            tipoSolicitud
            tipoArchivos 
            {
              edges 
              {
                node 
                {
                  id
                  nombre
                  descripcion
                }
              }
            }
          }
        }
      }
    }`
    )
  }

const changePassword = gql`
  mutation($oldPassword: String!, $newPassword1: String!, $newPassword2: String!)
  {
    passwordChange(input:
      {
        oldPassword: $oldPassword,
        newPassword1: $newPassword1,
        newPassword2: $newPassword2,
      }
    ){
      success
      errors
    }
  }
`;


const createSolicitudEditProfesional =
  gql`
    mutation($profesionalId: ID!, $estudiosSet: [EstudioInput], $tipoProfesionalesSet: [ID], $especialidadesSet: [EspecialidadProfesionalInput],
       $archivos: [ArchivoInput], $photo: Upload)
    {
      createSolicitudEditProfesional
      (
        input:
        {
          archivos: $archivos
          profesionalId: $profesionalId
          solicitud: 
          {
            fotoPerfil: $photo,
            especialidadesSet: $especialidadesSet,
            estudiosSet: $estudiosSet,
            tipoProfesionalSet: $tipoProfesionalesSet,    
          }
        }
      ) 
      {
        profesional 
        {
          estudiosSet 
          {
            edges 
            {
              node 
              {
                id
              }
            }
          }
          tipoProfesionalSet 
          {
            edges 
            {
              node 
              {
                id
              }
            }
          }
          especialidadesSet 
          {
            edges 
            {
              node 
              {
                id
              }
            }
          }
        }
      }
    }`;


const profesionalChats = (id) => {
  return gql`
  {
    allHandshakes(profesional: "${id}", valido: true) 
    {
      edges 
      {
        node 
        {
          id
          paciente 
          {
            id
            nombre
            apellido
            fotoPerfil
            {
              nombre
              url
            }
          }
          chat
          {
            id
            mensajes(last: 1)
            {
              edges{
                node{
                  texto
                }
              }
            }
          }
        }
      }
    }
  }
  `
};

const pacientChats = (id) => {
  return gql`
  {
    allHandshakes(paciente: "${id}", valido: true) 
    {
      edges 
      {
        node 
        {
          id
          profesional 
          {
            id
            nombre
            apellido
            fotoPerfil
            {
              nombre
              url
            }
          }
          chat
          {
            id
            mensajes(last: 1)
            {
              edges{
                node{
                  texto
                }
              }
            }
          }
        }
      }
    }
  }
`};  

const chatMessages = (id) => {
  return gql`
  {
    chat(id: "${id}")
    {
      id
      mensajes
      {
        edges
        {
          node
          {
            id
            texto
            creadoEn
            profesional
            {
              id
              user {
                id
              }
              nombre
              apellido
              fotoPerfil
              {
                url
              }
            }
            paciente
            {
              id
              user {
                id
              }
              nombre
              apellido
              fotoPerfil
              {
                url
              }
            }
          }
        }
      }
    }
  }
  `};

    
const createMessage = gql`
mutation($text: String!, $chatId: ID!, $userId: ID!)
{
  createMensaje(input: {
    texto: $text
    sesionChat: $chatId
    usuario: $userId
  }){
    errors
  }
}
`

const editInstitution = gql`
mutation($description: String!, $professional: ID!, $institution: ID!)
{
	editInstitucion(
    input:{
      institucionId: $institution
      profesionalId: $professional
      descripcion: $description 
    }
  ){
    clientMutationId
    errors
  }
}
`;

const deleteInstitution = gql`
mutation($professional: ID!, $institution: ID!)
{
	deleteInstitucion(
    input: {
      institucionId: $institution
      profesionalId: $professional
    }
  ){
    respuesta
  }
}
`;

const addInstitutionAdmin = gql`
mutation($professional: ID!, $institution: ID!)
{
  addInstitucionAdministrada(
    input:{
      profesionalId: $professional
      institucionId: $institution
    }
  ){
    errors
  }
}
`;

const unlinkInstitutionMember = gql`
mutation($professional: ID!, $institution: ID!, $admin: ID!)
{
	deleteMiembroInstitucion(
  	input:{
   		institucionId: $institution
   		profesionalId: $professional
   		usuarioId: $admin
  }){
    errors
  }
}
`

const chatMessageSubscription = gql`
subscription($chatId: ID!)
{
  mensajeChat(sesionChat: $chatId)
  {
    id
    texto
    creadoEn
    profesional
    {
      id
      user
      {
        id
      }
      nombre
      apellido
      fotoPerfil
      {
        url
      }
    }
    paciente
    {
      id
      user
      {
        id
      }
      nombre
      apellido
      fotoPerfil
      {
        url
      }
    }
  }
}
`

const leaveAdminInstitution = gql`
mutation($professional: ID!, $institution: ID!)
{
	leaveInstitucionAdministrada(
  	input:{
   		institucionId: $institution
   		profesionalId: $professional
  }){
    clientMutationId
  }
}
`;

const leaveInstitution = gql`
mutation($professional: ID!, $institution: ID!)
{
	leaveInstitucion(
  	input:{
   		institucionId: $institution
   		profesionalId: $professional
  }){
    clientMutationId
    errors
  }
}
`;

const deleteUbication = gql`
mutation($professional: ID!, $ubication: ID!)
{
	deleteUbicacion(
    input: {
      profesionalId: $professional
      ubicacionId: $ubication
    }
  ){
    respuesta
    errors
  }
}
`;

const getProfesional = (id) => (gql`
{
  profesional(id: "${id}"){
    id
    apellido
    nombre
    email
    fechaNacimiento
    sexo
    valido
    tipoProfesionalSet
    {
      edges
      {
        node{
          id
          nombre
        }
      }
    }
    fotoPerfil {
      url
      nombre
    }
    estudiosSet
    {
      edges
      {
        node
        {
          descripcion
          id
          grado
          universidad {
            id
            nombre
          }
        }
      }
    }
    especialidadesSet
    {
      edges
      {
        node
        {
          nombre
          id
        }
      }
    }
    institucionesSet
    {
      edges
      {
        node
        {
          id
          nombre
          descripcion
          ubicacionSet{
            edges{
              node{
                id
              }
            }
          }
        }
      }
    }
  }
}
`);

const getPacient = (id) => (gql`
{
  paciente(id: "${id}"){
    id
    apellido
    nombre
    email
    fechaNacimiento
    genero
    fotoPerfil {
      url
      nombre
    }
  }
}
`)

export const queries = {
  loginUsernameQuery: loginUsernameQuery,
  loginEmailQuery: loginEmailQuery,
  getAllUbicationsQuery: getAllUbicationsQuery,
  getMembersList: getMembersList,
  getConsultationsList: getConsultationsList,
  getProfesionalConsultationsList: getProfesionalConsultationsList,
  getConsultationQuery: getConsultationQuery,
  getInstitutionQuery: getInstitutionQuery,
  getInstitutionWithInstitutionId: getInstitutionWithInstitutionId,
  getAllInstitutionsQuery: getAllInstitutionsQuery,
  getProfesionalProfileQuery: getProfesionalProfileQuery,
  getUniversitiesAndSpecialtiesQuery: getUniversitiesAndSpecialtiesQuery,
  registerProfesional: registerProfesional,
  joinInstitution: joinInstitution,
  newSolicitudInstitucionWithUbication: newSolicitudInstitucionWithUbication,
  newSolicitudInstitucionWithoutUbication: newSolicitudInstitucionWithoutUbication,
  getRegionsAndCities: getRegionsAndCities,
  getConsultationFields: getConsultationFields,
  createConsultation: createConsultation,
  getAllMembersInstitution: getAllMembersInstitution,
  acceptJoinRequest: acceptJoinRequest,
  rejectJoinRequest: rejectJoinRequest,
  advancedSearch: advancedSearch,
  guidedSearch: guidedSearch,
  getAdvancedSearchInfo: getAdvancedSearchInfo,
  getGuidedSearchInfo: getGuidedSearchInfo,
  registerPacient: registerPacient,
  getPacientProfileQuery: getPacientProfileQuery,
  allPacientes: allPacientes,
  getAllProfesionals: getAllProfesionals,
  allRequerimientosArchivosSolicitud: allRequerimientosArchivosSolicitud,
  createSolicitudHandshake: createSolicitudHandshake,
  getAllHandshakePacient: getAllHandshakePacient,
  getAllHandshakeProfesional: getAllHandshakeProfesional,
  acceptSolicitudHandshake: acceptSolicitudHandshake,
  rejectSolicitudHandshake: rejectSolicitudHandshake,
  getAllHandshakePacientProfesional: getAllHandshakePacientProfesional,
  endHandshake: endHandshake,
  profesionalHandshakes: profesionalHandshakes,
  pacientHandshakes: pacientHandshakes,
  getAllInstitutionInfo: getAllInstitutionInfo,
  addUbication: addUbication,
  getRequestsJoinInstitution: getRequestsJoinInstitution,
  changePassword: changePassword,
  createSolicitudEditProfesional: createSolicitudEditProfesional,
  profesionalChats: profesionalChats,
  pacientChats: pacientChats,
  chatMessages: chatMessages,
  createMessage: createMessage,
  chatMessageSubscription: chatMessageSubscription,
  editInstitution: editInstitution,
  deleteInstitution: deleteInstitution,
  editConsultation: editConsultation,
  deleteConsultation: deleteConsultation,
  addInstitutionAdmin: addInstitutionAdmin,
  unlinkInstitutionMember: unlinkInstitutionMember,
  leaveAdminInstitution: leaveAdminInstitution,
  leaveInstitution: leaveInstitution,
  deleteUbication: deleteUbication,
  getProfesional: getProfesional,
  getPacient: getPacient,
}
