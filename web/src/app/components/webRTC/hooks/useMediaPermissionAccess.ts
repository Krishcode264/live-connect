"use client ";
import { useEffect, useState } from "react";
export const useMediaPermissionAccess = () => {
  interface MediaState {
    video: string;
    audio: string;
  }
  const [media, setMedia] = useState<MediaState>({ video: "", audio: "" });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const { state: video } = await navigator.permissions.query({
        name: "camera" as PermissionName,
      });
      const { state: audio } = await navigator.permissions.query({
        name: "microphone" as PermissionName,
      });

      setMedia(() => ({ audio, video }));
      setIsLoading(false);
    })();
  }, []);

  return { media, isLoading };
};
