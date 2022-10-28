import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect, useSyncExternalStore } from "react";
import liff from '@line/liff';
import { getCalendar } from './api/getCalendar';
import { LineProvider } from 'src/domain/context';
import { LineAouth } from 'src/components/LineAuth';
function MyApp({ Component, pageProps }: any) {

  // Execute liff.init() when the app is initialized
  
  /*
  const getCalendarNumber = (month: string) => {
    setCalendarNumber(getCalendar("2022" + "-" + month))
  }
  const get_user_name = async (liff: any) => {
    if (liff.isLoggedIn()) {
      try {
        const profile = await liff.getProfile()
        if (user_name != profile.displayName) {
          setUserName(profile.displayName)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
  const get_event = async (liff: any) => {
    if (liff.isLoggedIn()) {
      const groupId = (await liff.getContext())?.groupId
      try {
        const endpoint = "http://localhost:5000/webview/event_view"// 'https://line-chat-bot-1114.herokuapp.com/webview/event_view'//
        const keyword = {
          room_id: groupId,
        }
        const JSONdata = JSON.stringify(keyword)
        const options = {
          method: 'POST',
          mode: "cors" as RequestMode,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSONdata,
        }
        const response = await fetch(endpoint, options)
        const result = await response.json()
        const events = (result.events) ? result.events : []
        if (events != event) { setEvent(events) }
      } catch (e) {
        console.log(e)
      }
    }*/

  

  // Provide `liff` object and `liffError` object
  // to page component as property
  
  return (
    <LineProvider>
      <LineAouth/>
      <Component {...pageProps} />
    </LineProvider>

  )
}

export default MyApp
