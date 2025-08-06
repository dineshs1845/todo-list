import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, RefreshControl, Alert, StyleSheet } from 'react-native';
import { TextInput, FAB, List, IconButton, Text } from 'react-native-paper';
import { supabase } from '../supabase';

export default function TodoScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      console.log('Fetching tasks...');
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) {
        console.error('Fetch error:', error);
        Alert.alert('Error', `Failed to fetch tasks: ${error.message}`);
      } else {
        console.log('Tasks fetched:', data);
        setTasks(data || []);
      }
    } catch (err) {
      console.error('Unexpected fetch error:', err);
      Alert.alert('Error', 'Failed to load tasks');
    }
  };

  
  const addTask = async () => {
    if (!task.trim()) {
      Alert.alert('Error', 'Please enter a task');
      return;
    }

    try {
      console.log('Adding task:', task);
      const { data, error } = await supabase
        .from('tasks')
        .insert({ title: task })
        .select();
      
      if (error) {
        console.error('Supabase error:', error);
        Alert.alert('Error', `Failed to add task: ${error.message}`);
      } else {
        console.log('Task added successfully:', data);
        setTask('');
        fetchTasks();
        Alert.alert('Success', 'Task added successfully!');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) Alert.alert('Error', error.message);
    else fetchTasks();
  };

  // Pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTasks().finally(() => setRefreshing(false));
  }, []);

  // Test Supabase connection
  const testConnection = async () => {
    try {
      console.log('Testing Supabase connection...');
      const { data, error } = await supabase
        .from('tasks')
        .select('count')
        .single();
      
      if (error) {
        console.error('Connection test failed:', error);
        if (error.message.includes('relation "public.tasks" does not exist')) {
          Alert.alert('Setup Required', 'The tasks table does not exist in your Supabase database. Please create it first.');
        }
      } else {
        console.log('Connection test successful');
      }
    } catch (err) {
      console.error('Connection test error:', err);
    }
  };

  useEffect(() => {
    testConnection();
    fetchTasks();
  }, []);

  const renderItem = ({ item }) => (
    <List.Item
      title={item.title}
      right={() => (
        <IconButton icon="delete" onPress={() => deleteTask(item.id)} />
      )}
    />
  );

  return (
    <View style={styles.container}>
      <TextInput
        label="New Task"
        value={task}
        onChangeText={setTask}
        style={styles.input}
        onSubmitEditing={addTask}
        returnKeyType="done"
      />

      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>No tasks yet. Add one!</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={addTask}
        label="Add Task"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
