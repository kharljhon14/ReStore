import BeatLoader from 'react-spinners/BeatLoader';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <BeatLoader size={24} color="#1A2A40" />
    </div>
  );
}
