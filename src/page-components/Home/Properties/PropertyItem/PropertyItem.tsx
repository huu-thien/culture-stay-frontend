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

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
]

const PropertyItem = () => {
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = images.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step: number) => {
    setActiveStep(step)
  }

  const showFavorite = true
  return (
    <div className="shadow-md p-2 rounded-lg mx-auto">
      <Box sx={{ maxWidth: 350, flexGrow: 1 }}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={step.label}>
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
                  src={step.imgPath}
                  alt={step.label}
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
            <Link href={routes.detailProperty.generatePath(1)}>
              <h2 className="text-md text-[#3c3834] font-semibold hover:text-cyan-800 line-clamp-2 h-[50px] pr-6">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </h2>
            </Link>
            <span className="flex">
              <StarIcon sx={{ mr: 1, color: '#feb207' }} />5
              {/* {rating.toFixed(2)} */}
            </span>
          </div>
          <div className="flex justify-between py-3">
            <p>
              <Link href="/review" className="text-cyan-700">
                {/* Review ({numberOfReviews}) */}
                Review (5)
              </Link>
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="cursor-pointer">
              {showFavorite ? (
                <IconButton
                  aria-label="add-wishlist"
                  // onClick={() => handleRemoveWishlistProperty(id)}
                >
                  <FavoriteIcon sx={{ color: '#c92327' }} />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="add-wishlist"
                  // onClick={() => handleAddWishlistProperty(id)}
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
