import { useContext, useEffect, useState } from "react"
import React from 'react'
import { LineContext } from "src/domain/context"


export const LineAouth: React.FC = () => {
    const {
        userName, groupId, setUserName, setGroupId
    } = useContext(LineContext)
    const [liffObject, setLiffObject] = useState<any>(null)
    const [er, setEr] = useState("")
    useEffect(() => {
        // to avoid `window is not defined` error
        import("@line/liff").then((liff: any) => {
            console.log("start liff.init()...");

            liff
                .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
                .then(() => {
                    console.log("liff.init() done");
                    setLiffObject(liff)
                    console.log(liff)


                    liff.ready.then(() => {
                        if (process.env.NODE_ENV == "development") {
                            liff.login()
                        }

                        liff.getProfile()
                        .then((profile:any)=>{
                            setUserName(profile.displayName)
                        })
                        .catch((err:any)=>{
                            setEr(err)
                        })
                        const ctx = liff.getContext()
                        setGroupId(ctx.groupId)
                    })





                })
                .catch((error: any) => {
                    console.log(`liff.init() failed: ${error}`);
                    if (!process.env.liffId) {
                        console.info(
                            "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
                        );
                    }
                });


        });

    }, []);


    return (
        <h1>{userName}</h1>//<h1>{groupId}</h1>
    )
}