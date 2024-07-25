
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, createRoutesFromElements , Route , RouterProvider} from 'react-router-dom'
import {
  Layout,
} from './index.ts'

import {
  Threads,
  UploadVideo,
  ContactUs,
} from './index.ts'
import Signup from './auth/sign-up/Signup.tsx'
import Login from './auth/login/Login.tsx'
import UploadThread from './app/threads/UploadThread.tsx'
import { Videos } from './app/uploadVideo/Videos.tsx'
import { Home } from './app/home/Home.tsx'
import {Provider} from 'react-redux'
import { store } from './store/auth/store.ts'
import RequireAuth from './utils/AuthRequires.tsx'
import OnePage from './app/threads/OnePage.tsx'
import OneVideo from './app/uploadVideo/OneVideo.tsx'
import ProfileUpdate from './auth/update/profile/ProfileUpdate.tsx'

const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path='/' element={<Layout />}>

      {/* public routes */}
      <Route path='/' element={<Home />} />
      <Route path='/threads' element={<Threads />} />
      <Route path='/onethread/:threadId' element={<OnePage />} />
      <Route path='/video' element={<Videos />} />
      <Route path='/onevideo/:videoId' element={<OneVideo />} />
      <Route path='/sign-up' element={<Signup />} />
      <Route path='/sign-in' element={<Login />} />
      <Route path='/contact-us' element={<ContactUs />} />

    <Route element={<RequireAuth/>}>
      <Route path='/upload-thread' element={<UploadThread />} />
      <Route path='/profile' element={<ProfileUpdate />} />
      <Route path='/upload-video' element={<UploadVideo />} />
    </Route>





    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
  
)
