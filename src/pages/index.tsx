import { GetStaticProps } from 'next'

import Head from 'next/head'
import Image from 'next/image'

import { getPrismicClient } from '../services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'



import styles from '../styles/home.module.scss'

import techsImage from '../../public/images/techs.svg'

type Content = {
    title: string;
    titleContent: string;
    linkAction: string;
    mobileTitle: string;
    mobileContent: string;
    mobileBanner: string;
    webTitle: string;
    webContent: string;
    webBanner: string;
}

interface ContentProps{
  content: Content;
}

export default function Home({ content }: ContentProps) {
  return (
    <>
      <Head>
        <title>Apaixonado por tecnologia- JGSL</title>
      </Head>
      <main className={styles.containerAll}>
        <div className={styles.contentHome}>
          <section className={styles.firstSection}>
            <div className={styles.infoContentHome}>
              <h1>{content.title}</h1>
              <span>{content.titleContent}</span>
              <a href={content.linkAction}><button>COMEÇAR AGORA!</button></a>
            </div>

            <img src="/images/banner-conteudos.png" alt="Conteúdos Sujeito Programador" />
          </section>

          <hr className={styles.lineDivision} />

          <section className={styles.seccondSection}>
            <div className={styles.info}>
              <h1>{content.mobileTitle}</h1>
              <span>{content.mobileContent}</span>
            </div>

            <img src={content.mobileBanner} alt="Conteúdos mobile" />
          </section>

          <hr className={styles.lineDivision} />

          <section className={styles.thirdSection}>
            <div className={styles.info}>
              <h1>{content.webTitle}</h1>
              <span>{content.webContent}</span>
            </div>

            <img src={content.webBanner} alt="Conteúdos mobile" />
          </section>

          <section className={styles.footerSection}>
            <Image src={techsImage} alt="" />
            <h1>Mais de <span>15 mil</span> já levaram sua carreira ao próximo nível.</h1>
            <p>E você vai perder sua chance de evoluir de uma vez por todas?</p>
            <a href={content.linkAction}><button>Acessar turma</button></a>
          </section>

        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'home')
  ])

  const { title, sub_title, link_action, mobile, mobile_content, mobile_banner, web, web_content, web_banner } = response.results[0].data

  const content = {
    title: RichText.asText(title),
    titleContent: RichText.asText(sub_title),
    linkAction: link_action.url,
    mobileTitle: RichText.asText(mobile),
    mobileContent: RichText.asText(mobile_content),
    mobileBanner: mobile_banner.url,
    webTitle: RichText.asText(web),
    webContent: RichText.asText(web_content),
    webBanner: web_banner.url,
  }

  return {
    props: {
      content
    },
    revalidate: 60 * 5
  }
}