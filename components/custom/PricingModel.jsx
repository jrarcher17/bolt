import Lookup from '@/data/Lookup'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { UserDetailContext } from '@/context/UserDetailContext'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

function PricingModel() {
    const {userDetail,setUserDetail}=useContext(UserDetailContext);
    const UpdateToken=useMutation(api.users.UpdateToken)
    const [selectedOption,setSelectedOption]=useState();

    useEffect(() => {
        console.log('Current userDetail:', userDetail);
    }, [userDetail]);
     
    const onPaymentSuccess=async()=>{
        try {
            console.log('Payment success - userDetail:', userDetail);
            console.log('Selected option:', selectedOption);

            if (!userDetail?._id) {
                console.error('Missing user ID. Full userDetail:', userDetail);
                throw new Error('User ID not found. Please try logging in again.');
            }

            const currentTokens = Number(userDetail?.token) || 0;
            const newTokens = Number(selectedOption?.value) || 0;
            const totalTokens = currentTokens + newTokens;

            console.log('Updating tokens:', {
                currentTokens,
                newTokens,
                totalTokens,
                userId: userDetail._id
            });

            await UpdateToken({
                token: totalTokens,
                userId: userDetail._id
            });

            // Update local user detail state
            setUserDetail(prev => ({
                ...prev,
                token: totalTokens
            }));

            toast.success('Payment successful! Tokens added to your account.')
        } catch (error) {
            console.error('Error updating tokens:', error);
            toast.error(error.message || 'Payment successful but failed to update tokens. Please contact support.')
        }
    }

    const onError = (err) => {
        console.error('PayPal Error:', err);
        toast.error('Payment failed. Please try again or contact support.');
    }

  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
    xl:grid-cols-4 gap-5'>
        {Lookup.PRICING_OPTIONS.map((pricing,index)=>(
            <div key={index} className='border p-7 rounded-xl flex flex-col gap-3' 
           >
                <h2 className='font-bold text-2xl'>{pricing.name}</h2>
                <h2 className='font-medium text-lg'>{pricing.tokens} Tokens</h2>
                <p className='text-gray-400'>{pricing.desc}</p>
                
                <h2 className='font-bold text-4xl text-center mt-6'>${pricing.price}</h2>

                {/* <Button>Upgrade to {pricing.name}</Button> */}
                <PayPalButtons 
                disabled={!userDetail?._id}
                onClick={()=>{
                    console.log('Setting selected option:', pricing);
                    setSelectedOption(pricing);
                }}
                style={{ layout: "horizontal" }}
                onApprove={()=>onPaymentSuccess()}
                onError={onError}
                onCancel={()=>{
                    // console.log("Payment Canceled");
                    toast.error('Payment was cancelled');
                }}
                createOrder={(data,actions)=>{
                    return actions.order.create({
                        purchase_units:[
                            {
                                amount:{
                                    value:pricing.price,
                                    currency_code:'USD'
                                }
                            }
                        ]
                    })
                }}
                />
            </div>
        ))}
    </div>
  )
}

export default PricingModel