"use client";

import {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';
import { connectToDB } from '@utils/database';

const MyProfile = () => {

    const {data: session} = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    const handleEditPost = (post) =>{
        router.push(`/update-prompt?id=${post._id}`);
    }
    const handleDelete = async(post)=>{
        const hasConfirm = confirm("Are You sure, You want to Delete?");
        if(hasConfirm){
            try {
                
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method: 'DELETE'
                });

                const filterPosts = posts.filter((p)=>p._id !== post._id);

                setPosts(filterPosts);


            } catch (error) {
                
            }
        }
    }

    useEffect(() =>{
        const fetcuserposts = async()=>{
            const response  =  await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        if(session?.user.id) fetcuserposts();
    },[]);

  
  return (
    <Profile
    name="my"
    desc="here is my profile detail"
    data={posts}
    handleEdit={handleEditPost}
    handleDelete={handleDelete}
    />
  )
}

export default MyProfile