import { Dimensions, StyleSheet } from "react-native";
import SharedHeader from "@/shared/SharedHeader";
import ErrorState from "@/shared/ErrorState";
import EmptyState from "@/shared/EmptyState";
import Message from "@/shared/inbox/Message";
import { ScrollView } from "react-native"
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import InboxCTA from "@/shared/inbox/InboxCTA";
import { useState } from "react";

const { height } = Dimensions.get("window");

const Inbox = () => {
  const [isEditing, setIsEditing] = useState(false)

    // Declare static props for testing
    const messages = [
        {
            id: 1,
            title: "Dear Aliasger Baroor",
            description: "This is a test message This is a test message This is a test message",
            sender: "John Doe",
            timestamp: "2 min ago",
        },
        {
            id: 2,
            title: "Dear Sarrah Baroor",
            description: "message is test message is test message is test message is test",
            sender: "John Doe",
            timestamp: "30 min ago",
        },
        {
            id: 3,
            title: "Dear Burhanuddin Baroor",
            description: "message is test message is test message is test message is test",
            sender: "John Doe",
            timestamp: "2 hrs ago",
        },
    ]
    const error = false

    // test prop end

    const renderContent = () => {
        if (error) {
            return <ErrorState message="Something went wrong. Please try again later." />;
        }

        if (!messages || messages.length === 0) {
            return <EmptyState message="No messages yet | You’ve read them all!" />;
        }

        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
                {messages.map((message) => <Message key={message.id} message={message} isEditing={isEditing} />)}
            </ScrollView>
        )
    };

    return (
        <Box>
            <SharedHeader editState={{isEditing, setIsEditing}} />
            <VStack style={styles.container}>{renderContent()}</VStack>
            <InboxCTA />
        </Box>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        maxHeight: height - 200,
    },
});

export default Inbox;
