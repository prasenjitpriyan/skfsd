export default function Eye() {
  return (
    <div className="eye w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
      <div className="w-8 h-8 bg-black rounded-full animate-[movePupil_2s_ease-in-out_infinite]" />
      <style jsx>{`
        @keyframes movePupil {
          0%,
          100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(-10px, -10px);
          }
          50% {
            transform: translate(10px, 10px);
          }
          75% {
            transform: translate(-10px, 10px);
          }
        }
      `}</style>
    </div>
  );
}
