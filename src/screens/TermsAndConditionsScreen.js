import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TermsAndConditionsScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Terms & Conditions</Text>
      <Text style={styles.subtitle}>Effective Date: May 6, 2023</Text>

      <Section title="1. Acceptance of Terms">
        By using this app, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the app.
      </Section>

      <Section title="2. Eligibility">
        You must be at least 18 years old and capable of entering into legally binding agreements to use this app.
      </Section>

      <Section title="3. Loan Applications">
        You may apply for a loan through the app. All applications are subject to approval based on eligibility and verification.
      </Section>

      <Section title="4. Repayment">
        You are expected to repay all loans on or before the due date. Late repayments may attract penalties or interest.
      </Section>

      <Section title="5. User Responsibilities">
        You agree to provide accurate information and not to use the app for fraudulent or unlawful activities.
      </Section>

      <Section title="6. Account Suspension">
        We reserve the right to suspend or terminate your account if you violate these terms or misuse the app.
      </Section>

      <Section title="7. Limitation of Liability">
        We are not responsible for any direct or indirect damages arising from use of the app or services offered.
      </Section>

      <Section title="8. Privacy Policy">
        Your use of this app is also governed by our Privacy Policy, which outlines how your data is collected and used.
      </Section>

      <Section title="9. Updates to Terms">
        These terms may change from time to time. Continued use of the app after changes means you accept the updated terms.
      </Section>

      <Section title="10. Contact">
        For questions, contact us at: vcreditsupport@gmail.com
      </Section>
    </ScrollView>
  );
};

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionText}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  content: {
    padding: 20,
    paddingBottom: 80,
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
    color: '#777',
    marginBottom: 20,
    textAlign: 'center',
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
  sectionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
});

export default TermsAndConditionsScreen;
