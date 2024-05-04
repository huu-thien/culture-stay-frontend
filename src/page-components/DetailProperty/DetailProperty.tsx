'use client'
import MainLayout from '@/src/components/layouts/MainLayout'
import { Attachments } from '@/src/page-components/DetailProperty/Attachments'
import { BookingProperty } from '@/src/page-components/DetailProperty/BookingProperty'
import { FormPostReview } from '@/src/page-components/DetailProperty/FormPostReview'
import { IntroduceProperty } from '@/src/page-components/DetailProperty/IntroduceProperty'
import { IntroduceHost } from '@/src/page-components/DetailProperty/IntrotruceHost'
import { LocationOnMap } from '@/src/page-components/DetailProperty/LocationOnMap'
import { ReviewProperty } from '@/src/page-components/DetailProperty/ReviewProperty'

import { Title } from '@/src/page-components/DetailProperty/Title'
import { Divider } from '@mui/material'

const DetailProperty = () => {
  return (
    <MainLayout>
      <main className="">
        <Title />
        <Attachments />
        <div className="lg:flex lg:items-start lg:justify-between mb-5 gap-16">
          <div className="flex flex-col gap-6 w-full lg:w-3/5">
            <IntroduceHost />
            <Divider />
            <IntroduceProperty />
          </div>
          <BookingProperty
            pricePerNight={1}
            propertyId={1}
            cleaningFee={1}
            maxAdultCount={1}
            maxChildCount={1}
          />
        </div>
        <ReviewProperty
          propertyId={1}
          // updateReview={updateReview}
        />
        <FormPostReview
          propertyId={1}
          // onUpdateReview={setUpdateReview}
        />
        <Divider className="py-4" />
        <LocationOnMap
          // latitude={propertyDetail.latitude}
          // longitude={propertyDetail.longitude}
          latitude={21.0278}
          longitude={105.8342}
        />
      </main>
    </MainLayout>
  )
}
export default DetailProperty
