// import { HostType } from '@/@types/host';
// import CustomerReview from '@/components/HostInfo/CustomerReview';
// import IntroduceOfHost from '@/components/HostInfo/IntroduceOfHost';
// import ListOfRoomsForRent from '@/components/HostInfo/ListRoomsForRent';
// import ProfileHost from '@/components/HostInfo/ProfileHost';
// import { getHostDetail } from '@/services/HostService/hostService';
import { GeneralInformation } from '@/src/page-components/HostGuestProfile/GeneralInformation'
import { Introduce } from '@/src/page-components/HostGuestProfile/Introduce'
import { ModalReviewGuest } from '@/src/page-components/HostGuestProfile/ModalReviewGuest'
import { PropertyForRent } from '@/src/page-components/HostGuestProfile/PropertyForRent'
import { Divider } from '@mui/material'
import { useEffect, useState } from 'react'
// import { useParams } from 'react-router';

const HostProfile = () => {
  // const { id } = useParams();
  const id = 1
  // HostType | null
  const [hostInfo, setHostInfo] = useState(null)

  const [postReviewUpdate, setPostReviewUpdate] = useState(0)
  useEffect(() => {
    getHostInfoApi(Number(id))
  }, [id, postReviewUpdate])

  const getHostInfoApi = async (hostId: number) => {
    // const response = await getHostDetail(hostId);
    // if (response && response.status === 200) {
    //   setHostInfo(response.data);
    // }
  }
  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-8 flex gap-12">
      {hostInfo && (
        <GeneralInformation
          avatarUrl={hostInfo.avatarUrl}
          joinedAt={hostInfo.joinedAt}
          name={hostInfo.name}
          numberOfReviews={hostInfo.numberOfReviews}
          rating={hostInfo.rating}
        />
      )}
      {hostInfo && (
        <div className="grid">
          <Introduce
            name={hostInfo.name}
            introduction={hostInfo.introduction}
            address={hostInfo.address}
            city={hostInfo.city}
          />
          <Divider />
          <ModalReviewGuest
            hostId={Number(id) as number}
            name={hostInfo.name}
            setPostReviewUpdate={setPostReviewUpdate}
          />
          <Divider />
          <PropertyForRent hostId={Number(id) as number} />
          {/* <ListOfRoomsForRent hostId={Number(id) as number} /> */}
        </div>
      )}
    </div>
  )
}

export default HostProfile
