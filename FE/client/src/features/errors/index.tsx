import agent from '@/api/agent';
import { isIError } from '@/utils/error';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

export default function ErrorButtons() {
  //   const router = useRouter();
  const catchServerError = (error: AxiosError) => {
    if (!error.response) return;

    const { data, status } = error.response;
    //Add more status code errors

    if (typeof data === 'object' && isIError(data)) {
      switch (status) {
        case 400:
          break;

        case 500:
          //   router.push('/');
          break;
      }
    }
  };

  return (
    <div className="flex flex-col space-y-4 pt-4">
      <button
        onClick={() => agent.errors.get400Error().catch((error) => console.log(error))}
        className="bg-primary rounded-md text-neutral p-2"
      >
        Not Found
      </button>
      <button
        onClick={() => agent.errors.getBadRequest().catch((error) => console.log(error))}
        className="bg-primary rounded-md text-neutral p-2"
      >
        Bad Request
      </button>
      <button
        onClick={() => agent.errors.getUnauthorised().catch((error) => console.log(error))}
        className="bg-primary rounded-md text-neutral p-2"
      >
        Unauthorised
      </button>
      <button
        onClick={() => agent.errors.getValidationError().catch((error) => console.log(error))}
        className="bg-primary rounded-md text-neutral p-2"
      >
        Validation Error
      </button>
      <button
        onClick={() => agent.errors.getServerError().catch(catchServerError)}
        className="bg-primary rounded-md text-neutral p-2"
      >
        Server Error
      </button>
    </div>
  );
}
