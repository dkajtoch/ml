import React from "react";
import styles from "./Post.module.css";
import Heading from "../metrum/Heading";
import Card from "../metrum/Card";
import Link from "../metrum/Link";
import Typography from "../metrum/Typography";
import List from "../metrum/List";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import formatDistance from 'date-fns/formatDistance'
import { enUS } from 'date-fns/locale'

export interface IPost {
    guid: string;
    title: string;
    categories: string[];
    authors: { author: IAuthor[] };
    link: string;
    pubDate: string;
    contentSnippet: string;
    thumbnail: string;
}

export interface IAuthor {
    name: string[];
    photo: string[];
    url: string[];
}

type PostProps = IPost

const Post: React.FunctionComponent<PostProps> = ({ title, categories, pubDate, contentSnippet, link, authors, thumbnail }) => {
    return (
        <article className="m-margin-bottom_16 m-display-flex m-flex-column m-flex-grow_1">
            <a href={link} title={title}>
                <img width="388" src={thumbnail} alt={title} className="m-display-block m-width-fluid"/>
            </a>
            <Card className="m-display-flex m-flex-column m-flex-grow_1 m-padding-bottom-0">
                <a href={link} title={title} className="m-text-decoration_none">
                    <Heading size="medium" maxLines={2}>{title}</Heading>
                </a>
                <Typography as="time" className="m-padding-bottom-16">
                    {formatDistance(new Date(pubDate), new Date(), { locale: enUS, addSuffix: true })}
                </Typography>
                <List>
                    {categories.map(category => (
                        <List.Item key={category} className="m-margin-right-8 m-display-inline-block">
                            <Link href={`https://twitter.com/hashtag/${category}`}>#{category}</Link>
                        </List.Item>
                    ))}
                </List>
                <Typography className="m-flex-grow-1 m-padding-top-16">
                    {contentSnippet.split(' ').slice(0, 25).join(' ') + '…'}
                </Typography>
                <div className="m-display-flex m-flex-justify-between m-padding-top-16 m-flex-items_center">
                    <div className="m-display-flex m-flex-items_center">
                        <AvatarGroup max={2} className={`m-padding-right_16 ${styles.avatars}`}>
                            {authors.author.map((author: IAuthor) => (
                                <Avatar key={author.name[0]}
                                        alt={author.name[0]}
                                        src={author.photo[0]}
                                        imgProps={{ width: 32, height: 32 }}
                                />
                            ))}
                        </AvatarGroup>
                        <Link href={authors.author[0].url[0]}>
                            {authors.author.length > 1 ? authors.author[0].name + '…' : authors.author.map((author: IAuthor) => author.name).join("")}
                        </Link>
                    </div>
                    <Link href={`${link}#disqus_thread`}>0 Comments</Link>
                </div>
                <Link
                    button
                    className="m-margin-top-16 m-display_block m-border-width_1 m-border-color_gray m-border-style-top_solid"
                    href={link}>
                    read post
                </Link>
            </Card>
        </article>
    );
};

export default Post;
