import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Layout/Header'
import { useSelector } from 'react-redux'
import socketIO from "socket.io-client"
import axios from 'axios'
import { toast } from 'react-toastify'
import { backend_url, server } from '../server'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { TfiGallery } from 'react-icons/tfi'
import styles from '../styles/styles'
import { IoSendSharp } from 'react-icons/io5'





const ENDPOINT = "https://sockettanijual-production.up.railway.app/"
const socketId = socketIO(ENDPOINT, {transports : ["websocket"]})




const UserInboxPage = () => {
    const {seller} = useSelector((state) => state.seller)
    const {user} = useSelector((state) => state.user)
    const [conversations,setConversations] = useState([]);
    const [open,setOpen] = useState(false);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [messages,setMessages] = useState([])
    const [currentChat,setCurrentChat] = useState(null);
    const [newMessage,setNewMessage] = useState("");
    const [test,setTest] = useState(null)
    const [test2,setTest2] = useState([]);
    const [test3,setTest3] = useState();
    const [onlineUsers,setOnlineUsers] = useState();
    const [activeStatus,setActiveStatus] = useState(false);
    const [cariInfo,setCariInfo] = useState();
    const scrollRef = useRef(null);
    const [images,setImages] = useState();

    console.log("arrivalMessage", arrivalMessage)

    useEffect(() => {
        socketId.on("getMessage", (data) => { 

          /* data.images = data.images === null ? [data.images] : null */
         
          
            setArrivalMessage({
              sender : data.senderId,
              text : data.text,
              createdAt : Date.now(),
              images : {
                url : data.images
              }
            })
          
         
        })
      },[])
    
      useEffect(() => {
        arrivalMessage &&
          currentChat?.members.includes(arrivalMessage.sender) &&
          setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, currentChat]);
    
      useEffect(() => {
        const getConversation = async () => {
          try {
            const resonse = await axios.get(
              `${server}/conversation/get-all-conversation-user/${user?._id}`,
              {
                withCredentials: true,
              }
            );
    
            setConversations(resonse.data.conversations);
          } catch (error) {
            // console.log(error);
          }
        };
        getConversation();
      }, [user, messages]);
    
      useEffect(() => {
        if (user) {
          const userId = user?._id;
          socketId.emit("addUser", userId);
          socketId.on("getUsers", (data) => {
            setOnlineUsers(data);
          });
        }
      }, [user]);
    
      const onlineCheck = (chat) => {
        const chatMembers = chat.members.find((member) => member !== user?._id);
        const online = onlineUsers?.find((user) => user?.userId === chatMembers);
    
        return online ? true : false;
      };
    
      // get messages
      useEffect(() => {
        const getMessage = async () => {
          try {
            const response = await axios.get(
              `${server}/message/get-all-messages/${currentChat?._id}`
            );
            setMessages(response.data.messages);
          } catch (error) {
            console.log(error);
          }
        };
        getMessage();
      }, [currentChat]);
    
      // create new message
      const sendMessageHandler = async (e) => {
        e.preventDefault();
    
        const message = {
          sender: user._id,
          text: newMessage,
          conversationId: currentChat._id,
        };
        const receiverId = currentChat.members.find(
          (member) => member !== user?._id
        );
    
        socketId.emit("sendMessage", {
          senderId: user?._id,
          receiverId,
          text: newMessage,
        });
    
        try {
          if (newMessage !== "") {
            await axios
              .post(`${server}/message/create-new-message`, message)
              .then((res) => {
                setMessages([...messages, res.data.message]);
                updateLastMessage();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      const updateLastMessage = async () => {
        socketId.emit("updateLastMessage", {
          lastMessage: newMessage,
          lastMessageId: user._id,
        });
    
        await axios
          .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
            lastMessage: newMessage,
            lastMessageId: user._id,
          })
          .then((res) => {
            setNewMessage("");
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      useEffect(() => {
        scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
      }, [messages]);


      const handleImageUpload = async(e) => {
        
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
          if(reader.readyState === 2){
            setImages(reader.result)
            imageSendingHandler(reader.result)
          }
        }
        
      }

      const imageSendingHandler = async(e) => {
        const formData = new FormData();
        /* console.log("imagesending ", e.name)
        formData.append("images", e)
        formData.append("sender", user._id)
        formData.append("text", newMessage)
        formData.append("conversationId", currentChat._id)
 */

        const receiverId = currentChat.members.find((member) => member != user._id)

        

        try{
          await axios.post(`${server}/message/create-new-message`, {
            images : e,
            sender : user._id,
            text : newMessage,
            conversationId : currentChat._id
          }).then((res) => {
            setImages();
            setMessages([...messages,res.data.message])
            socketId.emit("sendMessage", {
              senderId : user._id,
              receiverId,
              images : res.data.message.images.url
            })
            updateLastMessageForImage();
          })
      
        }catch(error){
          console.log("error" , error)
          toast.error(`${error}`);
        }
      }

      const updateLastMessageForImage = async () => {
        await axios.put(`${server}/conversation/update-last-message/${currentChat._id}`,{
          lastMessage : "Gambar",
          lastMessageId : user._id
        })
      }

  return (
    <div className="w-full">
        <Header />
        {
          !open && (
           <>
            <h1 className="text-center text-[30px] font-Poppins">Semua Pesan</h1>

            {
              conversations && conversations.map((item,index) => {
                return <MessageList 
                  data={item}
                  key={index}
                  index = {index}
                  setOpen={setOpen}
                  setCurrentChat={setCurrentChat}
                  me={user?._id}
                  test = {test}
                  setTest = {setTest}
                  test2 ={test2}
                  setTest2 = {setTest2}
                  test3 = {test3}
                  setTest3 = {setTest3}
                  online = {onlineCheck(item)}
                  setActiveStatus = {setActiveStatus}
                  newMessage = {newMessage}
                  setNewMessage = {setNewMessage}
                  sendMessageHandler = {sendMessageHandler}
                  messages = {messages}
                  userId = {user?.id}
                 
                  open = {open}
                  scrollRef = {scrollRef}
                  

                
                />
              })
            }
           </>

           
           
          )
        }
        {
          open && (
            <SellerInbox setOpen={setOpen} newMessage={newMessage} setNewMessage={setNewMessage} sendMessageHandler={sendMessageHandler} messages={messages} userId={user?._id} userinfo={test3} activeStatus = {activeStatus} scrollRef={scrollRef} test3={test3} handleImageUpload = {handleImageUpload} />
          )
        }
        
    </div>
  )
}


const MessageList = ({data,key,index,setOpen, setCurrentChat, me,test2,setTest2,online, setTest3, setActiveStatus, open, newMessage, setNewMessage, sendMessageHandler, messages, userId, userInfo, scrollRef}) => {
    const [active,setActive] = useState(0);
    const navigate = useNavigate()
    const [test,setTest] = useState(null)

   useEffect(() => {
      console.log("isi data", data);
      const shopId = data.members.find((user) => user !== me)
      console.log(`Message ${index} : `, online)

      const getShop = async() =>{
        try{
              setActiveStatus(online)
              await axios.get(`${server}/shop/get-shop-info/${shopId}`).then((res) => {
              setTest(res.data.shop);
              
              setTest2((test2) => [...test2,res?.data?.shop])
            }).then((res) => {
              console.log("user data")
            })
            
            
        }

        catch(error){

        }
        
      }
      getShop();
   },[me,data])

 

    const handleClick = (id) => {
      
      navigate(`?${id}`)
      setOpen(true)
    }

    const handleInfo = async (data) => {
      const shopId = data.members.find((user) => user !== me)
      try{
        await axios.get(`${server}/shop/get-shop-info/${shopId}`).then((res) => {
          setTest3(res.data.shop)
          
        })
      }catch(error){
        toast.error("gak bisa dibuka")
      }
  
    }

    console.log("isi : " ,test2)

    useEffect(() => {
      console.log("id last :", data?.lastMessageId)
      console.log("test id : ", test?._id)
    },[data])

    return (
        <div className={`w-full flex p-2 px-3  bg-[#1111111a] items-center ${active === index ? 'bg-[#00000010]' : 'bg-transparent'} cursor-pointer`}
        /* onClick={(e) => console.log(test2)} */
        onClick={(e) => setActive(index) || handleClick(data._id) || setCurrentChat(data) || handleInfo(data)}
      >
          <div className="relative">
          <img src={`${test?.avatar?.url}`} alt="" className="w-[80px] h-[80px] rounded-full" />
          {
              online ? (<div className="w-[15px] h-[15px] bg-green-400 rounded-full absolute top-1 right-2">
              </div>)   : (
                <div className="w-[15px] h-[15px] bg-gray-400 rounded-full absolute top-1 right-2">

                </div>
              )
          }


          </div>
          <div className="pl-4">
          <h1 className="text-[18px] font-[600]">
          {test?.name}
          </h1>
          <p className="text-[16px] text-black">
          {
              data?.lastMessageId !== test?._id ? "Anda : ": ""
            } {data?.lastMessage}
          </p>
          </div>
  </div>
    )
}

export default UserInboxPage


const SellerInbox = ({setOpen, newMessage, setNewMessage, sendMessageHandler,messages, userId,userinfo, activeStatus, scrollRef, test3, online, handleImageUpload }) => {


  /* const [test,setTest] = useState(null)

   useEffect(() => {
      const userId = data.members.find((user) => user != sellerId)
      console.log("user Id :", userId)

      const getUser = async() =>{
        try{
              await axios.get(`${server}/user/user-info/${userId}`).then((res) => {
              console.log(res.data.user)
              setTest(res.data.user);
            }).then((res) => {
              console.log("user data")
            })
            
            
        }

        catch(error){

        }
        
      }
      getUser();
   },[sellerId,data]) */
  const handleSumbit = (e) => {
    e.preventDefault();
  
  } 
 
  console.log("online ",activeStatus)

    return (
      <div className="w-full min-h-full flex flex-col justify-between">
        <div className="w-full flex p-3 justify-between items-center border-b-4 ">
            <div className="flex items-center">
            <img src={`${userinfo?.avatar?.url}`} alt="" className="w-[60px] h-[60px] rounded-full border"/>
            <div className="pl-3">
          <h1 className="text-[18px] font-[600]">
          {userinfo?.name}
         </h1>
         <h1>
          {activeStatus ? "Sedang Aktif" : "Tidak Aktif"}
         </h1>
          </div>
         </div>
        <FaArrowLeft size={30} onClick={() => setOpen(false)}/>
        </div>

        {/* untuk pesan */}
        <div className="px-3 h-[70vh] py-3 overflow-y-scroll">

        {
          messages && messages.map((item,index) => (
            
              <div className={`flex w-full items-center my-2 ${item.sender === userId ? "justify-end" : "justify-start"}`} ref={scrollRef}>
              <img src={`${userinfo?.avatar?.url}`} alt="" className={`w-[60px] h-[60px] rounded-full mr-3 ${item.sender === userId ? "hidden" : ""}`}  />
              <div className={`w-max  h-min rounded p-2 ${item.sender === userId ? "bg-gray-500" : "bg-green-500"}`} onClick={handleSumbit}>
                {/* <p className="text-white">{item.text}</p> */}
                { /* pesan */}
                {
                  item?.images?.url ? (
                    <img 
                      src={`${item.images?.url}`} 
                      className="w-[300px] h-[300px] object-cover rounded-[10px] ml-2 mb-2"
                      onClick={() => console.log(item?.images?.url)}
                      />
                  ) : (null)
                }
                {
                  item.text !== "" && (
                    <p className="text-white">{item.text}</p>
                  )
                }
              </div>
              </div>
            
          ))
          
        }
        </div>
        
        

        {
            <form onSubmit={sendMessageHandler} aria-required={true} className="p-3 w-full flex justify-between items-center">
            <div className="w-[30px]">
            <input
              type="file"
              name=""
              id="image"
              className="hidden"
              onChange={handleImageUpload}
            />
            <label htmlFor="image">
              <TfiGallery className="cursor-pointer" size={20} />
            </label>
        </div>
           <div className="w-[97%] relative">
            <input type="text" required value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder='Coba Tanyakan ke Penjual' className={`${styles.input} `} />
              <input type="submit" value="Kirimkan" className="hidden" id="send"/>
              <label htmlFor="send">
                <IoSendSharp className='absolute right-5 top-2 cursor-pointer' size={22} />
              </label>
           </div>
           </form>
        }
      </div>
    )
}

