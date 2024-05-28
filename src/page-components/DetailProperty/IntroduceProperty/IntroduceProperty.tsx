import WifiIcon from '@mui/icons-material/Wifi'
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import WorkIcon from '@mui/icons-material/Work'
import BathroomIcon from '@mui/icons-material/Bathroom'
import StarIcon from '@mui/icons-material/Star'
import RateReviewIcon from '@mui/icons-material/RateReview'
import BedroomParentIcon from '@mui/icons-material/BedroomParent'
import PersonIcon from '@mui/icons-material/Person'

interface PropsType {
  bathroomCount: number
  bedCount: number
  description: string
  maxGuestCount: number
  numberOfReviews: number
  rating: number
  descripion: string
  // propertyUtilities: PropertyUtilitiesType[]
}

const IntroduceProperty = ({
  bathroomCount,
  bedCount,
  description,
  maxGuestCount,
  numberOfReviews,
  rating,
  descripion,
}) => {
  return (
    <>
      <div className="sm:flex sm:justify-center lg:justify-between">
        <div className="grid gap-1 px-4">
          <h2 className="text-xl text-[#ff385c] font-bold">Thông tin cơ bản</h2>
          <div className="flex gap-3 py-2">
            <BathroomIcon sx={{ color: '#ff385c' }} />
            <p className="">Số phòng tắm: {bathroomCount} phòng</p>
          </div>
          <div className="flex gap-3 py-2">
            <BedroomParentIcon sx={{ color: '#ff385c' }} />
            <p className="">Số phòng ngủ: {bedCount} phòng</p>
          </div>
          <div className="flex gap-3 py-2">
            <PersonIcon sx={{ color: '#ff385c' }} />
            <p className="">Số khách tối đa: {maxGuestCount} người</p>
          </div>
          <div className="flex gap-3 py-2">
            <RateReviewIcon sx={{ color: '#ff385c' }} />
            <p className="">Số lượt đánh giá: {numberOfReviews}</p>
          </div>
          <div className="flex gap-3 py-2">
            <StarIcon sx={{ color: '#ff385c' }} />
            <p className="">
              Điểm đánh giá: {rating > 0 ? rating.toFixed(2) : 'chưa có'}
            </p>
          </div>
        </div>
        <div className="grid gap-1 px-4">
          <h2 className="text-xl text-[#ff385c] font-bold">
            Nơi này có những thứ
          </h2>
          <div className="flex gap-3 py-2">
            <WifiIcon sx={{ color: '#ff385c' }} />
            <p className="">Wifi-tốc độ 19Mbps</p>
          </div>
          <div className="flex gap-3 py-2">
            <TimeToLeaveIcon sx={{ color: '#ff385c' }} />
            <p className="">Chỗ đỗ xe miễn phí tại nơi ở</p>
          </div>
          <div className="flex gap-3 py-2">
            <BeachAccessIcon sx={{ color: '#ff385c' }} />
            <p className="">Hướng nhìn ra biển</p>
          </div>
          <div className="flex gap-3 py-2">
            <WorkIcon sx={{ color: '#ff385c' }} />
            <p className="">Không gian riêng để làm việc</p>
          </div>
        </div>
      </div>
      {/* <PropertyUtilities propertyUtilities={propertyUtilities} /> */}
      <div>
        <h4 className="text-xl text-[#ff385c] font-bold pb-2">Mô tả phòng</h4>
        <p className=" text-gray-500 text-justify pb-3">{descripion}</p>
      </div>
    </>
  )
}

export default IntroduceProperty
