Scenarios en el requisito: 3 · Cubiertos: 0

| Scenario | Test que lo cubre | Estado | Qué te faltó |
| :--- | :--- | :--- | :--- |
| Responsable identificable: la tarea incluye el nombre y las iniciales del responsable | la tarea muestra el nombre completo y las iniciales exactas del responsable | No cubierto | — |
| La tarea no filtra datos de cuenta: no incluye email ni datos de acceso en el assignee | la consulta de tarea y la lista no filtran email ni credenciales de acceso | No cubierto | El test falla en la lista (`GET /api/v1/tasks`) porque el backend utiliza `UserTransformer`, exponiendo indebidamente el email del responsable |
| Responsable sin nombre: la tarea muestra nombre nulo e iniciales presentes para cuentas sin nombre | responsable sin nombre devuelve nombre nulo manteniendo iniciales | No cubierto | — |

---

## Parte B: Reflexión

1. Creía cubiertos 2 scenarios de 3 antes de mirar; realmente estaban cubiertos 0.
2. En el escenario del responsable sin nombre no supe si faltaba un test o la regla en la spec porque la especificación señala que las iniciales "siguen llegando", pero no definía que ante la ausencia del nombre las iniciales debían calcularse a partir de las letras del correo electrónico.
3. Al escribir el test de la privacidad del responsable, tuve que decidir explícitamente usar el identificador dinámico generado por la base de datos (`task.id`) en lugar de fijar una ruta `/tasks/1`, y verificar la ausencia del correo tanto en el detalle como en el listado compartido.
