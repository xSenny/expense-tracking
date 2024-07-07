import {getEncryptedTransactions} from '@/lib/actions/restapi.actions'
import { NextRequest } from 'next/server'

export const maxDuration = 55;
export const GET = async (req: NextRequest, res: Response) => {
  try {
    const auth = req.headers.get('Authorization')

    if (auth === null) {
      return new Response(JSON.stringify({
        error: 'You did not add a Authorization header.'
      }), {status: 404, headers: {
        'Content-Type': 'application/json'
      }})
    }

    const limit = Number(req.nextUrl.searchParams.get('limit') || 10)

    const transactions = await getEncryptedTransactions(auth, limit)

    return new Response(JSON.stringify(transactions), {status: 200, headers: {
      'Content-Type': 'application/json'
    }})
  } catch (e: unknown) {
    return new Response(JSON.stringify({
      error: e instanceof Error ? e.message : 'An unknown error happened.'
    }), {status: 500, headers: {
      'Content-Type': 'application/json'
    }})
  }
}