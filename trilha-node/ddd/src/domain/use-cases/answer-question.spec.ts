import { describe, expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'

const fakeAnswersRepository: AnswersRepository = {
  async create(data) {
    return
  }
}

describe('Answer Question UseCase', () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)
  test('create an answer', async () => {
   const answer = await answerQuestion.execute({
      content: 'Nova resposta',
      instructorId: '123',
      questionId: '123',
    })
    expect(answer).toEqual('Nova resposta')
  })
})