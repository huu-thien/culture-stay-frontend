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
import { IPropertyDetail } from '@/src/page-components/Home/Properties/Properties.type'
import { Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useParams } from 'next/navigation'
import { getPropertyById } from '@/src/apis/property'

const DetailProperty = () => {
  const { id } = useParams()

  const [propertyDetail, setPropertyDetail] = useState<IPropertyDetail>()

  const getInfoProperty = async () => {
    try {
      const response = await getPropertyById(id)
      setPropertyDetail(response)
    } catch ({ title }) {
      toast.error(title)
    }
  }

  useEffect(() => {
    getInfoProperty()
  }, [])

  return (
    <MainLayout>
      <main className="">
        <Title
          title={propertyDetail?.title}
          address={propertyDetail?.address}
          city={propertyDetail?.city}
        />
        <Attachments propertyImages={propertyDetail?.propertyImages} />
        <div className="lg:flex lg:items-start lg:justify-between mb-5 gap-16">
          <div className="flex flex-col gap-6 w-full lg:w-3/5">
            <IntroduceHost hostId={propertyDetail?.hostId} />
            <Divider />
            <IntroduceProperty
              bathroomCount={propertyDetail?.bathroomCount}
              bedCount={propertyDetail?.bedCount}
              description={propertyDetail?.description}
              numberOfReviews={propertyDetail?.numberOfReviews}
              maxGuestCount={propertyDetail?.maxGuestCount}
              rating={propertyDetail?.rating}
              descripion={propertyDetail?.description}
            />
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
          propertyId={id as string}
          // updateReview={updateReview}
        />
        <FormPostReview
          propertyId={1}
          // onUpdateReview={setUpdateReview}
        />
        <Divider className="py-4" />
        {propertyDetail && (
          <LocationOnMap
            latitude={propertyDetail.latitude}
            longitude={propertyDetail.longitude}
          />
        )}
      </main>
    </MainLayout>
  )
}
export default DetailProperty
