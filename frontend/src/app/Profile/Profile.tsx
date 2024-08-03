import { ProfileRightSideForm } from "@/components/form/ProfileRightSideForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserAuth from "@/utils/UserAuth";
import Accesstoken from "@/utils/AccessToken";
import Socket from "@/utils/Socket";
import ProfileTabs from "./ProfileTabs";

interface TypeIS {
  name: string;
  username: string;
  avatar: string;
  email: string;
  threadInsid: any;
}

interface TypeArray {
  _id: string;
  title: string;
  avatar: string;
  description: string;
}

interface AvatarType {
  avatar: string;
}

interface VideoType {
  _id: string;
  description: string;
  thumbnail: string;
  title: string;
  videoFile: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<TypeIS>();
  const [proArray, setProArray] = useState<TypeArray[]>([]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [isAvatar, setIsAvatar] = useState<AvatarType>();
  const params = useParams<{ username: string }>();
  const user = UserAuth();
  const abortController = new AbortController();
  const accessToken = Accesstoken();
  const socket = Socket();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/users/get-username-profile/${params?.username}`, {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${accessToken}`, // Set the Authorization header
          },
          withCredentials: true, // Important for sending cookies
        });
        setProfile(response.data.data[0]);
        setProArray(response.data.data[0].threadInside);
        setVideos(response.data.data[0].videos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [params?.username]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });

    socket.on('updateProfileAvatar', (updatedAvatar) => {
      setIsAvatar(updatedAvatar);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <>
      {user ? (
        <>
          <div className="w-full mt-10">
            <div className="flex items-center gap-5 justify-center">
              <div className="space-y-2 mt-2 mb-2">
                {isAvatar?.avatar ? (
                  <img className="w-24 h-24 rounded-full object-cover" src={isAvatar?.avatar} alt="" />
                ) : (
                  <img className="w-24 h-24 rounded-full object-cover" src={profile?.avatar} alt="" />
                )}
              </div>
              <div className="flex flex-col dark:text-orange-500">
                <div className="flex gap-1">
                  <label className="font-serif uppercase underline -tracking-tighter">name</label>
                  <h2 className="font-semibold font-mono dark:text-green-500">: {profile?.name}</h2>
                </div>
                <div className="flex gap-1">
                  <label className="font-serif uppercase underline -tracking-tighter">username</label>
                  <h2 className="font-semibold font-mono dark:text-green-500">: {profile?.username}</h2>
                </div>
                <div className="flex gap-1">
                  <label className="font-serif uppercase underline -tracking-tighter">email</label>
                  <h2 className="font-semibold font-mono dark:text-green-500">: {profile?.email}</h2>
                </div>
              </div>
              <ProfileRightSideForm />
            </div>
          </div>
          <div className="w-full">
            <ProfileTabs mythreads={proArray} videoposts={videos} />
          </div>
        </>
      ) : (
        <div>
          <h1>Please Login First</h1>
        </div>
      )}
    </>
  );
}
