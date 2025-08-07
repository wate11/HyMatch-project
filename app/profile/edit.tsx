import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';
import { User } from '@/types/User';
import { X, Camera } from 'lucide-react-native';

export default function EditProfileModal() {
  const router = useRouter();
  const { user, setUser } = useUser();
  
  const [formData, setFormData] = useState<Partial<User>>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    age: user?.age || 20,
    gender: user?.gender || 'male',
    nationality: user?.nationality || '',
    email: user?.email || '',
    phone: user?.phone || '',
    japaneseLevel: user?.japaneseLevel || 'N5',
    nearestStationHome: user?.nearestStationHome || '',
    walkTimeHome: user?.walkTimeHome || 5,
    nearestStationSchool: user?.nearestStationSchool || '',
    walkTimeSchool: user?.walkTimeSchool || 5,
    postalCode: user?.postalCode || '',
    prefecture: user?.prefecture || '',
    city: user?.city || '',
    address: user?.address || '',
    visaType: user?.visaType || '',
    preferredDays: user?.preferredDays || [],
    preferredJobTypes: user?.preferredJobTypes || [],
    workExperience: user?.workExperience || '',
  });

  const handleSave = () => {
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const newUser: User = {
      id: user?.id || Date.now().toString(),
      ...formData as User,
      isProfileComplete: true,
    };

    setUser(newUser);
    router.back();
  };

  const genders = ['male', 'female', 'other'];
  const japaneseLevels = ['N1', 'N2', 'N3', 'N4', 'N5'];
  const workDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const jobTypes = ['cooking', 'delivery', 'warehouse', 'cleaning', 'retail', 'restaurant', 'office', 'construction'];

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      preferredDays: prev.preferredDays?.includes(day)
        ? prev.preferredDays.filter(d => d !== day)
        : [...(prev.preferredDays || []), day]
    }));
  };

  const toggleJobType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      preferredJobTypes: prev.preferredJobTypes?.includes(type)
        ? prev.preferredJobTypes.filter(t => t !== type)
        : [...(prev.preferredJobTypes || []), type]
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <X size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.photoSection}>
            <TouchableOpacity style={styles.photoButton}>
              <Camera size={24} color="#6b7280" />
              <Text style={styles.photoButtonText}>Add Photo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>First Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.firstName}
                onChangeText={(text) => setFormData(prev => ({ ...prev, firstName: text }))}
                placeholder="Enter first name"
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Last Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.lastName}
                onChangeText={(text) => setFormData(prev => ({ ...prev, lastName: text }))}
                placeholder="Enter last name"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                value={formData.age?.toString()}
                onChangeText={(text) => setFormData(prev => ({ ...prev, age: parseInt(text) || 20 }))}
                placeholder="Age"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.segmentedControl}>
                {genders.map((gender) => (
                  <TouchableOpacity
                    key={gender}
                    style={[
                      styles.segment,
                      formData.gender === gender && styles.segmentActive
                    ]}
                    onPress={() => setFormData(prev => ({ ...prev, gender: gender as any }))}
                  >
                    <Text style={[
                      styles.segmentText,
                      formData.gender === gender && styles.segmentTextActive
                    ]}>
                      {gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <Text style={styles.label}>Nationality</Text>
          <TextInput
            style={styles.input}
            value={formData.nationality}
            onChangeText={(text) => setFormData(prev => ({ ...prev, nationality: text }))}
            placeholder="Enter nationality"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
            placeholder="Enter email"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Phone *</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Preferences</Text>
          
          <Text style={styles.label}>Japanese Level</Text>
          <View style={styles.segmentedControl}>
            {japaneseLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.segment,
                  formData.japaneseLevel === level && styles.segmentActive
                ]}
                onPress={() => setFormData(prev => ({ ...prev, japaneseLevel: level as any }))}
              >
                <Text style={[
                  styles.segmentText,
                  formData.japaneseLevel === level && styles.segmentTextActive
                ]}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Preferred Work Days</Text>
          <View style={styles.optionsGrid}>
            {workDays.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.gridOption,
                  formData.preferredDays?.includes(day) && styles.gridOptionSelected
                ]}
                onPress={() => toggleDay(day)}
              >
                <Text style={[
                  styles.gridOptionText,
                  formData.preferredDays?.includes(day) && styles.gridOptionTextSelected
                ]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Preferred Job Types</Text>
          <View style={styles.optionsGrid}>
            {jobTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.gridOption,
                  formData.preferredJobTypes?.includes(type) && styles.gridOptionSelected
                ]}
                onPress={() => toggleJobType(type)}
              >
                <Text style={[
                  styles.gridOptionText,
                  formData.preferredJobTypes?.includes(type) && styles.gridOptionTextSelected
                ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  closeButton: {
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  photoButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  photoButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginTop: 4,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  segmentActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  segmentTextActive: {
    color: '#1f2937',
    fontFamily: 'Inter-SemiBold',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  gridOption: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  gridOptionSelected: {
    backgroundColor: '#eff6ff',
    borderColor: '#3B82F6',
  },
  gridOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    textTransform: 'capitalize',
  },
  gridOptionTextSelected: {
    color: '#3B82F6',
    fontFamily: 'Inter-SemiBold',
  },
  footer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  saveButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});