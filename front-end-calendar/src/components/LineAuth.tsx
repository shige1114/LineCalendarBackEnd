import { useContext, useEffect, useState } from "react"
import React from 'react'
import { LineContext } from "src/domain/context"
export const LineAouth: React.FC = () => {
    const {
        groupId, setUserName, setGroupId
    } = useContext(LineContext)

    const [errorLine, setErrorLine] = useState("no error!")
    useEffect(() => {
        // to avoid `window is not defined` error

        import("@line/liff").then((liff: any) => {
            console.log("start liff.init()...");

            liff
                .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
                .then(() => {
                    console.log("liff.init() done");
                })
                .catch((error: any) => {
                    console.log(`liff.init() failed: ${error}`);
                    if (!process.env.liffId) {
                        console.info(
                            "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
                        );
                    }
                });
            async () => {
                try {
                    const profile = await liff.getProfile()
                    const ctx = await liff.getContext()
                    setGroupId(ctx.groupId)

                    setUserName(profile.displayName)

                } catch (e: any) { setErrorLine(e.toString()) }
            }
        });

    }, []);

    return (
        <>
            <h1>{errorLine}</h1>
        </>
    )
}