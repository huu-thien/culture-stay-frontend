import { getHostByUserId } from '@/src/apis/host'
import { deleteProperty, getListPropertyOfHost } from '@/src/apis/property'
import { STATUS_PROPERTY } from '@/src/constant'
import { routes } from '@/src/routes'
import { Box, Chip, IconButton, Link, Button, Dialog } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import { toast } from 'react-toastify'
import { TOAST_MESSAGE } from '@/src/toast-message/ToastMessage'

const ManageProperty = () => {
  const userLogin = JSON.parse(localStorage.getItem('user_login'))
  const [hostId, setHostId] = useState<number>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [listProperty, setListProperty] = useState([])
  const getHostIdByUserIdAsync = async () => {
    try {
      const { data } = await getHostByUserId(userLogin?.id)
      setHostId(data.id)
    } catch (err) {}
  }

  const getPropertyOfHostAsync = async () => {
    try {
      const { data, totalPages } = await getListPropertyOfHost(
        hostId,
        currentPage
      )
      console.log('data', data)
      setTotalPages(totalPages)
      setListProperty(data)
    } catch (err) {}
  }

  useEffect(() => {
    getHostIdByUserIdAsync()
    getPropertyOfHostAsync()
  }, [hostId])

  const handlerDeleteProperty = async (id: number) => {
    try {
      await toast.promise(deleteProperty(id), {
        pending: TOAST_MESSAGE.property.delete.pending,
        success: TOAST_MESSAGE.property.delete.success,
        error: TOAST_MESSAGE.property.delete.error,
      })
      getPropertyOfHostAsync()
    } catch (error) {}
  }
  const handlerEditProperty = (id: number) => {
    console.log('delete property', id)
  }

  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'title',
      headerName: 'Tên phòng',
      flex: 1,
      cellClassName: 'name-column--cell',
      renderCell: ({
        row: { title, id, status },
      }: {
        row: { title: string; id: number; status: STATUS_PROPERTY }
      }) => {
        return (
          <>
            {status === STATUS_PROPERTY.APPROVED ? (
              <Link
                href={routes.detailProperty.generatePath(id)}
                className="hover:text-cyan-700"
              >
                {title}
              </Link>
            ) : (
              <p>{title}</p>
            )}
          </>
        )
      },
    },
    { field: 'city', headerName: 'Thành phố', flex: 1 },
    { field: 'type', headerName: 'Loại phòng', flex: 1 },
    { field: 'maxGuestCount', headerName: 'Khách tối đa', flex: 1 },
    { field: 'address', headerName: 'Địa chỉ', flex: 2 },
    {
      field: 'status',
      headerName: 'Trạng thái',
      align: 'left',
      flex: 1,
      renderCell: ({ row: { status } }: { row: { status: string } }) => {
        return (
          <>
            {status === STATUS_PROPERTY.PENDING && (
              <Chip
                label="Chờ xác nhận"
                sx={{ backgroundColor: '#faeacf', color: '#f39c11' }}
              />
            )}
            {status === STATUS_PROPERTY.APPROVED && (
              <Chip
                label="Đang hoạt động"
                sx={{ backgroundColor: '#b0f7c0', color: '#28a745' }}
              />
            )}
            {status === STATUS_PROPERTY.REJECTED && (
              <Chip
                label="Đã bị hủy"
                sx={{ backgroundColor: '#ffd0cc', color: '#e84c3d' }}
              />
            )}
          </>
        )
      },
    },
    {
      field: '',
      headerName: 'Hành động',
      flex: 1,
      renderCell: ({ row: { id } }: { row: { id: number } }) => {
        return (
          <div className="flex gap-4">
            <IconButton
              aria-label="delete-property"
              onClick={() => handlerEditProperty(id)}
            >
              <AutoFixHighIcon sx={{ color: '#1976d2', fontSize: 24 }} />
            </IconButton>
            <IconButton aria-label="delete-property" onClick={handleClickOpen}>
              <DeleteForeverIcon sx={{ color: '#c92327', fontSize: 24 }} />
            </IconButton>
            {/* Dialog */}
            <Dialog onClose={handleClose} open={open}>
              <div className="p-4">
                <p className="pb-6">
                  Bạn có chắc chắn muốn xóa phòng này không?
                </p>
                <div className="flex gap-4 justify-center ">
                  <Button
                    onClick={() => handlerDeleteProperty(id)}
                    variant="contained"
                    color="primary"
                  >
                    Xóa
                  </Button>
                  <Button
                    onClick={() => handleClose()}
                    variant="outlined"
                    color="primary"
                  >
                    Hủy
                  </Button>
                </div>
              </div>
            </Dialog>
          </div>
        )
      },
    },
  ]

  return (
    <Box
      height="75vh"
      sx={{
        '& .MuiDataGrid-root': {
          border: 'none',
        },
        '& .MuiDataGrid-cell': {
          borderBottom: 'none',
        },
        '& .name-column--cell': {
          // color: colors.greenAccent[300]
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: 'rgba(25,118,210,0.2)',
          borderBottom: 'none',
        },
        '& .MuiDataGrid-virtualScroller': {
          // backgroundColor: colors.primary[400]
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: 'none',
          backgroundColor: 'rgba(25,118,210,0.2)',
        },
        '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
          color: `#1976d2 !important`,
          marginBottom: 2,
        },
      }}
    >
      <DataGrid
        rows={listProperty}
        columns={columns as GridColDef<any>[]}
        components={{ Toolbar: GridToolbar }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        // disableRowSelectionOnClick
        // pageSizeOptions={[2]}
      />
    </Box>
  )
}

export default ManageProperty
