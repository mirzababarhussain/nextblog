import Link from 'next/link'
import React from 'react'

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
        <h1 className='head_text text-left'>
          <span className='blue_gradient'>{type} Post</span>
        </h1>
        <p className='desc text-left max-w-md'>
          What is in Your mind Post and get response.
        </p>
        <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex
        flex-col gap-7 glassmorphism
        '>
          <label className='font-satoshi font-semibold text-base text-gray-700'>Enter Your AI Prompt</label>
          <textarea 
          value={post.prompt}
          onChange={(e) => setPost({...post, prompt:e.target.value})} 
          placeholder='Enter Your Prompt'
          required
          className='form_textarea'
          >
           
          </textarea>
          <label className='font-satoshi font-semibold text-base text-gray-700'>Tags {' '} #development, #AI, #coding</label>
          <input 
          value={post.tag}
          onChange={(e) => setPost({...post, tag:e.target.value})} 
          placeholder='Enter Your Taq'
          required
          className='form_input'
          />
           
          <div className='flex-end mx-3 mb-5 gap-4 '>
            <Link href="/" className='text-gray-500 text-sm'>Cancel</Link>
            <button type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
            >{submitting ? `${type}...`: type}</button>
          </div>
        </form>
    </section>
  )
}

export default Form