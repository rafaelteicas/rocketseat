import { Post, PostType } from "./components/Post";
import { Header } from "./components/Header";
import styles from "./App.module.css";
import "./global.css";
import { Sidebar } from "./components/Sidebar";

const posts: PostType[] = [
    {
        id: 1,
        author: {
            avatar: "http://github.com/rafaelteicas.png",
            name: "Rafael Castro",
            role: "CTO @ Rocketseat",
        },
        content: [
            { type: "paragraph", content: "Fala galera 👋" },
            {
                type: "paragraph",
                content: "Acabei de subir mais um projeto no meu portfólio",
            },
            {
                type: "link",
                content: "google.com",
            },
        ],
        publishedAt: new Date("2022-01-01 20:00:00"),
    },
    {
        id: 2,
        author: {
            avatar: "http://github.com/rafaelteicas.png",
            name: "Rafael Castro",
            role: "CTO @ Rocketseat",
        },
        content: [
            { type: "paragraph", content: "Fala galera 👋" },
            {
                type: "paragraph",
                content: "Acabei de subir mais um projeto no meu portfólio",
            },
            {
                type: "link",
                content: "google.com",
            },
        ],
        publishedAt: new Date("2022-01-01 20:00:00"),
    },
];

function App() {
    return (
        <>
            <Header />
            <div className={styles.wrapper}>
                <Sidebar />
                <main>
                    {posts.map((post) => (
                        <Post post={post} key={post.id} />
                    ))}
                </main>
            </div>
        </>
    );
}

export default App;
