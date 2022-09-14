// import Image from "next/image"
import styles from "../styles/Home.module.css"
import { useMoralis, useMoralisQuery } from "react-moralis"
import NFTBox from "../components/NFTBox"

export default function Home() {
    //how do we show recently listed NFT
    const { isWeb3Enabled } = useMoralis()
    const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
        //Renaming data and isFetching
        //takes 2 params:
        //TableName
        //Function for the query
        "ActiveItem",
        (query) => query.limit(10).descending("tokenId") //=>grab grab first 10 item from activeitem in descending order in tokenId
    )
    console.log(listedNfts)

    //we will read from a database that has all the mappings in an easier to read data structure
    //we will index the events off-chain and the read from our database
    //setup a server to listen for events to be fired, and we will add them to a database query.

    //TheGraph does this in decentralized way
    //Moralis does it in a centralized way
    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Recenetly Listed</h1>
            <div className="flex flex-wrap">
                {isWeb3Enabled ? (
                    fetchingListedNfts ? (
                        <div>Loading...</div>
                    ) : (
                        listedNfts.map((nft) => {
                            console.log(nft.attributes)
                            const { price, nftAddress, tokenId, marketplaceAddress, seller } =
                                nft.attributes
                            return (
                                <div>
                                    <NFTBox //add all components below
                                        price={price}
                                        nftAddress={nftAddress}
                                        tokenId={tokenId}
                                        marketplaceAddress={marketplaceAddress}
                                        seller={seller}
                                        key={`${nftAddress}${tokenId}`}
                                    />
                                </div>
                            )
                        })
                    )
                ) : (
                    <div>Web3 Currently Not Enabled</div>
                )}
            </div>
        </div>
    )
}
