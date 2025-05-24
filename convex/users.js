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
            //If user already exist
            const existingUser=await ctx.db.query('users').filter((q)=>q.eq(q.field('email'),args.email)).collect();
            console.log('Existing user query result:', existingUser);
            
            if(existingUser?.length > 0) {
                console.log('Returning existing user:', existingUser[0]);
                return existingUser[0];
            }

            //if Not, Then add new user
            console.log('Creating new user with data:', args);
            const result=await ctx.db.insert('users',{
                name:args.name,
                picture:args.picture,
                email:args.email,
                uid:args.uid,
                token:50000
            });
            console.log('New user insert result:', result);

            // Get the newly created user
            const newUser = await ctx.db.get(result);
            console.log('Retrieved new user:', newUser);
            
            if (!newUser) {
                throw new Error('Failed to retrieve newly created user');
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
            const result=await ctx.db.patch(args.userId,{
                token:args.token
            });
            return result;
        } catch (error) {
            console.error('Error in UpdateToken:', error);
            throw error;
        }
    }
})