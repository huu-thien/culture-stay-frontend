import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import Link from 'next/link'
import StarIcon from '@mui/icons-material/Star'
import { IconButton } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { routes } from '@/src/routes'
import { useState } from 'react'
import { IPropertyImage } from '@/src/page-components/Home/Properties/Properties.type'
import { toast } from 'react-toastify'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

interface IPropertyItemProps {
  propertyId: number
  title: string
  propertyImages: IPropertyImage[]
  numberOfReviews: number
  rating: number
  isFavorite: boolean
}

const PropertyItem = ({
  propertyId,
  title,
  propertyImages,
  numberOfReviews,
  rating,
  isFavorite,
}: IPropertyItemProps) => {
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = propertyImages.length

  const [showFavorite, setShowFavorite] = useState(isFavorite)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step: number) => {
    setActiveStep(step)
  }

  // add wish list
  const handleAddWishlistProperty = async (propertyId: number) => {
    toast.success('Thêm vào wishist thành công !')
    // try {
    //   const response = await postWishlistProperty(propertyId);
    //   if (response && response.status === 200) {
    //     toast.success('Thêm vào wishist thành công !');
    //     setShowFavorite(!showFavorite);
    //   }
    // } catch (err) {
    //   if (err.response.status === 400) {
    //     dispatch(saveLogout());
    //     toast.error('Đăng nhập để thêm wishlist');
    //   }
    //   console.log(err);
    // }
  }
  // Remove wish list
  const handleRemoveWishlistProperty = async (propertyId: number) => {
    toast.success('Xóa wishist thành công !')
    // try {
    //   const response = await deleteWishlistProperty(propertyId);
    //   if (response && response.status === 200) {
    //     toast.success('Xóa wishist thành công !');
    //     setShowFavorite(!showFavorite);
    //     console.log(response);
    //   }
    // } catch (err) {
    //   if (err.response.status === 400) {
    //     dispatch(saveLogout());
    //     toast.error('Đăng nhập để xóa wishlist');
    //   }
    //   console.log(err);
    // }
  }

  return (
    <div className="shadow-md p-2 rounded-lg mx-auto">
      <Box sx={{ maxWidth: 350, flexGrow: 1 }}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {propertyImages.map((step, index) => (
            <div key={`${step.url}-${index}`}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: 'block',
                    maxWidth: 400,
                    overflow: 'hidden',
                    width: '100%',
                  }}
                  src={step.url}
                  alt="Img"
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
            </Button>
          }
        />
        <div className="p-4">
          <div className="flex justify-between">
            <Link href={routes.detailProperty.generatePath(propertyId)}>
              <h2 className="text-md text-[#3c3834] font-semibold hover:text-cyan-800 line-clamp-2 h-[50px] pr-6">
                {title}
              </h2>
            </Link>
            <span className="flex">
              <StarIcon sx={{ mr: 1, color: '#feb207' }} />
              {rating.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-3">
            <p>
              <Link href="/review" className="text-cyan-700">
                Review ({numberOfReviews})
              </Link>
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="cursor-pointer">
              {showFavorite ? (
                <IconButton
                  aria-label="add-wishlist"
                  onClick={() => handleRemoveWishlistProperty(propertyId)}
                >
                  <FavoriteIcon sx={{ color: '#c92327' }} />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="add-wishlist"
                  onClick={() => handleAddWishlistProperty(propertyId)}
                >
                  <FavoriteBorderIcon sx={{ color: '#257b9a' }} />
                </IconButton>
              )}
            </div>
            {/* {isHostEditable && (
              <div className="flex">
                <IconButton aria-label="add-wishlist">
                  <AutoFixHighIcon
                    sx={{ color: '#0a67af' }}
                    onClick={() => handleHostEditProperty(id)}
                  />
                </IconButton>
                <IconButton
                  aria-label="add-wishlist"
                  onClick={() => handleHostDeleteProperty(id)}
                >
                  <DeleteIcon sx={{ color: '#c92327' }} />
                </IconButton>
              </div>
            )} */}
          </div>
        </div>
      </Box>
    </div>
  )
}

export default PropertyItem
