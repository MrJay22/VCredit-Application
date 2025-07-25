import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <Text style={styles.title}>Privacy Policy</Text>

      <Section title="1. Information We Collect">
        <Text style={styles.text}>
          We may collect your full name, phone number, address, NIN/BVN, occupation, bank details,
          guarantor/emergency contacts, and ID images when you register or apply for a loan.
        </Text>
      </Section>

      <Section title="2. How We Use Your Information">
        <Text style={styles.text}>
          Your data helps us verify your identity, process loans, manage repayments, improve services, and comply with the law.
        </Text>
      </Section>

      <Section title="3. Data Sharing">
        <Text style={styles.text}>
          We do not sell your data. We may share it with financial partners, verification agencies, or as required by law.
        </Text>
      </Section>

      <Section title="4. Data Security">
        <Text style={styles.text}>
          We use encryption and secure servers to protect your data. However, no method is 100% secure.
        </Text>
      </Section>

      <Section title="5. Your Rights">
        <Text style={styles.text}>
          You can request to access, correct, or delete your data. To do so, contact us at vcreditsupport@gmail.com.
        </Text>
      </Section>

      <Section title="6. Cookies and Analytics">
        <Text style={styles.text}>
          We may use analytics tools to improve our app. These do not personally identify users.
        </Text>
      </Section>

      <Section title="7. Children’s Privacy">
        <Text style={styles.text}>
          Our app is not intended for users under 18. We do not knowingly collect information from minors.
        </Text>
      </Section>

      <Section title="8. Updates to This Policy">
        <Text style={styles.text}>
          We may update this policy. Continued use of the app means you accept the updated policy.
        </Text>
      </Section>

      <Section title="9. Contact Us">
        <Text style={styles.text}>
          Email: vcreditsupport@gmail.com {"\n"}
          App: VCredit
        </Text>
      </Section>
    </ScrollView>
  );
}

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6A0DAD',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6A0DAD',
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
});
