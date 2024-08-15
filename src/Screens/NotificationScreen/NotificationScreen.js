import React, { useEffect, useState } from 'react';
import { View, Text, Switch, Platform, ScrollView } from 'react-native';
import styles from './styles';
import * as Notifications from 'expo-notifications';

export default function NotificationScreen({isDarkTheme}) {
    const [reminder, setReminder] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const backgroundColor = isDarkTheme ? "black" : 'white';
    const textStyle = isDarkTheme ? styles.darkText : styles.lightText;

    const handleReminderPress = async () => {
        if (!reminder) {
            const scheduled = await scheduleReminder();
            if (scheduled) {
                setReminder(true);
                setSchedule(await getSchedule());
            }
        } else {
            const cancelled = await cancelReminder();
            if (cancelled) {
                setReminder(false);
                setSchedule(await getSchedule());
            }
        }
    };

    useEffect(() => {
        (async () => {
            const previouslyScheduled = await getSchedule();
            setSchedule(previouslyScheduled);
            if (previouslyScheduled.find((item) => item.type === 'reminder')) {
                setReminder(true);
            }
        })();
    }, []);

    return (
        <ScrollView style={[styles.container, { backgroundColor }]}>
            <View style={styles.reminderSwitch}>
                <Text style={textStyle}>Set Daily Notifications</Text>
                <Switch value={reminder} onValueChange={handleReminderPress} />
            </View>
            
        </ScrollView>
    );
}

async function scheduleReminder() {
    try {
        const permissions = await Notifications.getPermissionsAsync();
        if (!permissions.granted) {
            const request = await Notifications.requestPermissionsAsync({
                ios: {
                    allowAlert: true,
                    allowSound: true,
                    allowBadge: true,
                },
            });
            if (!request.granted) {
                return false;
            }
        }
        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title: "Recipes Reminder",
                body: "Remember to check new recipes",
                subtitle: "Do not forget.",
                data: {
                    userId: 1778896,
                    userName: 'Gagan',
                    type: 'reminder',
                },
            },
            trigger: {
                seconds: 24 * 60 * 60, // 24 hours in seconds
                repeats: true,
            },
        });
        return id ? true : false;
    } catch {
        return false;
    }
}

async function cancelReminder() {
    let cancelled = false;
    const schedule = await getSchedule();
    for (const item of schedule) {
        if (item.type === 'reminder') {
            await Notifications.cancelAllScheduledNotificationsAsync(item.id);
            cancelled = true;
        }
    }
    return cancelled;
}

async function getSchedule() {
    const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
    const schedule = scheduledNotifications.map((scheduledNotification) => ({
        id: scheduledNotification.identifier,
        type: scheduledNotification.content.data.type,
    }));
    return schedule;
}
