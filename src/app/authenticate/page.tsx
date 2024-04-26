import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import CircularProgress from '@mui/material/CircularProgress'
const DynamicAuthenticate = dynamic(
  () => import('@/src/page-components/Authenticate/Authenticate'),
  {
    ssr: false,
    loading: () => <CircularProgress />,
  }
)

const IndexPage = async (props) => {
  return <DynamicAuthenticate {...props.searchParams} />
}

export default IndexPage

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Authenticate',
    description: 'Authenticate',
  }
}
