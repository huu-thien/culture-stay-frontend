import {
  Alert,
  Avatar,
  Button,
  IconButton,
  Skeleton,
  Snackbar,
} from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import Message from '@/src/components/Contacts/Message/Message'
import { IContact, IMessage } from '@/src/components/Contacts/Contacts.type'
import { getListContact, getMessagesByUserId } from '@/src/apis/chat'
import Cookies from 'js-cookie'
import * as signalR from '@microsoft/signalr'
import { API_CHAT } from '@/src/constant'
import { toast } from 'react-toastify'

const Contacts = () => {
  const userLogin = JSON.parse(localStorage.getItem('user_login'))
  const [showChat, setShowChat] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null)
  const selectedContactRef = useRef<IContact | null>(null)
  const [contacts, setContacts] = useState<IContact[]>([])
  const [loadingContact, setLoadingContact] = useState<boolean>(false)
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  )
  const [messages, setMessages] = useState<IMessage[]>([])

  const accessToken: string | null = Cookies.get('jwt_token')

  const [open, setOpen] = React.useState(false)
  const [notifyMessage, setNotifyMessage] = React.useState('')

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  const fetchContacts = async () => {
    try {
      setLoadingContact(true)
      const { data } = await getListContact()
      setContacts(data)
    } catch (err) {
      throw err
    } finally {
      setLoadingContact(false)
    }
  }

  const fetchMessages = async (userId: number) => {
    try {
      const { data } = await getMessagesByUserId(userId)
      setMessages(data)
    } catch (error) {
      console.log(error)
    }
  }

  const initializeConnection = async () => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_CHAT}`, {
        accessTokenFactory: () =>
          accessToken ? accessToken : Promise.reject('Access token is null.'),
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build()

    newConnection.on('ReceiveMessage', async (message) => {
      if (message.fromUserId !== userLogin.id) {
        setNotifyMessage(`Bạn nhận tin nhắn từ ${message.fromUserName}`)
        setOpen(true)
      }

      if (selectedContactRef.current) {
        await fetchMessages(selectedContactRef.current.id)
      }
    })

    newConnection
      .start()
      .then(() => {
        console.log('Connected!')
      })
      .catch((err) => {
        console.error(err.toString())
      })

    setConnection(newConnection)
  }

  const sendMessage = () => {
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Connected &&
      message &&
      selectedContact
    ) {
      setMessage('')
      connection
        .invoke('SendMessageToUser', selectedContact.id.toString(), message)
        .then(async () => {
          await fetchMessages(selectedContact.id)
        })
        .catch((error) =>
          console.error('Error invoking SendMessageToUser:', error)
        )
    } else {
      console.error('SignalR connection not in a valid state.')
    }
  }

  useEffect(() => {
    if (userLogin) {
      fetchContacts()
    }
    if (accessToken) {
      initializeConnection()
    }
  }, [accessToken])

  useEffect(() => {
    selectedContactRef.current = selectedContact
  }, [selectedContact])

  return (
    <div className="mt-0 fixed top-24 right-0 bottom-0 custom-scrollbar">
      {userLogin && (
        <>
          {loadingContact ? (
            <>
              <Skeleton variant="rectangular" width={210} height={118} />
            </>
          ) : (
            <ul className="px-4">
              {contacts.map((contact) => (
                <li
                  className="hover:bg-gray-200 pr-6 rounded-md hover:cursor-pointer text-sm min-w-[300px]"
                  key={contact.fullName}
                >
                  <div
                    className="flex items-center cursor-pointer py-2 break-all border-b-2 border-solid hover:bg-gray-200"
                    onClick={() => {
                      setSelectedContact(contact)
                      setShowChat(true)
                    }}
                  >
                    <Avatar
                      src={contact.avatarUrl}
                      sx={{ width: 30, height: 30 }}
                      className="m-3"
                    />
                    <div className="grid grid-cols-1">
                      <span className="font-medium">{contact.fullName}</span>
                      <div className="inline-flex gap-4 font-light text-sm"></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div
            className={`w-80 bg-white absolute bottom-0 right-20 rounded-t-md text-sm ${
              showChat ? 'block' : 'hidden'
            }`}
          >
            <div className="flex flex-col justify-between">
              <div className="flex justify-between items-center border-b-2 bg-[#4b7782] text-white rounded-t-md">
                <div className="flex gap-2 items-center p-2">
                  <Avatar
                    src={selectedContact?.avatarUrl}
                    sx={{ width: 30, height: 30 }}
                  />
                  <p>{selectedContact?.fullName}</p>
                </div>
                <div className="m-2">
                  <IconButton onClick={() => setShowChat(false)}>
                    <CloseIcon fontSize="small" sx={{ color: '#fff' }} />
                  </IconButton>
                </div>
              </div>
              <Message
                selectedContact={selectedContact}
                messages={messages}
                fetchMessages={fetchMessages}
              />
              <div className="flex items-center p-2 gap-3">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <IconButton>
                  <SendIcon fontSize="small" onClick={sendMessage} />
                </IconButton>
              </div>
            </div>
          </div>
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="info"
              sx={{
                width: '100%',
                backgroundColor: '#4b7782',
                color: '#fff',
                '&MuiSvgIcon-root': {
                  color: '#fff',
                },
              }}
            >
              {notifyMessage}
            </Alert>
          </Snackbar>
        </>
      )}
    </div>
  )
}

export default Contacts
