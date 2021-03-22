import { InferGetStaticPropsType } from "next"
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import styled from "@emotion/styled"
import Link from 'next/link';

const title: string = "AwesomeBlog";

const Container = styled.div` display:flex; justify-content: center
`;
const Main = styled.main`max-width: 800px`;
const BlogTitle = styled.h1`margin:32px 0px`;
const List = styled.div``;
const ListItem = styled.div`cursor: pointer;`;
const PostTitle = styled.h2``;
const PostBody = styled.p``;

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(posts)
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <BlogTitle className={styles.title}>
          {title}
        </BlogTitle>
        <List>
          {posts.map((post) => {

            return <Link href="/[id]" as={`/${post.id}`}>
              <ListItem key={post.id}>
                <PostTitle>{post.title}</PostTitle>
                <PostBody>{post.body}</PostBody>
              </ListItem>
            </Link>
          })}
        </List>
      </Main>
    </Container >
  )
}

export type Post = {
  userId: number,
  id: number,
  title: string,
  body: string
}

export const getStaticProps = async () => {

  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  const posts: Post[] = await res.json();

  return {
    props: {
      posts,
    }
  }
}