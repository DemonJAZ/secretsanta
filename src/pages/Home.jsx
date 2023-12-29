import React, { useState, useEffect } from 'react'
import { redirect, useNavigate } from 'react-router-dom'

function Home() {
    const [name, setName] = useState('')
    const [nameList, setNameList] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const list = window.sessionStorage.getItem("secretsantaData");
        if (list != null) {
            setNameList(JSON.parse(list))
        }
    }, [])


    const addName = () => {
        const updatedList = [...nameList, name]
        window.sessionStorage.setItem("secretsantaData", JSON.stringify(updatedList))
        setNameList(updatedList);
        setName('')
    }

    const setData = () => {
        window.sessionStorage.setItem("secretsantaData", JSON.stringify(nameList))
        navigate('/getsanta')
    }

    return (
        <>
            <div className='w-full flex justify-center p-10 text-white'>
                <h1 className='font-extrabold text-5xl' >Secret Santa Application</h1>
            </div>
            <div className='flex justify-center'>
                <form className='grid grid-cols-1 gap-2'>
                    <label className='text-white font-bold text-xl'>Enter Name of participants</label>
                    <input className='rounded-xl p-2' type='text' name='name' onChange={(e) => setName(e.target.value)} value={name} />
                    <button className='bg-white rounded-lg hover:bg-green-400 border-1 border-black hover:border-2 hover:border-black' type='button' onClick={addName}>Add</button>
                </form>
            </div>
            {nameList.length > 0 && <div className='flex justify-center'>
                <div className='flex w-2/4 m-5 rounded-2xl bg-gradient-to-b from-white to-slate-400'>
                    <div className='m-5' >
                        <div>
                            <ul className='list-disc'>
                                {nameList.map((n) => {
                                    return <li>{n}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>}

            <div className='flex justify-center p-5'>
                <button type='button' className='bg-red-50 rounded-xl w-1/4  hover:bg-green-400 hover:border-2 hover:border-black' onClick={() => setData()} >Finish</button>
            </div>

        </>
    )
}

export default Home