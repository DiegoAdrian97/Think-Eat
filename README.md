# Think&Eat

Contale a la app qué tenés en la heladera y te da **5 ideas de almuerzos y cenas** caseras argentinas, con la receta explicada paso a paso. No hace falta usar todos los ingredientes. Si no te convence ninguna, **"Mostrar más alternativas"** te trae otras 5.

- **Frontend:** React + MUI (Vite), animaciones con Framer Motion
- **Backend:** Node + Express + Sequelize
- **Base de datos:** Supabase (PostgreSQL)
- **Deploy:** Vercel (frontend y backend)

## Qué hace

- **Carga rápida en texto libre:** escribís `2 papas medianas`, `medio kilo de carne picada` o `una docena de huevos` y la app entiende el ingrediente, la cantidad, la unidad y el tamaño.
- **Dropdown con buscador** agrupado por categoría. Ignora acentos y plurales y también busca por sinónimos (`zuquini`, `maicena`, `bife de chorizo`…).
- **Ingredientes nuevos:** si algo no está en la lista, lo agregás desde el mismo buscador y queda guardado en la base para la próxima.
- **Unidad, cantidad y tamaño:** unidad, docena, diente, atado, g, kg, ml, l, taza, cucharada, etc. El tamaño (chico, mediano o grande) aparece solo en los ingredientes que lo tienen.
- **Sugerencias inteligentes:** ordena las recetas según cuánto aprovechan tu heladera. Le da menos peso a los condimentos, da por hecho que tenés sal, pimienta y aceite y avisa si la cantidad no alcanza ("te alcanza para unas 2 porciones").
- **Receta completa:** ingredientes marcados según si los tenés o te faltan, pasos con tiempos que podés tocar para marcarlos como hechos y un consejo por receta.
- **Imágenes:** cada ingrediente y receta busca su foto en Wikipedia/Wikimedia (imágenes libres) y la guarda en la base. Mientras carga, o si no la encuentra, muestra un emoji.
- Tu heladera queda guardada en el navegador. Al sacar un ingrediente o vaciar la heladera tenés la opción de **Deshacer**.

La base trae **55 recetas** (solo almuerzos y cenas), **86 ingredientes** y **250 pasos**.

---

## Puesta en marcha

### 1. Base de datos (Supabase)

1. En tu proyecto de Supabase andá a **SQL Editor → New query**.
2. Pegá el contenido de `database/01_tablas.sql` y tocá **Run**.
3. Hacé lo mismo con `database/02_datos.sql`. Al final te muestra cuántas recetas e ingredientes se cargaron.
4. Copiá la cadena de conexión: botón **Connect** (arriba en el panel) → **Transaction pooler** (puerto `6543`). Reemplazá `[YOUR-PASSWORD]` por la contraseña de la base. Si no la recordás, se resetea en *Project Settings → Database*. Si tiene símbolos como `@`, `#` o `/`, cambiala por una sin símbolos.

> `02_datos.sql` se puede volver a correr sin problema: borra y recarga los datos base, pero **conserva los ingredientes que agregaste desde la app**.
>
> Las tablas tienen activada la seguridad por filas (RLS) sin políticas. Eso bloquea la API pública de Supabase, pero no afecta al backend, que se conecta como dueño de las tablas.
>
> En el plan gratis, Supabase pausa el proyecto después de una semana sin actividad. Los datos se conservan y se reactiva desde el panel.

### 2. Backend

```bash
cd backend
npm install
copy .env.example .env     # en Windows (en Mac/Linux: cp)
```

En `backend/.env` completá `DATABASE_URL` con la cadena de conexión de Supabase:

```ini
DATABASE_URL=postgresql://postgres.xxxx:TU-CONTRASEÑA@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
```

```bash
npm run dev
```

Si ves `Conectado a Supabase.`, está todo bien. Podés probarlo en http://localhost:3001/api/salud

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Abrí http://localhost:5173

### Atajo: todo junto

Desde la raíz del proyecto:

```bash
npm run instalar   # instala todo (una sola vez)
npm run dev        # levanta backend y frontend juntos
```

### Imágenes (opcional)

Las fotos se buscan solas la primera vez que aparece cada ingrediente o receta. Si preferís cargarlas todas de una vez:

```bash
cd backend
npm run imagenes
```

Si alguna foto no te gusta, cambiá el campo `ImagenUrl` de esa fila en Supabase (*Table Editor*) por la URL que quieras.

## Deploy en Vercel

Se crean **dos proyectos en Vercel** a partir del mismo repositorio de GitHub: uno para la API y otro para la web.

### Backend (API)

1. En [vercel.com/new](https://vercel.com/new) importá el repo `Think-Eat`.
2. En **Root Directory** elegí `backend`. Vercel detecta Express solo.
3. En **Environment Variables** cargá:
   - `DATABASE_URL`: la de Supabase (Transaction pooler).
   - `FRONTEND_URL`: por ahora `*`. Cuando tengas la URL del frontend, cambiala por esa.
4. **Deploy.** Probalo entrando a `https://TU-API.vercel.app/api/salud`: tiene que responder `{"ok":true}`.

### Frontend (web)

1. Importá **otra vez** el mismo repo como un proyecto nuevo.
2. En **Root Directory** elegí `frontend`. Vercel detecta Vite solo.
3. En **Environment Variables** cargá `VITE_API_URL` = `https://TU-API.vercel.app/api`.
4. **Deploy.**
5. Volvé al proyecto del backend y cambiá `FRONTEND_URL` por la URL del frontend (por ejemplo `https://think-eat.vercel.app`). Después hacé **Redeploy**.

> Si cambiás una variable de entorno en Vercel, hay que hacer *Redeploy* para que la tome. En el frontend esto es obligatorio, porque `VITE_API_URL` se lee al compilar.

---

## Estructura

```
Think-Eat/
├── database/
│   ├── 01_tablas.sql            Tablas
│   ├── 02_datos.sql             Datos (generado)
│   └── generador/
│       ├── datos.js             Fuente de las recetas e ingredientes
│       └── generar.js           Genera 02_datos.sql
├── backend/
│   ├── src/
│   │   ├── config/db.js         Conexión Sequelize a Supabase
│   │   ├── models/index.js      Modelos y relaciones
│   │   ├── routes/              Endpoints
│   │   └── services/
│   │       ├── sugerencias.js   Motor de sugerencias
│   │       ├── conversion.js    Unidades y tamaños
│   │       └── imagenes.js      Búsqueda de fotos en Wikipedia
│   └── scripts/resolver-imagenes.js
└── frontend/
    └── src/
        ├── App.jsx
        ├── theme.js             Paleta y tipografía
        ├── components/          Heladera, buscador, tarjetas, receta…
        ├── hooks/               Catálogo y heladera
        └── utils/interpretar.js Entiende "2 papas medianas"
```

## Sumar recetas

1. Agregá la receta en `database/generador/datos.js`, siguiendo el formato de las demás.
2. Desde la raíz, corré `npm run datos`: valida todo (ingredientes, unidades, tamaños) y regenera `database/02_datos.sql`.
3. Ejecutá `02_datos.sql` en el SQL Editor de Supabase.

## API

| Método | Ruta | Para qué |
|---|---|---|
| GET | `/api/ingredientes` | Lista de ingredientes con categoría y unidad habitual |
| POST | `/api/ingredientes` | Crea un ingrediente nuevo `{ nombre, categoriaId, unidadDefaultId, tieneTamanio?, pesoUnidadGr? }` |
| GET | `/api/unidades` | Unidades de medida |
| GET | `/api/categorias` | Categorías de ingredientes |
| POST | `/api/sugerencias` | `{ items: [{ ingredienteId, cantidad, unidadId, tamanio }], excluir: [ids] }` → 5 recetas |
| GET | `/api/recetas/:id` | Receta completa con ingredientes y pasos |
| GET | `/api/imagenes/:tipo/:id` | URL de la foto (`tipo`: `ingrediente` o `receta`) |
| GET | `/api/salud` | Estado de la conexión a la base |

### Cómo se eligen las sugerencias

Para cada receta se separan los ingredientes **principales** de los **opcionales**. Los **básicos** (sal, pimienta y aceite) no se cuentan.

- Una receta entra en la lista si tenés al menos un ingrediente principal que no sea un condimento.
- La **compatibilidad** (0 a 100 %) sale en un 85 % de cuántos principales tenés y en un 15 % de si te alcanzan las cantidades. Los condimentos pesan menos, para que te falte el comino no hunda una receta.
- Para comparar cantidades, todo se pasa a gramos: una papa mediana ≈ 170 g, una grande ≈ 240 g, una docena de huevos ≈ 600 g, etc.
- "Mostrar más alternativas" manda los IDs ya vistos en `excluir` y trae las 5 siguientes.
