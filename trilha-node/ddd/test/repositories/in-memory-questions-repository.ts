import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '../../src/core/repositories/pagination-params'
import { QuestionsRepository } from '../../src/domain/forum/application/repositories/questions-repository'
import { Question } from '../../src/domain/forum/enterprise/entities/question'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  constructor(
    private readonly questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  items: Question[] = []

  async create(question: Question) {
    this.items.push(question)
    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const item = this.items.find((item) => item.slug.value === slug)
    if (!item) return null
    return item
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id)
    if (!question) return null
    return question
  }

  async delete(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((items) => items.id !== question.id)
    this.items.splice(itemIndex, 1)
    this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    )
  }

  async save(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((items) => items.id !== question.id)
    this.items[itemIndex] = question
    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }
}
