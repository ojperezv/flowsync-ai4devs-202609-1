import User from '#models/user'
import Task from '#models/task'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Responsable de la tarea. Cubre el requisito «Lo que cada tarea muestra de su responsable»
 * de `openspec/specs/tasks/spec.md`.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  async function prepararSesionYTarea(fullName: string | null = 'Óscar Vardi') {
    const user = await User.create({
      fullName,
      email: 'oscar.test@example.com',
      password: 'secreto123',
    })

    const task = await Task.create({
      title: 'Auditar componentes de interfaz',
      userId: user.id,
      status: 'pending',
    })

    return { user, task }
  }

  test('la tarea muestra el nombre completo y las iniciales exactas del responsable', async ({
    client,
    assert,
  }) => {
    const { task } = await prepararSesionYTarea('Ada Lovelace')

    const loginRes = await client
      .post('/api/v1/auth/login')
      .json({ email: 'oscar.test@example.com', password: 'secreto123' })

    const token = loginRes.body().data.token

    const response = await client
      .get(`/api/v1/tasks/${task.id}?today=2026-08-13`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const assignee = response.body().data?.assignee
    assert.equal(assignee.fullName, 'Ada Lovelace')
    assert.equal(assignee.initials, 'AL')
  })

  test('la consulta de tarea y la lista no filtran email ni credenciales de acceso', async ({
    client,
    assert,
  }) => {
    const { task } = await prepararSesionYTarea()

    const loginRes = await client
      .post('/api/v1/auth/login')
      .json({ email: 'oscar.test@example.com', password: 'secreto123' })

    const token = loginRes.body().data.token

    // Test en consulta individual
    const singleRes = await client
      .get(`/api/v1/tasks/${task.id}?today=2026-08-13`)
      .header('Authorization', `Bearer ${token}`)

    singleRes.assertStatus(200)
    const singleAssignee = singleRes.body().data?.assignee
    assert.notProperty(singleAssignee, 'email')
    assert.notProperty(singleAssignee, 'password')

    // Test en lista compartida
    const listRes = await client
      .get('/api/v1/tasks')
      .header('Authorization', `Bearer ${token}`)

    listRes.assertStatus(200)
    const listTasks = listRes.body().data
    if (listTasks && listTasks.length > 0) {
      assert.notProperty(listTasks[0].assignee, 'email')
    }
  })

  test('responsable sin nombre devuelve nombre nulo manteniendo iniciales', async ({
    client,
    assert,
  }) => {
    const { task } = await prepararSesionYTarea(null)

    const loginRes = await client
      .post('/api/v1/auth/login')
      .json({ email: 'oscar.test@example.com', password: 'secreto123' })

    const token = loginRes.body().data.token

    const response = await client
      .get(`/api/v1/tasks/${task.id}?today=2026-08-13`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const assignee = response.body().data?.assignee
    assert.isNull(assignee.fullName)
    assert.exists(assignee.initials)
    assert.notProperty(assignee, 'email')
  })
})
