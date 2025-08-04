import {Image, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-react';
import {toast} from 'react-hot-toast'
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const[selectedStyle, setSelectedStyle] = useState('Realistic')
  const[input,setInput] = useState('')
  const [publish, setPublish] = useState(false)
  const {getToken} = useAuth()

const imageCategories = [
  'Realistic',
  'Gibhli',
  'Anime',
  'Cartoon',
  'Fantasy',
  'Portrait'

]

  const onSubmitHandler = async(e) =>{
      e.preventDefault()
      try {
        setLoading(true)
        const prompt = `Generate an image of ${input} in the style ${selectedStyle}`

        const {data} = await axios.post('/api/ai/generate-image', {prompt,publish},
          {headers: {Authorization: `Bearer ${await getToken()}`}})

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
            <h1 className='text-xl font-semibold'>AI Image Generator</h1>
          </div>

          <p className='mt-6 text-sm font-medium'>Describe your image</p>
          <textarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            rows={4}
            className='w-full h-35 p-3 mt-2 outline-none text-sm rounded-md border
             border-gray-300 hover:border-primary resize-none'
            placeholder='Type what you imagine, We’ll bring it to life..'
            required
          />

          <p className='mt-6 text-sm font-medium'>Style</p>
          <div className='mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-center'>
            {
            imageCategories.map((item) => (
              <span
                key={item}
                onClick={() => setSelectedStyle(item)}
                className={`text-xs w-full py-2 border rounded-full hover:bg-primary hover:text-white hover:border-black 
                transition-colors duration-200 ${selectedStyle === item ? 'bg-primary text-white' 
                : 'text-gray-500 border-gray-500'}`}
              >
                {item}
              </span>
            ))
            }
          </div>

            <div className='my-6 flex items-center gap-2'>
              <label className='relative cursor-pointer'>
                <input type="checkbox" onChange={(e)=> setPublish(e.target.checked) } checked = {publish}
                className='sr-only peer'/>

                <div className='w-9 h-5 bg-slate-300 rounded-full
                peer-checked:bg-primary transition'></div>

                <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full
                trabsition peer-checked:translate-x-4'></span>
              </label>
              <p className='text-sm'> Share with Community</p>
            </div>

              <button disabled= {loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r
              from-[#5e90d2] to-blue-800 text-white shadow-lg px-4 py-2 mt-4 text-sm
              hover:from-[#4a7aff] hover:to-[#05326c] hover:shadow-xl transition-all duration-200'>
                {
                  loading ? <span className='w-4 h-4 my-1 rounded-full border-2
                  border-t-transparent animate-spin'>
                  </span> : 
                <Image className='w-5'/>
                }
                Generate Image
              </button>
        </form>

        {/*Right col*/}

        <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border
        border-gray-200 min-h-[600px]'>
          <div className='flex items-center gap-3'>
            <Image className='w-5 h-5 text-primary'/>
            <h1 className='text-xl font-semibold'>
              Generated Image
            </h1>
          </div>
          {
            !content ?(
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Image className='w-9 h-9' />
                <p>Enter a topic and click "Generate Image" to get started</p>
            </div>
          </div>
            ) : (
              <div className='mt-3 h-full'>
                <img src={content} alt="image" className='w-full h-full' />
              </div>
            )
          }

        </div>
    </div>
  )
}

export default GenerateImages
