import { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    StatusBar,
    TouchableOpacity,
    BackHandler,
    Alert,
} from 'react-native';
import { useLocalSearchParams, router, useNavigation, useFocusEffect } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import API_BASE_URL from '@/config/api';
import { authStorage } from '@/utils/authStorage';
import PollCard from '@/components/PollCard';

interface PollOption {
    id: number;
    text: string;
    percentage: number;
    emoji?: string;
}

interface Poll {
    id: string;
    user: {
        _id: string;
        name: string;
        username: string;
        avatar: string;
    };
    question: string;
    options: PollOption[];
    likes: number;
    hasVoted: boolean;
    isLiked: boolean;
    votedOptionIndex?: number;
    createdAt?: string;
}

export default function PollDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const navigation = useNavigation();
    const [poll, setPoll] = useState<Poll | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    // Smart back handler: go to home if there's no navigation history
    const handleBack = useCallback(() => {
        if (navigation.canGoBack()) {
            router.back();
        } else {
            // No history (opened via deep link) — go to home
            router.replace('/(tabs)');
        }
    }, [navigation]);

    // Handle Android hardware back button
    useFocusEffect(
        useCallback(() => {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                handleBack();
                return true; // Prevent default (exit app) behavior
            });
            return () => backHandler.remove();
        }, [handleBack])
    );

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userStr = await authStorage.getUser();
                if (userStr) {
                    const user = JSON.parse(userStr);
                    setCurrentUserId(user._id || user.id);
                }
            } catch (err) {
                console.error('Error fetching current user:', err);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                setLoading(true);
                const token = await authStorage.getToken();
                const headers: Record<string, string> = {};
                if (token) headers['Authorization'] = `Bearer ${token}`;
                const response = await fetch(`${API_BASE_URL}/polls/${id}`, { headers });
                const data = await response.json();

                if (response.ok && data.poll) {
                    setPoll(data.poll);
                } else {
                    setError(data.message || 'Poll not found');
                }
            } catch (err) {
                console.error('Error fetching poll:', err);
                setError('Failed to load poll');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPoll();
        }
    }, [id]);

    const handleLikePoll = async (pollId: string) => {
        try {
            const token = await authStorage.getToken();
            if (!token) throw new Error('Not authenticated');

            const endpoint = poll?.isLiked ? 'unlike' : 'like';
            const method = poll?.isLiked ? 'DELETE' : 'POST';

            const response = await fetch(`${API_BASE_URL}/polls/${pollId}/${endpoint}`, {
                method,
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                if (poll) {
                    setPoll({
                        ...poll,
                        likes: data.likesCount,
                        isLiked: !poll.isLiked
                    });
                }
                return { likes: data.likesCount, liked: !poll?.isLiked };
            }
            throw new Error('Failed to toggle like');
        } catch (error) {
            console.error('Error toggling like:', error);
            throw error;
        }
    };

    const handleVotePoll = async (pollId: string, optionIndex: number) => {
        try {
            const token = await authStorage.getToken();
            if (!token) throw new Error('Not authenticated');

            const response = await fetch(`${API_BASE_URL}/polls/${pollId}/vote`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ optionIndex }),
            });

            if (response.ok) {
                const data = await response.json();
                if (poll) {
                    setPoll({
                        ...poll,
                        hasVoted: true,
                        options: data.options,
                        votedOptionIndex: optionIndex
                    });
                }
                return { options: data.options, hasVoted: true };
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Failed to vote');
            }
        } catch (error) {
            console.error('Error voting:', error);
            throw error;
        }
    };

    const handleDeletePoll = async (pollId: string) => {
        Alert.alert(
            "Delete Poll",
            "Are you sure you want to delete this poll?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const token = await authStorage.getToken();
                            if (!token) return;

                            const response = await fetch(`${API_BASE_URL}/polls/${pollId}`, {
                                method: 'DELETE',
                                headers: { 'Authorization': `Bearer ${token}` },
                            });

                            if (response.ok) {
                                handleBack(); // go back on successful delete
                            } else {
                                Alert.alert("Error", "Failed to delete poll");
                            }
                        } catch (error) {
                            console.error('Error deleting poll:', error);
                            Alert.alert("Error", "Failed to delete poll");
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#458FD0" />
                <Text style={styles.loadingText}>Loading poll...</Text>
            </View>
        );
    }

    if (error || !poll) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error || 'Poll not found'}</Text>
                <TouchableOpacity style={styles.errorBackButton} onPress={handleBack}>
                    <Text style={styles.errorBackButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header with back button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
                    <ArrowLeft size={24} color="#101720" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Poll</Text>
                <View style={styles.headerButton} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <PollCard
                    id={poll.id}
                    user={poll.user}
                    question={poll.question}
                    options={poll.options}
                    likes={poll.likes}
                    hasVoted={poll.hasVoted}
                    isLiked={poll.isLiked}
                    createdAt={poll.createdAt}
                    onLike={handleLikePoll}
                    onVote={handleVotePoll}
                    onDelete={poll.user._id === currentUserId ? handleDeletePoll : undefined}
                    isOwnPoll={poll.user._id === currentUserId}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
    },
    errorBackButton: {
        backgroundColor: '#458FD0',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    errorBackButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    headerButton: {
        width: 40,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#101720',
    },
    scrollView: {
        flex: 1,
    }
});
