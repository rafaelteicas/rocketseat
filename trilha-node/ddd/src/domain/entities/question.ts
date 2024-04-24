import { randomUUID } from "crypto"
import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"

type QuestionProps = {
  title: string
  content: string
  slug: Slug
  authorId: string
}

export class Question extends Entity<QuestionProps> {
  
}
