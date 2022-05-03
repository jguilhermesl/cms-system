import { GetStaticProps } from 'next'
import { useState } from 'react'

import Head from 'next/head'
import styles from './styles.module.scss'

import PostCard from '../../components/PostCard'

import devPhoto from '../../../public/images/developer.jpg'

import { getPrismicClient } from '../../services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi'

type Post = {
    uid: string,
    title: string,
    description: string,
    banner: string,
    updatedAt: string,
}
interface PostsProps {
    posts: Post[],
    page: string,
    totalPage: string,
}

export default function Posts({ posts: postsBlog, page, totalPage }: PostsProps) {

    const [posts, setPosts] = useState(postsBlog || [])
    const [currentPage, setCurrentPage] = useState(Number(page))

    async function reqPost(pageNumber: number) {
        const prismic = getPrismicClient();

        const response = await prismic.query([
            Prismic.Predicates.at('document.type', 'post')
        ], {
            orderings: '[document.last_publication_date desc]', //Ordernar pelo mais recente
            fetch: ['post.title', 'post.description', 'post.banner'],
            pageSize: 3,
            page: String(pageNumber)
        })

        return response
    }

    async function navigatePage(pageNumber: number) {
        const response = await reqPost(pageNumber)

        if(response.results.length === 0) {
            return
        }

        const getPosts = response.results.map(post => {
            return {
                uid: post.uid,
                title: RichText.asText(post.data.title),
                description: post.data.description.find(content => content.type === 'paragraph')?.text ?? '',
                banner: post.data.banner.url,
                updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })
            }
        })

        setCurrentPage(pageNumber)
        setPosts(getPosts)
    }

    return (
        <>
            <Head>

            </Head>
            <main>
                <div className={styles.postsContainer}>
                    {posts.map(post => (
                        <PostCard key={post.uid} uid={post.uid} photo={post.banner} title={post.title} date={post.updatedAt} description={post.description} />
                    ))}
                </div>
                <div className={styles.buttonsPaginations}>
                    {Number(currentPage) > 1 && (
                        <div className={styles.buttonsBack}>
                            <button onClick={() => navigatePage(1) }><FiChevronsLeft /></button>
                            <button onClick={() => navigatePage(Number(currentPage - 1)) } ><FiChevronLeft /></button>
                        </div>
                    )}
                    {Number(currentPage) < Number(totalPage) && (
                        <div className={styles.buttonsNext}>
                            <button onClick={() => navigatePage(Number(currentPage + 1)) }><FiChevronsRight /></button>
                            <button onClick={() => navigatePage(Number(totalPage)) }><FiChevronRight /></button>
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.query([
        Prismic.Predicates.at('document.type', 'post')
    ], {
        orderings: '[document.last_publication_date desc]', //Ordernar pelo mais recente
        fetch: ['post.title', 'post.description', 'post.banner'],
        pageSize: 3
    })

    const posts = response.results.map(post => {
        return {
            uid: post.uid,
            title: RichText.asText(post.data.title),
            description: post.data.description.find(content => content.type === 'paragraph')?.text ?? '',
            banner: post.data.banner.url,
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

    return {
        props: {
            posts,
            page: response.page,
            totalPage: response.total_pages
        },

        revalidate: 60 * 30
    }
}