import React from 'react'
import { IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const QuantityContained = () => {
  const [quantity, setQuantity] = React.useState(0)

  const handleMinusQuantity = () => {
    if (quantity === 0) return
    setQuantity((prev) => prev - 1)
  }
  const handlePlusQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  return (
    <div className="flex items-center gap-4 justify-between pr-3">
      <p>Số lượng khách</p>
      <div className="flex items-center gap-8">
        <IconButton
          aria-label="add"
          sx={{ border: 1 }}
          onClick={handleMinusQuantity}
          disabled={quantity === 0}
        >
          <RemoveIcon />
        </IconButton>
        <p className="text-md text-gray-500">{quantity}</p>
        <IconButton
          aria-label="minus"
          sx={{ border: 1 }}
          onClick={handlePlusQuantity}
        >
          <AddIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default QuantityContained
