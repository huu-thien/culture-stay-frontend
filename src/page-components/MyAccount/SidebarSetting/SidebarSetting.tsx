import React from 'react'
import FolderSharedIcon from '@mui/icons-material/FolderShared'
import PersonIcon from '@mui/icons-material/Person'
import GppGoodIcon from '@mui/icons-material/GppGood'
import SummarizeIcon from '@mui/icons-material/Summarize'
const SidebarSetting = () => {
  return (
    <div className="w-[300px] text-gray-600">
      <h2 className="text-cyan-600 text-xl font-semibold">Settings</h2>
      <div className="p-4 my-4 shadow-lg rounded-md border">
        <div className="flex items-center gap-2">
          <FolderSharedIcon color="primary" />
          <span className="text-cyan-600">Culture Stay</span>
        </div>
        <p className="text-cyan-600 font-semibold">Account Centers</p>
        <p className="text-xs text-gray-400 py-4">
          Manage your connected experiences and account settings across Meta
          technologies.
        </p>
        <ul className="text-sm">
          <li className="flex gap-2 items-center py-2">
            <PersonIcon sx={{ color: '#969696', fontSize: '20px' }} />
            <span>Personal detail</span>
          </li>
          <li className="flex gap-2 items-center py-2">
            <GppGoodIcon sx={{ color: '#969696', fontSize: '20px' }} />
            <span>Password and Security</span>
          </li>
          <li className="flex gap-2 items-center py-2">
            <SummarizeIcon sx={{ color: '#969696', fontSize: '20px' }} />
            <span>Ad Preference</span>
          </li>
        </ul>
        <p className="text-sm text-cyan-600 pt-2">See more in Account center</p>
      </div>
    </div>
  )
}

export default SidebarSetting
