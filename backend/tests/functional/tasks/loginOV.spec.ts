import User from '#models/user'
import Task from '#models/task'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Responsable de la tarea. Cubre los tres scenarios del requisito «Lo que cada
 * tarea muestra de su responsable» de `openspec/specs/tasks/spec.md`: el
 * responsable identificable, la tarea que no filtra datos de cuenta y el
 * responsable sin nombre.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  const HOY = '2026-08-13'

  async function sesionYTarea(client: any, fullName: string | null) {
    const email = 'ada@example.com'
    const user = await User.create({ fullName, email, password: 'secreto123' })

    const task = await Task.create({
      title: 'Revisar el informe',
      status: 'pending',
      assigneeId: user.id,
    })

    const response = await client.post('/api/v1/auth/login').json({ email, password: 'secreto123' })

    return { task, token: response.body().data.token as string }
  }

  test('el responsable llega con su nombre y sus iniciales', async ({ client, assert }) => {
    const { task, token } = await sesionYTarea(client, 'Ada Lovelace')

    const response = await client
      .get(`/api/v1/tasks/${task.id}?today=${HOY}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const assignee = response.body().data.assignee
    assert.equal(assignee.fullName, 'Ada Lovelace')
    assert.equal(assignee.initials, 'AL')
  })

  test('ni la tarea suelta ni la lista traen el email ni credenciales', async ({
    client,
    assert,
  }) => {
    const { task, token } = await sesionYTarea(client, 'Ada Lovelace')

    const suelta = await client
      .get(`/api/v1/tasks/${task.id}?today=${HOY}`)
      .header('Authorization', `Bearer ${token}`)

    suelta.assertStatus(200)

    const lista = await client
      .get(`/api/v1/tasks?today=${HOY}`)
      .header('Authorization', `Bearer ${token}`)

    lista.assertStatus(200)
    assert.lengthOf(lista.body().data, 1)

    const responsables = [suelta.body().data.assignee, lista.body().data[0].assignee]

    for (const assignee of responsables) {
      assert.notProperty(assignee, 'email')
      assert.notProperty(assignee, 'password')
      assert.notProperty(assignee, 'passwordHash')
      assert.notInclude(JSON.stringify(assignee), 'ada@example.com')
    }
  })

  test('un responsable sin nombre llega con nombre nulo pero con iniciales', async ({
    client,
    assert,
  }) => {
    const { task, token } = await sesionYTarea(client, null)

    const response = await client
      .get(`/api/v1/tasks/${task.id}?today=${HOY}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const assignee = response.body().data.assignee
    assert.isNull(assignee.fullName)
    assert.equal(assignee.initials, 'AE')
    assert.notProperty(assignee, 'email')
  })
})
