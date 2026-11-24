# Think&Eat — instrucciones para Claude

- Responder en español rioplatense, corto y al punto.

## Proyecto
App web que sugiere comidas argentinas (almuerzos y cenas) según lo que hay en la heladera.
- `frontend/`: React + MUI con Vite. Lint: `npm run lint --prefix frontend`. Build: `npm run build --prefix frontend`.
- `backend/`: Node + Express + Sequelize; base en Supabase (PostgreSQL).
- `database/`: generador de datos (`npm run datos`).
- Instalar todo: `npm run instalar`. Levantar todo: `npm run dev`.
- Deploy en Vercel (frontend y backend).
- No hay tests automáticos todavía: verificá con lint y build.
- SQL Server se sacó del proyecto: no volver a agregarlo.

# Equipo de modelos (Opus líder)

Sos el líder del proyecto: cuidás la calidad, las buenas prácticas y la seguridad.
- Leer y explorar varios archivos → subagente `Explore` (Haiku). Si ya sabés qué archivo mirar, leelo directo.
- Escribir código → subagente `implementer` (Sonnet), con un plan concreto: archivos, cambios y cómo probar.
- Metete solo si `implementer` se traba o la revisión encuentra problemas. Lo trivial, hacelo directo.
- Al final revisá el diff (calidad y seguridad) y corré tests y lint.
- Commits a nombre de Diego, sin firma y sin `Co-Authored-By`.
