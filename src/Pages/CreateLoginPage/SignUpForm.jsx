import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm({setCurrentUser}) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault();
    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentUser(data.username); 
        navigate('/', { state: { user: data.username } }); 
      })
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  function toggleShowPassword() {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='register-field text-4xl translate-y-[-6.5rem]'>
        Create an Account
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        <div className='input-container'>
          <label className='block mb-2 translate-y-[-3rem] translate-x-[4.4rem]'>Username:</label>
          <input name='username' onChange={handleChange} className='mb-4 translate-y-[-3rem] translate-x-[1.5rem]' />
          <label className='block mb-2 translate-y-[-3rem] translate-x-[5.5rem]'>Email:</label>
          <input name='email' onChange={handleChange} className='mb-4 translate-y-[-3rem] translate-x-[1.5rem]' />
          <label className='block mb-2 translate-y-[-3rem] translate-x-[4.4rem]'>Password:</label>
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange}
              name="password"
              className='mb-4 pr-12 translate-y-[-3rem] translate-x-[0rem]'
            />
            <input
              type='checkbox'
              id='showPassword'
              onChange={toggleShowPassword}
              className='absolute right-2 top-2 translate-y-[-3rem] translate-x-[2rem]'
            />
            <label htmlFor='showPassword'></label>
          </div>
        </div>
        <button
          type='submit'
          className='submit-button font-chakra-petch rounded-md border border-transparent px-2 py-1 text-base font-medium text-white bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500border hover:border-indigo-300  focus-visible:outline-[4px] focus-visible:ring-[auto] focus-visible:ring-opacity-50 focus-visible:ring-indigo-500'
        >
          Submit
        </button>
      </form>
    </div>
  )
}
