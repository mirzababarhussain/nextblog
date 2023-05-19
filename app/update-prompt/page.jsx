'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Form from "@components/Form";

const updatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    'prompt':'',
    'tag':''
  });
const router = useRouter();
const searchParam = useSearchParams();
const promptId  = searchParam.get('id');

const getcurrentPrompt = async()=>{
    const response = await fetch(`/api/prompt/${promptId }`);
    const data = await response.json();
    setPost({
        prompt:data.prompt,
        tag:data.tag
    });
}

useEffect(() =>{
    if(promptId) getcurrentPrompt();
},[promptId])


const postPrompt = async (e) =>{
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) return alert("Missing PromptId!");
    try {
       
      const response = await fetch(`/api/prompt/${promptId}`,{
        method:'PATCH',
        body:JSON.stringify({
          prompt:post.prompt,
          tag: post.tag,
        })
        
      })
      if(response.ok){
        router.push('/');
      }
    } catch (error) {

      console.log(error);
      
    } finally{
      setSubmitting(false);
    }
  }


  return (
    <Form
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={postPrompt}
    />
  )
}

export default updatePrompt