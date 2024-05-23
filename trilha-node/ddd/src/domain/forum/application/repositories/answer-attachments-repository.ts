import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export interface AnswerAttachmentsRepository {
  findManyRecentByAnswerId(questionId: string): Promise<AnswerAttachment[]>
  deleteManyByAnswerId(questionId: string): Promise<void>
}
