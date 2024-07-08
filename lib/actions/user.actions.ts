'use server'
import { UserProps } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";

export const createUser = async (user: UserProps) => {
  try {
    await connectToDatabase()

    const createdUser = await User.create(user)

    return createdUser;
  } catch (e) {
    console.log(e)
    throw new Error(typeof e === 'string' ? e : JSON.stringify(e))
  }
}

export const deleteUser = async (clerkId: string) => {
  try {
    await connectToDatabase()

    const userToDelete = await User.findOne({clerkId})

    if (!userToDelete) {
      throw new Error('Could not find the user')
    }

    await User.findOneAndDelete({clerkId})

    return {
      message: 'deleted successfully',
      deletedUser: userToDelete,
    }
  } catch (e) {
    console.log(e)
    throw new Error(typeof e === 'string' ? e : JSON.stringify(e))
  }
}

export const updateUser = async (user: UserProps) => {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({clerkId: user.clerkId}, user)

    return updatedUser;
  } catch (e) {
    console.log(e)
    throw new Error(typeof e === 'string' ? e : JSON.stringify(e))
  }
}