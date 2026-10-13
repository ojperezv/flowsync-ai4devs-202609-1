# Registro de Prompts — Trazabilidad: Responsable de la tarea

- **Herramienta:** GitHub Copilot (Eclipse - Chat)
- **Modelo:** Claude 3.5 Sonnet
- **Pega el prompt tal cual lo lanzaste:**
  > `Inspecciona los tests existentes en backend/tests/functional/tasks/ para verificar la cobertura del requisito "Lo que cada tarea muestra de su responsable" en openspec/specs/tasks/spec.md. Evalúa los 3 escenarios del requisito (Responsable identificable, La tarea no filtra datos de cuenta, Responsable sin nombre). Indica para cada escenario la función o bloque de prueba, el estado (Cubierto, No cubierto o No lo sé) y las aserciones internas.`
- **Lo que no funcionó / Hallazgos:**
  *El agente identificó que en la carpeta de pruebas de tareas solo existían archivos de referencia sobre autenticación y login, dejando los 3 escenarios del responsable de la tarea en estado No cubierto por falta de pruebas funcionales en ese módulo.*

---

- **Herramienta:** GitHub Copilot (Eclipse - Chat)
- **Modelo:** Claude 3.5 Sonnet
- **Pega el prompt tal cual lo lanzaste:**
  > `Escribe únicamente el código en TypeScript para el archivo backend/tests/functional/tasks/assignee.spec.ts usando AdonisJS y Japa (@japa/runner). Usa como base los patrones de auth (test.group, testUtils y login). Crea los tests para estos 3 escenarios del requisito "Lo que cada tarea muestra de su responsable": 1. Muestra nombre e iniciales bien calculadas del responsable. 2. No expone email ni clave (probando GET /api/v1/tasks/:id y GET /api/v1/tasks). 3. Si la cuenta no tiene nombre, el nombre llega nulo e iniciales presentes. Agrega ?today=2026-08-13 a las peticiones GET. Muestra solo el código en la respuesta del chat sin ejecutar comandos en la terminal.`
- **Lo que no funcionó / Hallazgos del código:**
  *Se descubrió que la clave foránea en la base de datos es `assigneeId` (no `userId`), que cuando una cuenta no tiene nombre las iniciales se derivan del email, y que la lista de tareas en backend tiene una falla de privacidad real al usar `UserTransformer` que expone el email en `GET /api/v1/tasks`.*
