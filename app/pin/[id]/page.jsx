"use client";
import axios from "axios";
import { Heart, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

function Pin() {
  const [comment, setComment] = useState("");
  const [pin, setPin] = useState(null); // Fix: Initialize as null for better conditional rendering
  const [morePins, setMorePins] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const { id } = useParams();
  const { data: session } = useSession();

  const fetchMorePins = async () => {
    const response = await axios.get("/api/pin");
    setMorePins(response.data.pins);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && id) {
      fetchPin();
      fetchMorePins();
    }
  }, [id]);

  const fetchPin = async () => {
    try {
      const response = await axios.get(`/api/pin/${id}`);

      setPin(response.data.pin);

      if (response.data.pin?.likes?.length) {
        const pinLiked = response.data.pin.likes.some(
          (element) => session?.user?.name === element.user
        );
        setIsLiked(pinLiked);
      }
    } catch (error) {
      console.error("Error fetching pin:", error);
    }
  };

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {pin && pin?.image?.url ? (
        <div className="min-h-screen py-3 md:py-6">
          <div className="container mx-auto px-4">
            <div className="lg:flex justify-center">
              <div className="w-fit mb-6 lg:mb-0 mx-auto lg:mx-0">
                <Image
                  src={pin?.image?.url}
                  alt="Pin"
                  className="rounded-xl shadow-lg max-h-[600px] object-cover w-auto md:ml-auto"
                  width={300}
                  height={300}
                  priority={true}
                  unoptimized={true}
                />
              </div>
              <div className="lg:w-1/3 lg:pl-10">
                <div className="flex items-center justify-between mb-6">
                  <Heart
                    className={`${
                      isLiked
                        ? "bg-red-500 text-white hover:bg-red-700"
                        : "bg-transparent hover:bg-red-500"
                    } transition-all duration-300 w-10 h-10 p-2 rounded-full`}
                  />
                  <div>
                    <Link
                      href={pin?.image?.url}
                      target="_blank"
                      className="bg-red-500 text-white px-4 py-3 rounded-lg font-semibold"
                    >
                      Download
                    </Link>
                  </div>
                </div>
                <p>
                  {pin?.likes?.length <= 1
                    ? `${pin?.likes?.length} like`
                    : `${pin?.likes?.length} likes`}
                </p>

                <div>
                  <h3 className="text-xl font-semibold">
                    {pin?.comments.length} Comments
                  </h3>
                  <div className="max-h-96 overflow-auto">
                    {pin?.comments?.length > 0 ? (
                      pin.comments.map((element) => {
                        return (
                          <Comment
                            key={element._id}
                            user={element.user}
                            comment={element.comment}
                            profileImage={element.profileImage}
                          />
                        );
                      })
                    ) : (
                      <p className="font-semibold text-lg"> No Comments Yet!</p>
                    )}
                  </div>
                  <div className="mt-4 relative">
                    <input
                      type="text"
                      placeholder="Comment"
                      className="w-full bg-gray-100 p-2 rounded-lg pr-12 focus:outline-red-500"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Send className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500" />
                  </div>
                </div>
              </div>
            </div>
            <h3 className="mt-10 text-2xl font-semibold">More to Explore</h3>
            <div className="flex space-x-4 overflow-x-auto py-4">
              {morePins &&
                morePins.map((element) => {
                  return (
                    <Link href={`/pin/${element._id}`} key={element._id}>
                      <Image
                        width={100}
                        height={100}
                        src={element?.image?.url}
                        alt={"Pin"}
                        className="w-32 h-32 object-cover rounded-lg shadow-md"
                        priority={true}
                        unoptimized={true}
                      />
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[750px]">
          <ClipLoader color="#ef4444" size={120} />
        </div>
      )}
    </>
  );
}

export default Pin;
