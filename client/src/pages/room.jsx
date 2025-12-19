import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../providers/Socket'
import { usePeer } from '../providers/Peer'
import LiveVideoPlayer from '../components/LiveVideoPlayer'

const RoomPage = () => {
    const { socket } = useSocket()
    const { createOffer, createAnswer, setRemoteAns, sendStream, remoteStream } = usePeer()

    const [myStream, setMyStream] = useState(null)

    const handleNewuserJoined = useCallback( async (data)=>{
            const{ emailId } = data
            console.log('new user joined room ', emailId)
            const offer =  await createOffer()
            socket.emit('call-user', {emailId, offer})
        },
        [createOffer, socket]
    )

    const handleIncommingCall = useCallback( async (data) => {
        const{ from, offer } = data
        console.log('incomming call from', from, offer)
        const ans = await createAnswer(offer)
        socket.emit('call-accepted', { emailId: from, ans})
    }, [createAnswer, socket])
    
    const handleCallAccepted = useCallback( async(data) => {
        const { ans } = data
        console.log('call got accepted', ans)
        await setRemoteAns(ans)
    }, [ setRemoteAns])

    const getUserMediaStream = useCallback( async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true})
        
        setMyStream(stream)
    }, [])

    useEffect(()=>{
        socket.on('user-joined', handleNewuserJoined)
        socket.on('incomming-call', handleIncommingCall)
        socket.on('call-accepted', handleCallAccepted)

        return () => {
            socket.off('user-joined', handleNewuserJoined);
            socket.off('incomming-call', handleIncommingCall);
            socket.off('call-accepted', handleCallAccepted);
        }
    }, [ handleNewuserJoined, handleIncommingCall, handleCallAccepted, socket])

    useEffect(() => {
        getUserMediaStream()
    }, [getUserMediaStream])
  return (
    <div className='RoomPage-container'>
        <h1>
            Room page
        </h1>
        <button onClick={(e) => sendStream(myStream)} >Send my Video</button>
        <div className="video-grid">
            <LiveVideoPlayer stream={myStream} muted />
            <LiveVideoPlayer stream={remoteStream} />
        </div>
        
    </div>
  )
}

export default RoomPage