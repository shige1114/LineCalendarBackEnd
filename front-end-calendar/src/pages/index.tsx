import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import Button from 'react-bootstrap/Button';
const Home: NextPage = (...props:any) => {
  const router= useRouter()
  const liff = props.liff
  const token = (liff!=null)? liff.getAccessToken() : ""
  const onClkickMove = () => {
		const keyword = {
			calendar_id:""
		}
		router.push({ pathname: 'event-view', query: keyword })
	}
  return (
    
    <>
      <>{token}</>
      <Button onClick={()=>onClkickMove()}>
        イベント登録
      </Button>
    </>
  )
}

export default Home
