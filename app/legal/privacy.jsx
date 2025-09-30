import { ScrollView, Text, View } from "react-native";

const Privacy = () => {
  const Section = ({ title, children }) => (
    <View className="mb-6">
      <Text className="text-[20px] font-sans-bold text-primary mb-2">
        {title}
      </Text>
      <View>{children}</View>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      {/* Effective Date */}
      <View className="bg-primary rounded-xl py-3 px-4 mb-4">
        <Text className="text-2xl font-sans-bold text-center mb-6 text-white">
          EXAM PREP PRIVACY POLICY
        </Text>
        <Text className="text-white text-center font-sans-medium">
          Effective: September 22, 2025
        </Text>
      </View>

      <Section title="">
        <Text className="text-body font-sans text-gray-800 leading-relaxed mb-2">
          This Privacy Policy describes how ARTECH DEV LIMITED ("Artech," "we,"
          "us," or "our") collects, uses, stores, and protects your personal
          information when you use the Exam Prep mobile application, related
          websites, and services (collectively, the "Service"). This Privacy
          Policy is incorporated by reference into our Terms of Use.
        </Text>
      </Section>

      <Section title="1. Information We Collect">
        <Text className="text-body font-sans text-gray-800  mb-3 leading-relaxed">
          The information we collect when you use Exam Prep falls into three
          categories.
        </Text>
        <Text className="font-sans-bold text-[17px] leading-relaxed ">
          1.1 Information You Provide
        </Text>
        <Text className="text-body font-sans  text-gray-800 leading-relaxed mb-3 ">
          To use our products and services you need to have an account, and to
          create an account, you need to provide us certain information.
          Basically, certain information is necessary if you want to use our
          services.
        </Text>
        <View className="px-4 mb-4 flex-col gap-3">
          <Text className="text-body font-sans leading-relaxed text-gray-800 flex-row gap-1">
            <Text className=" font-sans-medium text-black">
              • Account Information:{" "}
            </Text>
            If you create an account, you must provide us with some information
            so that we can provide our services to you. This includes name,
            email address, educational level.
          </Text>

          {/* <Text className="text-body leading-relaxed font-sans  mb-3 flex-row gap-1">
            • Profile Data: Learning goals, academic interests, performance
            history
          </Text> */}

          <Text className="text-body leading-relaxed  font-sans text-gray-800 flex-row gap-1">
            <Text className=" font-sans-medium   text-black">
              • Contact Information:{" "}
            </Text>
            When you communicate with our customer support team, such as through
            email, we will collect information about the communication and its
            content.
          </Text>

          <Text className="text-body leading-relaxed  text-gray-800  flex-row gap-1">
            <Text className=" font-sans-medium  text-black">
              • Survey Responses:{" "}
            </Text>
            Feedback and responses to research surveys
          </Text>
        </View>

        <Text className="font-sans-bold text-[17px] leading-relaxed ">
          1.2 Information Collected Automatically
        </Text>

        <Text className="text-body font-sans leading-relaxed mb-3 ">
          When you use our services, we collect information about how you use
          it. We use that information to provide you with products and services,
          to help keep Exam Prep more secure and respectful for everyone, and
          more relevant to you
        </Text>
        <View className="px-4 flex-col gap-3 mb-4">
          <Text className="text-body leading-relaxed  font-sans  flex-row gap-1">
            <Text className=" font-sans-medium ">• Usage Data: </Text>
            We collect information about your activity on Exam Prep, including
            Time spent on content, progress tracking, feature usage
          </Text>
          <Text className="text-body leading-relaxed  font-sans  flex-row gap-1">
            <Text className=" font-sans-medium ">• Device Information:</Text> We
            collect information from and about the devices you use to access
            Exam Prep, including Information about your IP address, device type,
            operating system, browser type
          </Text>
          <Text className="text-body leading-relaxed  font-sans  flex-row gap-1">
            <Text className=" font-sans-medium ">• Technical Data:</Text> Crash
            reports, performance metrics, log data
          </Text>
          {/* <Text className="text-[17px] leading-relaxed  font-sans mb-3 flex-row gap-1">
          • Location Data: General location information for regional content
          personalization
        </Text> */}
        </View>

        <Text className="font-sans-bold text-[17px] leading-relaxed mb-2">
          1.3 Information from Third Parties
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans  mb-3 flex-row gap-1">
          • Payment Processors: Transaction details from app stores and payment
          providers
        </Text>

        <Text className="text-[17px] leading-relaxed  font-sans  mb-3 flex-row gap-1">
          • Analytics Providers: Usage patterns and service performance data
        </Text>

        <Text className="text-[17px] leading-relaxed font-sans  mb-3 flex-row gap-1">
          • Educational Partners: Relevant academic information where applicable
        </Text>
      </Section>

      <Section title="2. HOW WE USE YOUR INFORMATION">
        <Text className="font-sans-bold text-[20px] leading-relaxed mb-2">
          2.1 To Provide and Maintain the Service
        </Text>
        <Text className="text-[17px] leading-relaxed  font-sans mb-3 flex-row gap-1">
          • Create and manage your account
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans  mb-3 flex-row gap-1">
          • Deliver educational content and personalized learning paths
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans  mb-3 flex-row gap-1">
          • Process payments and manage subscriptions
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Provide customer support and service updates
        </Text>

        <Text className="font-sans-bold text-[20px] leading-relaxed mb-2">
          2.2 To Improve Our Services
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Analyze learning patterns and content effectiveness
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Develop new features and educational tools
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Conduct research to enhance learning outcomes
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Ensure platform stability and performance
        </Text>

        <Text className="font-sans-bold text-[20px] leading-relaxed mb-2">
          2.3 Communication
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Send service-related announcements and updates
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Respond to your inquiries and support requests
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • With your consent, send marketing communications about new features
        </Text>

        <Text className="font-sans-bold text-[20px] leading-relaxed mb-2">
          2.4 Legal and Security Purposes
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Comply with legal obligations
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Protect against fraud and abuse
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Enforce our Terms of Use and other policies
        </Text>
      </Section>

      <Section title="3. INFORMATION SHARING AND DISCLOSURE">
        <Text className="font-sans-bold text-[20px] leading-relaxed mb-2">
          3.1 Service Providers
        </Text>
        <Text className="text-[17px] uppercase leading-relaxed font-sans-bold mb-2 flex-row gap-1">
          We share information with trusted third parties who assist in
          providing the Service:
        </Text>
        <Text className="text-body leading-relaxed mb-3">
          • Payment processors (Apple App Store, Google Play Store, other
          payment gateways)
        </Text>
        <Text className="text-body leading-relaxed mb-3">
          • Cloud hosting providers for data storage and security
        </Text>
        <Text className="text-body leading-relaxed mb-3">
          • Analytics services to understand usage patterns
        </Text>
        <Text className="text-body leading-relaxed mb-4">
          • Customer support platforms for user assistance
        </Text>

        <Text className="font-sans-bold text-[20px] leading-relaxed mb-2">
          3.2 Legal Requirements
        </Text>
        <Text className="text-[17px] uppercase leading-relaxed font-sans-bold mb-2 flex-row gap-1">
          We may disclose information when required by law or to:
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Comply with legal processes or government requests
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Protect our rights, property, or safety
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Prevent fraud or security issues
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-4 flex-row gap-1">
          • Enforce our Terms of Use
        </Text>

        <Text className="font-sans-bold text-[20px] leading-relaxed mb-2">
          3.3 Business Transfers
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          In connection with a merger, acquisition, or sale of assets, user
          information may be transferred as part of the business assets.
        </Text>
      </Section>

      <Section title="4. DATA RETENTION">
        <Text className="text-[17px] uppercase leading-relaxed font-sans-bold mb-2 flex-row gap-1">
          We retain your personal information for as long as necessary to
          provide the Service and fulfill the purposes described in this policy:
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Active accounts: Retained while your account remains active
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Inactive accounts: Data retained for 3 years after last use
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Payment information: Retained for 7 years for legal and accounting
          purposes
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-4 flex-row gap-1">
          • Analytics data: Aggregated and anonymized after 2 years
        </Text>
      </Section>

      <Section title="5. DATA SECURITY">
        <Text className="text-[17px] uppercase leading-relaxed font-sans-bold mb-2 flex-row gap-1">
          We implement appropriate technical and organizational measures to
          protect your personal information:
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Encryption of data in transit and at rest
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Regular security assessments and monitoring
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Access controls and authentication procedures
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Secure development practices
        </Text>
      </Section>

      <Section title="6. INTERNATIONAL DATA TRANSFERS">
        <Text className="text-[17px] uppercase leading-relaxed font-sans-bold mb-2 flex-row gap-1">
          As a global service, your information may be transferred to and
          processed in countries outside your residence. We ensure appropriate
          safeguards are in place for these transfers, including:
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Standard contractual clauses where required
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Compliance with applicable data protection laws
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Technical and organizational security measures
        </Text>
      </Section>

      <Section title="7. YOUR RIGHTS AND CHOICES">
        <Text className="font-sans-bold text-[20px] leading-relaxed mb-2">
          7.1 Access and Control
        </Text>
        <Text className="text-[17px] uppercase leading-relaxed font-sans-bold mb-2 flex-row gap-1">
          You have the right to:
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Access the personal information we hold about you
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Correct inaccurate or incomplete information
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Request deletion of your personal information
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Restrict or object to certain processing activities
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          • Data portability in a machine-readable format
        </Text>

        <Text className="font-sans-bold text-[20px] leading-relaxed mb-2">
          7.2 Communication Preferences
        </Text>
        <Text className="text-body leading-relaxed mb-2">
          • Manage marketing communications through your account settings
        </Text>
        <Text className="text-body leading-relaxed mb-2">
          • Opt-out of promotional emails while receiving essential service
          messages
        </Text>
        <Text className="text-body leading-relaxed mb-4">
          • Control notification preferences within the application
        </Text>

        <Text className="font-sans-bold text-[20px] leading-relaxed mb-2">
          7.3 Exercising Your Rights
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          To exercise your rights, contact us at privacy@artech.com. We will
          respond to legitimate requests within 30 days.
        </Text>
      </Section>

      <Section title="8. CHILDREN'S PRIVACY">
        <Text className="font-sans-bold text-[20px] leading-relaxed mb-2">
          8.1 Age Restrictions
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans mb-3 flex-row gap-1">
          Our Services are intended for users aged 13 and above. If you are
          under 18, you represent that you have your parent or guardian's
          permission to use the Service.
        </Text>
        <Text className="font-sans-bold text-[20px] leading-relaxed mb-2">
          8.2 Parental Controls
        </Text>
        <Text className="font-sans-bold text-[17px] uppercase leading-relaxed mb-2">
          Parents and guardians can:
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans  mb-3 flex-row gap-1">
          • Review their child's personal information
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans  mb-3 flex-row gap-1">
          • Request deletion of their child's information
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans  mb-3 flex-row gap-1">
          • Revoke consent and terminate account access
        </Text>
      </Section>

      <Section title="9. COOKIES AND SIMILAR TECHNOLOGIES">
        <Text className="font-sans-bold uppercase text-[17px] leading-relaxed mb-2">
          We use cookies and similar technologies to:
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans  mb-3 flex-row gap-1">
          • Authenticate users and maintain session information
        </Text>

        <Text className="text-[17px] leading-relaxed font-sans  mb-3 flex-row gap-1">
          • Remember your preferences and settings
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans  mb-3 flex-row gap-1">
          • Analyze service usage and improve performance
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans  mb-3 flex-row gap-1">
          • Personalize your learning experience
        </Text>
        <Text className="text-[17px] leading-relaxed font-sans  mb-3 flex-row gap-1">
          • You can control cookies through your browser settings, though this
          may affect Service functionality.
        </Text>
      </Section>

      <Section title="10. THIRD-PARTY LINKS AND SERVICES">
        <Text className="text-[17px]  leading-relaxed font-sans mb-2 flex-row gap-1">
          Our Service may contain links to third-party websites or services.
          This Privacy Policy does not apply to third-party practices, and we
          encourage you to review their privacy policies.
        </Text>
      </Section>

      <Section title="11. CHANGES TO THIS PRIVACY POLICY">
        <Text className="font-sans-bold text-[17px] leading-relaxed uppercase mb-2">
          We may update this Privacy Policy to reflect changes in our practices
          or legal requirements. We will notify you of material changes by:
        </Text>
        <Text className="text-body leading-relaxed mb-2">
          • Posting the updated policy on our website and application
        </Text>
        <Text className="text-body leading-relaxed mb-2">
          • Sending email notifications to registered users
        </Text>
        <Text className="text-body leading-relaxed mb-2">
          • Updating the "Last Updated" date
        </Text>
        <Text className="text-body leading-relaxed mb-4">
          • Your continued use of the Service after changes constitutes
          acceptance of the updated policy.
        </Text>
      </Section>

      <Section title="12. CONTACT INFORMATION">
        <Text className="text-[17px] uppercase leading-relaxed font-sans-bold mb-2 flex-row gap-1">
          For privacy-related inquiries or to exercise your rights, contact us:
        </Text>
        <Text className="text-base leading-relaxed">ARTECH DEV LIMITED</Text>
        <Text className="text-base leading-relaxed">
          [Your Company Address]
        </Text>
        <Text className="text-base leading-relaxed">
          Email: support@artech.com
        </Text>
        <Text className="text-base leading-relaxed">
          Website: www.artech.com
        </Text>
      </Section>
    </ScrollView>
  );
};

export default Privacy;
