import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '../../src/core/entities/unique-entity-id'
import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification'

export function makeNotification(
  override?: Partial<NotificationProps>,
  id?: UniqueEntityID,
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityID(),
      content: faker.lorem.sentence(4),
      title: faker.lorem.sentence(10),
      ...override,
    },
    id,
  )
  return notification
}
