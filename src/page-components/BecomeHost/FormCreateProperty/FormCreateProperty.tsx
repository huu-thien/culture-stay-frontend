import React, { useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  IconButton,
  ImageListItem,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  useTheme,
} from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import ImageListMUI from '@mui/material/ImageList'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import { Formik } from 'formik'

// import { postCreateProperty } from '@/services/PropertyService/propertyService'
// import { ChangFileImageToUrl } from '@/helpers/ChangFileImageToUrl/ChangFileImagePostPropertyToUrl'
// import { useDispatch } from 'react-redux';
// import { saveLogout } from '@/redux-toolkit/auth.slice';
import { toast } from 'react-toastify'
import _, { debounce } from 'lodash'
import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import { Map } from 'mapbox-gl'
// import { getAddressResult } from '@/services/GetMapService/getMapService'
import AddressResult from './AddressResult'
import CancelIcon from '@mui/icons-material/Cancel'
import {
  FileObject,
  MenuProps,
  PropertyInfoPost,
  PropertyUtilitiesType,
  getStyles,
  listUtilities,
} from '@/src/page-components/BecomeHost/constant'
import MatchingUtilities from '@/src/utils/commonBecomeHost'
import {
  GeneralSchema,
  generalInformation,
} from '@/src/helpers/BecomeHostSchema/BecomeHostSchema'
import { ChangFileImageToUrl } from '@/src/helpers/ChangFileImageToUrl/ChangFileImagePostPropertyToUrl'
import { getAddressResult } from '@/src/apis/map'
import { useRouter } from 'next/navigation'
import { postCreateProperty } from '@/src/apis/property'
import { routes } from '@/src/routes'
import { TOAST_MESSAGE } from '@/src/toast-message/ToastMessage'

mapboxgl.accessToken =
  'pk.eyJ1IjoicHAzMTEiLCJhIjoiY2xvMW9hazBtMWRuczJ0cWh0eDl1andncCJ9.cINZ3UYbzs7plrM2seqPjg'
const listTypeRooms = ['Room', 'HomeStay', 'House', 'Apartment']

const FormCreateProperty = () => {
  const router = useRouter()

  // Map
  const [position, setPosition] = useState<{ lat: number; lon: number }>({
    lat: 0,
    lon: 0,
  })
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<Map | null>(null)
  const [zoom] = useState(15)
  const [listAddressResult, setListAddressResult] = useState([])
  const [city, setCity] = useState<string>('')
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: 'mapbox://styles/pp311/clo1ucw6g00fd01r26ds09u1z',
      center: [position.lon, position.lat],
      zoom: zoom,
    })
    new mapboxgl.Marker()
      .setLngLat([position.lon, position.lat])
      .addTo(map.current)
    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [position.lat, position.lon, zoom])

  // =======================================
  const [utilities] = useState<string[]>([])
  const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([])
  const theme = useTheme()
  // Hàm kiểm tra xem một tệp đã tồn tại trong danh sách chưa
  const fileExists = (fileName: string): boolean => {
    return selectedFiles.some((file) => file.name === fileName)
  }

  const handleSubmitBecomeHost = async (values) => {
    try {
      console.log('values.listImage', values.listImage)
      const propertyImages: { url: string }[] | undefined =
        await ChangFileImageToUrl(values.listImage)

      const propertyUtilities: Omit<PropertyUtilitiesType, 'propertyId'> =
        MatchingUtilities(values.utilities)
      const valueCreatePeroperty: PropertyInfoPost = {
        type: values.typeRoom,
        bedCount: values.quantityBed,
        bedroomCount: values.quantityBed,
        bathroomCount: values.quantityBedRooms,
        maxGuestCount: values.quantityGuest,
        title: values.roomName,
        description: values.description,
        latitude: position.lat,
        longitude: position.lon,
        address: values.address,
        city: city,
        propertyImages: propertyImages,
        propertyUtilities: propertyUtilities,
      }
      console.log('valueCreatePeroperty ,', valueCreatePeroperty)

      await toast.promise(postCreateProperty(valueCreatePeroperty), {
        pending: TOAST_MESSAGE.property.create.pending,
        success: TOAST_MESSAGE.property.create.success,
        error: TOAST_MESSAGE.property.create.error,
      })
      router.push(routes.home.generatePath())
    } catch (err) {
      console.log(err)
    }
  }
  const customHandleChange = debounce(
    async (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      try {
        const { value } = event.target
        const response = await getAddressResult(value as string)
        if (response && response.status === 200) {
          console.log(response.data.results)
          setListAddressResult(response.data.results)
        }
      } catch (err) {
        console.log(err)
        toast.error('Địa chỉ bạn nhập chưa chính xác !')
      }
    },
    1000
  )

  console.log('listAddressResult', listAddressResult)

  return (
    <div className="py-8">
      <h2 className="text-center text-2xl text-[#ff385c] pb-4">
        NHẬP CÁC THÔNG TIN VỀ PHÒNG, ĐIỀU KHOẢN VÀ CHÍNH SÁCH
      </h2>
      <div className="max-w-4xl mx-auto">
        <Formik
          initialValues={generalInformation}
          onSubmit={handleSubmitBecomeHost}
          validationSchema={GeneralSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => {
            return (
              <form onSubmit={handleSubmit} name="become-host" method="get">
                <p className="text-xl py-3 text-[#ff385c] uppercase">
                  Thông tin tổng quan
                </p>
                <div className="mb-2">
                  <label htmlFor="roomName" className="">
                    Tên phòng
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                    }}
                    fullWidth
                    id="roomName"
                    label="Nhập tên phòng"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.roomName}
                    error={!!touched.roomName && !!errors.roomName}
                    helperText={touched.roomName && (errors.roomName as string)}
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="description" className="">
                    Mô tả phòng
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                    }}
                    fullWidth
                    id="description"
                    label="Nhập mô tả phòng"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    error={!!touched.description && !!errors.description}
                    helperText={
                      touched.description && (errors.description as string)
                    }
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="typeRoom" className="">
                    Loại phòng
                  </label>
                  <FormControl fullWidth sx={{ marginTop: '10px' }}>
                    <InputLabel id="typeRoom">Chọn loại phòng</InputLabel>
                    <Select
                      labelId="type-room"
                      id="type-room"
                      name="typeRoom"
                      value={values.typeRoom}
                      label="Chọn loại phòng"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      MenuProps={MenuProps}
                      error={!!touched.typeRoom && !!errors.typeRoom}
                      fullWidth
                      sx={{
                        fontFamily: 'Lexend',
                      }}
                    >
                      {listTypeRooms.map((typeRoom, index) => (
                        <MenuItem key={`typeRoom-${index}`} value={typeRoom}>
                          {typeRoom}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.typeRoom && errors.typeRoom && (
                      <FormHelperText
                        style={{ color: '#D32F2F', marginLeft: '10px' }}
                      >
                        {errors.typeRoom as string}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
                <>
                  <div className="mb-2">
                    <label htmlFor="address" className="">
                      Địa chỉ
                    </label>
                    <TextField
                      sx={{
                        fontFamily: 'Lexend',
                        marginTop: '10px',
                      }}
                      fullWidth
                      id="address"
                      label="Nhập địa chỉ phòng"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        const { value } = e.target
                        setFieldValue('address', value || '')
                        if (value === '') {
                          setListAddressResult([])
                          return
                        }
                        customHandleChange(e)
                      }}
                      value={values.address}
                      error={!!touched.address && !!errors.address}
                      helperText={touched.address && (errors.address as string)}
                    />
                  </div>
                  <div>
                    {listAddressResult?.length > 0 && (
                      <div className="p-2 shadow-lg rounded-md">
                        <div className="flex justify-end">
                          <IconButton onClick={() => setListAddressResult([])}>
                            <CancelIcon
                              sx={{ color: '#f12d37', fontSize: 20 }}
                            />
                          </IconButton>
                        </div>
                        {listAddressResult.map((address, index) => (
                          <AddressResult
                            key={`${address.address.freeformAddress}-${index}`}
                            address={address.address.freeformAddress}
                            position={address.position}
                            setPosition={setPosition}
                            setListAddressResult={setListAddressResult}
                            setFieldValue={setFieldValue}
                            setCity={setCity}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="py-2">
                    <div
                      ref={mapContainer}
                      className="map-container"
                      style={{ height: '600px', marginBottom: '100px' }}
                    />
                  </div>
                </>
                <p className="text-xl py-3 text-[#ff385c] uppercase">
                  Thông tin chi tiết
                </p>

                <div className="mb-2">
                  <label htmlFor="quantityGuest" className="">
                    Số lượng khách tối đa
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                    }}
                    type="number"
                    fullWidth
                    id="quantityGuest"
                    label="Nhập số lượng người lớn tối đa"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantityGuest}
                    error={!!touched.quantityGuest && !!errors.quantityGuest}
                    helperText={
                      touched.quantityGuest && (errors.quantityGuest as string)
                    }
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="quantityBedRooms" className="">
                    Số lượng phòng ngủ
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                    }}
                    type="number"
                    fullWidth
                    id="quantityBedRooms"
                    label="Nhập số lượng phòng ngủ"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantityBedRooms}
                    error={
                      !!touched.quantityBedRooms && !!errors.quantityBedRooms
                    }
                    helperText={
                      touched.quantityBedRooms &&
                      (errors.quantityBedRooms as string)
                    }
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="quantityBed" className="">
                    Số lượng giường
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                    }}
                    type="number"
                    fullWidth
                    id="quantityBed"
                    label="Nhập số lượng giường"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantityBed}
                    error={!!touched.quantityBed && !!errors.quantityBed}
                    helperText={
                      touched.quantityBed && (errors.quantityBed as string)
                    }
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="quantityBathRooms" className="">
                    Số lượng phòng tắm
                  </label>
                  <TextField
                    sx={{
                      fontFamily: 'Lexend',
                      marginTop: '10px',
                    }}
                    type="number"
                    fullWidth
                    id="quantityBathRooms"
                    label="Nhập số lượng phòng tắm"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantityBathRooms}
                    error={
                      !!touched.quantityBathRooms && !!errors.quantityBathRooms
                    }
                    helperText={
                      touched.quantityBathRooms &&
                      (errors.quantityBathRooms as string)
                    }
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="utilities">Thêm tiện ích</label>
                  <Select
                    labelId="utilities"
                    name="utilities"
                    id="utilities"
                    multiple
                    value={values.utilities}
                    onChange={handleChange}
                    error={!!touched.utilities && !!errors.utilities}
                    onBlur={handleBlur}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    sx={{
                      mt: 1,
                    }}
                    fullWidth
                    MenuProps={MenuProps}
                  >
                    {listUtilities.map((utility) => (
                      <MenuItem
                        key={utility}
                        value={utility}
                        style={getStyles(utility, utilities, theme)}
                      >
                        <Checkbox
                          checked={values.utilities.includes(utility)}
                        />
                        {utility}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.utilities && errors.utilities && (
                    <FormHelperText
                      style={{ color: '#D32F2F', marginLeft: '10px' }}
                    >
                      {errors.utilities as string}
                    </FormHelperText>
                  )}
                </div>
                <div className="py-8">
                  <p className="text-xl py-3 text-[#ff385c] uppercase">
                    THÊM ẢNH ĐỂ QUẢNG BÁ PHÒNG CỦA BẠN
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
                            // console.log(selectedFiles);
                            setFieldValue('listImage', [
                              ...selectedFiles,
                              ...newFiles,
                            ])
                          }
                        }
                      }}
                      multiple
                      id="listImage"
                      style={{ display: 'none' }}
                    />
                    {/* <button onClick={handleUpload}>Upload Images</button> */}
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
                        setFieldValue('listImage', [])
                      }}
                      style={{ marginLeft: '10px' }}
                      size="small"
                    >
                      Reset
                    </Button>
                    {errors.listImage && touched.listImage && (
                      <FormHelperText
                        style={{ color: '#D32F2F', marginLeft: '10px' }}
                      >
                        Ít nhất 8 ảnh
                      </FormHelperText>
                    )}
                    <div>
                      {selectedFiles.length > 0 && (
                        <div>
                          <h3>Selected Images:</h3>
                          <ImageListMUI
                            sx={{ height: 700 }}
                            variant="quilted"
                            cols={2}
                            rowHeight={800}
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
                </div>
                <Button type="submit" variant="contained" color="primary">
                  Bắt đầu cho thuê
                </Button>
              </form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default FormCreateProperty
