// import { GuestType } from '@/@types/guest';
// import HostReview from '@/components/GuestInfo/HostReview';
// import IntroduceOfHost from '@/components/HostInfo/IntroduceOfHost';
// import ProfileHost from '@/components/HostInfo/ProfileHost';
// import { getGuestDetail } from '@/services/GuestService/guestService';
import { GeneralInformation } from '@/src/page-components/HostGuestProfile/GeneralInformation'
import { Introduce } from '@/src/page-components/HostGuestProfile/Introduce'
import { ModalReviewHost } from '@/src/page-components/HostGuestProfile/ModalReviewHost'
import { Divider } from '@mui/material'
import { useEffect, useState } from 'react'
// import { useParams } from 'react-router';

const GuestProfile = () => {
  // const { id } = useParams();
  const id = 1
  // const [guestInfo, setGuestInfo] = useState<GuestType | null>(null)
  const [guestInfo, setGuestInfo] = useState(null)

  const [postReviewUpdate, setPostReviewUpdate] = useState(0)
  useEffect(() => {
    getGuestInfoApi(Number(id))
  }, [id, postReviewUpdate])

  const getGuestInfoApi = async (guestId: number) => {
    // const response = await getGuestDetail(guestId);
    // if (response && response.status === 200) {
    //   setGuestInfo(response.data);
    // }
  }
  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-8 flex gap-12">
      {guestInfo && (
        <GeneralInformation
          avatarUrl={guestInfo.avatarUrl}
          joinedAt={guestInfo.joinedAt}
          name={guestInfo.name}
          numberOfReviews={guestInfo.numberOfReviews}
          rating={guestInfo.rating}
        />
      )}
      {guestInfo && (
        <div className="grid">
          <Introduce
            name={guestInfo.name}
            introduction={guestInfo.introduction}
            address={guestInfo.address}
            city={guestInfo.city}
          />
          <Divider />
          <ModalReviewHost
            guestId={Number(id) as number}
            name={guestInfo.name}
            setPostReviewUpdate={setPostReviewUpdate}
          />
        </div>
      )}
    </div>
  )
}

export default GuestProfile
