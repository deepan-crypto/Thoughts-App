import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface NotificationBannerData {
    title: string;
    body: string;
    avatar?: string;
    onPress?: () => void;
}

interface NotificationBannerProps {
    data: NotificationBannerData | null;
    onDismiss: () => void;
}

const BANNER_DURATION = 4000;

export const NotificationBanner: React.FC<NotificationBannerProps> = ({ data, onDismiss }) => {
    const insets = useSafeAreaInsets();
    const translateY = useRef(new Animated.Value(-120)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (data) {
            if (dismissTimer.current) clearTimeout(dismissTimer.current);

            // Slide in from top
            Animated.parallel([
                Animated.spring(translateY, {
                    toValue: 0,
                    tension: 60,
                    friction: 10,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();

            // Auto-dismiss after BANNER_DURATION
            dismissTimer.current = setTimeout(() => {
                slideOut();
            }, BANNER_DURATION);
        }

        return () => {
            if (dismissTimer.current) clearTimeout(dismissTimer.current);
        };
    }, [data]);

    const slideOut = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -120,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onDismiss();
        });
    };

    if (!data) return null;

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    top: insets.top + (Platform.OS === 'android' ? 8 : 4),
                    transform: [{ translateY }],
                    opacity,
                },
            ]}
            pointerEvents="box-none"
        >
            <TouchableOpacity
                style={styles.banner}
                activeOpacity={0.95}
                onPress={() => {
                    slideOut();
                    data.onPress?.();
                }}
            >
                {data.avatar ? (
                    <Image source={{ uri: data.avatar }} style={styles.avatar} />
                ) : (
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarEmoji}>🔔</Text>
                    </View>
                )}
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={1}>{data.title}</Text>
                    <Text style={styles.body} numberOfLines={2}>{data.body}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 12,
        right: 12,
        zIndex: 99999,
        elevation: 99999,
    },
    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(28, 28, 30, 0.95)',
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 12,
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#444',
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#458FD0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarEmoji: {
        fontSize: 20,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 2,
    },
    body: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 18,
    },
});
