"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const [pins, setPins] = useState([]);

  const getPins = async () => {
    const url = "http://localhost:3000/api/pin";
    const response = await axios.get(url);
    setPins(response.data.pins);
  };

  useEffect(() => {
    getPins();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        {!pins || pins.length <= 0 ? (
          <div className="flex items-center justify-center min-h-[750px]">
            <ClipLoader color="#ef4444" size={120} />
          </div>
        ) : pins.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
            {pins.map((item) => {
              return (
                <Link
                  href={`/pin/${item._id}`}
                  key={item._id}
                  className="relative mb-4 group"
                >
                  <Image
                    src={item?.image?.url.replace("http://", "https://")}
                    alt={item.title}
                    width={300}
                    height={300}
                    className="w-full h-auto rounded-lg"
                    priority={true}
                  />
                  <span className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              );
            })}
          </div>
        ) : (
          <h3 className="min-h-[750px] flex justify-center items-center text-red-500 text-4xl font-semibold">
            No result found for your search
          </h3>
        )}
      </div>
    </>
  );
}
