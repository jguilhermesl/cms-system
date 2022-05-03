import { GetStaticProps } from 'next'

import Head from 'next/head'
import Image from 'next/image'

import techs from '../../../public/images/techs.svg'

import { getPrismicClient } from '../../services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

import { FiLinkedin, FiInstagram, FiFacebook } from 'react-icons/fi'

import styles from './styles.module.scss'


type Content = {
    title: string;
    description: string;
    banner: string;
}

interface ContentProps {
    content: Content;
}

export default function Sobre({ content }: ContentProps) {

    return (
        <>
            <Head>
                <title>Apaixonado por tecnologia- JGSL</title>
            </Head>
            <main className={styles.aboutContent}>
                <div className={styles.infoAbout}>
                    <h1>{content.title}</h1>
                    <span>{content.description}</span>
                    <div className={styles.socialMedias}>
                        <a><FiLinkedin /></a>
                        <a><FiInstagram /></a>
                        <a><FiFacebook/></a>
                    </div>
                </div>
                <div className={styles.imgAbout}>
                    <Image src={content.banner} width={400} height={350} alt={content.title} />
                    <Image src={techs} width={400} />
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const prismic = getPrismicClient();

    const response = await prismic.query([
        Prismic.Predicates.at('document.type', 'sobre')
    ])

    const { banner, title, description } = response.results[0].data

    const content = {
        title: RichText.asText(title),
        description: RichText.asText(description),
        banner: banner.url
    }

    return {
        props: {
            content
        },
        revalidate: 60 * 60
    }
}