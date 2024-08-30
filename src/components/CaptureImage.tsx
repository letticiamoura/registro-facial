import { useRef } from 'react';
import Webcam from 'react-webcam';

interface ICaptureImageProps {
  onCapture: (imageSrc: string | null) => void;
}

export default function CaptureImage({ onCapture }: ICaptureImageProps) {
 
    const webcamRef = useRef<Webcam>(null);

    const capture = () => {
        if (webcamRef.current) {
          const imageSrc = webcamRef.current.getScreenshot();
          onCapture(imageSrc || null); 
          console.log("Capturando: " + capture)
        }
      };

  return (
    <div className="flex flex-col py-5 items-center">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        className="bg-orange-600 border-2 border-orange-500 h-72 w-72 rounded-full object-cover"
        videoConstraints={{
          facingMode: 'user',
        }}
      />
      <p className="px-5 pt-2 text-center">
        <span className="font-bold text-orange-500 text-md">Sorria!</span> Seu close de hoje vai direto para o álbum de presença!
      </p>
    </div>
  );
}
