// import { PropertyReview, GeneralScore } from '@/@types/property';
// import { deleteReviewProperty, getGeneralScore, getPropertyReview } from '@/services/PropertyService/propertyService';
import {
  Avatar,
  Fade,
  Modal,
  Box,
  Backdrop,
  IconButton,
  Button,
} from '@mui/material'
import EditLocationIcon from '@mui/icons-material/EditLocation'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import MessageIcon from '@mui/icons-material/Message'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import StarIcon from '@mui/icons-material/Star'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { ChangeEvent, useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import DeleteIcon from '@mui/icons-material/Delete'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { format } from 'date-fns'
import { routes } from '@/src/routes'
import { getPropertyReview } from '@/src/apis/detail-property'
import { IReviewProperty } from '@/src/page-components/DetailProperty/ReviewProperty/ReviewProperty.type'
// import { formatDateTime } from '@/helpers/FormatDateTime/formatDateTime';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store';
// import { Link } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
}
interface PropsType {
  propertyId: string
  updateReview?: number
}
const ReviewProperty = ({ propertyId }: PropsType) => {
  // const userIdLogin = useSelector((state: RootState) => state.auth.user?.id) || null;
  // PropertyReview[]
  // GeneralScore
  const [listReview, setListReview] = useState<IReviewProperty[]>([])
  const [generalScore, setGeneralScore] = useState({
    cleanliness: 0,
    accuracy: 0,
    communication: 0,
    checkIn: 0,
    value: 0,
    location: 0,
    numberOfReviews: 2,
  })
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  useEffect(() => {
    getListReviewProperty(propertyId, currentPage)
    // getGeneralScoreProperty(propertyId)
  }, [propertyId, currentPage])

  const getListReviewProperty = async (id: string, currentPage: number) => {
    try {
      const { data, totalPages } = await getPropertyReview(id, currentPage)
      setTotalPages(totalPages)
      setListReview(data)
      console.log('data', data)
    } catch ({ title }) {
      toast.error(title)
    }

    // const response = await getPropertyReview(id, currentPage)
    // if (response && response.status === 200) {
    //   setListReview(response.data.data)
    //   setTotalPages(response.data.totalPages)
    // }
  }
  const getGeneralScoreProperty = async (id: number) => {
    // const response = await getGeneralScore(id)
    // if (response && response.status === 200) {
    //   setGeneralScore(response.data)
    // }
  }

  const handleDeleteReview = async (id: number) => {
    try {
      // const response = await deleteReviewProperty(id)
      // if (response && response.status === 204) {
      //   const resolveAfter2Sec = new Promise((resolve) =>
      //     setTimeout(resolve, 1400)
      //   )
      //   toast
      //     .promise(resolveAfter2Sec, {
      //       pending: 'Đang xóa đánh giá của bạn',
      //       success: 'Xóa đánh giá thành công',
      //     })
      //     .then(() => {
      //       setCurrentPage(1)
      //       handleClose()
      //       getListReviewProperty(propertyId, 1)
      //     })
      // }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="pt-6">
      <>
        <h2 className="text-xl text-cyan-800 font-bold pb-2 pt-5">Đánh giá</h2>
        {generalScore.numberOfReviews > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-5">
              {listReview &&
                listReview.length > 0 &&
                listReview.map((review, index) => (
                  <div
                    key={`${review.guestName}_${index}`}
                    className="flex flex-col p-2 shadow-md rounded-md"
                  >
                    <div className="">
                      <div className="flex items-center gap-4 p-3">
                        <Link href={routes.viewProfile.generatePath(1)}>
                          <Avatar src={review.guestAvatarUrl} />
                        </Link>
                        <div className=" w-full flex justify-between">
                          <div>
                            <Link href={routes.viewProfile.generatePath(1)}>
                              <p className="text-cyan-700">
                                {review.guestName}
                              </p>
                            </Link>
                            <p className="text-gray-400 text-xs font-thin">
                              {format(review.reviewTime, 'yyyy-MM-dd')}
                            </p>
                          </div>
                          {/* {review.userId === userIdLogin && ( */}
                          {true && (
                            <>
                              <IconButton
                                aria-label="delete"
                                onClick={handleOpen}
                              >
                                <DeleteIcon sx={{ color: '#c92327 ' }} />
                              </IconButton>
                              <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                slots={{ backdrop: Backdrop }}
                                slotProps={{
                                  backdrop: {
                                    timeout: 500,
                                  },
                                }}
                              >
                                <Fade in={open}>
                                  <Box sx={style}>
                                    <p>
                                      Bạn có chắc chắn muốn xóa đánh giá này
                                      không ?
                                    </p>
                                    <div className="pt-4 flex justify-center gap-4">
                                      <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={handleClose}
                                      >
                                        Không
                                      </Button>
                                      <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() =>
                                          handleDeleteReview(review.id)
                                        }
                                      >
                                        Có
                                      </Button>
                                    </div>
                                  </Box>
                                </Fade>
                              </Modal>
                            </>
                          )}
                        </div>
                      </div>
                      <p className="min-h-[48px] line-clamp-2 font-thin text-gray-500 px-4 italic text-md">
                        "{review.content}"
                      </p>
                    </div>
                    <div className="pt-2">
                      <p className="text-center pb-4 text-cyan-700">
                        Đánh giá trên thang điểm 5
                      </p>
                      <div className="flex items-center justify-center">
                        <div className="text-sm px-4 text-center flex flex-col">
                          <EditLocationIcon sx={{ color: '#c92327' }} />
                          <span className="pt-1 text-cyan-700">
                            {review.location}
                          </span>
                        </div>
                        <div className="text-sm px-4 text-center flex flex-col">
                          <CleaningServicesIcon sx={{ color: '#feb207' }} />
                          <span className="pt-1 text-cyan-700">
                            {review.cleanliness}
                          </span>
                        </div>
                        <div className="text-sm px-4 text-center flex flex-col">
                          <MessageIcon sx={{ color: '#28a745' }} />
                          <span className="pt-1 text-cyan-700">
                            {review.communication}
                          </span>
                        </div>
                        <div className="text-sm px-4 text-center flex flex-col">
                          <CheckCircleIcon sx={{ color: '#1e5bf8' }} />
                          <span className="pt-1 text-cyan-700">
                            {review.checkIn}
                          </span>
                        </div>
                        <div className="text-sm px-4 text-center flex flex-col">
                          <AccessTimeFilledIcon sx={{ color: '#27a645' }} />
                          <span className="pt-1 text-cyan-700">
                            {review.accuracy}
                          </span>
                        </div>
                        <div className="text-sm px-4 text-center flex flex-col">
                          <LocalOfferIcon sx={{ color: '#371881' }} />
                          <span className="pt-1 text-cyan-700">
                            {review.value}
                          </span>
                        </div>
                        <div className="text-sm px-4 text-center flex flex-col">
                          <StarIcon sx={{ color: '#feb207' }} />
                          <span className="pt-1 text-cyan-700">
                            {review.averageRating.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="py-8">
              <Pagination
                color="primary"
                count={totalPages}
                page={currentPage}
                onChange={handleChangePage}
                sx={{ width: '100%', mx: 'auto' }}
              />
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-500">Chưa có đánh giá nào !</p>
        )}
      </>
    </div>
  )
}

export default ReviewProperty
