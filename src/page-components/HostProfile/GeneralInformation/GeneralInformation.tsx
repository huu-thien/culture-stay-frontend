import { Box, Chip, Divider } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

import RateReviewIcon from '@mui/icons-material/RateReview'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import { formatDateYYYYMMDD } from '@/src/utils/DateBookingHandler'
import { USER_ROLE } from '@/src/constant'

interface IGeneralInformationProps {
  avatarUrl: string
  joinedAt: string
  name: string
  numberOfReviews: number
  rating: number
  userRole: USER_ROLE
}
const GeneralInformation = ({
  avatarUrl,
  joinedAt,
  name,
  numberOfReviews,
  rating,
  userRole,
}: IGeneralInformationProps) => {
  return (
    <div className="">
      <Box
        sx={{
          minWidth: 350,
          borderRadius: 3,
          boxShadow: 4,
          p: 2,
        }}
      >
        <div className="flex flex-col gap-6">
          <div className="min-w-[150px] flex items-center gap-4">
            <img
              src={avatarUrl}
              alt={name}
              className="w-[100px] h-[100px] rounded-full"
            />
            <div>
              <p className="text-center font-bold text-xl py-2 text-cyan-700">
                {name}
              </p>
              {userRole === USER_ROLE.HOST ? (
                <Chip
                  label="Host"
                  sx={{ backgroundColor: '#efe1f5', color: '#b33871' }}
                />
              ) : (
                <Chip
                  label="Guest"
                  sx={{ backgroundColor: '#fae3ee', color: '#b33871' }}
                />
              )}
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <p className="flex flex-col items-center gap-2">
              <span>Ngày tham gia</span>
              <span>
                <AccessTimeFilledIcon sx={{ color: '#27a645' }} />
                <span> {formatDateYYYYMMDD(joinedAt)}</span>
              </span>
            </p>
            <Divider orientation="vertical" variant="middle" flexItem />
            <p className="flex flex-col items-center gap-2">
              <span>Đánh giá</span>
              <span>
                <RateReviewIcon sx={{ color: '#743de3' }} />
                <span> {numberOfReviews}</span>
              </span>
            </p>
            <Divider orientation="vertical" variant="middle" flexItem />
            <p className="flex flex-col items-center gap-2">
              <span>Điểm</span>
              <span>
                <StarIcon sx={{ color: '#feb207' }} />
                <span> {rating.toFixed(2)}</span>
              </span>
            </p>
          </div>
        </div>
      </Box>
      <div className="my-12 border p-4 text-sm shadow-sm text-gray-600 bg-gray-100 rounded-md">
        <p className="font-medium py-2">
          Thông tin đã được xác nhận của {name}
        </p>
        <ul>
          <li className="py-1">✅ Danh tính</li>
          <li className="py-1">✅ Địa chỉ email</li>
          <li className="py-1">✅ Số điện thoại</li>
        </ul>
        <p className='py-2 underline text-xs text-cyan-700'>Tìm hiểu về quy trình xác minh danh tính</p>
      </div>
    </div>
  )
}

export default GeneralInformation
