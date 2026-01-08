import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import useAuthStore from '@/store/useAuthStore';
import { FormData } from '@/types/Register.type';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/validation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { toast } from 'react-toastify';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {register} = useAuthStore();

  const form = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'user',
    },
  });

  const onsubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await register(data);
      toast.success("Registration successful! Please log in.");
      navigate("/login");
      
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md px-4"
      >
        <Card className="w-full bg-white/95 backdrop-blur-sm shadow-xl border border-gray-200">
          <CardHeader className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CardTitle className="text-3xl font-bold text-gray-800">
                Create an Account
              </CardTitle>
              <CardDescription className="text-gray-500">
                Enter your details below to register a new account.
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onsubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Name :
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="shakib khan"
                          type="text"
                          disabled={isLoading}
                          {...field}
                          className="border placeholder:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Email :
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@gmail.com"
                          type="email"
                          disabled={isLoading}
                          {...field}
                          className="border placeholder:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Password :
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="*******"
                          type="password"
                          disabled={isLoading}
                          {...field}
                          className="border placeholder:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Role :
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          disabled
                          {...field}
                          className="border"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex gap-2 bg-indigo-600 hover:bg-indigo-700 hoverEffect text-white font-semibold py-2 rounded-lg"
                >
                  <UserPlus size={18} />
                  Sign Up
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter
            className='justify-center'
          >
            <p
              className='text-sm text-gray-500'
            >
              Already have an account? {" "}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-800 hoverEffect hover:underline">
                Log In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
