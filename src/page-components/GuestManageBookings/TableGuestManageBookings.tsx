import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  ImageListItem,
} from '@mui/material'
import { getListBookingOfGuest } from '@/src/apis/booking'
import { ChangeEvent, useEffect, useState } from 'react'
import { DEFAULT_PAGE } from '@/src/constant'
import React from 'react'
import Link from 'next/link'
import { routes } from '@/src/routes'
import { formatDateYYYYMMDD } from '@/src/utils/DateBookingHandler'
import { FileObject } from '@/src/page-components/BecomeHost/constant'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import ImageListMUI from '@mui/material/ImageList'
import Loading from '@/src/components/Loading/Loading'

function createData(
  id: number,
  propertyName: string,
  propertyId: number,
  hostName: string,
  checkInDate: string,
  checkOutDate: string,
  status: string
) {
  return {
    id,
    propertyName,
    propertyId,
    hostName,
    checkInDate,
    checkOutDate,
    status,
  }
}
const CancellationReason = ['PersonalIssue', 'Other']
function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props

  const [cancellationReason, setCancellationReason] = useState<string>(
    CancellationReason[0]
  )
  const [reason, setReason] = useState<string>('')
  const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([])

  const handleChangeCancellationReason = (event: SelectChangeEvent) => {
    setCancellationReason(event.target.value as string)
  }
  console.log(cancellationReason)

  const [openModalCancel, setOpenModalCancel] = useState(false)
  const handleOpenModalCancel = () => setOpenModalCancel(true)
  const handleCloseModalCancel = () => {
    setOpenModalCancel(false)
    setCancellationReason(CancellationReason[0])
    setReason('')
    setSelectedFiles([])
  }
  // Hàm kiểm tra xem một tệp đã tồn tại trong danh sách chưa
  const fileExists = (fileName: string): boolean => {
    return selectedFiles.some((file) => file.name === fileName)
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="right">{row.id}</TableCell>
        <TableCell component="th" scope="row">
          <Link href={routes.detailProperty.generatePath(row.propertyId)}>
            {row.propertyName}
          </Link>
        </TableCell>
        <TableCell align="right">{row.hostName}</TableCell>
        <TableCell align="right">
          {formatDateYYYYMMDD(row.checkInDate)}
        </TableCell>
        <TableCell align="right">
          {formatDateYYYYMMDD(row.checkOutDate)}
        </TableCell>
        <TableCell align="right">
          {row.status === 'Pending' && (
            <Chip
              label="Chờ xác nhận"
              sx={{ backgroundColor: '#faeacf', color: '#f39c11' }}
            />
          )}
          {row.status === 'Confirmed' && (
            <Chip
              label="Đã xác nhận"
              sx={{ backgroundColor: '#b0f7c0', color: '#28a745' }}
            />
          )}
          {row.status === 'Rejected' && (
            <Chip
              label="Thất bại"
              sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }}
            />
          )}
          {row.status === 'CheckedIn' && (
            <Chip
              label="Check In"
              sx={{ backgroundColor: '#efe1f5', color: '#9a59b5' }}
            />
          )}
          {row.status === 'Completed' && (
            <Chip
              label="Hoàn tất"
              sx={{ backgroundColor: '#fae3ee', color: '#b33871' }}
            />
          )}
          {row.status === 'CancelledBeforeCheckIn' && (
            <Chip
              label="Hủy trước check in"
              sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }}
            />
          )}
          {row.status === 'CancelledAfterCheckIn' && (
            <Chip
              label="Hủy sau khi đặt"
              sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }}
            />
          )}
        </TableCell>
        <TableCell align="right">
          <>
            {row.status === 'Pending' && (
              <button
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300  font-sm rounded-md text-xs px-3 py-1.5 text-center mr-2 mb-2"
              >
                Nhắn tin cho chủ nhà
              </button>
            )}
            {row.status === 'Confirmed' && (
              <>
                <button
                  type="button"
                  className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-pink-200  font-medium rounded-md text-xs px-3 py-1.5 text-center mr-2 mb-2"
                  onClick={handleOpenModalCancel}
                >
                  Hủy phòng
                </button>
                <Dialog
                  open={openModalCancel}
                  onClose={handleCloseModalCancel}
                  maxWidth="xs"
                  fullWidth
                >
                  <DialogActions className="">
                    <Button onClick={handleCloseModalCancel} color="primary">
                      Đóng
                    </Button>
                  </DialogActions>
                  <h3 className="text-cyan-800 font-medium uppercase pb-4 text-center">
                    Đơn hủy phòng
                  </h3>

                  <DialogContent>
                    <div className="">
                      <FormControl fullWidth>
                        <InputLabel id="cancellationReason">Lý do</InputLabel>
                        <Select
                          labelId="cancellationReason"
                          id="demo-simple-select"
                          value={cancellationReason}
                          label="Lý do"
                          onChange={handleChangeCancellationReason}
                          size="medium"
                        >
                          <MenuItem value={CancellationReason[0]} selected>
                            Vấn để cá nhân
                          </MenuItem>
                          <MenuItem value={CancellationReason[1]}>
                            Lý do khác
                          </MenuItem>
                        </Select>
                      </FormControl>
                      <p className="text-sm pt-3 pb-2 text-gray-700">
                        Mô tả cụ thể
                      </p>
                      <textarea
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-cyan-600 focus:border-blue-500 outline-none"
                        placeholder="Mô tả cụ thể ..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      ></textarea>

                      <p className="text-sm pt-3 pb-2 text-gray-700">
                        Hình ảnh minh chứng
                      </p>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const files = e.target.files
                            if (files) {
                              const selectedFileList = Array.from(files)
                              // Lọc ra các tệp mới không trùng tên
                              const newFiles: FileObject[] =
                                selectedFileList.filter(
                                  (file) => !fileExists(file.name)
                                )

                              if (newFiles.length > 0) {
                                // Thêm các tệp mới vào danh sách
                                setSelectedFiles((prevSelectedFiles) => [
                                  ...prevSelectedFiles,
                                  ...newFiles,
                                ])
                              }
                            }
                          }}
                          multiple
                          id="listImage"
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="listImage">
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                            size="small"
                          >
                            Upload Images
                          </Button>
                        </label>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            setSelectedFiles([])
                            // setFieldValue('listImage', []);
                          }}
                          style={{ marginLeft: '10px' }}
                          size="small"
                        >
                          Reset
                        </Button>
                        <div>
                          {selectedFiles.length > 0 && (
                            <div className="py-2">
                              {/* <h3 className="text-sm py-2">Selected Images:</h3> */}
                              <ImageListMUI
                                sx={{ height: 200 }}
                                variant="quilted"
                                cols={1}
                                rowHeight={200}
                              >
                                {selectedFiles.map((file, index) => (
                                  <ImageListItem key={index}>
                                    <img
                                      src={URL.createObjectURL(file)}
                                      alt={`Image ${index}`}
                                      loading="lazy"
                                    />
                                  </ImageListItem>
                                ))}
                              </ImageListMUI>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-4 pt-8">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={handleCloseModalCancel}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          // onClick={() => handleCancelRequestBooking(row.id)}
                        >
                          Yêu cầu hủy phòng
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
            {row.status === 'Completed' && (
              <button
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300  font-sm rounded-md text-xs px-3 py-1.5 text-center mr-2 mb-2"
              >
                <Link href={routes.detailProperty.generatePath(row.propertyId)}>
                  Đánh giá phòng
                </Link>
              </button>
            )}
          </>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default function TableGuestManageBookings() {
  const userLogin = JSON.parse(localStorage.getItem('user_login') || '{}')
  const [bookings, setBookings] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)
  const [loading, setLoading] = useState(false)

  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const { data, totalPages } = await getListBookingOfGuest(userLogin?.id)
      setTotalPages(totalPages)
      const rows = data.map((booking) =>
        createData(
          booking.id,
          booking.propertyName,
          booking.propertyId,
          booking.hostName,
          booking.checkInDate,
          booking.checkOutDate,
          booking.status
        )
      )
      setBookings(rows)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    userLogin && fetchBookings()
  }, [userLogin?.id])
  console.log(bookings)

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full">
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID</TableCell>
                  <TableCell>Tên phòng</TableCell>
                  <TableCell align="right">Tên chủ phòng</TableCell>
                  <TableCell align="right">Ngày Check In</TableCell>
                  <TableCell align="right">Ngày Checkout </TableCell>
                  <TableCell align="right">Trạng thái</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <Row key={booking.propertyName} row={booking} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="py-8 w-full flex items-center justify-center">
            <Pagination
              color="primary"
              count={totalPages}
              page={currentPage}
              onChange={handleChangePage}
              sx={{ mx: 'auto' }}
            />
          </div>
        </div>
      )}
    </>
  )
}
