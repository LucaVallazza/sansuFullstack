"use client";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/public-const";
import axios from "axios";
import { ArrowRight, LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { env } from "process";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";

const DefaultPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");

  let router = useRouter();



  const handleOnChange = (data: any) => {
    setName(data.target.value as string);
  };

  const submitName = async (data: any) => {
    data.preventDefault();
    setLoading(true)

    console.log(data);
    const response = await axios
      .post(`${API_URL}/users/add`, { userName: name })
    
      process.env.userName?.concat(response.data.userName)
      router.push(response.data.routeTo);
    setLoading(false)
  };

  return (
    <div className="flex justify-center mt-14">
      <form
        onSubmit={submitName}
        className="h-fit max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <h3 className="text-2xl fw-bold">Ingrese su nombre:</h3>
        <div className="mt-4 mb-2">
          <input
            onChange={handleOnChange}
            className="border p-1 rounded-md w-full"
            id="name"
            type="text"
          />
        </div>
        <Button
          role="submit"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center "
          disabled={(name.length < 3 || name.length > 20 ? true : false) || isLoading}
        >
          Avanzar
          {isLoading? <LoaderIcon className="animate-spin h-4"></LoaderIcon> : <ArrowRight className="h-4"></ArrowRight>}
          
        </Button>
      </form>
    </div>
  );
};

export default DefaultPage;
