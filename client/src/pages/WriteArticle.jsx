import { Edit, Edit2Icon, Edit3, FileEdit, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from "axios";
import { useAuth } from '@clerk/clerk-react';
import {toast} from 'react-hot-toast'
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {

  const articleLength =[
    {length:800, text: '500-800 words'},
    {length:1200, text: '800-1200 words'},
    {length:1600, text: '1200-1600 words'},
  ]

  const[selectedLength, setSelectedLength] = useState(articleLength[0])
  const[input,setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const[content, setContent] = useState('')
  const {getToken} = useAuth()

  const onSubmitHandler = async(e) =>{
      e.preventDefault();
      try {
        setLoading(true)
        const prompt = `Write an article about ${input} in ${selectedLength.text}`
        const {data} = await axios.post('api/ai/generate-article', {
          prompt, length:selectedLength.length
        },
      {
        headers: {Authorization: `Bearer ${await getToken()}`}
      })

      if (data.success) {
        setContent(data.content)
      } else{
        toast.error(data.message)
      }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || "Something went wrong");
      }
      setLoading(false)
  }



  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap
    gap-4 text-slate-700'>
        {/*left col*/}

        <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg
        border-gray-200'>
          <div className='flex items-center gap-3'>
            <Sparkles className='w-6 text-primary '/>
            <h1 className='text-xl font-semibold'>Article Configuration</h1>
          </div>

          <p className='mt-6 text-sm font-medium'> Article Topic</p>
          <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" className='w-full p-2 px-3 mt-2 
          outline-none text-sm rounded-md border border-gray-300 hover:border-primary' 
          placeholder='Type your vision. We’ll do the writing' required/>

          <p className='mt-4 text-sm font-medium'> Article Length</p>

          <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
            {
            articleLength.map((item, index) => (
              <span
                key={index}
                onClick={() => setSelectedLength(item)}
                className={`text-xs px-4 py-1 border rounded-full hover:bg-primary hover:text-white hover:border-black 
                transition-colors duration-200 ${selectedLength.text === item.text ? 'bg-primary text-white' 
                : 'text-gray-500 border-gray-500'}`}
              >
                {item.text}
              </span>
            ))
            }
          </div>
            <br />

              <button disabled = {loading}className='w-full flex justify-center items-center gap-2 bg-gradient-to-r
              from-[#5e90d2] to-blue-800 text-white shadow-lg px-4 py-2 mt-4 text-sm
              hover:from-[#4a7aff] hover:to-[#05326c] hover:shadow-xl transition-all duration-200'>
                {
                  loading ? <span className='w-4 h-4 my-1 rounded-full border-2
                  border-t-transparent animate-spin'></span>
                  : <Edit3 className='w-5'/>
                }
                Generate article
              </button>
        </form>

        {/*Right col*/}

        <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border
        border-gray-200 min-h-[600px]'>
          <div className='flex items-center gap-3'>
            <Edit className='w-5 h-5 text-primary'/>
            <h1 className='text-xl font-semibold'>
              Generated article
            </h1>
          </div>

          {!content ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Edit className='w-9 h-9' />
                <p>Enter a topic and click "Generate article" to get started</p>
            </div>
          </div>
          ) : (
            <div className='mt-3 max-h-[600px] overflow-y-auto text-sm text-slate-600 pr-2'>
              <div className='reset-tw'>
                <Markdown>{content}</Markdown>
                </div>
            </div>
          )}
          
        </div>
    </div>
  )
}

export default WriteArticle
