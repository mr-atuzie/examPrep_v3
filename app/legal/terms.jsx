import { ScrollView, Text, View } from "react-native";

const Section = ({ title, children }) => (
  <View className="mb-8">
    <Text className="text-xl font-poppins-bold text-primary mb-2">{title}</Text>
    <View>{children}</View>
  </View>
);

const Terms = () => {
  return (
    <ScrollView className="flex-1 bg-white p-6">
      {/* Effective Date */}
      <View className="bg-primary rounded-xl py-3 px-4 mb-8">
        <Text className="text-white text-center font-sans-medium">
          Effective: September 22, 2025
        </Text>
      </View>
      <Text className="text-2xl font-sans-bold text-center text-primary mb-6">
        ARTECH’S TERMS OF SERVICE
      </Text>

      <Section title="">
        <Text className="text-body leading-relaxed mb-2">
          Welcome to Exam Prep, a mobile and online service operated by ARTECH
          DEV LTD (hereinafter referred to as “Artech” “we”). These Terms of Use
          ("Terms") are a legal agreement between you ("User," "you," "your")
          and ARTECH DEV LIMITED ("Artech," "we," "us," "our"), a software
          company providing Software-as-a-Service (SaaS) solutions. These Terms
          govern your access to and use of the "Exam Prep" mobile application,
          related websites, and services (collectively, the "Service"), a
          mobile-first edtech platform designed to help students master exam
          preparation materials.
        </Text>

        <Text className="text-body leading-relaxed">
          PLEASE READ THESE TERMS CAREFULLY. BY CREATING AN ACCOUNT, ACCESSING,
          OR USING THE SERVICE, YOU AGREE TO BE BOUND BY THESE TERMS AND OUR
          PRIVACY POLICY. IF YOU DO NOT AGREE, YOU MUST NOT USE THE SERVICE.
        </Text>
      </Section>

      <Section title="1.SERVICES">
        <Text className="text-body leading-relaxed">
          Exam Prep allows students to prepare for local and international exams
          such as WAEC, JAMB, BECE, Common Entrance, Post-UTME, SAT, TOEFL, and
          ACT.We are a mobile-first edtech platform designed to revolutionize
          how students across Nigeria and West Africa learn.
        </Text>
        <Text className="text-body leading-relaxed mb-4">
          1. THE SERVICE Artech Exam Prep is a product of ARTECH DEV LIMITED.
          The Service provides educational content and practice tools for exams,
          including but not limited to WAEC, JAMB, BECE, SAT, TOEFL, and ACT.
          While initially focused on Nigeria and Africa, the Service is
          accessible to users globally, subject to these Terms and applicable
          local laws.
        </Text>
      </Section>

      <Section title="2. ELIGIBILITY & ACCOUNT REGISTRATION">
        <Text className="text-base leading-relaxed mb-4">
          Eligibility: You must be at least 13 years of age (or the minimum age
          of digital consent in your country) to use the Service. If you are
          under 18, you represent that you have your parent or guardian's
          permission to use the Service and that they have read and agreed to
          these Terms on your behalf.
        </Text>

        <Text className="text-base leading-relaxed mb-4">
          Account Creation: You must provide accurate and complete information
          during registration and keep it updated.You represent that all
          information you provide to us upon registration and at all other times
          will be true, accurate, current, and complete. If you choose, or you
          are provided with, a user identification code, password or any other
          piece of information as part of our security procedures, you must
          treat such information as confidential. You must not disclose it to
          any third party.
        </Text>
        <Text className="text-base leading-relaxed">
          Account Security: You are responsible for all activities under your
          account. You must notify us immediately of any unauthorized use at
          support@artech.com.
        </Text>
      </Section>

      <Section title="3. LICENSE AND USE">
        <Text className="text-base leading-relaxed mb-4">
          License Grant: Subject to these Terms, Artech grants you a limited,
          non-exclusive, non-transferable license to use the Service for your
          personal, non-commercial educational purposes.
        </Text>

        <Text className="text-base leading-relaxed">
          Restrictions: You agree not to:
        </Text>
        <Text className="text-base leading-relaxed mb-4">
          Copy, modify, or reverse engineer any part of the Service, Use the
          Service for any commercial purpose without our express written
          consent, Use bots, scrapers, or other automated means to access the
          Service,Engage in any activity that disrupts or interferes with the
          Service.
        </Text>
      </Section>

      <Section title="4. FEES, PAYMENTS, AND SUBSCRIPTIONS">
        <Text className="text-base leading-relaxed mb-4">
          Fees: Certain features of the Service are provided for a fee. You can
          view the applicable fees within the app or on our website. All fees
          are exclusive of applicable taxes.
        </Text>

        <Text className="text-base leading-relaxed mb-4">
          App Store Payments: If you purchase a subscription through the Apple
          App Store or Google Play Store, the payment is processed by that
          store, and you are subject to their payment terms and conditions.
          MANAGING YOUR SUBSCRIPTION AND REQUESTING REFUNDS MUST BE DONE
          DIRECTLY THROUGH THE APP STORE
        </Text>
      </Section>

      <Section title="5. INTELLECTUAL PROPERTY">
        <Text className="text-base leading-relaxed mb-4">
          The Service, including all content, features, software, and logos, is
          owned by Artech or its licensors and is protected by copyright,
          trademark, and other laws. Except for the limited license granted
          herein, no rights are transferred to you. You may not use our
          trademarks without our prior written permission.
        </Text>
      </Section>

      <Section title="6. USER-GENERATED CONTENT (Limited Scope)">
        <Text className="text-base leading-relaxed mb-4">
          The Service may allow you to post content, such as questions or
          comments in forums. By posting, you grant us a license to use that
          content to operate the Service. You are solely responsible for your
          content, and it must not be illegal, abusive, or infringe on others'
          rights. We reserve the right to remove any content at our discretion.
        </Text>
      </Section>

      <Section title="7. DISCLAIMER OF WARRANTIES">
        <Text className="text-base leading-relaxed mb-4">
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE." TO THE FULLEST
          EXTENT PERMITTED BY LAW, ARTECH EXPLICITLY DISCLAIMS ALL WARRANTIES,
          WHETHER EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. ARTECH DOES
          NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR
          THAT IT WILL HELP YOU ACHIEVE ANY PARTICULAR EXAM SCORE.
        </Text>
      </Section>

      <Section title="8. LIMITATION OF LIABILITY">
        <Text className="text-base leading-relaxed mb-4">
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ARTECH AND ITS
          AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR DATA,
          ARISING FROM YOUR USE OF THE SERVICE.
        </Text>

        <Text className="text-base leading-relaxed mb-4">
          IN NO EVENT SHALL ARTECH'S TOTAL LIABILITY TO YOU FOR ALL CLAIMS
          EXCEED THE AMOUNT YOU HAVE PAID TO ARTECH IN THE PAST SIX MONTHS.
        </Text>
      </Section>

      <Section title="9. INDEMNIFICATION">
        <Text className="text-base leading-relaxed mb-4">
          You agree to indemnify and hold harmless Artech and its officers,
          directors, employees, and agents from any claims, damages, or expenses
          arising from your use of the Service or your violation of these Terms.
        </Text>
      </Section>

      <Section title="10. TERMINATION">
        <Text className="text-base leading-relaxed mb-4">
          We may suspend or terminate your access to the Service immediately if
          you breach these Terms. You may terminate your account by ceasing to
          use the Service. Termination does not entitle you to a refund.
        </Text>
      </Section>

      <Section title="11. GOVERNING LAW AND DISPUTE RESOLUTION ">
        <Text className="text-base leading-relaxed mb-4">
          Governing Law: These Terms shall be governed by the laws of the
          Federal Republic of Nigeria, without regard to its conflict of law
          principles.
        </Text>

        <Text className="text-base leading-relaxed mb-4">
          Informal Resolution: We strongly encourage you to contact us first at
          support@artech.com to resolve any dispute informally.
        </Text>

        <Text className="text-base leading-relaxed mb-4">
          Binding Arbitration for International Users (Outside Nigeria): If you
          are a user residing outside of Nigeria, any dispute that cannot be
          resolved informally shall be finally settled by binding arbitration
          under the Rules of Arbitration of the Nigerian Arbitration and
          Conciliation Act. The seat of arbitration shall be Lagos, Nigeria. The
          language of the arbitration shall be English.
        </Text>

        <Text className="text-base leading-relaxed mb-4">
          Mediation/Arbitration for Nigerian Users: For users residing in
          Nigeria, any dispute not resolved informally shall be referred to
          mediation at the Lagos Multi-Door Courthouse (LMDC). If mediation
          fails, the dispute shall be settled by binding arbitration under the
          LMDC rules.
        </Text>
      </Section>

      <Section title="12. INTERNATIONAL USE">
        <Text className="text-base leading-relaxed mb-4">
          The Service is operated from Nigeria. If you access the Service from
          outside Nigeria, you are responsible for compliance with your local
          laws. We make no representation that the Service is appropriate or
          available for use in all locations.
        </Text>
      </Section>

      <Section title="13. CHANGES TO TERMS">
        <Text className="text-base leading-relaxed mb-4">
          We may update these Terms from time to time. We will notify you of
          material changes by posting the new Terms in the app or via email.
          Your continued use of the Service after the effective date of the
          changes constitutes your acceptance of the new Terms.
        </Text>
      </Section>

      <Section title="14. PRIVACY AND DATA PROTECTION">
        <Text className="text-base leading-relaxed mb-4">
          15.1. Commitment to Privacy. Artech is committed to protecting your
          personal information. Our collection, use, and disclosure of your
          personal data are governed by our Privacy Policy, which is
          incorporated into these Terms by this referenc
        </Text>
        <Text className="text-base leading-relaxed mb-4">
          15.2. Consent to Data Practices. By using the Service, you consent to
          the data practices described in our Privacy Policy. This includes how
          we collect, process, and store your information, which may involve
          transferring data to servers located in Nigeria or other countries
          with different data protection laws than your country of residence.
        </Text>
        <Text className="text-base leading-relaxed mb-4">
          15.3. Global Compliance. Our Privacy Policy is designed to comply with
          applicable data protection laws, including the Nigeria Data Protection
          Act (NDPA). For users located in other regions, such as the European
          Economic Area (EEA) or the United Kingdom, the Privacy Policy outlines
          the legal bases for processing and your respective rights.
        </Text>
        <Text className="text-base leading-relaxed mb-4">
          15.4. Updates to Privacy Policy. We may update our Privacy Policy from
          time to time to reflect changes in our practices or the law. We will
          notify you of any material changes as required by law, and your
          continued use of the Service after such changes constitutes your
          acceptance of the updated Privacy Policy.
        </Text>
        <Text className="text-base leading-relaxed mb-4">
          You confirm that you have read, understood, and agree to be bound by
          our Privacy Policy, which can be accessed at [Insert Link to Your
          Privacy Policy].
        </Text>
      </Section>

      <Section title="14. CONTACT INFORMATION">
        <Text className="text-base leading-relaxed">
          For questions about these Terms, please contact:
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

export default Terms;
