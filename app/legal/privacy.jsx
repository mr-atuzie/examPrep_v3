import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import Header from "../../components/Header";
import Logo from "../../components/Logo";
import ScreenWrapper from "../../components/ScreenWrapper";

const Privacy = () => {
  const Section = ({ title, children }) => (
    <View className="mb-6">
      <Text className="text-[18px] uppercase tracking-wider font-sans-medium text-primary mb-0.5">
        {title}
      </Text>
      <View>{children}</View>
    </View>
  );

  const handleWebsitePress = () => {
    Linking.openURL("https://www.artech.com");
  };

  return (
    <ScreenWrapper>
      <View className="p-4">
        <Header leftIcon={<BackButton />} logo={<Logo />} />
      </View>
      <ScrollView
        className="flex-1 bg-white px-4 py-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 100 }} // Increased paddingBottom
      >
        {/* Effective Date */}
        <View className="bg-primary rounded py-3 px-4 mb-4">
          <Text className="text-base font-sans-medium text-center  text-white">
            EXAM PREP
          </Text>
          <Text className="text-4xl tracking-wider font-poppins-semibold mb-4 text-center text-white">
            PRIVACY POLICY
          </Text>
          <Text className="text-white tracking-wider w-fit text-center text-base font-sans-medium">
            Effective: September 22, 2025
          </Text>
        </View>

        <Section title="">
          <Text className="text-body font-sans text-gray-800 leading-relaxed mb-2">
            This Privacy Policy describes how ARTECH DEV LIMITED ("Artech,"
            "we," "us," or "our") collects, uses, stores, and protects your
            personal information when you use the Exam Prep mobile application,
            related websites, and services (collectively, the "Service"). This
            Privacy Policy is incorporated by reference into our Terms of Use.
          </Text>
        </Section>

        <Section title="1. Information We Collect">
          <Text className="text-body font-sans text-gray-800  mb-3 leading-relaxed">
            The information we collect when you use Exam Prep falls into three
            categories.
          </Text>
          <Text className="font-sans-medium text-[17px] leading-relaxed ">
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
              If you create an account, you must provide us with some
              information so that we can provide our services to you. This
              includes name, email address, educational level.
            </Text>

            <Text className="text-body leading-relaxed  font-sans text-gray-800 flex-row gap-1">
              <Text className=" font-sans-medium   text-black">
                • Contact Information:{" "}
              </Text>
              When you communicate with our customer support team, such as
              through email, we will collect information about the communication
              and its content.
            </Text>

            <Text className="text-body leading-relaxed  text-gray-800  flex-row gap-1">
              <Text className=" font-sans-medium  text-black">
                • Survey Responses:{" "}
              </Text>
              Feedback and responses to research surveys
            </Text>
          </View>

          <Text className="font-sans-medium text-[17px] leading-relaxed ">
            1.2 Information Collected Automatically
          </Text>

          <Text className="text-body font-sans text-gray-800 leading-relaxed mb-3 ">
            When you use our services, we collect information about how you use
            it. We use that information to provide you with products and
            services, to help keep Exam Prep more secure for everyone, and more
            relevant to you
          </Text>
          <View className="px-4 flex-col gap-3 mb-4">
            <Text className="text-body leading-relaxed  text-gray-800  flex-row gap-1">
              <Text className=" font-sans-medium  text-black">
                • Usage Data:{" "}
              </Text>
              We collect information about your activity on Exam Prep, including
              Time spent on content, progress tracking, feature usage.
            </Text>

            <Text className="text-body leading-relaxed  text-gray-800  flex-row gap-1">
              <Text className=" font-sans-medium  text-black">
                • Device Information:
              </Text>{" "}
              We collect information from and about the devices you use to
              access Exam Prep, including Information about your IP address,
              device type, operating system, browser type.
            </Text>

            <Text className="text-body leading-relaxed  text-gray-800  flex-row gap-1">
              <Text className=" font-sans-medium  text-black">
                • Technical Data:
              </Text>{" "}
              We use the information we collect to measure and analyze crash
              reports, performance metrics, log data.
            </Text>
          </View>

          <Text className="font-sans-medium text-[17px] leading-relaxed mb-2">
            1.3 Information from Third Parties
          </Text>
          <Text className="text-body font-sans text-gray-800 leading-relaxed mb-3 ">
            When you use other online products and services, they may share
            information about that usage with us.
          </Text>
          <View className="px-4 flex-col gap-3 mb-4">
            <Text className="text-body leading-relaxed  text-gray-800  flex-row gap-1">
              <Text className=" font-sans-medium  text-black">
                • Payment Processors:{" "}
              </Text>
              We collect information from and about transaction details from app
              stores and payment providers
            </Text>

            <Text className="text-body leading-relaxed  text-gray-800  flex-row gap-1">
              <Text className=" font-sans-medium  text-black">
                • Analytics Providers:
              </Text>{" "}
              We may receive information about your Usage patterns and service
              performance data
            </Text>

            <Text className="text-body leading-relaxed  text-gray-800  flex-row gap-1">
              <Text className=" font-sans-medium  text-black">
                • Educational Partners:
              </Text>{" "}
              Relevant academic information where applicable
            </Text>
          </View>
        </Section>

        <Section title="2. How We Use Your Information">
          <Text className="text-body font-sans text-gray-900 leading-relaxed  mb-1">
            When you use our services, the information you provide will be used
            for different purposes to ultimately deliver a single service.
          </Text>

          <Text className="text-body font-sans text-gray-800 leading-relaxed mb-3 ">
            We think it's most useful to describe the five main ways we use
            these information.
          </Text>

          <Text className="font-sans-medium text-[17px] leading-relaxed mb-2">
            2.1 To Provide and Maintain the Service
          </Text>

          <View className="px-4 flex-col gap-3 mb-4">
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • We use the information we collect to create and manage your
              account
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Deliver educational content and personalized learning paths
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • We use your information to process payments and manage
              subscriptions
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • We use your information to provide customer support and service
              updates
            </Text>
          </View>

          <Text className="font-sans-medium text-[17px] leading-relaxed mb-2">
            2.2 To Improve Our Services
          </Text>
          <View className="px-4 flex-col gap-3 mb-4">
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • We use the information we collect analyze learning patterns and
              content effectiveness
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Develop new features and educational tools
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • We use the information we collect conduct research to enhance
              learning outcomes
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Ensure platform stability and performance
            </Text>
          </View>

          <Text className="font-sans-medium text-[17px] leading-relaxed mb-2">
            2.3 Communication
          </Text>

          <View className="px-4 flex-col gap-3 mb-4">
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Send service-related announcements and updates
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Respond to your inquiries and support requests
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Send marketing communications about new features
            </Text>
          </View>

          <Text className="font-sans-medium text-[17px] leading-relaxed mb-2">
            2.4 Legal and Security Purposes
          </Text>

          <Text className="text-body font-sans text-gray-900 leading-relaxed  mb-1">
            We may preserve, use, share, or disclose your information if we
            believe that it is reasonably necessary to
          </Text>

          <View className="px-4 flex-col gap-3 mb-4">
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Comply with legal obligations
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Protect against fraud and abuse
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Enforce our Terms of Use and other policies
            </Text>
          </View>
        </Section>

        <Section title="3. Information Sharing And Disclosure">
          <Text className="font-sans-medium text-[17px] leading-relaxed mb-2">
            3.1 Service Providers
          </Text>
          <Text className="text-body font-sans text-gray-800 leading-relaxed mb-3 ">
            We share information with trusted third parties who assist in
            providing the Service:
          </Text>
          <View className="px-4 flex-col gap-3 mb-4">
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Payment processors (Apple App Store, Google Play Store, other
              payment gateways)
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Cloud hosting providers for data storage and security
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Analytics services to understand usage patterns
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Customer support platforms for user assistance
            </Text>
          </View>

          <Text className="font-sans-medium text-[17px] leading-relaxed mb-2">
            3.2 Legal Requirements
          </Text>
          <Text className="text-body font-sans text-gray-800 leading-relaxed mb-3 ">
            We may disclose information when required by law to
          </Text>
          <View className="px-4 flex-col gap-3 mb-4">
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Comply with legal processes or government requests
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Protect our rights, property, or safety
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Prevent fraud or security issues
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Enforce our Terms of Use
            </Text>
          </View>

          <Text className="font-sans-medium text-[17px] leading-relaxed mb-2">
            3.3 Business Transfers
          </Text>
          <Text className="text-body leading-relaxed  text-gray-800  ">
            In connection with a merger, acquisition, or sale of assets, user
            information may be transferred as part of the business assets.
          </Text>
        </Section>

        <Section title="4. Data Retention">
          <Text className="text-body font-sans text-gray-800 leading-relaxed mb-3 ">
            We retain your personal information for as long as necessary to
            provide the Service and fulfill the purposes described in this
            policy:
          </Text>
          <View className="px-4 flex-col gap-3 mb-4">
            <Text className="text-body leading-relaxed  text-gray-800  flex-row gap-1">
              <Text className=" font-sans-medium  text-black">
                • Active accounts:
              </Text>{" "}
              We keep your profile information, such as your display name, user
              name, password and email address for the duration of your account.
              We cannot provide you with our services without retaining this
              information.
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  flex-row gap-1">
              <Text className=" font-sans-medium  text-black">
                • Inactive accounts:
              </Text>{" "}
              Data retained for 3 years after last used.
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  flex-row gap-1">
              <Text className=" font-sans-medium  text-black">
                • Payment information:
              </Text>{" "}
              We keep your payment information, we do not have accesss or retain
              your credit or debit card number and billing address,Records of
              transactions will be kept for 7 years for legal and accounting
              purposes
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  flex-row gap-1">
              <Text className=" font-sans-medium  text-black">
                • Communication Information:
              </Text>{" "}
              If you communicate with us, such as through email, we will keep
              information about the communication and its content for up to 18
              months, unless it is necessary for us to retain it for a longer
              period to comply with our legal obligations or to exercise or
              defend our legal rights.
            </Text>
          </View>
        </Section>

        <Section title="5. Data Security">
          <Text className="text-body font-sans text-gray-800 leading-relaxed mb-3 ">
            We implement appropriate technical and organizational measures to
            protect your personal information:
          </Text>
          <View className="px-4 flex-col gap-3 mb-4">
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Encryption of data in transit and at rest
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Regular security assessments and monitoring
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Access controls and authentication procedures
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Secure development practices
            </Text>
          </View>
        </Section>

        <Section title="6. International Data Transfers">
          <Text className="text-body font-sans text-gray-800 leading-relaxed mb-3 ">
            As a global service, your information may be transferred to and
            processed in countries outside your residence. We ensure appropriate
            safeguards are in place for these transfers, including:
          </Text>
          <View className="px-4 flex-col gap-3 mb-4">
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Standard contractual clauses where required
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Compliance with applicable data protection laws
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Technical and organizational security measures
            </Text>
          </View>
        </Section>

        <Section title="7. Your Rights And Choices">
          <Text className="font-sans-medium text-[17px] leading-relaxed mb-2">
            7.1 Access and Control
          </Text>
          <Text className="text-body font-sans text-gray-800 leading-relaxed mb-3 ">
            You have the right to:
          </Text>
          <View className="px-4 flex-col gap-3 mb-4">
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Access the personal information we hold about you
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Correct inaccurate or incomplete information
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Request deletion of your personal information
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Restrict or object to certain processing activities
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Data portability in a machine-readable format
            </Text>
          </View>

          <Text className="font-sans-medium text-[17px] leading-relaxed mb-2">
            7.2 Communication Preferences
          </Text>
          <View className="px-4 flex-col gap-3 mb-4">
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Manage marketing communications through your account settings
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Opt-out of promotional emails while receiving essential service
              messages
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Control notification preferences within the application
            </Text>
          </View>

          <Text className="font-sans-medium text-[17px] leading-relaxed mb-2">
            7.3 Exercising Your Rights
          </Text>
          <Text className="text-body leading-relaxed  text-gray-800  ">
            To exercise your rights, contact us at privacy@artech.com. We will
            respond to legitimate requests within 30 days.
          </Text>
        </Section>

        <Section title="8. Children's Privacy">
          <Text className="font-sans-medium text-[17px] leading-relaxed mb-2">
            8.1 Age Restrictions
          </Text>
          <Text className="text-body leading-relaxed  text-gray-800  mb-3">
            Our Services are intended for users aged 13 and above. If you are
            under 18, you represent that you have your parent or guardian's
            permission to use the Service.
          </Text>
          <Text className="font-sans-medium text-[17px] leading-relaxed mb-2">
            8.2 Parental Controls
          </Text>
          <Text className="text-body leading-relaxed  text-gray-800  mb-3">
            Parents and guardians can:
          </Text>
          <View className="px-4 flex-col gap-3 mb-4">
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Review their child's personal information
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Request deletion of their child's information
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Revoke consent and terminate account access
            </Text>
          </View>
        </Section>

        <Section title="9. Cookies And Similar Technologies">
          <Text className="text-body leading-relaxed  text-gray-800  mb-3">
            We use cookies and similar technologies to:
          </Text>
          <View className="px-4 flex-col gap-3 mb-4">
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Authenticate users and maintain session information
            </Text>

            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Remember your preferences and settings
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Analyze service usage and improve performance
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Personalize your learning experience
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • You can control cookies through your browser settings, though
              this may affect Service functionality.
            </Text>
          </View>
        </Section>

        <Section title="10. Third-Party Links And Servieces">
          <Text className="text-body leading-relaxed  text-gray-800  mb-3">
            Our Service may contain links to third-party websites or services.
            This Privacy Policy does not apply to third-party practices, and we
            encourage you to review their privacy policies.
          </Text>
        </Section>

        <Section title="11. Changes To This Privacy Policy">
          <Text className="text-body leading-relaxed  text-gray-800  mb-3">
            We may update this Privacy Policy to reflect changes in our
            practices or legal requirements. We will notify you of material
            changes by:
          </Text>
          <View className="px-4 flex-col gap-3 mb-4">
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Posting the updated policy on our website and application
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Sending email notifications to registered users
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Updating the "Last Updated" date
            </Text>
            <Text className="text-body leading-relaxed  text-gray-800  ">
              • Your continued use of the Service after changes constitutes
              acceptance of the updated policy.
            </Text>
          </View>
        </Section>

        <Section title="12. CONTACT INFORMATION">
          <Text className="text-body leading-relaxed  text-gray-800  mb-3">
            We want to hear from you if you have thoughts or questions about
            this Privacy Policy. You can contact us via our Privacy Policy
            Inquiries page or by writing to us at the appropriate address below.
          </Text>
          <View className="px-4 flex-col gap-3 mb-4">
            <Text className="font-sans-medium text-[17px] leading-relaxed mb-2">
              ARTECH DEV LIMITED
            </Text>
            <Text className="text-base leading-relaxed">
              [Your Company Address]
            </Text>
            <Text className="text-base leading-relaxed">
              Email: support@artech.com
            </Text>
            <TouchableOpacity onPress={handleWebsitePress}>
              <Text className="text-base leading-relaxed text-blue-600 underline">
                Website: www.artech.com
              </Text>
            </TouchableOpacity>
          </View>
        </Section>

        <CustomButton
          // loading={loading}
          backgroundColor="#1E4B9B"
          // onPress={handleRegister}
          containerStyles={"mt-4"}
        >
          <Text className="text-white text-body font-sans-medium">
            Download PDF
          </Text>
        </CustomButton>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Privacy;
