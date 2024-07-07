'use server'

import { auth } from "@clerk/nextjs/server";
import { getTransactionsCached } from "./transaction.actions";
import Transaction from "../database/models/transaction.model";

const CryptoJS = require('crypto-js');

const SECRET_KEY = process.env.SECRET_KEY;

const encrypt = (text: string) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

const decrypt = (encryptedText: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export const getKey = () => {

  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string;

  return encrypt(userId)
}

export const getEncryptedTransactions = async (encryptedKey: string, limit: number = 10) => {
  try {
    const user = decrypt(encryptedKey)
    const transactions = await Transaction.find({user}).sort({createdAt: 'desc'}).limit(limit).select('-_id -user -__v').exec()
    return {transactions}
  } catch (e) {
    throw new Error('Error receiving your transactions. Make sure you use the correct Authorization value.')
  }
}