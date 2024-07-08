'use client'

import {useState, useEffect} from 'react'

import {Eye, EyeOff} from 'lucide-react'

const AuthToken = ({token}: {token: string}) => {
  const [shown, setShown] = useState(false)

  return (
    <div className='flex p-4 items-center gap-4 flex-col lg:flex-row'>
      <div className="bg-primary-foreground flex flex-wrap justify-center items-center gap-4 p-4 rounded-xl">
        {!shown ? (
          <p>************************************</p>
        ) : (
          <p className="break-all text-center">{token}</p>
        )}
        <button onClick={() => setShown(shown => !shown)}>{shown ? <EyeOff /> : <Eye />}</button>
      </div>
    </div>
  )
}

export default AuthToken;