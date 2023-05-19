'use client';
import {useState, useEffect}from 'react'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';


const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  const [copied, setCopied] = useState('');
  const {data: session} = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const copyHanlder = () =>{
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""),3000)
  }
  return (
      <div className='prompt_card'>
        <div className='flext justify-between items-start gap-5'>
            <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
              <Image
              src={post.creator.image}
              alt="user image"
              className='rounded-full object-contain'
              width={40}
              height={40}
              />
              <div className='flex flex-col'>
                <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
                <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
              </div>
            </div>
            <div className='copy_btn' onClick={copyHanlder}>
              <Image
              src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
              height={12}
              width={12}
              alt='action'
              />
            </div>
        </div>
        <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
        <p className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
        >{post.tag}</p>
        {session?.user.id === post.creator._id && pathname === '/profile' && (
          <div className='mt-5 flex-center gap-4 border-t border-gray-300 pt-3'>
            <p className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
            >
              Edit
            </p>
            <p className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
      </div>
  )
}

export default PromptCard