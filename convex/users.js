import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateUser=mutation({
    args:{
        name:v.string(),
        email:v.string(),
        picture:v.string(),
        uid:v.string()
    },
    handler:async(ctx,args)=>{
        try {
            console.log('CreateUser called with args:', args);
            
            //If user already exist
            const existingUser=await ctx.db.query('users').filter((q)=>q.eq(q.field('email'),args.email)).collect();
            console.log('Existing user query result:', existingUser);
            
            if(existingUser?.length > 0) {
                console.log('Found existing user:', existingUser[0]);
                return existingUser[0];
            }

            //if Not, Then add new user
            console.log('Creating new user with data:', args);
            const userId = await ctx.db.insert('users',{
                name:args.name,
                picture:args.picture,
                email:args.email,
                uid:args.uid,
                token:50000
            });
            console.log('New user insert result (ID):', userId);

            if (!userId) {
                throw new Error('Failed to insert new user - no ID returned');
            }

            // Get the newly created user
            const newUser = await ctx.db.get(userId);
            console.log('Retrieved new user:', newUser);
            
            if (!newUser) {
                throw new Error('Failed to retrieve newly created user');
            }

            // Verify the user data
            if (!newUser._id || !newUser.email) {
                console.error('Invalid user data:', newUser);
                throw new Error('Created user has invalid data');
            }
            
            return newUser;
        } catch (error) {
            console.error('Error in CreateUser:', error);
            throw error;
        }
    }
})

export const GetUser=query({
    args:{
        email:v.string()
    },
    handler:async(ctx,args)=>{
        try {
            console.log('GetUser called with email:', args.email);
            const users=await ctx.db.query('users').filter((q)=>q.eq(q.field('email'),args.email)).collect();
            console.log('GetUser query result:', users);
            
            if (!users || users.length === 0) {
                throw new Error('User not found');
            }
            return users[0];
        } catch (error) {
            console.error('Error in GetUser:', error);
            throw error;
        }
    }
})

export const UpdateToken=mutation({
    args:{
        token:v.number(),
        userId:v.id('users')
    },
    handler:async(ctx,args)=>{
        try {
            console.log('UpdateToken called with:', args);
            const result=await ctx.db.patch(args.userId,{
                token:args.token
            });
            console.log('UpdateToken result:', result);
            return result;
        } catch (error) {
            console.error('Error in UpdateToken:', error);
            throw error;
        }
    }
})