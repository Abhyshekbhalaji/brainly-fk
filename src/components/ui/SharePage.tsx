import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface SharedContent {
    userId: object;
    _id: string;
    title: string;
    content?: string;
    link?: string;
    type: string;
    tags: string[];
    createdAt: string;
}

interface SharedData {
    posts: SharedContent[];
   
}
const SharedContentPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [sharedData, setSharedData] = useState<SharedContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    const hashId = searchParams.get('hashId');
    console.log(hashId);
    useEffect(() => {
        if (!hashId) {
            setError('Invalid share link');
            setLoading(false);
            return;
        }
        fetchSharedContent();
    }, [hashId]);

    const fetchSharedContent = async () => {
        try {
            setLoading(true);
            
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEPLOY_URL}api/v1/share/link?hashId=${hashId}`);
              console.log(response);
            if (response.data.success) {
                setSharedData(response.data.posts);
            } else {
                setError(response.data.message || 'Failed to load shared content');
            }
        } catch (err: any) {
            console.error('Error fetching shared content:', err);
            
            if (err.response?.status === 404) {
                setError('This shared link has expired or does not exist');
            } else {
                setError('Failed to load shared content');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading shared content...</p>
                </div>
            </div>
        );
    }

    if (error || !sharedData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Not Found</h2>
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

            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="text-blue-600 text-2xl">🧠</div>
                        <div>
                            <h1 className="text-lg font-semibold">Shared Brain Content</h1>
                            <p className="text-sm text-gray-600">
                                Shared by <span className="font-medium">@{sharedData?.userId?.username}</span>
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

   
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md p-6">
      
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">{sharedData.title}</h2>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                {sharedData.type}
                            </span>
                        </div>
                        
                        {/* Tags */}
                        {sharedData.tags && sharedData.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {sharedData.tags.map((tag: any, index: number) => (
                                    <span 
                                        key={index} 
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                    >
                                        #{tag.title || tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        
                        <p className="text-sm text-gray-500">
                            Shared on {new Date(sharedData.createdAt).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="prose max-w-none">
                        {sharedData.type === 'Link' && sharedData.link && (
                            <div className="border rounded-lg p-4 bg-gray-50">
                                <p className="text-sm text-gray-600 mb-2">External Link:</p>
                                <a 
                                    href={sharedData.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 break-all"
                                >
                                    {sharedData.link}
                                </a>
                            </div>
                        )}
                        
                        {sharedData.type === 'Video' && sharedData.link && (
                            <div className="border rounded-lg p-4 bg-gray-50">
                                <p className="text-sm text-gray-600 mb-2">Video:</p>
                                <a 
                                    href={sharedData.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 break-all"
                                >
                                    {sharedData.link}
                                </a>
                            </div>
                        )}
                        
                        {sharedData.content && (
                            <div className="mt-4">
                                <p className="whitespace-pre-wrap">{sharedData.content}</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-4 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-500">
                            Want to create your own brain? 
                            <button 
                                onClick={handleBackToHome}
                                className="text-blue-600 hover:text-blue-800 ml-1 font-medium"
                            >
                                Get started here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SharedContentPage;