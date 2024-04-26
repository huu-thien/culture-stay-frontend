import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import CircularProgress from '@mui/material/CircularProgress'
const DynamicHomePage = dynamic(
  () => import('@/src/page-components/Home/Home'),
  {
    ssr: false,
    loading: () => <CircularProgress />,
  }
)

const IndexPage = async (props) => {
  return <DynamicHomePage {...props.searchParams} />
}

export default IndexPage

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Culture Stay',
    description: 'Culture Stay',
  }
}
