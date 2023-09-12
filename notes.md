# GraphQL

    - Es un lenguaje de consulta
    - Creado por Facebook
    - Centraliza queries en un "solo endpoint" y desde ahí se gestiona la info 
    - Cuenta con una flexibilidad

## Algunas Empresas que utilizan GraphQL

    * Airbnb, Shopify, Pinterest, PayPal, Github...

    ** Github tiene un API disponible que utiliza el protocolo de GraphQL
    ** Drift contaba con muchas APIs que gracias a GraphQL se pudo mejorar la colaboración e integración


# Clase 3 (Analizando proyecto de API REST tradicional con Express.js [Node.JS])

- Se vio como estaba el proyecto tradicional de API construido con Node.js (Express.js) con autenticación con JWT y un ORM

# Clase 4 (Implementando servicio básico de [GraphQL])

- Implementar GraphQL en el proyecto
    - npm i graphql apollo-server-express
        - apollo-server-express nos ayuda a exponer nuestro servicio de graphql

    * se utiliza mejor la dependencia `npm i @apollo/server`, porque es la nueva versión

- Se configura un servidor GraphQL básico para introducción con herramienta
    * Se hizo una consulta de prueba tipo "hola mundo"
- Código de branch (clase-4)

# Clase 5 (Utilizando herramientas para probar servicio GraphQL [Postman] [Insomnia])

    - Utilizando insomnia o postman para consumir servicio básico de GraphQL
    - Las peticiones siempre deben ser tipo POST

# Clase 6 (Sistema de Tipado de GraphQL, contrato con args)

    - Gracias al sistema de tipado genera un acuerdo para simplificar errores
    
        - EN API REST:
            - POST - CREATE
            - GET - GET DATA
            - PUT - UPDATE
            - DELETE - DELETE DATA
        
        - EN GRAPHQL:
            - POST. Todo es por POST
                - Todo retorna 200 aún así sea error

    - En GraphQL existen 2 palabras reservadas.
        Query. Obtiene Data
        Mutation. Modificación data   
        
        Query = GET
        Mutation = POST; PUT; DELETE
        Suscription = Tiempo-Real (Tipo Websocket)
    
        type Query {
            hello: String // En este contrato, el query hello va a devolver siempre un String
        }
    
    - Normalmente se utiliza camel case

    - Cuando tenemos un contrato donde no se cumpla correctamente, graphQL tratará de devolver el dato esperado y de no ser posible la respuesta será con detalle del error

    - Se puede utilizar parámetros en los contratos
        # contrato getPerson con argumentos/parámetros 
        type Query: {
            getPerson(name: String, age: Int): String
        }

        # resolver
        Query: {
            getPerson: (_, args) => `Hi, my name is ${args.name}, my age is ${args.age}`
        }
        
        * la variable args, contiene los argumentos/parámetros utilizados

# Clase 7 (Sistema de Tipado, tipos de datos básicos [Basic Scalar Types])

    - Existen

        Básicos:
            * Int
            * Float
            * String
            * Boolean
            * ID (Representa un identificador único)
                - Se puede utilizar como sistema de caché
                - Es tratado como String

# Clase 8 (Sistema de Tipado, tipos de datos [Scalar Types: non-null, list])

    - Aunque tenga un dato fijo de respuesta, se permite retornar null

    - Para no permitir este tipo de respuesta y asegurar se utiliza !
        hello: String!

    - Para retornar una lista
        - Se utiliza [] (Corchetes)
            Listas con un dato fijo
                Lista de String = [String]
                Lista de Int = [Int]
                Lista de Int sin nulos = [Int!]
    
    -  Playground con listas

        type Query: {
             getNums(numbers: [Int!]!): [Int]
        }

        * No se permiten valores nulos dentro de la lista ni que la lista entera sea un nulo

# Clase 9 (Manejo de Object Types [Datos Custom])

    - Un tipo de dato custom, te permite hacer una representación de algo

        type Item {
            id: ID!
            name: String!
        }

    - Al utilizar el query con un Object, en el Query se debe definir que campos necesitan del Objeto

# Clase 10 (Archivos con extensión .graphql .gql)

    - Ayuda a separar esquema de graphql en archivos .graphql o .gql para dejar ahí esa responsabilidad
    - Se instala dependencia @graphql-tools/load-files para poder implementar los archivos
    - Se instaló extensión en vscode
    - Se creo archivo nodemon.json para que el hot-reload pueda recargar también cuando se modifican archivos con extensión 
        (.graphql o .gql) 

# Clase 11 (Separación de resolvers)

    - Separar por responsabilidad única a los resolvers, funciones que "resuelven" nuestros queries definidos en nuestro esquema
    - Se crea archivo resolvers.js, una especia de index de nuestros resolvers
    - Se crea archivo products.resolvers.js que contiene lo resolvers especificamente de Product

# Clase 12 (Conectando el resolver de Product con BD)
    
    - Nos guíamos por el archivo router (products.router.js)
        * Tomamos el service y lo implementamos en el product.resolver.js

# Clase 13 (Uso de Mutations e Inputs)

    - Mutations. Define modificaciones 
        type Mutation {

        }

    - Input. Permite agrupar varios argumentos, como un DTO

        input ItemInput {
            name: String!
            description: String!
        }

    - Ejemplo

        type Mutation {
            addItem(item: ItemInput!): Item
        }

        input ItemInput {
            name: String!
            description: String!
        }

    - Se crea resolver (product.resolvers.js)
    - Se añade Mutation resolver (resolvers.js)

# Clase 14 (Variables & Alias)
    
    - Útil para cuando se consume el servicio de graphql

    - Alias, pueden aplicar para renombrar el nombre del retorno al consumir

        {
            myProducst: products {
                id
                name
                description
            }
        }

    - Múltiples consultas

        ✅
        query {
            products {
                name
                description
            }
            product(id: "1") {
                id
                name
            }
        }

        ❌ (Se repite nombre product, por eso es inválido)
        query {
            products {
                name
                description
            }
            product(id: "1") {
                id
                name
            }
            product(id: "1") {
                id
                name
            }
        }

        ✅ (Usamos alias para corregir)
        query {
            products {
                name
                description
            }
            p1: product(id: "1") {
                id
                name
            }
            p2: product(id: "1") {
                id
                name
            }
        }
    
    - Uso de variables en clientes

    mutation createItem($dto: CreateItemDto!) {
        newItem: addItem(dto: $dto) {
            id,
            name,
            description
        }
    }

    mutation($dto: CreateItemDto!) {
        addItem(dto: $dto) {
            name
            description
        }
    }

# Clase 15 (Update & Delete)
    
    - Agregar nueva mutation (schema.graphql)
    - Agregar resolver (product.resolvers.js)

        * Los resolvers pueden "resolver" un promise

    - Agregar nuevos resolver al index resolver (resolvers.js)

# Clase 16 (Anidamiento)
    - Capacidad de relacionar entidades con otras (Ejemplo con producto y categoria)

    - Nuevo type de Category (schema.graphql)
    - Añadir type en Product (schema.graphql)

    ** Si el servicio resuelve joins, graphql tomará esa lógica y podrá exponer la información **

# Clase 17 (Login con Graphql) 

    - Basado en el servicio de autenticación (auth.service.js)
        * Se utiliza passport como middleware para autorizar usuarios
    
    - Instalar librería para graphql pueda utilizar un contexto que use passport
    `npm i graphql-passport`

    - Implementamos una nueva "strategy" para graphql (local-graphql.strategy.js)
    

# Clase 18 (Agregar mutation para agregar categorias sin validación)

    - Agregar mutation (Schema.graphql)
    - A gregar resolver (category.revolvers.js)
    - Agregar resolver en index (resolvers.js)

# Clase 19 (Agregar mutation con validación de JWT)
    - Utilizar el contexto de passport para GraphQL (category.resolvers.js)

# Clase 20 (Agregar validación roles en mutation de categorias)
    - Reutilizar el middleware de auth (auth.handler.js)
    - Crear archivo check-rolesGQL.js
    - Implementar función checkRolesGQL para graphQL
    - Refactorizar la validación de JWT para múltiple implementación

    * Chechar graphQL shield (Librería enfocada para validaciones)

# Clase 21 (Validando datos con Scalars)

    - Librería GraphQL Scalars, extiende el sistema de tipos de datos de GraphQL
    - Implementar librería typeDefs, resolvers en (graphql/index.js)
    - Utilizar el type RegularExpression para hacer validaciones custom basadas en regex (resolvers.js)
        const CategoryNameType = new RegularExpression('CategoryNameType', /^[a-zA-Z0-9]{3,8}$/)

    - Agregar scalar (schema.graphql)
        scalar CategoryNameType

# Clase 22 (Anidamiento dinámico)
    - Implementar Query para obtener una categoria por ID con sus productos

        * si visualizamos la función findOne, gracias a sequeliza (ORM) poder obtener los productos de la categoría
            (es decir, se encarga del JOIN)

    - Si quitamos el JOIN graphql pierde ese funcionamiento

        - Utilizar un mecanismo de este tipo podría realentizar la consulta 
            * Se pueden utilizar sistemas de tracking para conocer que consultas son las más costosas

    - GraphQL tiene un mecanismo para este tipo de escenarios

        - Comentamos el JOIN del findOne de category
        - Se agrega un nuevo objeto que tenga el mismo nombre en los resolvers (resolvers.js)

        - En este caso es Category que contiene la propiedad products
        Category: {
            products: () => []
        }

        - De esta manera estamos solo ejecutando el resolver de products cuando en graphql sea solicitado

        - Se crea resolver getProductsByCategory (product.resolvers.js)
            * Vamos a utilizar el primer parámetro que es el contexto para poder acceder a la información que ya se tenía del objeto padre
        
        - Crear query getByCategory dentro del servicio de producto (product.service.js) 

        - Utilizamos nuevo query del servicio (product.resolvers.js)

    - Se logra un anidamiento dinámico más efectivo para que graphQL solo lo ejecute en caso de ser necesario


# Clase 23 (Resumen de curso)

GraphQL
    - Permite solo consumir las propiedades que necesites de los datos consumidos (El cliente decide)
    - Permite solo consumir datos necesarios (separar payloads para consumir menos, más ágil)
    - Permite múltiples solicitudes (Query) en un solo request del cliente
    - Puede facilitar la independencia de equipos 

Rest API   
    - Normalmente consumes todas las propiedades que el servicio este arrojando
    - Si existen relaciones en los datos dentro del servicio REST, también será arrojada (puede ser más tardado)
    - Necesitas múltiples request para obtener información de varios endpoints
    - A veces dependiendo la aplicación es necesario que un equipo libere un servicio para poder continuar


       
