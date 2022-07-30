import React from 'react'

const UserCard = ({name, isOnline}) => {
  return (
    <div className={`${isOnline ? 'text-slate-100' : 'text-slate-400'} flex items-center gap-2 p-3 bg-gray-700 w-full rounded-sm justify-start`}>
      <div className={`${isOnline ? 'bg-emerald-500' : 'bg-gray-500'} w-3 h-3 rounded-full`}></div>
      <div>
        <h1>{name}</h1>
      </div>
    </div>
  )
}

export default UserCard