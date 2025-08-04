import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { dummyCreationData } from '../assets/assets'
import {Sparkle, Clock } from 'lucide-react'
import { useAuth, useUser } from '@clerk/clerk-react';
import CreationItem from '../components/CreationItem';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {

  const { user } = useUser();
  const [creations,setCreations] = useState([])
  const [loading,setLoading] = useState(true)
  const {getToken} = useAuth()

  const getDashboardData = async () => {
    try {
      const {data} = await axios.get('api/user/get-user-creations',{
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
        
      if (data.success) {
        setCreations(data.creations)
      } else{
        toast.error(error.message)
      }
    } catch (error) {
        toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
    setLoading(false)
  };

  useEffect(() => {
    getDashboardData()
  }, []);

  return (
    <div className='relative h-full overflow-y-scroll p-6'>
      <div className='flex justify-start gap-4 flex-wrap items-center'>
        <div className='flex justify-between items-center w-72 p-4 px-6
         bg-white rounded-xl border border-gray-200'>
          <div className='text-slate-600 '>
            <p className='text-sm flex items-flex'>
              Total Creations 
            </p>
            <h2 className='text-xl font-semibold'>{creations.length}</h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-tr from-[#5e90d2] to-blue-800 text-white
          flex justify-center items-center '>
            <Sparkle className='w-5 text-white'/>
          </div>
        </div>
      </div >

      {
        loading ?(
          <div className='flex justify-center items-center h-3/4'>
          <div className='animate-spin rounded-full h-11 w-11 
          border-3 border-primary border-t-transparent'></div>
          </div>
        ):( 
          <div className='space-y-3'>
            <p className='mt-6 mb-4'> Recent creations</p>
            {
              creations.map((item)=> <CreationItem key={item.id} item={item} />)
            }
          </div>
        )
      }
        </div>
  )
}

export default Dashboard
