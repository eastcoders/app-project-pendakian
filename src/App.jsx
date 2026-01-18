import React from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import FeedCard from './components/FeedCard';
import BottomNav from './components/BottomNav';
import { feedData } from './data';

function App() {
    return (
        <Layout>
            <Header />
            <main className="flex-1 flex flex-col gap-8 px-4 pt-24">
                {feedData.map((post, index) => (
                    <React.Fragment key={post.id}>
                        <FeedCard post={post} />
                        {index < feedData.length - 1 && (
                            <div className="h-px w-full bg-gray-200 mx-auto"></div>
                        )}
                    </React.Fragment>
                ))}
            </main>
            <BottomNav />
        </Layout>
    );
}

export default App;
