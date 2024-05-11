import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import Loading from '@/src/components/Loading/Loading'
const DynamicHostGuestProfile = dynamic(
  () => import('@/src/page-components/HostGuestProfile/HostGuestProfile'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)

const IndexPage = async (props) => {
  return <DynamicHostGuestProfile {...props.searchParams} />
}

export default IndexPage

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'View Profile',
    description: 'View Profile',
  }
}
