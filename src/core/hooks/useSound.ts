import { useCallback, useRef } from "react";

export function useSound(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(
    (volume = 0.4) => {
      if (!audioRef.current) {
        audioRef.current = new Audio(src);
      }
      audioRef.current.volume = volume;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    },
    [src],
  );

  return play;
}
