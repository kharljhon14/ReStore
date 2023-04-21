import Container from '@/layouts/Container';
import Image from 'next/image';

export default function Error500() {
  return (
    <Container>
      <div className="flex items-center justify-center h-full">
        <Image src="/errors/500.png" alt="500 image" width={500} height={50} />
      </div>
    </Container>
  );
}
