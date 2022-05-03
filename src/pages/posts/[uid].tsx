import styles from './post.module.scss'

import { GetServerSideProps } from 'next'

import { getPrismicClient } from '../../services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

import Head from 'next/head'
import Image from 'next/image'

interface PostProps {
    post: {
        uid: string,
        title: string,
        description: string,
        banner: string,
        updatedAt: string
    }
}

export default function Post({ post }: PostProps) {
    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>
            <main className={styles.contentPost}>
                <h1>{post.title}</h1>
                <Image src={post.banner} width={600} height={300} alt={post.title} />
                <time>{post.updatedAt}</time>
                <div className={styles.description} dangerouslySetInnerHTML={{ __html: post.description }}></div>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const { uid } = params;
    const prismic = getPrismicClient(req);

    const response = await prismic.getByUID('post', String(uid), {})

    if (!response) {
        return {
            redirect: {
                destination: '/posts',
                permanent: false

            }
        }
    }

    const post = {
        uid: uid,
        title: RichText.asText(response.data.title),
        description: RichText.asHtml(response.data.description),
        banner: response.data.banner.url,
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        props: {
            post
        }
    }
}