import React, { useEffect, useState } from 'react'

const ActivityNavbar = () => {
    const [activityUsers, setActivityUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/chat/FetchUsers')
                const data = await response.json()
                console.log(data);
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData()
    })

  return (
    <div className='absolute w-[250px] h-screen bg-zinc-800 shadow-inner hidden lg:flex flex-col items-center pt-5'>
        <h1 className='font-bold text-white text-2xl'>Active Users</h1>
    </div>
  )
}

export default ActivityNavbar
