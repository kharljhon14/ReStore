import Button from '@/components/buttons/Button';
import Input from '@/components/inputs/Input';
import { useLoginMutation } from '@/redux/services/auth';
import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';
import { BsShieldLock } from 'react-icons/bs';

export default function LoginForm() {
  const router = useRouter();

  const [login, loginState] = useLoginMutation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    login({ userName: username, password });
  };

  useEffect(() => {
    if (loginState.isSuccess) {
      localStorage.setItem('user', JSON.stringify(loginState.data));
      router.push('/catalog');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginState.isSuccess, loginState.data]);

  return (
    <div className="flex flex-col justify-center items-center h-[80vh] space-y-8">
      <div className="text-4xl text-primary">
        <BsShieldLock />
      </div>
      <form onSubmit={handleLogin} className="space-y-3 w-full px-4" action="">
        <Input
          className="p-2 border-primary border rounded-sm w-full"
          name="username"
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(value) => setUsername(value.target.value)}
        />
        <Input
          className="p-2 border-primary border rounded-sm w-full"
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(value) => setPassword(value.target.value)}
        />
        <Button className="w-full">Login</Button>
      </form>
      <span>Register</span>
    </div>
  );
}
