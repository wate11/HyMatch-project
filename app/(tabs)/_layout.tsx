import { Tabs } from 'expo-router';
import { Heart, X, Check, User, Settings } from 'lucide-react-native';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TabLayout() {
  const router = useRouter();
  const { t } = useLanguage();

  const ContactButton = () => (
    <TouchableOpacity
      style={styles.contactButton}
      onPress={() => router.push('/contact')}
    >
      <View style={styles.contactIcon}>
        <Settings size={24} color="#ffffff" />
      </View>
    </TouchableOpacity>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#9ca3af',
      }}>
      <Tabs.Screen
        name="refused"
        options={{
          title: t('tabs.refused'),
          tabBarIcon: ({ size, color }) => (
            <X size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.jobs'),
          tabBarIcon: ({ size, color }) => (
            <Heart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: '',
          tabBarIcon: () => <ContactButton />,
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => router.push('/contact')}
              style={styles.contactTabButton}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chosen"
        options={{
          title: t('tabs.chosen'),
          tabBarIcon: ({ size, color }) => (
            <Check size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  contactButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 20,
  },
  contactIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});