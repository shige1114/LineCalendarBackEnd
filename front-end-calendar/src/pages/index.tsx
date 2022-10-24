import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import Button from 'react-bootstrap/Button';
const Home: NextPage = (props:any) => {
  const { liff, liffError } = props;

  
  const router= useRouter()
  const onClkickMove = () => {
		const keyword = {
			calendar_id:""
		}
		router.push({ pathname: 'event-view', query: keyword })
	}
  return (
    
    <>
      {console.log(liff.getContext())}
      <Button onClick={()=>onClkickMove()}>
        イベント登録
      </Button>
    </>
  )
}

export default Home
