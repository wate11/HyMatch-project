import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'expo-router';
import { CreditCard as Edit, Globe, User as UserIcon } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user } = useUser();
  const { t, language, setLanguage } = useLanguage();
  const router = useRouter();

  const languages = [
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'uz', name: 'O\'zbek', flag: '🇺🇿' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('tabs.profile')}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push('/profile/edit')}
        >
          <Edit size={20} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {user ? (
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              {user.profilePicture ? (
                <Image source={{ uri: user.profilePicture }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <UserIcon size={32} color="#9ca3af" />
                </View>
              )}
              <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
              <Text style={styles.details}>{user.age}歳 • {user.nationality}</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>基本情報</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>メール:</Text>
                <Text style={styles.infoValue}>{user.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>電話:</Text>
                <Text style={styles.infoValue}>{user.phone}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>日本語レベル:</Text>
                <Text style={styles.infoValue}>{user.japaneseLevel}</Text>
              </View>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>住所</Text>
              <Text style={styles.address}>
                〒{user.postalCode}{'\n'}
                {user.prefecture} {user.city}{'\n'}
                {user.address}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.emptyProfile}>
            <UserIcon size={64} color="#9ca3af" />
            <Text style={styles.emptyText}>プロフィールを作成してください</Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => router.push('/profile/edit')}
            >
              <Text style={styles.createButtonText}>プロフィール作成</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.languageSection}>
          <Text style={styles.sectionTitle}>言語設定</Text>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageOption,
                language === lang.code && styles.languageOptionActive
              ]}
              onPress={() => setLanguage(lang.code as any)}
            >
              <Text style={styles.languageFlag}>{lang.flag}</Text>
              <Text style={[
                styles.languageName,
                language === lang.code && styles.languageNameActive
              ]}>
                {lang.name}
              </Text>
              {language === lang.code && (
                <View style={styles.languageCheck}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  address: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 20,
  },
  emptyProfile: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  languageSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  languageOptionActive: {
    backgroundColor: '#eff6ff',
  },
  languageFlag: {
    fontSize: 20,
    marginRight: 12,
  },
  languageName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    flex: 1,
  },
  languageNameActive: {
    color: '#3B82F6',
    fontFamily: 'Inter-SemiBold',
  },
  languageCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 12,
    color: '#ffffff',
    fontFamily: 'Inter-Bold',
  },
});