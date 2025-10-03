import { useRouter } from "expo-router";
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

const Section = ({ title, children }) => (
  <View className="mb-3">
    <Text className="text-[18px] uppercase tracking-wider font-sans-medium text-primary mb-0.5">
      {title}
    </Text>
    <View>{children}</View>
  </View>
);

const Terms = () => {
  const router = useRouter();

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
        <View className="bg-primary py-3 px-4 mb-4 rounded">
          <Text className="text-base font-sans-medium text-center  text-white">
            EXAM PREP
          </Text>
          <Text className="text-4xl tracking-wider font-poppins-semibold mb-4 text-center text-white">
            TERMS OF SERVICE
          </Text>
          <Text className="text-white tracking-wider w-fit text-center text-base font-sans-medium">
            Effective: September 22, 2025
          </Text>
        </View>

        <Section title="">
          <Text className="text-body font-sans text-gray-800 leading-relaxed mb-3">
            These Terms of Use ("Terms") constitute a legal agreement between
            you ("User," "you," or "your") and ARTECH DEV LTD ("Artech," "we,"
            "us," or "our"). These Terms govern your access to and use of the
            Exam prep mobile application, its related websites, and all
            associated services (collectively, the "Service"). Exam Prep is a
            product owned and operated by ARTECH DEV LIMITED.
          </Text>

          <Text className="text-body font-sans-medium text-gray-800 leading-relaxed mb-3">
            PLEASE READ THESE TERMS CAREFULLY. BY CREATING AN ACCOUNT,
            ACCESSING, OR USING THE SERVICE, YOU AGREE TO BE BOUND BY THESE
            TERMS AND OUR PRIVACY POLICY. IF YOU DO NOT AGREE, YOU MUST NOT USE
            THE SERVICE.
          </Text>
        </Section>

        <Section title="1.SERVICES">
          <Text className="text-body font-sans text-gray-800  mb-3 leading-relaxed">
            Exam Prep is an edtech platform designed to help students master
            exam preparation materials. The Service provides educational content
            and practice tools for exams, including but not limited to WAEC,
            JAMB, BECE, SAT, TOEFL, and ACT. While initially focused on Nigeria
            and Africa, the Service is accessible to users globally, subject to
            these Terms and applicable local laws.
          </Text>
        </Section>

        <Section title="2. Eligibility & Accoint Registration">
          <View className="px-4 mb-4 flex-col gap-3">
            <View>
              <Text className="text-body font-sans leading-relaxed text-gray-800 flex-row gap-1">
                <Text className=" font-sans-medium text-body text-black">
                  • Eligibility:{" "}
                </Text>
                You must be at least 13 years of age (or the minimum age of
                digital consent in your country) to use the Service. If you are
                under 18, you represent that you have your parent or guardian's
                permission to use the Service and that they have read and agreed
                to these Terms on your behalf.
              </Text>
            </View>

            <View>
              <Text className="text-body leading-relaxed  font-sans text-gray-800 flex-row gap-1">
                <Text className=" font-sans-medium  text-body text-black">
                  • Account Creation:{" "}
                </Text>
                You must provide accurate and complete information during
                registration and keep it updated.You represent that all
                information you provide to us upon registration and at all other
                times will be true, accurate, current, and complete. If you
                choose, or you are provided with, a user identification code,
                password or any other piece of information as part of our
                security procedures, you must treat such information as
                confidential. You must not disclose it to any third party.
              </Text>
            </View>

            <View>
              <Text className="text-body leading-relaxed  font-sans text-gray-800 flex-row gap-1">
                <Text className=" font-sans-medium  text-body  text-black">
                  • Account Security:{" "}
                </Text>
                You are responsible for all activities under your account. You
                must notify us immediately of any unauthorized use at
                support@artech.com.
              </Text>
            </View>
          </View>
        </Section>

        <Section title="3. Privacy And Data Protection ">
          <Text className="text-body font-sans text-gray-800  mb-3 leading-relaxed">
            Our Privacy Policy describes how we handle the information you
            provide to us when you use the Services. You understand that through
            your use of the Services you consent to the collection and use (as
            set forth in the Privacy Policy).
          </Text>
          <View className="px-4 mb-4 flex-col gap-3">
            <Text className="text-body font-sans leading-relaxed text-gray-900 flex-row gap-1">
              <Text className=" font-sans-medium text-black">
                3.1. Commitment to Privacy:{" "}
              </Text>
              Artech is committed to protecting your personal information. Our
              collection, use, and disclosure of your personal data are governed
              by our Privacy Policy, which is incorporated into these Terms by
              this reference.
            </Text>

            <Text className="text-body font-sans leading-relaxed text-gray-900 flex-row gap-1">
              <Text className=" font-sans-medium text-black">
                3.2. Consent to Data Practices:{" "}
              </Text>
              By using the Service, you consent to the data practices described
              in our Privacy Policy. This includes how we collect, process, and
              store your information, which may involve transferring data to
              servers located in Nigeria or other countries with different data
              protection laws than your country of residence.
            </Text>
            <Text className="text-body font-sans leading-relaxed text-gray-900 flex-row gap-1">
              <Text className=" font-sans-medium text-black">
                3.3. Global Compliance:
              </Text>{" "}
              Our Privacy Policy is designed to comply with applicable data
              protection laws, including the Nigeria Data Protection Act (NDPA).
              For users located in other regions, such as the European Economic
              Area (EEA) or the United Kingdom, the Privacy Policy outlines the
              legal bases for processing and your respective rights.
            </Text>
            {/* <Text className="text-body font-sans leading-relaxed text-gray-800 flex-row gap-1">
              <Text className=" font-sans-medium text-black">
                15.4. Updates to Privacy Policy:
              </Text>{" "}
              We may update our Privacy Policy from time to time to reflect
              changes in our practices or the law. We will notify you of any
              material changes as required by law, and your continued use of the
              Service after such changes constitutes your acceptance of the
              updated Privacy Policy.
            </Text> */}
          </View>

          <Text className="text-body text-gray-800 leading-relaxed mb-4">
            You confirm that you have read, understood, and agree to be bound by
            our Privacy Policy, which can be accessed at{" "}
            <Text
              onPress={() => router.push("/legal/privacy")}
              className=" text-blue-500"
            >
              Privacy Policy
            </Text>{" "}
            .
          </Text>
        </Section>

        <Section title="4. License And Use">
          <View className="px-4 mb-4 flex-col gap-3">
            <Text className="text-body font-sans leading-relaxed text-gray-900 flex-row gap-1">
              <Text className=" font-sans-medium text-black">
                • License Grant:{" "}
              </Text>
              Subject to these Terms, we grants you a limited, non-exclusive,
              non-transferable license to use the Service for your personal,
              non-commercial educational purposes.
            </Text>

            <Text className="text-body font-sans leading-relaxed text-gray-900 flex-row gap-1">
              <Text className=" font-sans-medium text-black">
                • Restrictions::{" "}
              </Text>
              You agree not to copy, modify, or reverse engineer any part of the
              Service, Use the Service for any commercial purpose without our
              express written consent, Use bots, scrapers, or other automated
              means to access the Service,Engage in any activity that disrupts
              or interferes with the Service.
            </Text>
          </View>
        </Section>

        <Section title="5. Fees, Payments And Subscriptions">
          <View className="px-4 mb-4 flex-col gap-3">
            <Text className="text-body font-sans leading-relaxed text-gray-900 flex-row gap-1">
              <Text className=" font-sans-medium text-black">• Fees: </Text>
              Certain features of the Service are provided for a fee. You can
              view the applicable fees within the app or on our website. All
              fees are exclusive of applicable taxes.
            </Text>

            <Text className="text-body font-sans leading-relaxed text-gray-900 flex-row gap-1">
              <Text className=" font-sans-medium text-black">
                • App Store Payments:{" "}
              </Text>
              If you purchase a subscription through the Apple App Store or
              Google Play Store, the payment is processed by that store, and you
              are subject to their payment terms and conditions.
            </Text>

            <Text className="text-body font-sans leading-relaxed text-gray-900 flex-row gap-1">
              MANAGING YOUR SUBSCRIPTION AND REQUESTING REFUNDS MUST BE DONE
              DIRECTLY THROUGH THE APP STORE.
            </Text>
          </View>
        </Section>

        <Section title="6. Intellectual Property">
          <Text className="text-body font-sans leading-relaxed text-gray-900 flex-row gap-1">
            The Service, including all content, features, software, and logos,
            is owned by Artech or its licensors and is protected by copyright,
            trademark, and other laws. except for the limited license granted
            herein, no rights are transferred to you. You may not use our
            trademarks without our prior written permission.
          </Text>
        </Section>

        {/* <Section title="6. USER-GENERATED CONTENT (Limited Scope)">
          <Text className="text-base leading-relaxed mb-4">
            The Service may allow you to post content, such as questions or
            comments in forums. By posting, you grant us a license to use that
            content to operate the Service. You are solely responsible for your
            content, and it must not be illegal, abusive, or infringe on others'
            rights. We reserve the right to remove any content at our
            discretion.
          </Text>
        </Section> */}

        <Section title="7. DISCLAIMER OF WARRANTIES">
          <Text className="text-body uppercase font-sans-medium text-gray-800  mb-3 leading-relaxed">
            Your access to and use of the Services at your own risk. You
            understand and agree that the Services are provided to you on an “AS
            IS” and “AS AVAILABLE” basis. TO THE FULLEST EXTENT PERMITTED BY
            LAW, ARTECH EXPLICITLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS OR
            IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, AND NON-INFRINGEMENT. ARTECH DOES NOT GUARANTEE
            THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR THAT IT WILL
            HELP YOU ACHIEVE ANY PARTICULAR EXAM SCORE.
          </Text>
        </Section>

        <Section title="8. LIMITATION OF LIABILITY">
          <Text className="text-body font-sans-medium text-gray-800  mb-3 leading-relaxed">
            NOTWITHSTANDING ANY OTHER TERMS TO THE CONTRARY, TO THE MAXIMUM
            EXTENT PERMITTED BY APPLICABLE LAW, ARTECH AND ITS AFFILIATES SHALL
            NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
            OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR DATA, ARISING FROM
            YOUR USE OF THE SERVICE.IN NO EVENT SHALL ARTECH'S TOTAL LIABILITY
            TO YOU FOR ALL CLAIMS EXCEED THE AMOUNT YOU HAVE PAID TO ARTECH IN
            THE PAST SIX MONTHS.
          </Text>

          <Text className="text-body font-sans-medium text-gray-800  mb-3 leading-relaxed">
            BY AGREEING TO THESE TERMS OR USING THE SERVICES, YOU AGREE, TO THE
            MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THAT THE ARTECH ENTITIES
            ARE NOT RESPONSIBLE OR LIABLE TO YOU OR OTHERS FOR THE ACTIONS OR
            CONDUCT OF USERS AND THIRD PARTIES ON THE SERVICES, OR FOR ANY
            CONTENT USERS AND THIRD PARTIES SHARE ON THE SERVICES, INCLUDING
            OFFENSIVE, DEFAMATORY, ILLEGAL OR OTHER OBJECTIONABLE CONTENT.
          </Text>
        </Section>

        <Section title="9. INDEMNIFICATION">
          <Text className="text-body text-gray-800 leading-relaxed mb-3">
            You agree to indemnify and hold harmless Artech and its officers,
            directors, employees, and agents from any claims, damages, or
            expenses arising from your use of the Service or your violation of
            these Terms.
          </Text>
        </Section>

        <Section title="10. TERMINATION">
          <Text className="text-body text-gray-800 leading-relaxed mb-3">
            We may suspend or terminate your access to the Service immediately
            if you breach these Terms. You may terminate your account by ceasing
            to use the Service. Termination does not entitle you to a refund.
          </Text>
        </Section>

        <Section title="11. GOVERNING LAW AND DISPUTE RESOLUTION ">
          <View className="px-4 mb-4 flex-col gap-3">
            <Text className="text-body font-sans leading-relaxed text-gray-900 flex-row gap-1">
              <Text className=" font-sans-medium text-black">
                11.1. Governing Law:{" "}
              </Text>
              These Terms shall be governed by the laws of the Federal Republic
              of Nigeria, without regard to its conflict of law principles.
            </Text>

            <Text className="text-body font-sans leading-relaxed text-gray-900 flex-row gap-1">
              <Text className=" font-sans-medium text-black">
                11.2. Informal Resolution:{" "}
              </Text>
              We strongly encourage you to contact us first at
              support@artech.com to resolve any dispute informally.
            </Text>

            <Text className="text-body font-sans leading-relaxed text-gray-900 flex-row gap-1">
              <Text className=" font-sans-medium text-black">
                11.3. Binding Arbitration for International Users (Outside
                Nigeria):{" "}
              </Text>
              If you are a user residing outside of Nigeria, any dispute that
              cannot be resolved informally shall be finally settled by binding
              arbitration under the Rules of Arbitration of the Nigerian
              Arbitration and Conciliation Act. The seat of arbitration shall be
              Lagos, Nigeria. The language of the arbitration shall be English.
            </Text>

            <Text className="text-body font-sans leading-relaxed text-gray-900 flex-row gap-1">
              <Text className=" font-sans-medium text-black">
                11.4. Mediation/Arbitration for Nigerian Users:{" "}
              </Text>
              For users residing in Nigeria, any dispute not resolved informally
              shall be referred to mediation at the Lagos Multi-Door Courthouse
              (LMDC). If mediation fails, the dispute shall be settled by
              binding arbitration under the LMDC rules.
            </Text>
          </View>
        </Section>

        <Section title="11. INTERNATIONAL USE">
          <Text className="text-body font-sans text-gray-800 leading-relaxed mb-3">
            The Service is operated from Nigeria. If you access the Service from
            outside Nigeria, you are responsible for compliance with your local
            laws. We make no representation that the Service is appropriate or
            available for use in all locations.
          </Text>
        </Section>

        <Section title="12. CHANGES TO TERMS">
          <Text className="text-body font-sans text-gray-800 leading-relaxed mb-3">
            We may update these Terms from time to time. We will notify you of
            material changes by posting the new Terms in the app or via email.
            Your continued use of the Service after the effective date of the
            changes constitutes your acceptance of the new Terms.
          </Text>
        </Section>

        <Section title="13. CONTACT INFORMATION">
          <Text className="text-body font-sans text-gray-800 leading-relaxed mb-3">
            For questions about these Terms, please contact:
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
          // containerStyles={"mb-4"}
        >
          <Text className="text-white text-body font-sans-medium">
            Download PDF
          </Text>
        </CustomButton>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Terms;
