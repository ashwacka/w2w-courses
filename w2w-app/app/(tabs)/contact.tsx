import React from 'react';
import { StyleSheet, Linking } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ContactScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Contact Us</ThemedText>
      </ThemedView>
      <ThemedView style={styles.content}>
        <ThemedText style={styles.text}>
          Have questions? Get in touch with us!
        </ThemedText>
        <ThemedText style={styles.contactInfo}>
          Email: nidhi@write2win.com.sg{'\n'}
          Phone: (65) 81986511{'\n'}
          Address: Block 641C, Punggol Drive, S823641
        </ThemedText>
        <ThemedText
          style={styles.link}
          onPress={() => Linking.openURL('mailto:nidhi@write2win.com.sg')}
        >
          Send us an email
        </ThemedText>
        <ThemedText
            style={styles.link}
            onPress={() => Linking.openURL('tel:+6581986511')}
            >
            Call us now
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#e6f2ff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  content: {
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  contactInfo: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#333',
  },
  link: {
    fontSize: 16,
    color: '#0a7ea4',
    textDecorationLine: 'underline',
  },
});