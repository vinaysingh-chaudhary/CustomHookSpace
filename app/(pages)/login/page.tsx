"use client";
import axios from "axios";
import React, {useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReturnToHome from "@/component/ui/return-to-home";
import { LoginInterface } from "@/interfaces/ts-interfaces";

const Login = () => {

  const router = useRouter();
  const InputRef = useRef<HTMLInputElement>(null);
  const isAuthenticated = true; 

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [disabled, setDisabled] = useState(true); 
  const [formData, setFormData] = useState<LoginInterface>({
    email: "",
    password: ""
  });

  
  useEffect(() => {
    if (InputRef.current) {
      InputRef.current.focus();
    }
  },[])

  useEffect(() => {
    const isFilled = Object.values(formData).every(value => value !== ""); 

    setDisabled(!isFilled)
  },[formData])


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const registerUser = async()=> {
    try {
      setError("")
      setLoading(true); 
      const { data } = await axios.post("/api/auth/login", formData ); 
      setLoading(false); 

      if (data?.success) {
        router.push("/")
    
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }

    } catch (error: any) {
      setError(error.response.data.error);
    }
  }

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    await registerUser()
  }

  return (
    <div className=" h-screen w-screen absolute top-0 left-0 z-40 flex flex-col justify-center items-center bg-black text-white">
      <ReturnToHome route={"Login"}/>

      <form className="w-[350px] sm:w-[400px] h-[400px] flex flex-col justify-center" onSubmit={handleSubmit}>

        <div className="mt-3">
          <label htmlFor="email" className="text-lg">
            Email address
          </label>
          <input
            name="email"
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            ref={InputRef}
            className="w-full py-2 px-3 mt-2  rounded-lg bg-black border-2 border-[#202020] placeholder:text-gray-500 placeholder:text-md"
          />
        </div>

        <div className="mt-3">
          <label htmlFor="password" className="text-lg">
            Password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="***"
            className="w-full py-2 px-3 mt-2  rounded-lg bg-black border-2 border-[#202020] placeholder:text-gray-500 placeholder:text-md"
          />
        </div>
        
        {
          error && <p className="mt-3 text-red-500 text-sm text-center">{error}</p>
        }

        <button 
          disabled={disabled}
          className={`w-full py-2 px-3 mt-6 text-black rounded-lg bg-white ${disabled? "bg-[#ffffff6d] cursor-not-allowed": " bg-green-theme-green hover:bg-green-500 cursor-pointer"} active:bg-green-500`}>
           {loading? "Logging In" : "Login"}
        </button>


        <Link href={"/signup"} className="text-center mt-4 text-sm hover:text-theme-green">{"Don't have an account? Signup"}</Link>
      </form>
    </div>
  );
};

export default Login;