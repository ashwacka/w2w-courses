import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function CoursesScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Better Handwriting Improves Grades</ThemedText>
      </ThemedView>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Course Outline</ThemedText>
        <ThemedText style={styles.text}>
          - Introduction to proper handwriting techniques{'\n'}
          - Practice exercises for letter formation{'\n'}
          - Speed and accuracy drills{'\n'}
          - Common mistakes and how to fix them{'\n'}
          - Tips for maintaining good handwriting habits
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Pricing</ThemedText>
        <ThemedText style={styles.text}>
          - Basic Course: $29.99{'\n'}
          - Premium Course with Personal Coaching: $49.99{'\n'}
          - Lifetime Access: $79.99
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#e6f2ff',
  },
  title: {
    fontSize: 32,
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 10,
    color: '#0a7ea4',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});