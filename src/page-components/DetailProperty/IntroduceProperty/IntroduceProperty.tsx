import WifiIcon from '@mui/icons-material/Wifi'
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import WorkIcon from '@mui/icons-material/Work'
import BathroomIcon from '@mui/icons-material/Bathroom'
import StarIcon from '@mui/icons-material/Star'
import RateReviewIcon from '@mui/icons-material/RateReview'
import BedroomParentIcon from '@mui/icons-material/BedroomParent'
import PersonIcon from '@mui/icons-material/Person'

// interface PropsType {
//   bathroomCount: number;
//   bedCount: number;
//   description: string;
//   maxAdultCount: number;
//   maxChildCount: number;
//   numberOfReviews: number;
//   rating: number;
//   propertyUtilities: PropertyUtilitiesType[];
// }

const IntroduceProperty = () => {
  return (
    <>
      <div className="sm:flex sm:justify-center lg:justify-between">
        <div className="grid gap-1 px-4">
          <h2 className="text-xl text-cyan-800 font-bold">Thông tin cơ bản</h2>
          <div className="flex gap-3 py-2">
            <BathroomIcon sx={{ color: '#257b9a' }} />
            <p className="">Số phòng tắm: 4 phòng</p>
          </div>
          <div className="flex gap-3 py-2">
            <BedroomParentIcon sx={{ color: '#257b9a' }} />
            <p className="">Số phòng ngủ: 4 phòng</p>
          </div>
          <div className="flex gap-3 py-2">
            <PersonIcon sx={{ color: '#257b9a' }} />
            <p className="">Số khách tối đa: 4 người</p>
          </div>
          <div className="flex gap-3 py-2">
            <RateReviewIcon sx={{ color: '#743de3' }} />
            <p className="">Số lượt đánh giá: 4</p>
          </div>
          <div className="flex gap-3 py-2">
            <StarIcon sx={{ color: '#feb207' }} />
            <p className="">Điểm đánh giá: {4 > 0 ? 4 : 'chưa có'}</p>
          </div>
        </div>
        <div className="grid gap-1 px-4">
          <h2 className="text-xl text-cyan-800 font-bold">
            Nơi này có những thứ
          </h2>
          <div className="flex gap-3 py-2">
            <WifiIcon sx={{ color: '#257b9a' }} />
            <p className="">Wifi-tốc độ 19Mbps</p>
          </div>
          <div className="flex gap-3 py-2">
            <TimeToLeaveIcon sx={{ color: '#257b9a' }} />
            <p className="">Chỗ đỗ xe miễn phí tại nơi ở</p>
          </div>
          <div className="flex gap-3 py-2">
            <BeachAccessIcon sx={{ color: '#257b9a' }} />
            <p className="">Hướng nhìn ra biển</p>
          </div>
          <div className="flex gap-3 py-2">
            <WorkIcon sx={{ color: '#257b9a' }} />
            <p className="">Không gian riêng để làm việc</p>
          </div>
        </div>
      </div>
      {/* <PropertyUtilities propertyUtilities={propertyUtilities} /> */}
      <div>
        <h4 className="text-xl text-cyan-800 font-bold pb-2">Mô tả phòng</h4>
        <p className=" text-gray-500 text-justify pb-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          debitis unde pariatur deserunt quasi laudantium architecto possimus
          harum aspernatur, rerum sit obcaecati voluptate? Illum asperiores quo
          earum fugiat esse id.
        </p>
      </div>
    </>
  )
}

export default IntroduceProperty
