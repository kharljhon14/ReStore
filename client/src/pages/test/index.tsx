import agent from '@/api/agent';
import Container from '@/layouts/Container';
import { error } from 'console';

export default function Test() {
  return (
    <Container>
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
          onClick={() => agent.errors.getServerError().catch((error) => console.log(error))}
          className="bg-primary rounded-md text-neutral p-2"
        >
          Server Error
        </button>
      </div>
    </Container>
  );
}
