import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const QuestionCard = React.memo(
  ({ question, selectedAnswer, handleSelect, disabled, showAnswers }) => {
    // const isCorrect =
    //   selectedAnswer?.toLowerCase() === question.correctAnswer?.toLowerCase();

    const showFeedback = showAnswers && question.correctAnswer;

    return (
      <View className="bg-white p-5 shadow-sm shadow-gray-200">
        {/* Question Header */}
        <View className="flex-row items-center mb-6">
          <View className="bg-gray-100 rounded-md p-2 mr-3">
            <Text className=" text-gray-800 font-sans-bold text-body">
              Q{question?.questionIndex}.
            </Text>
          </View>
          <Text
            // fontFamily="Roboto-Medium"
            // fontSize={16}
            // textStyle="text-gray-800 flex-1 tracking-wider leading-6"
            className=" text-gray-800 flex-1 leading-6 tracking-wide  font-sans-medium text-body"
          >
            {question?.question}
          </Text>
        </View>

        {/* Options List */}
        <View className="flex-col gap-3">
          {question.options.map((option, index) => {
            const optionLetter = String.fromCharCode(65 + index)?.toLowerCase();
            const isSelected = selectedAnswer?.toLowerCase() === optionLetter;
            const isCorrectOption =
              optionLetter === question.correctAnswer?.toLowerCase();
            const showAsCorrect = showFeedback && isCorrectOption;
            const showAsIncorrect =
              showFeedback && isSelected && !isCorrectOption;

            return (
              <TouchableOpacity
                key={`${question?.id}-${index}`}
                onPress={() =>
                  !disabled && handleSelect(question?.id, optionLetter)
                }
                activeOpacity={disabled ? 1 : 0.8}
                disabled={disabled}
                className={`py-2.5 px-4 rounded-lg border ${
                  isSelected
                    ? showAsIncorrect
                      ? "bg-red-50 border-red-300"
                      : "bg-blue-50 border-blue-300"
                    : showAsCorrect
                    ? "bg-green-50 border-green-300"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View
                      className={`w-8 h-8 rounded-full mr-3 items-center justify-center ${
                        isSelected
                          ? showAsIncorrect
                            ? "bg-red-500"
                            : "bg-blue-500"
                          : showAsCorrect
                          ? "bg-emerald-500"
                          : "bg-gray-200"
                      }`}
                    >
                      <Text
                        className={`font-sans text-body uppercase ${
                          isSelected || showAsCorrect
                            ? "text-white"
                            : "text-gray-600"
                        }`}
                      >
                        {option.key}
                      </Text>
                    </View>

                    <Text
                      className={`font-sans flex-1 leading-6 text-body ${
                        isSelected
                          ? showAsIncorrect
                            ? "text-red-800"
                            : "text-blue-800"
                          : showAsCorrect
                          ? "text-emerald-800"
                          : "text-gray-700"
                      }`}
                    >
                      {option.value}
                    </Text>
                  </View>

                  <View className="ml-2">
                    {showAsCorrect && (
                      <MaterialCommunityIcons
                        name="check-circle"
                        size={20}
                        color="#16a34a"
                      />
                    )}
                    {showAsIncorrect && (
                      <MaterialCommunityIcons
                        name="close-circle"
                        size={20}
                        color="#ef4444"
                      />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Feedback Section */}
        {showFeedback && (
          <View className="mt-4">
            {question.explanation && (
              <View className="mt-4">
                <View className="bg-gray-100 p-4 rounded-xl border border-gray-300">
                  <View className="flex-row items-end mb-2">
                    <MaterialCommunityIcons
                      name="lightbulb-on-outline"
                      size={20}
                      color="#6b7280" // Tailwind gray-500
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      // fontFamily="Roboto-Medium"
                      // fontSize={14}
                      // textStyle="text-gray-800 tracking-wider underline"
                      className="font-sans-medium text-sm text-gray-800 tracking-wider underline"
                    >
                      Explanation
                    </Text>
                  </View>
                  <Text className="font-sans text-[14px] text-gray-600 leading-5">
                    {question.explanation}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
);

QuestionCard.displayName = "QuestionCard";

export default QuestionCard;
