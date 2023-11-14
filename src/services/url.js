const url = {
    BASE_URL: "https://localhost:7218/api/",

    CLASS_COURSE: {
        BY_CLASSID: "/ClassCourse/by-classId",
    },

    AUTH: {
        LOGIN: "/Auth/student-login",
        CHANGE_PASSWORD: "/Auth/student/change-password",
        PROFILE: "/Auth/student/profile",
        UPDATE_PROFILE: "/Auth/student/update-profile",
        FORGOT_PASSWORD: "/Auth/student/forgot-password",
        RESET_PASSWORD: "/Auth/student/reset-password",
    },

    TEST: {
        LIST: "/test",
        STUDENT_CODE: "/test/get-by-student/",
        BY_SLUG: "/test/get-by-exam",
    },

    TEST_QUESTION: {
        LIST: "/TestQuestion",
        MULTIPLE_CHOICE: "/TestQuestion/multiple-choice/take-test",
        PRACTICAL: "/TestQuestion/essay/take-test",
        RESULT: "/TestQuestion/result-test/",
    },

    EXAM: {
        SLUG: "/exam/get-by-slug",
        COURSE_ID: "/exam/get-by-courseId",
    },

    QUESTION: {
        LIST: "/question",
        DETAIL: "question/get-by-id",
        TEST_ID: "question/get-by-testId",
    },

    ANSWER: {
        LIST: "/answer",
        QUESTION_ID: "/answer/get-by-questionId",
    },

    ANSWER_STUDENT: {
        SUBMIT: "/answersForStudent/submit-exam",
        GET_BY_QUESTIONID: "/answersForStudent/get-by-questionId",
    },

    GRADE: {
        LIST: "/grade/get-by-test",
    },

    REGISTER_EXAM: {
        REGISTER: "/RegisterExam/register-exam",
    },
};

export default url;
