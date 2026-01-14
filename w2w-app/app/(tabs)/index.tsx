import React from 'react';
import { StyleSheet, Pressable, Image } from 'react-native';
import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Write2Win</ThemedText>
        <ThemedText style={styles.slogan}>Write the right way</ThemedText>
      </ThemedView>
      <ThemedView style={styles.coursesContainer}>
        <ThemedText type="subtitle" style={styles.featuredTitle}>Featured Courses</ThemedText>
        <Link href="/courses" asChild>
          <Pressable style={styles.courseBox}>
            <Image source={require('@/assets/images/react-logo.png')} style={styles.courseImage} />
            <ThemedText style={styles.courseTitle}>Better Handwriting Improves Grades</ThemedText>
          </Pressable>
        </Link>
        {/* Add more courses here if needed */}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#0a7ea4',
    marginBottom: 10,
  },
  slogan: {
    fontSize: 18,
    color: '#0a7ea4',
  },
  coursesContainer: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: '#0a7ea4',
  },
  courseBox: {
    backgroundColor: '#e6f2ff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0a7ea4',
    textAlign: 'center',
  },
});
