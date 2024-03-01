import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import { format, formatDistanceToNow } from "date-fns";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import styles from "./Post.module.css";
import { ptBR } from "date-fns/locale";

export interface PostType {
    id: number;
    author: {
        name: string;
        avatar: string;
        role: string;
    };
    publishedAt: Date;
    content: {
        type: "paragraph" | "link";
        content: string;
    }[];
}

interface PostProps {
    post: PostType;
}

export function Post({ post }: PostProps) {
    const [comments, setComments] = useState(["Post munto bacana"]);
    const [newCommentText, setNewCommentText] = useState("");

    const publishedDateFormatted = format(
        post.publishedAt,
        "d 'de' LLLL 'às' HH:mm'h'",
        {
            locale: ptBR,
        }
    );

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true,
    });

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();
        setComments([...comments, newCommentText]);
        setNewCommentText("");
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity("");
        setNewCommentText(event.target.value);
    }

    function onDeleteComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter((comment) => {
            return comment != commentToDelete;
        });
        setComments(commentsWithoutDeletedOne);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity("Esse comentário é obrigatório");
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatar} />
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>
                <time
                    title={publishedDateFormatted}
                    dateTime={post.publishedAt.toISOString()}
                >
                    {publishedDateRelativeToNow}
                </time>
            </header>
            <div className={styles.content}>
                {post.content.map((line) => {
                    if (line.type === "paragraph") {
                        return <p key={line.content}>{line.content}</p>;
                    } else if (line.type === "link") {
                        return (
                            <p key={line.type}>
                                <a href={line.content}>{line.content}</a>
                            </p>
                        );
                    }
                })}
            </div>

            <form
                onSubmit={handleCreateNewComment}
                className={styles.commentForm}
            >
                <strong>Deixe seu comentário</strong>

                <textarea
                    required
                    name="comment"
                    value={newCommentText}
                    placeholder="Deixe seu comentário"
                    onInvalid={handleNewCommentInvalid}
                    onChange={handleNewCommentChange}
                />

                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>
                        Publicar
                    </button>
                </footer>
            </form>
            <div className={styles.commentList}>
                {comments.map((comment) => (
                    <Comment
                        key={comment}
                        content={comment}
                        onDeleteComment={onDeleteComment}
                    />
                ))}
            </div>
        </article>
    );
}
