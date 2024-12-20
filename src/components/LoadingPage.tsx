export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4"></div>
        <h2 className="text-center text-gray-600 text-xl font-semibold">
          Carregando...
        </h2>
      </div>

      <style>{`
        .loader {
          border-top-color: #012E40;
          animation: spinner 2s linear infinite;
        }
        @keyframes spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
