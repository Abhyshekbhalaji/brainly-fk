import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// Note: Make sure to import these in your actual component file:
// import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";


interface SharedContent {
    _id: string;
    title: string;
    content?: string;
    link?: string;
    type: string;
    tags: string[];
    createdAt: string;
}

interface SharedCollectionData {
    posts: SharedContent[];
    createdBy: string;
    createdAt: string;
    expiresAt: string;
}

const SharedCollectionPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [sharedCollection, setSharedCollection] = useState<SharedCollectionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('All');

    const hashId = searchParams.get('hashId');

    useEffect(() => {
        if (!hashId) {
            setError('Invalid share link');
            setLoading(false);
            return;
        }
        fetchSharedCollection();
    }, [hashId]);

    const fetchSharedCollection = async () => {
        try {
            setLoading(true);
            console.log(hashId);
            // Note: Update this URL to match your actual API endpoint
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEPLOY_URL}api/v1/share/collection`,{
                params:{hashId}
            });

            if (response.data.success) {
                setSharedCollection(response.data.data);
            } else {
                setError(data.message || 'Failed to load shared collection');
            }
        } catch (err: any) {
            console.error('Error fetching shared collection:', err);
            
            if (err.status === 404 || err.status === 410) {
                setError('This shared collection has expired or does not exist');
            } else {
                setError('Failed to load shared collection');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    // Get unique content types for filter
    const getContentTypes = () => {
        if (!sharedCollection) return [];
        const types = [...new Set(sharedCollection.posts.map(post => post.type))];
        return types;
    };

    // Filter posts based on selected type
    const filteredPosts = sharedCollection 
        ? selectedType === 'All' 
            ? sharedCollection.posts 
            : sharedCollection.posts.filter(post => post.type === selectedType)
        : [];

    // Get type counts
    const getTypeCount = (type: string) => {
        if (!sharedCollection) return 0;
        return sharedCollection.posts.filter(post => post.type === type).length;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading shared collection...</p>
                </div>
            </div>
        );
    }

    if (error || !sharedCollection) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Collection Not Found</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button 
                        onClick={handleBackToHome}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Go to Homepage
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="text-blue-600 text-2xl">🧠</div>
                        <div>
                            <h1 className="text-lg font-semibold">Shared Brain Collection</h1>
                            <p className="text-sm text-gray-600">
                                Shared by <span className="font-medium">@{sharedCollection.createdBy}</span> • 
                                {sharedCollection.posts.length} items
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={handleBackToHome}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>

            {/* Stats and Filters */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    {/* Collection Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{sharedCollection.posts.length}</div>
                            <div className="text-sm text-gray-600">Total Items</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{getTypeCount('Document')}</div>
                            <div className="text-sm text-gray-600">Documents</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">{getTypeCount('Video')}</div>
                            <div className="text-sm text-gray-600">Videos</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                            <div className="text-2xl font-bold text-orange-600">{getTypeCount('Link')}</div>
                            <div className="text-sm text-gray-600">Links</div>
                        </div>
                    </div>

                    {/* Content Type Filters */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedType('All')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                selectedType === 'All' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            All ({sharedCollection.posts.length})
                        </button>
                        {getContentTypes().map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                                    selectedType === type 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {type} ({getTypeCount(type)})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post) => (
                        <div key={post._id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                            <div className="p-6">
                                {/* Content Header */}
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <span className={`
                                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ml-2 flex-shrink-0
                                        ${post.type === 'document' ? 'bg-green-100 text-green-800' : 
                                          post.type === 'video' ? 'bg-purple-100 text-purple-800' : 
                                          post.type === 'link' ? 'bg-orange-100 text-orange-800' : 
                                          'bg-blue-100 text-blue-800'}
                                    `}>
                                        {post.type}
                                    </span>
                                </div>

                                {/* Content Preview */}
                                {post.content && (
                                    <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                                        {post.content}
                                    </p>
                                )}

                                {/* External Link */}
                                {post.link && (
                                    <div className="mb-3">
                                        <a 
                                            href={post.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 text-sm break-all hover:underline"
                                        >
                                            🔗 {post.type === 'video' ? 'Watch Video' : 'Visit Link'}
                                        </a>
                                    </div>
                                )}

                                {/* Tags */}
                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {post.tags.slice(0, 3).map((tag: any, index: number) => (
                                            <span 
                                                key={index} 
                                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600"
                                            >
                                                #{typeof tag === 'object' ? tag.title : tag}
                                            </span>
                                        ))}
                                        {post.tags.length > 3 && (
                                            <span className="text-xs text-gray-500">
                                                +{post.tags.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Date */}
                                <p className="text-xs text-gray-500">
                                    Added {new Date(post.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No results message */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-4xl mb-4">📂</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
                        <p className="text-gray-600">
                            No {selectedType === 'all' ? 'items' : selectedType} found in this collection.
                        </p>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-12 bg-white rounded-lg shadow-sm p-6 text-center">
                    <div className="mb-4">
                        <p className="text-sm text-gray-600">
                            Collection shared on {new Date(sharedCollection.createdAt).toLocaleDateString()}
                            {sharedCollection.expiresAt && (
                                <span className="text-gray-500">
                                    {' • '}Expires {new Date(sharedCollection.expiresAt).toLocaleDateString()}
                                </span>
                            )}
                        </p>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm text-gray-500 mb-2">
                            Want to create your own Second Brain collection?
                        </p>
                        <button 
                            onClick={handleBackToHome}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Get started here →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SharedCollectionPage;