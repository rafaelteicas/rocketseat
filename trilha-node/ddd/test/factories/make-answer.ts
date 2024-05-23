import { UniqueEntityID } from '../../src/core/entities/unique-entity-id'
import {
  Answer,
  AnswerProps,
} from '../../src/domain/forum/enterprise/entities/answer'
import { faker } from '@faker-js/faker'
export function makeAnswer(
  override?: Partial<AnswerProps>,
  id?: UniqueEntityID,
) {
  const question = Answer.create(
    {
      questionId: new UniqueEntityID('1'),
      authorId: new UniqueEntityID('1'),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )
  return question
}
