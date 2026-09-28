# FlowSync — Especificación de Alcance para MVP

## 1. El Problema

El trabajo distribuido se ve entorpecido por sincronizaciones constantes y consultas repetitivas sobre el estado del trabajo. Esta falta de visibilidad provoca colisiones en el código, donde más de un desarrollador interviene el mismo módulo de forma simultánea al ignorar el estado real de sus compañeros. Las herramientas actuales exigen tanta carga administrativa para actualizar una tarea que los datos terminan desactualizados de inmediato.

El propósito de este MVP es eliminar por completo la necesidad de preguntar qué hace cada quien; los problemas y bloqueos se seguirán abordando en los espacios de conversación habituales.

## 2. Segmentación de Usuarios

- **Células de trabajo:** Equipos de ingeniería o producto pequeños y deslocalizados geográficamente, donde no existen barreras de acceso ni jerarquías de permisos.
- **Escenario de referencia:** Grupo reducido de desarrollo SaaS que busca agilizar la coordinación matutina y prescindir de plataformas complejas.
- **Beneficiario principal:** Los integrantes del equipo en su día a día. Al momento de iniciar un entregable, cualquier miembro confirma de un vistazo la disponibilidad sin enviar mensajes privados.
- **Premisa de plataforma:** Todos los colaboradores interactúan sobre un único entorno común predeterminado.

## 3. Propuesta de Valor

Un tablero sincrónico ultraligero que expone al instante la actividad del equipo sin requerir actualización manual de la página. Registrar o mover un ítem toma apenas un par de segundos. Mantener el tablero al día beneficia a quien lo utiliza: sirve como lista personal de pendientes y detiene el flujo constante de interrupciones directas.

- **Criterio de validación a siete días:** Supresión completa del bloque de reporte de estado en la reunión diaria.
- **Riesgo crítico:** Pérdida de vigencia de la información. Se contrarresta garantizando que cualquier cambio tome máximo dos clics.

## 4. Alcance (Capacidades a Construir)

1. **Tablero compartido en vivo:** Reflejo automático e inmediato de cambios para los usuarios con el panel abierto.
2. **Estructura mínima de tarea:** Alta y edición acotada estrictamente a cuatro atributos: Título, Asignado, Estado y Fecha de entrega.
3. **Filtro rápido:** Selección por estado para aislar pendientes y mantener la atención en lo importante.
4. **Espacio colaborativo único:** Entorno global compartido por todos los usuarios autenticados sin roles administrativos.

## 5. Exclusiones Definitivas (NO-Alcance)

- **Alertas por correo o notificaciones push:**
  *Motivo:* Interrumpen el flujo de trabajo. El sistema está pensado para una lectura pasiva cuando el usuario decide consultar la lista.
- **Conectores y sincronizaciones con plataformas externas:**
  *Motivo:* Agregan complejidad de autenticación por tokens y duplicación de datos. El objetivo es sustituir el gestor pesado actual, no convivir ni enlazarse con él.
- **Indicadores de actividad o presencia de usuarios:**
  *Motivo:* Modifica el propósito hacia la fiscalización del personal. Lo vital es la frescura del estado de la tarea, no controlar si la persona está conectada.
- **Metodologías ágiles avanzadas (Sprints, estimaciones, épicas, puntos de historia):**
  *Motivo:* Generan la burocracia que se busca eliminar, desincentivando la actualización inmediata.
- **Hilos de discusión y comentarios en tareas:**
  *Motivo:* Duplica los canales de comunicación existentes y satura la interfaz básica.
- **Múltiples proyectos o permisos por roles:**
  *Motivo:* Excede la necesidad del caso de uso enfocado en equipos planos.

---

## Parte B — Las tres líneas

1. **Métricas de selección:** 12 capacidades sugeridas originalmente por la IA frente a 4 componentes aprobados en la versión final.
2. **Tres descartes y su justificación de producto:**
   - **Comentarios internos:** No valida si la visibilidad del tablero elimina el reporte en la reunión diaria; convierte la tarea en otro canal de chat.
   - **Automatización vía repositorios o herramientas externas:** No ayuda a validar el hábito de actualización manual en 2 clics; añade complejidad técnica antes de comprobar el valor.
   - **Indicadores de actividad de usuarios:** No aporta a la vigencia del trabajo; deriva en vigilancia sobre las personas.
3. **Punto de mayor incertidumbre:** **Tener o no un historial de cambios.** Existe una contradicción entre mantener la máxima simplicidad y responder a la necesidad de saber qué cambió tras ausentarse. Si al probar se pierde el contexto del día, esta función deberá incluirse.

> **Observación de coherencia (marcada por la IA):** Prometer visibilidad instantánea al volver de una reunión entraba en conflicto con prohibir el registro de fechas de cambio o historial de actividad.
