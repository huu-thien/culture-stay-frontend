import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import Loading from '@/src/components/Loading/Loading'
const DynamicBecomeHost = dynamic(
  () => import('@/src/page-components/BecomeHost/BecomeHost'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)

const IndexPage = async (props) => {
  return <DynamicBecomeHost {...props.searchParams} />
}

export default IndexPage

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Become host',
    description: 'Become host',
  }
}
