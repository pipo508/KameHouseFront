import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Animated } from 'react-native';
import { getAllUsers, deleteUser } from '../services/api';
import SearchBar from '../components/SearchBar';
import { LinearGradient } from 'expo-linear-gradient';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useSidebarMenu from '../hooks/useSidebarMenu';
import SidebarMenu from '../components/SidebarMenu';


const GOLD_COLOR = '#FFD700';

const AdminUserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;
  const { menuVisible, slideAnim, toggleMenu } = useSidebarMenu();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      Alert.alert("Error", "No se pudieron cargar los usuarios");
    }
  };

  const handleDeleteUser = async (userId) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que quieres eliminar este usuario?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive", 
          onPress: async () => {
            try {
              await deleteUser(userId);
              loadUsers();
              Alert.alert("Éxito", "Usuario eliminado correctamente");
            } catch (error) {
              console.error("Error al eliminar usuario:", error);
              Alert.alert("Error", "No se pudo eliminar el usuario");
            }
          }
        }
      ]
    );
  };

  const renderUserItem = ({ item, index }) => {
    const inputRange = [-1, 0, 100 * index, 100 * (index + 2)];
    const opacityInputRange = [-1, 0, 100 * index, 100 * (index + 1)];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    const opacity = scrollY.interpolate({
      inputRange: opacityInputRange,
      outputRange: [1, 1, 1, 0],
    });

    const renderRightActions = (progress, dragX) => {
      const trans = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });
      return (
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteUser(item.id)}>
          <Animated.Text style={[styles.deleteButtonText, { transform: [{ translateX: trans }] }]}>
            Eliminar
          </Animated.Text>
        </TouchableOpacity>
      );
    };

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <Animated.View style={[styles.userCard, { transform: [{ scale }], opacity }]}>
          <TouchableOpacity onPress={() => navigation.navigate('AdminUserDetailEdit', { userId: item.id })}>
            <View style={styles.cardContent}>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={() => navigation.navigate('AdminUserRoutine', { userId: item.id })}
                >
                  <Icon name="fitness-center" size={28} color={GOLD_COLOR} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={() => navigation.navigate('UserPaymentRecords', { userId: item.id })}
                >
                  <Icon name="payment" size={28} color={GOLD_COLOR} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Swipeable>
    );
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {menuVisible && (
        <SidebarMenu slideAnim={slideAnim} toggleMenu={toggleMenu} navigation={navigation} />
      )}

      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
            <Icon name="menu" size={30} color={GOLD_COLOR} />
          </TouchableOpacity>
          <Text style={styles.title}>Usuarios</Text>
        </View>
        <SearchBar 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
          style={styles.searchBar}
        />
      </View>
      <Animated.FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: GOLD_COLOR,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  menuButton: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: GOLD_COLOR,
    textAlign: 'center',
    flex: 1,
  },
  searchBar: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 10,
    color: GOLD_COLOR,
  },
  listContent: {
    padding: 20,
  },
  userCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: GOLD_COLOR,
  },
  cardContent: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: GOLD_COLOR,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255, 215, 0, 0.8)',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
    padding: 10,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 50,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 100,
    height: '100%',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    padding: 20,
  },
});

export default AdminUserListScreen;