import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import Loading from '@/src/components/Loading/Loading'
const DynamicBookingConfirm = dynamic(
  () => import('@/src/page-components/BookingConfirm/BookingConfirm'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
)

const IndexPage = async (props) => {
  return <DynamicBookingConfirm {...props.searchParams} />
}

export default IndexPage

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Booking confirm',
    description: 'Booking confirm',
  }
}
