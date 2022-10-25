import { useContext, useEffect } from "react"
import React from 'react'
import { LineContext } from "src/domain/context"
export const LineAouth: React.FC = () => {
    const {
        setUserName, setGroupId
    } = useContext(LineContext)


    useEffect(() => {
        // to avoid `window is not defined` error

        import("@line/liff").then((liff: any) => {
            console.log("start liff.init()...");

            liff
                .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
                .then(() => {
                    console.log("liff.init() done");
                    if (liff.isLoggedIn()) {

                        async () => {
                            try {
                                const ctx = await liff.getContext()
                                const profile = await liff.getProfile()

                                setGroupId(ctx?.groupId)
                                setUserName(profile?.displayName)
                                
                            } catch (e) { }
                        }
                    }
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
        <>
        </>
    )
}