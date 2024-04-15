interface Review {
  id: string // '542cf3cd-d1d0-4116-8898-db2ce23dfb73'
  rate: number // 4
  description: string // 'Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis. Penatibus id vestibulum imperdiet a at imperdiet lectus leo. Sit porta eget nec vitae sit vulputate eget'
  created_at: string // '2024-03-25T21:08:39.341Z'
  book_id: string // '375948a7-bca3-4b59-9f97-bfcde036b4ca'
  user_id: string // '48e458c0-8b1e-4994-b85a-1e1cfcc9dd60'
  user: {
    id: string // '48e458c0-8b1e-4994-b85a-1e1cfcc9dd60'
    name: string // 'Jaxson Dias'
    avatar_url: string // 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
    created_at: string // '2024-03-25T21:08:39.341Z'
  }
  book: {
    id: string // '375948a7-bca3-4b59-9f97-bfcde036b4ca'
    name: string // 'O Hobbit'
    author: string // 'J.R.R. Tolkien'
    summary: string // 'Semper et sapien proin vitae nisi. Feugiat neque integer donec et aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed vulputate massa velit nibh'
    cover_url: string // 'images/books/o-hobbit.png'
    total_pages: number // 360
    created_at: string // '2024-03-25T21:08:39.341Z'
  }
}

export interface ReviewModel {
  ratings: Review[]
  lastRatedBook: {
    id: string // '978a3778-0836-44ac-9130-254f2889cb78'
    rate: number // 5
    description: string // 'dsadsaddadsa'
    created_at: string // '2024-04-04T00:23:59.936Z'
    book_id: string // '86596503-369b-4614-bacf-11c9bb73e779'
    user_id: string // 'f3aa31fb-aa7e-43ff-9959-98bb97267a0f'
    book: {
      id: string // '86596503-369b-4614-bacf-11c9bb73e779'
      name: string // 'O guia do mochileiro das galáxias'
      author: string // 'Douglas Adams'
      summary: string // 'Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis. Penatibus id vestibulum imperdiet a at imperdiet lectus leo. Sit porta eget nec vitae sit vulputate eget'
      cover_url: string // 'images/books/o-guia-do-mochileiro-das-galaxias.png'
      total_pages: number // 250
      created_at: string // '2024-03-25T21:08:39.341Z'
    }
  }
}
