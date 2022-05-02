import Image from 'next/image'
import Link from 'next/link'
import { Url } from 'url';

import styles from './styles.module.scss'

type Parametros = {
    photo: string;
    title: string;
    date: string;
    description: string;
}

export default function PostCard(infos: Parametros) {

    return (
        <>
            <div className={styles.post} >
                <Link href="/">
                    <a>
                        <img src={infos.photo} alt={infos.title} />
                        <h1>{infos.title}</h1>
                        <time>{infos.date}</time>
                        <p>{infos.description} </p>
                    </a>
                </Link>
            </div>
        </>
    )
}