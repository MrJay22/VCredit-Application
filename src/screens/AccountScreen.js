import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import colors from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

const AccountScreen = () => {
  const { user, signOut } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigation = useNavigation();

  const nameInitial = user?.name?.charAt(0)?.toUpperCase() || 'U';

  const menuItems = [
    // { label: 'Loan Verification', icon: 'shield-checkmark-outline', screen: 'LoanVerificationScreen' },
    // { label: 'Customer Support', icon: 'headset-outline', screen: 'ContactSupportScreen' },
    { label: 'Privacy Policy', icon: 'document-text-outline', screen: 'PolicyScreen' },
    // { label: 'How It Works', icon: 'help-circle-outline', screen: 'HowItWorksScreen' },
    { label: 'FAQs', icon: 'information-circle-outline', screen: 'FaqScreen' },
  ];

  const handleLogout = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: signOut, style: 'destructive' },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Sticky Header */}
      <View style={styles.stickyHeader}>
        {/* <View style={styles.headerTop} /> */}
        <View style={styles.headerBottom}>
          <View style={styles.avatarBox}>
            <Text style={styles.avatarText}>{nameInitial}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.name}>{user?.name || 'Unnamed User'}</Text>
            <Text style={styles.phone}>{user?.phone || 'No phone number'}</Text>
            <View style={styles.rankBadge}>
              <Ionicons name="trophy-outline" size={14} color="silver" />
              <Text style={styles.rankText}>Silver Rank</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: 100 }} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

           {/*<View style={styles.settingItem}>
            <Text style={styles.settingText}>Notification</Text>
            <Switch
              value={user?.notificationsEnabled}
              onValueChange={async (value) => {
                try {
                  // Optimistic update
                  setUser({ ...user, notificationsEnabled: value });

                  await api.put(
                    '/me/notifications',
                    { enabled: value },
                    { headers: { Authorization: `Bearer ${user.token}` } }
                  );
                } catch (err) {
                  console.error('Failed to update notifications', err);
                  // Optionally revert on failure
                  setUser({ ...user, notificationsEnabled: !value });
                }
              }}
            />

          </View> */}

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('ChangePasswordScreen')}
          >
            <Text style={styles.settingText}>Change Password</Text>
            <MaterialIcons name="keyboard-arrow-right" size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            
          >
            <Text style={styles.settingText}>Notifications</Text>
            <MaterialIcons name="keyboard-arrow-right" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.settingItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Text style={styles.settingText}>{item.label}</Text>
              <Ionicons name={item.icon} size={20} color={colors.purple} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  stickyHeader: {
    position: 'absolute',
    width: '100%',
    zIndex: 99,
  },
  headerTop: {
    height: 40,
    backgroundColor: colors.purple,
  },
  headerBottom: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatarBox: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
  },
  infoBox: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  phone: {
    fontSize: 14,
    color: '#777',
    marginVertical: 2,
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fceebd',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6,
  },
  rankText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#b88900',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#444',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  settingText: {
    fontSize: 15,
    color: '#333',
  },
  logoutBtn: {
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  logoutText: {
    color: '#d9534f',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default AccountScreen;
