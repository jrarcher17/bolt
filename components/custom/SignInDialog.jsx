import React, { useContext } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Lookup from '@/data/Lookup'
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import { UserDetailContext } from '@/context/UserDetailContext';
import axios from 'axios';
import { useMutation, useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import uuid4 from 'uuid4';
import { toast } from 'sonner';

function SignInDialog({ openDialog,closeDialog }) {
const {userDetail,setUserDetail}=useContext(UserDetailContext);
const CreateUser=useMutation(api.users.CreateUser);
const convex=useConvex();

const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: 'Bearer '+tokenResponse?.access_token } },
        );
    
        const user=userInfo.data;
        console.log('Google user info:', user);

        // Create or get existing user
        const convexUser = await CreateUser({
            name:user?.name,
            email:user?.email,
            picture:user?.picture,
            uid:uuid4()
        });

        console.log('Convex user data:', convexUser);

        if (!convexUser?._id) {
            throw new Error('Failed to create/get user in database');
        }

        if(typeof window!==undefined) {
            localStorage.setItem('user',JSON.stringify({
                ...user,
                _id: convexUser._id,
                token: convexUser.token
            }));
        }

        setUserDetail(convexUser);
        closeDialog(false);
        toast.success('Successfully signed in!');
      } catch (error) {
        console.error('Sign in error:', error);
        toast.error('Failed to sign in. Please try again.');
      }
    },
    onError: errorResponse => {
      console.error('Google sign in error:', errorResponse);
      toast.error('Failed to sign in with Google. Please try again.');
    },
  });

    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription asChild>
                        <div className="flex flex-col items-center justify-center gap-3">
                        <h2 className='font-bold text-2xl text-center text-white'>{Lookup.SIGNIN_HEADING}</h2>
                        <p className='mt-2 text-center'>{Lookup.SIGNIN_SUBHEADING}</p>
                        <Button className="bg-blue-500 text-white hover:bg-blue-400
                        mt-3" onClick={googleLogin}>Sign In With Google</Button>

                        <p>{Lookup?.SIGNIn_AGREEMENT_TEXT}</p>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default SignInDialog