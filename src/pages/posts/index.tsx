import Head from 'next/head'
import styles from './styles.module.scss'

import PostCard from '../../components/PostCard'

import devPhoto from '../../../public/images/developer.jpg'

import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi'

export default function Posts() {
    return(
        <>
        <Head>

        </Head>
        <main>
            <div className={styles.postsContainer}>
                <PostCard photo="https://amplificadigital.com.br/wp-content/uploads/2019/12/amplifica_banner_blog_programaccca7acc83o.jpg" title="Quanto cobrar por um projeto como programador?" date="14 JUN 2022" description="Vamos criar o controle de mostrar a senha no input, uma opção para os nossos formulários de cadastro e login." />
                <PostCard photo="https://amplificadigital.com.br/wp-content/uploads/2019/12/amplifica_banner_blog_programaccca7acc83o.jpg" title="Quanto cobrar por um projeto como programador?" date="14 JUN 2022" description="Vamos criar o controle de mostrar a senha no input, uma opção para os nossos formulários de cadastro e login." />
            </div>
            <div className={styles.buttonsPaginations}>
                <div className={styles.buttonsBack}>
                    <button><FiChevronsLeft /></button>
                    <button><FiChevronLeft /></button>
                </div>
                <div className={styles.buttonsNext}>
                    <button><FiChevronsRight /></button>
                    <button><FiChevronRight /></button>
                </div>
            </div>
        </main>
        </>
    )
}