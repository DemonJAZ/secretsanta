import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { Link } from 'react-router-dom'

const customStyles = {
    content: {
      top: '30%',
      left: '30%',
      right: 'auto',
      bottom: 'auto',
      height: '200px',
      width: '400px'
    },
  };
function SantaSelector() {
    const [secretSanta,setSecretSanta] = useState('')
    const [kid,setKid] = useState('')
    const [userList, setUserList] = useState([])
    const [alreadyChoosen, setAlreadyChoosen] = useState([])
    const [finalList, setFinalList] = useState([])
    const [errorList, setErrorList] = useState(false)
    const [showModal,setShowModal] = useState(false)
    useEffect(() => {
        const list = window.sessionStorage.getItem("secretsantaData");
        if (list != null) {
            const currList = JSON.parse(list);
            randomizeList(currList)
            setUserList(JSON.parse(list))
        } else {
            setErrorList(true)
        }
    }, [])

    const randomizeList = (currlist)=>{
        let randomList = []
        let len = currlist.length
        for(let i=0;i<len;i++){
            let kidIndex = Math.trunc((Math.random()*100)%currlist.length)
            randomList.push(currlist[kidIndex]);
            currlist = currlist.filter((x)=> x!==currlist[kidIndex])
        }
        setFinalList(randomList)
    }
    const showTheKidForSanta = (user)=>{
        const turnList = [...alreadyChoosen,user]
        setAlreadyChoosen(turnList)
        setSecretSanta(user)

        let index = finalList.indexOf(user)
        setKid(finalList[(index+1)%finalList.length])
        
        let updateTurnsLeft = userList.filter(x=>x!==user);
        setUserList(updateTurnsLeft)
        setShowModal(true)
    }
    return (
        <>
            <div className='w-full flex justify-center p-10 text-white'>
                <h1 className='font-extrabold text-5xl' >Lets Get Those Gifts</h1>
            </div>
            {errorList ?
                <div className='flex justify-center'>
                    <div className='grid grid-cols-1 justify-center'>
                        <div className='flex'>
                            <h1>There is some Erro Fetching List, Please go back HOME and create new List</h1>
                        </div>
                        <div className='flex justify-center'>
                            <Link className='font-extrabold text-white' to={'/'}>HOME</Link>
                        </div>
                    </div>
                </div> :
                <div className='grid grid-cols-2'>
                    <div>
                        <div className='flex justify-center'>
                            <h1 className='font-extrabold text-5xl' >Select Your name</h1>
                        </div>
                        <div className='flex justify-center m-5'>
                            <ul className='grid grid-cols-1 gap-2'>
                                {userList.map((user,index) => {
                                    return <li key={index}><button type='button' onClick={()=>{showTheKidForSanta(user)}} className=' bg-white text-black font-semibold w-full p-2 rounded-lg shadow-lg hover:bg-green-400'>{user}</button></li>
                                })}
                            </ul>
                        </div>
                    </div>
                    <div>
                    <div className='flex justify-center'>
                            <h1 className='font-extrabold text-5xl' >Turns Completed</h1>
                        </div>
                        <div className='flex justify-center m-5'>
                            <ul className='grid grid-cols-1 gap-2'>
                                {alreadyChoosen.map((user,index) => {
                                    return <li key={index}><p className=' bg-white text-black font-semibold w-full p-2 rounded-lg shadow-md'>{user}</p></li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            }
            <ReactModal isOpen={showModal} className='bg-red-300 h-auto w-3/6 ml-80 mt-60 p-10 rounded-lg' >
                <div className='flex justify-center p-10'>
                    <h1 className='font-bold text-black'> 
                        Hi {secretSanta}, <br/>
                        You need to buy Gift for {kid}.
                    </h1>
                </div>
                <div className='flex justify-center p'>
                    <button type='button' className='w-2/4 bg-blue-500 rounded-lg' onClick={()=>{setShowModal(false)}}>Close</button>
                </div>
            </ReactModal>
        </>
    )
}

export default SantaSelector