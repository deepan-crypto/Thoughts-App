import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { authStorage } from './authStorage';
import API_BASE_URL from '@/config/api';

// Get the socket server URL (same as API but without /api)
const SOCKET_URL = API_BASE_URL.replace('/api', '');

// Singleton socket instance
let socketInstance: Socket | null = null;

/**
 * Fetch the current user ID — always prefer a fresh server fetch to avoid stale cached IDs.
 */
async function getFreshUserId(): Promise<string | null> {
    try {
        const token = await authStorage.getToken();
        if (!token) return null;

        const response = await fetch(`${API_BASE_URL}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
            const data = await response.json();
            if (data.user) {
                const id = data.user.id || data.user._id;
                if (id) return id.toString();
            }
        }
    } catch {
        // Fall back to cached user
    }

    // Fallback: cached user
    try {
        const user = await authStorage.getUser();
        const id = user?.id || user?._id;
        return id ? id.toString() : null;
    } catch {
        return null;
    }
}

/**
 * Hook for managing socket connection
 */
export const useSocket = () => {
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const initSocket = async () => {
            try {
                const userId = await getFreshUserId();

                if (!userId) {
                    console.log('No user logged in, skipping socket connection');
                    return;
                }

                // Create socket connection if not exists
                if (!socketInstance) {
                    socketInstance = io(SOCKET_URL, {
                        transports: ['websocket', 'polling'],
                        autoConnect: true,
                    });
                }

                socketRef.current = socketInstance;

                // Handle connection
                socketInstance.on('connect', () => {
                    console.log('Socket connected:', socketInstance?.id);
                    setIsConnected(true);

                    // Join user's personal room for notifications
                    socketInstance?.emit('join', userId);
                });

                // Handle disconnection
                socketInstance.on('disconnect', () => {
                    console.log('Socket disconnected');
                    setIsConnected(false);
                });

                // Connect if not already connected
                if (!socketInstance.connected) {
                    socketInstance.connect();
                } else {
                    // Already connected, just join room
                    socketInstance.emit('join', userId);
                    setIsConnected(true);
                }

            } catch (error) {
                console.error('Socket initialization error:', error);
            }
        };

        initSocket();

        // Cleanup on unmount
        return () => {
            // Don't disconnect, just remove listeners
            // Socket stays alive for app lifetime
        };
    }, []);

    return {
        socket: socketRef.current ?? socketInstance,
        isConnected,
    };
};

/**
 * Hook for subscribing to socket events
 */
export const useSocketEvent = <T>(eventName: string, callback: (data: T) => void) => {
    const { socket } = useSocket();

    useEffect(() => {
        if (!socket) return;

        socket.on(eventName, callback);

        return () => {
            socket.off(eventName, callback);
        };
    }, [socket, eventName, callback]);
};

/**
 * Get the socket instance directly (for use outside React components)
 */
export const getSocket = () => socketInstance;

/**
 * Disconnect socket (call on logout)
 */
export const disconnectSocket = () => {
    if (socketInstance) {
        socketInstance.disconnect();
        socketInstance = null;
    }
};
