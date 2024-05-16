import React from 'react'
import ImageListMUI from '@mui/material/ImageList'

import { Gallery, Item } from 'react-photoswipe-gallery'
import { IPropertyImage } from '@/src/page-components/Home/Properties/Properties.type'

interface IAttachmentProps {
  propertyImages: IPropertyImage[]
}

const Attachments = ({ propertyImages }: IAttachmentProps) => {
  const numberDevide4 = propertyImages?.length - (propertyImages?.length % 4)
  const listImageCustom = []
  for (let i = 0; i < numberDevide4; i++) {
    listImageCustom.push(propertyImages[i])
  }
  return (
    <div className="rounded-md pb-6 mx-auto shadow-md my-12">
      <ImageListMUI
        sx={{ height: 500 }}
        variant="quilted"
        cols={4}
        rowHeight={300}
      >
        {listImageCustom?.map((item, index) => (
          <Gallery key={index}>
            <Item
              original={item.img as string}
              thumbnail={item.img as string}
              width="1024"
              height="768"
            >
              {({ ref, open }) => (
                <img ref={ref} onClick={open} src={item.url as string} />
              )}
            </Item>
          </Gallery>
        ))}
      </ImageListMUI>
    </div>
  )
}

export default Attachments
