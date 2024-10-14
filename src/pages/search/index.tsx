import SearchableLayout from '@/components/searchable-layout'
import { ReactNode, useEffect } from 'react'
import BookItem from '@/components/book-item'
import fetchBooks from '@/lib/fetch-books'
import { BookData } from '@/types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Head from 'next/head'

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
      <Head>
        <title>한입북스 - 검색 결과</title>
        <meta property='og:image' content='/thumnail.png' />
        <meta property='og:title' content='한입북스' />
        <meta property='og:description' content='한입 북스에 등록된 도서들을 만나보세요' />
      </Head>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  )
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
