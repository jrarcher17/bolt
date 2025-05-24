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
        //If user already exist
        const existingUser=await ctx.db.query('users').filter((q)=>q.eq(q.field('email'),args.email)).collect();
        
        if(existingUser?.length > 0) {
            return existingUser[0];
        }

        //if Not, Then add new user
        const result=await ctx.db.insert('users',{
            name:args.name,
            picture:args.picture,
            email:args.email,
            uid:args.uid,
            token:50000
        });

        // Get the newly created user
        const newUser = await ctx.db.get(result);
        return newUser;
    }
})

export const GetUser=query({
    args:{
        email:v.string()
    },
    handler:async(ctx,args)=>{
        const users=await ctx.db.query('users').filter((q)=>q.eq(q.field('email'),args.email)).collect();
        if (!users || users.length === 0) {
            throw new Error('User not found');
        }
        return users[0];
    }
})

export const UpdateToken=mutation({
    args:{
        token:v.number(),
        userId:v.id('users')
    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.patch(args.userId,{
            token:args.token
        });
        return result;
    }
})