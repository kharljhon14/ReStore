import Container from '@/layouts/Container';
import Image from 'next/image';

export default function Error400() {
  return (
    <Container>
      <div className="flex items-center justify-center h-full">
        <Image src="/errors/404.png" alt="404 image" width={500} height={50} />
      </div>
    </Container>
  );
}
