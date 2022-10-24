import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from "react";
import liff from '@line/liff';
function MyApp({ Component, pageProps }: any) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);
  const [userName, setUserName] = useState("")
  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff").then((liff: any) => {
      console.log("start liff.init()...");

      liff
        .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
        .then(() => {
          console.log("liff.init() done");
          setLiffObject(liff);

        })
        .catch((error: any) => {
          console.log(`liff.init() failed: ${error}`);
          if (!process.env.liffId) {
            console.info(
              "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
            );
          }
          setLiffError(error.toString());
        });
    });
    
      try {
        if (liffObject != null) {
          liffObject.getProfile().then((data:any)=>{
            setUserName(data.displayName)
          }).catch((error:any)=>{
            console.log(error.toString())
          })
        }
      } catch (e) { }


    

  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  pageProps.user_name = userName;

  return (<>
    <Component {...pageProps} />
  </>

  )
}

export default MyApp
