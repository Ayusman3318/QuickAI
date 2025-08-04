import { File, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-react';
import {toast} from 'react-hot-toast'
import Markdown from 'react-markdown';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const[input,setInput] = useState('')
  const {getToken} = useAuth()

  const onSubmitHandler = async(e) =>{
      e.preventDefault()
      try {
        setLoading(true)
        const formData = new FormData()
        formData.append('resume', input)

        const {data} = await axios.post('/api/ai/review-resume', formData, {
        headers: {
        Authorization: `Bearer ${await getToken()}`,
  },
});
          if (data.success) {
            setContent(data.content)
          } else{
            toast.error(data.message)
          }      
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || "Something went wrong");
      }
      setLoading(false)
  };

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4
     text-slate-700'>

        {/*left col*/}
        <form
          onSubmit={onSubmitHandler}
          className='w-full max-w-lg p-4 bg-white rounded-lg border-gray-200'
        >
          <div className='flex items-center gap-3'>
            <Sparkles className='w-6 text-primary' />
            <h1 className='text-xl font-semibold'>Resume Review</h1>
          </div>

          <br />

          <label htmlFor="resume-upload" className="mt-8 text-sm font-medium">
            Upload Resume
          </label>
          <input
            id="resume-upload"
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept="image/*, application/pdf"
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border
             border-gray-300 hover:border-primary"
            required
          />

          <div className='flex gap-2 text-sm opacity-75'>
            <p className='text-gray-400 text-sm items-start mt-1'>
              Supports PDF,JPG,PNG formats</p>
          </div>

            <br />
              <button disabled = {loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r
              from-[#5e90d2] to-blue-800 text-white shadow-lg px-4 py-2 mt-4 text-sm hover:from-[#4a7aff] hover:to-[#05326c] 
              hover:shadow-xl transition-all duration-200'>
                {
                  loading ?
                  <span className='w-4 h-4 my-1 rounded-full border-2
                  border-t-transparent animate-spin'></span> :
                  <File className='w-5'/>
                }
                Review Resume
              </button>
        </form>


        {/*Right col*/}
        <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border gap-4
        border-gray-200 min-h-[600px]'>
          <div className='flex items-center gap-3'>
            <File className='w-5 h-5 text-primary'/>
            <h1 className='text-xl font-semibold'>
              Analysis Results
            </h1>
          </div>
          {
            !content ?(
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <File className='w-9 h-9' />
                <p>Upload your resume click "Review Resume" to get started</p>
            </div>
          </div>

            ):(
            <div className='mt-3 max-h-[600px] overflow-y-auto text-sm text-slate-600 pr-2'>
              <div className='reset-tw'>
                <Markdown>{content}</Markdown>
                </div>
            </div>
            )
          }
        </div>
    </div>
  )
}

export default ReviewResume
