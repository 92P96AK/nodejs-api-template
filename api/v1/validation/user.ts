import * as yup from 'yup'

export const login = yup.object({
   body: yup.object({
      email: yup.string().email().required('Email is not provided'),
      password: yup
         .string()
         .min(10, 'Password must have atleast 10 characters')
         .required('Password is not provided'),
   }),
})

export const newUser = yup.object({
   body: yup.object({
      username: yup.string().required('Username is not provided'),
      name: yup.string().required('Name is not provided'),
      email: yup.string().required('Email is not provided'),
      password: yup
         .string()
         .min(10, 'Password must have atleast 10 characters')
         .required('Password is not provided'),
   }),
})
