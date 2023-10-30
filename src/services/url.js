const url = {
    BASE_URL: "https://localhost:7218/api/",

    CLASS: {
        LIST: "/classes",
    },

    COURSE: {
        LIST: "/course",
    },

    STAFF: {
        LIST: "/STAFF",
    },

    STUDENT: {
        LIST: "/student",
    },

    TEST: {
        LIST: "/test",
        SLUG: "/test/get-by-slug",
    },

    TEST_QUESTION: {
        LIST: "/TestQuestion",
        TAKE_TEST: "/TestQuestion/take-test",
    },

    EXAM: {
        SLUG: "/exam/get-by-slug",
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
    },
};

export default url;
