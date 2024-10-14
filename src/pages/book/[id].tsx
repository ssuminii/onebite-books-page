import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import style from './[id].module.css'
import fetchOneBook from '@/lib/fetch-one-book'
import { useRouter } from 'next/router'

export const getStaticPaths = () => {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }],
    // false: 404 Not Found
    // blocking: SSR 방식
    // true: SRR 방식 + 데이터가 없는 fallback 상태의 페이부터 반환
    fallback: true,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id
  // console.log(id)
  const book = await fetchOneBook(Number(id))

  // book데이터가 존재하지 않으면 Not Found페이지로 리다이렉트
  if (!book) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      book,
    },
  }
}

export default function Page({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  if (router.isFallback) return 'Loading...'
  if (!book) return '문제가 발생했습니다. 다시 시도하세요'

  const { title, subTitle, description, author, publisher, coverImgUrl } = book

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} alt={title} />
      </div>
      <div className={style.title}> {title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  )
}
