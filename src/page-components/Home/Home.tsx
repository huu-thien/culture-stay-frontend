import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import Rating from '@mui/material/Rating'
import MainLayout from '@/src/components/layouts/MainLayout'
const Home = () => {
  return (
    <MainLayout>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Button variant="contained">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
        <Rating
          name="half-rating-read"
          defaultValue={2.5}
          precision={0.5}
          readOnly
        />
      </main>
    </MainLayout>
  )
}
export default Home
