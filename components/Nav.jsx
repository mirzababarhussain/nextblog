"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {signIn, signOut, useSession, getProviders} from "next-auth/react";

const Nav = () => {
  const {data: session} = useSession();
  const [provider, setProvider ] = useState(null);
  const [toggleDropdown, setToggleDropDown] = useState(false);
  useEffect(() =>{
    const funcsetProvider = async() =>{
      const response = await getProviders();
      setProvider(response);
    }
    funcsetProvider()
  },[])
  return (
    <nav className="flex-between w-full md-16 p-3">

      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" alt="logo" width={30} height={30} className="object-contain"/>
        <p className="logo_text">CapraEye</p>
      </Link>
      {/** Desktop Navigation */}
       <div className="sm:flex hidden">
        {session?.user ? (<div className="flex gap-3 md:gap-4">
          <Link href="/create-prompt" className="black_btn">Create Post</Link>
          <button type="button" className="outline_btn" onClick={signOut}>Signout</button>
          <Link href="/profile">
            <Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="profile"/>
          </Link>
        </div>) : <>
          {
            provider && Object.values(provider).map((provider) =>(
              <button type="button" key={provider.name} onClick={()=> signIn(provider.id)}>Sign In</button>
            ))
          }
        </>}
       </div>
          
        <div className="sm:hidden flex-relative">
          {session?.user ? (
            <div className="flex">
                 <Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="profile"
                 onClick={() =>setToggleDropDown((prev) => !prev)}
                 />
                 {
                  toggleDropdown && (
                    <div className="dropdown">
                      <Link href="/profile" className="dropdown_link" onClick={()=> setToggleDropDown(false)}>Profile</Link>
                      <Link href="/create-prompt" className="dropdown_link" onClick={()=> setToggleDropDown(false)}>Create Post</Link>
                      <button type="button" onClick={() => {setToggleDropDown(false); signOut()}} className="w-full mt-5 black_btn">Signout</button>
                    </div>
                  )
                 }
            </div>
          ):
          <>
          {
            provider && Object.values(provider).map((provider) =>(
              <button type="button" key={provider.name} onClick={()=> signIn(provider.id)}>Sign In</button>
            ))
          }
        </>
          }
        </div>
    </nav>
  )
}

export default Nav