import { useContext, useEffect, useState } from "react"
import React from 'react'
import { LineContext } from "src/domain/context"


export const LineAouth: React.FC = () => {
    const {
        groupId, setUserName, setGroupId
    } = useContext(LineContext)
    const [liffObject, setLiffObject] = useState<any>(null)

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
                        const profile = liff.getProfile()
                        const ctx = liff.getContext()
                        console.log(ctx)
                        console.log(profile)
                        setGroupId(ctx.groupId)
                        setUserName(profile.displayName)
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
        <h1>{groupId}</h1>
    )
}