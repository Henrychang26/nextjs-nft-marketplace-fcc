// import Image from "next/image"
import styles from "../styles/Home.module.css"

export default function Home() {
    //how do we show recently listed NFT

    //we will read from a database that has all the mappings in an easier to read data structure
    //we will index the events off-chain and the read from our database
    //setup a server to listen for events to be fired, and we will add them to a database query.

    //TheGraph does this in decentralized way
    //Moralis does it in a centralized way
    return <div className={styles.container}>Hi!</div>
}
