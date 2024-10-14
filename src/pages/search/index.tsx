import SearchableLayout from '@/components/searchable-layout'
import { ReactNode, useEffect } from 'react'
import BookItem from '@/components/book-item'
import fetchBooks from '@/lib/fetch-books'
import { BookData } from '@/types'
import { useRouter } from 'next/router'

// SSG방식으로는 query를 불러올 수 없음
// export const getStaticProps = async (context: GetStaticPaths) => {
//   // console.log(context)
//   const q = context.query.q
//   const books = await fetchBooks(q as string)

//   return {
//     props: {
//       books,
//     },
//   }
// }

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([])
  const router = useRouter()

  const q = router.query.q

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string)
    setBooks(data)
  }

  useEffect(() => {
    if (q) {
      fetchSearchResult()
    }
  }, [q])

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  )
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
