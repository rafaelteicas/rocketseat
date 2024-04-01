export interface ReviewModel {
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
